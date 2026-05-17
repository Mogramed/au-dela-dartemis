from __future__ import annotations

import io
import json
import shutil
import zipfile
from pathlib import Path
from typing import Any
from xml.etree import ElementTree as ET

from PIL import Image


PPT_NS = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "rel": "http://schemas.openxmlformats.org/package/2006/relationships",
}


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_PPTX = PROJECT_ROOT / "public" / "presentation" / "presentation-diplome.pptx"
OUTPUT_DIR = PROJECT_ROOT / "public" / "presentation" / "slides"
MANIFEST_PATH = PROJECT_ROOT / "public" / "presentation" / "slides-manifest.json"

OUTPUT_WIDTH = 1600
OUTPUT_QUALITY = 82


def emu_to_px(value: int, scale: float) -> int:
    return int(round(value * scale))


def ensure_rgb(image: Image.Image) -> Image.Image:
    if image.mode == "RGB":
        return image
    if image.mode == "RGBA":
        background = Image.new("RGB", image.size, (3, 3, 3))
        background.paste(image, mask=image.getchannel("A"))
        return background
    return image.convert("RGB")


def parse_slide_size(zip_file: zipfile.ZipFile) -> tuple[int, int]:
    root = ET.fromstring(zip_file.read("ppt/presentation.xml"))
    size_node = root.find("p:sldSz", PPT_NS)
    if size_node is None:
        raise RuntimeError("Unable to read slide size from presentation.xml")

    return int(size_node.attrib["cx"]), int(size_node.attrib["cy"])


def parse_relationships(zip_file: zipfile.ZipFile, slide_index: int) -> dict[str, str]:
    rel_path = f"ppt/slides/_rels/slide{slide_index}.xml.rels"
    root = ET.fromstring(zip_file.read(rel_path))
    rel_map: dict[str, str] = {}

    for rel in root.findall("rel:Relationship", PPT_NS):
        target = rel.attrib.get("Target", "")
        rel_type = rel.attrib.get("Type", "")
        if rel_type.endswith("/image"):
            rel_map[rel.attrib["Id"]] = target.replace("../", "ppt/")

    return rel_map


def extract_pictures(zip_file: zipfile.ZipFile, slide_index: int) -> list[dict[str, Any]]:
    slide_path = f"ppt/slides/slide{slide_index}.xml"
    root = ET.fromstring(zip_file.read(slide_path))
    rel_map = parse_relationships(zip_file, slide_index)
    pictures: list[dict[str, Any]] = []

    for pic in root.findall(".//p:pic", PPT_NS):
        embed = pic.find(".//a:blip", PPT_NS)
        xfrm = pic.find(".//a:xfrm", PPT_NS)
        off = xfrm.find("a:off", PPT_NS) if xfrm is not None else None
        ext = xfrm.find("a:ext", PPT_NS) if xfrm is not None else None

        if embed is None or off is None or ext is None:
            continue

        rel_id = embed.attrib.get(f"{{{PPT_NS['r']}}}embed")
        if not rel_id or rel_id not in rel_map:
            continue

        pictures.append(
            {
                "path": rel_map[rel_id],
                "x": int(off.attrib.get("x", "0")),
                "y": int(off.attrib.get("y", "0")),
                "cx": int(ext.attrib.get("cx", "0")),
                "cy": int(ext.attrib.get("cy", "0")),
            }
        )

    return pictures


def render_slide(
    zip_file: zipfile.ZipFile,
    slide_index: int,
    slide_size: tuple[int, int],
    output_dir: Path,
) -> dict[str, Any]:
    slide_width_emu, slide_height_emu = slide_size
    output_height = int(round(OUTPUT_WIDTH * slide_height_emu / slide_width_emu))
    scale = OUTPUT_WIDTH / slide_width_emu
    canvas = Image.new("RGB", (OUTPUT_WIDTH, output_height), (3, 3, 3))
    pictures = extract_pictures(zip_file, slide_index)

    for picture in pictures:
        image_path = picture["path"]
        with zip_file.open(image_path) as image_file:
            image = Image.open(io.BytesIO(image_file.read()))
            image = ensure_rgb(image)

        target_width = max(1, emu_to_px(picture["cx"], scale))
        target_height = max(1, emu_to_px(picture["cy"], scale))
        position_x = emu_to_px(picture["x"], scale)
        position_y = emu_to_px(picture["y"], scale)

        image = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
        canvas.paste(image, (position_x, position_y))

    output_name = f"slide-{slide_index:03d}.webp"
    output_path = output_dir / output_name
    canvas.save(output_path, "WEBP", quality=OUTPUT_QUALITY, method=6)

    return {
        "image": f"/presentation/slides/{output_name}",
        "index": slide_index - 1,
        "label": f"Slide {slide_index:02d}",
    }


def main() -> None:
    if not SOURCE_PPTX.exists():
        raise FileNotFoundError(f"Missing PPTX source: {SOURCE_PPTX}")

    if OUTPUT_DIR.exists():
        shutil.rmtree(OUTPUT_DIR)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(SOURCE_PPTX) as zip_file:
        slide_size = parse_slide_size(zip_file)
        slide_files = sorted(
            int(Path(name).stem.replace("slide", ""))
            for name in zip_file.namelist()
            if name.startswith("ppt/slides/slide") and name.endswith(".xml")
        )

        manifest = [render_slide(zip_file, slide_index, slide_size, OUTPUT_DIR) for slide_index in slide_files]

    MANIFEST_PATH.write_text(
        json.dumps(
            {
                "count": len(manifest),
                "slides": manifest,
            },
            indent=2,
        ),
        encoding="utf-8",
    )

    print(f"Rendered {len(manifest)} slides to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
