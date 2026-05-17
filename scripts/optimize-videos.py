from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
VIDEO_ROOT = ROOT / 'public' / 'videos'
TARGET_SUFFIXES = {'.mp4', '.mov'}
MIN_SIZE_BYTES = 1 * 1024 * 1024


def resolve_ffmpeg() -> str:
  candidates = [
    shutil.which('ffmpeg'),
    r'C:\Program Files\BlueStacks_nxt\ffmpeg.exe',
    r'C:\Program Files\ffmpeg\bin\ffmpeg.exe',
  ]

  for candidate in candidates:
    if candidate and Path(candidate).exists():
      return candidate

  raise FileNotFoundError('ffmpeg executable not found')


def iter_videos() -> list[Path]:
  return sorted(
    path
    for path in VIDEO_ROOT.rglob('*')
    if path.is_file()
    and path.suffix.lower() in TARGET_SUFFIXES
    and '.__codex_tmp__' not in path.name
    and path.stat().st_size >= MIN_SIZE_BYTES
  )


def optimize_video(ffmpeg: str, source: Path) -> tuple[bool, int, int]:
  temp_path = source.with_name(f'{source.stem}.__codex_tmp__{source.suffix}')

  command = [
    ffmpeg,
    '-y',
    '-i',
    str(source),
    '-map_metadata',
    '-1',
    '-an',
    '-vf',
    'fps=20,scale=1152:-2:force_original_aspect_ratio=decrease:flags=lanczos',
    '-c:v',
    'libopenh264',
    '-b:v',
    '2000k',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    str(temp_path),
  ]

  subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

  before = source.stat().st_size
  after = temp_path.stat().st_size

  if after >= before * 0.99:
    temp_path.unlink(missing_ok=True)
    return False, before, after

  try:
    temp_path.replace(source)
  except PermissionError:
    temp_path.unlink(missing_ok=True)
    raise

  return True, before, after


def main() -> int:
  try:
    ffmpeg = resolve_ffmpeg()
  except FileNotFoundError as error:
    print(str(error), file=sys.stderr)
    return 1

  videos = iter_videos()

  if not videos:
    print('No videos matched the optimization criteria.')
    return 0

  total_before = 0
  total_after = 0
  optimized_count = 0

  for video in videos:
    try:
      changed, before, after = optimize_video(ffmpeg, video)
    except subprocess.CalledProcessError:
      print(f'Failed to optimize {video.relative_to(ROOT)}', file=sys.stderr)
      return 1
    except PermissionError:
      print(f'skipped     {video.relative_to(ROOT)}  file locked by another process')
      continue

    total_before += before
    total_after += min(before, after)

    if changed:
      optimized_count += 1
      ratio = (1 - (after / before)) * 100
      print(f'optimized  {video.relative_to(ROOT)}  {before / (1024 * 1024):6.2f} MB -> {after / (1024 * 1024):6.2f} MB  ({ratio:5.1f}%)')
    else:
      total_after -= min(before, after)
      total_after += before
      print(f'skipped     {video.relative_to(ROOT)}  already compact')

  saved = total_before - total_after
  print(
    f'\nDone. Optimized {optimized_count}/{len(videos)} videos and saved {saved / (1024 * 1024):.2f} MB.'
  )
  return 0


if __name__ == '__main__':
  raise SystemExit(main())
