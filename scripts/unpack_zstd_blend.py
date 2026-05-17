import argparse
import pathlib
import shutil

import zstandard as zstd


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("source")
    parser.add_argument("output")
    args = parser.parse_args()

    source = pathlib.Path(args.source)
    output = pathlib.Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)

    with source.open("rb") as source_file:
        with output.open("wb") as output_file:
            dctx = zstd.ZstdDecompressor()
            with dctx.stream_reader(source_file) as reader:
                shutil.copyfileobj(reader, output_file, length=1024 * 1024)

    print(output)


if __name__ == "__main__":
    main()
