#!/usr/bin/env bash
# v3 rerun — feed originals + masks-v3 into iopaint LaMa, output cleaned-v3.
# Same per-leaf-dir loop as v2 (iopaint doesn't recurse).
set -e
IOPAINT="/c/Users/srbd1/AppData/Local/Programs/Python/Python312/Scripts/iopaint.exe"
SRC="/c/Users/srbd1/Downloads/ai-work/originals"
MASKS="/c/Users/srbd1/Downloads/ai-work/masks-v3"
OUT="/c/Users/srbd1/Downloads/ai-work/cleaned-v3"

find "$SRC" -type d | while read dir; do
  has_subdir=$(find "$dir" -mindepth 1 -maxdepth 1 -type d | head -1)
  [ -n "$has_subdir" ] && continue
  rel="${dir#$SRC/}"
  [ "$rel" = "$dir" ] && continue
  mask_dir="$MASKS/$rel"
  out_dir="$OUT/$rel"
  mkdir -p "$out_dir"
  n=$(find "$dir" -maxdepth 1 -type f | wc -l)
  echo ">> [$n] $rel"
  "$IOPAINT" run --model=lama --device=cpu \
    --image="$dir" --mask="$mask_dir" --output="$out_dir" 2>&1 | \
    grep -Ei "processing|error|fail|done" | tail -3
done
echo "---"
echo "cleaned-v3 total: $(find "$OUT" -type f | wc -l)"
