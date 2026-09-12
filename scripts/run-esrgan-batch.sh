#!/usr/bin/env bash
# Run Real-ESRGAN 4x on each leaf folder inside cleaned/, output to upscaled/.
# Only upscale images with width < 1600 (larger ones already sharp enough).
set -e
ESRGAN="/c/Users/srbd1/Downloads/ai-tools/realesrgan/realesrgan-ncnn-vulkan.exe"
MODELS="/c/Users/srbd1/Downloads/ai-tools/realesrgan/models"
IN="/c/Users/srbd1/Downloads/ai-work/cleaned"
OUT="/c/Users/srbd1/Downloads/ai-work/upscaled"

find "$IN" -type d | while read dir; do
  has_subdir=$(find "$dir" -mindepth 1 -maxdepth 1 -type d | head -1)
  [ -n "$has_subdir" ] && continue
  rel="${dir#$IN/}"
  [ "$rel" = "$dir" ] && continue
  out_dir="$OUT/$rel"
  mkdir -p "$out_dir"
  n=$(find "$dir" -maxdepth 1 -type f | wc -l)
  echo ">> [$n] $rel"
  "$ESRGAN" -i "$dir" -o "$out_dir" -m "$MODELS" -n realesrgan-x4plus -s 4 -f webp 2>&1 | \
    grep -Ei "error|fail|done" | tail -3
done
echo "---"
echo "upscaled total: $(find "$OUT" -type f | wc -l)"
