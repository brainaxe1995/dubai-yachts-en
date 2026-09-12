"""Smart upscale pipeline:
- For each cleaned image: if width < 1000, run Real-ESRGAN 4x with tile
  size 128 (GPU-safe) into upscaled/
- If width >= 1000, copy straight through to upscaled/ (Sharp final pass will resize)
"""
import sys, io, subprocess, shutil
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from pathlib import Path
from PIL import Image

IN = Path(r"C:\Users\srbd1\Downloads\ai-work\cleaned")
OUT = Path(r"C:\Users\srbd1\Downloads\ai-work\upscaled")
ESRGAN = r"C:\Users\srbd1\Downloads\ai-tools\realesrgan\realesrgan-ncnn-vulkan.exe"
MODELS = r"C:\Users\srbd1\Downloads\ai-tools\realesrgan\models"
THRESHOLD_W = 1000

upscaled = 0
copied = 0
failed = 0
for src in IN.rglob("*"):
    if not src.is_file(): continue
    if src.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}: continue
    with Image.open(src) as im:
        w, h = im.size
    rel = src.relative_to(IN)
    dst = OUT / rel.with_suffix(".webp")
    dst.parent.mkdir(parents=True, exist_ok=True)
    if w < THRESHOLD_W:
        # Real-ESRGAN 4x with tile-safe params
        r = subprocess.run(
            [ESRGAN, "-i", str(src), "-o", str(dst),
             "-m", MODELS, "-n", "realesrgan-x4plus", "-s", "4",
             "-t", "128", "-f", "webp"],
            capture_output=True, text=True, encoding="utf-8", errors="replace"
        )
        if r.returncode != 0 or not dst.exists():
            failed += 1
            print(f"  FAIL upscale: {rel} — {r.stderr[:200] if r.stderr else 'no output'}")
            continue
        upscaled += 1
    else:
        shutil.copy2(src, dst)
        copied += 1
    if (upscaled + copied) % 20 == 0:
        print(f"  progress: upscaled={upscaled} copied={copied} failed={failed}")

print(f"---\nupscaled: {upscaled}\ncopied (already big): {copied}\nfailed: {failed}")
