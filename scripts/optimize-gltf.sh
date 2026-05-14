#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODELS_DIR="$ROOT_DIR/public/models"

if ! command -v npx >/dev/null 2>&1; then
  echo "npx is required to run this script."
  exit 1
fi

if [ ! -f "$MODELS_DIR/rover-high.glb" ]; then
  echo "Missing $MODELS_DIR/rover-high.glb"
  echo "Export a first GLB from Blender before running this script."
  exit 1
fi

npx @gltf-transform/cli optimize \
  "$MODELS_DIR/rover-high.glb" \
  "$MODELS_DIR/rover-low.glb" \
  --compress draco \
  --texture-compress webp \
  --simplify 0.35

echo "Optimized GLB written to $MODELS_DIR/rover-low.glb"
