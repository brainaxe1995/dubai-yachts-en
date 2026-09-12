"""v3 smart upscale — reads cleaned-v3, writes upscaled-v3.
Same logic as v2 (width < 1000 -> ESRGAN 4x, else copy through).

Workaround: ESRGAN CLI crashes on WebP write with long/Arabic paths
(STATUS_STACK_BUFFER_OVERRUN). Output PNG to short ASCII temp path,
re-encode to WebP via PIL at final destination.
"""
import sys, io, subprocess, shutil, tempfile
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from pathlib import Path
from PIL import Image

IN = Path(r"C:\Users\srbd1\Downloads\ai-work\cleaned-v3")
OUT = Path(r"C:\Users\srbd1\Downloads\ai-work\upscaled-v3")
ESRGAN = r"C:\Users\srbd1\Downloads\ai-tools\realesrgan\realesrgan-ncnn-vulkan.exe"
MODELS = r"C:\Users\srbd1\Downloads\ai-tools\realesrgan\models"
THRESHOLD_W = 1000
TMP_DIR = Path(r"C:\esrgan-tmp")
TMP_DIR.mkdir(exist_ok=True)

upscaled = 0
copied = 0
failed = 0
for src in IN.rglob("*"):
    if not src.is_file(): continue
    if src.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}: continue
    try:
        with Image.open(src) as im:
            w, h = im.size
    except Exception as e:
        print(f"skip {src.name}: {e}")
        failed += 1
        continue
    rel = src.relative_to(IN)
    dst = OUT / rel.with_suffix(".webp")
    dst.parent.mkdir(parents=True, exist_ok=True)
    if w < THRESHOLD_W:
        tmp_in = TMP_DIR / f"in_{upscaled+failed}.png"
        tmp_out = TMP_DIR / f"out_{upscaled+failed}.png"
        shutil.copy2(src, tmp_in)
        subprocess.run(
            [ESRGAN, "-i", str(tmp_in), "-o", str(tmp_out), "-s", "4",
             "-m", MODELS, "-n", "realesrgan-x4plus", "-t", "128", "-f", "png"],
            capture_output=True, text=True
        )
        if tmp_out.exists() and tmp_out.stat().st_size > 10000:
            with Image.open(tmp_out) as im:
                im.save(dst, "WEBP", quality=95)
            upscaled += 1
            print(f"  ESRGAN {rel} ({w}x{h})", flush=True)
        else:
            print(f"  FAIL {rel} — re-encoding via PIL", flush=True)
            failed += 1
            with Image.open(src) as im:
                im.save(dst, "WEBP", quality=95)
        try: tmp_in.unlink()
        except: pass
        try: tmp_out.unlink()
        except: pass
    else:
        with Image.open(src) as im:
            im.save(dst, "WEBP", quality=95)
        copied += 1

print(f"\nupscaled: {upscaled}, copied: {copied}, failed: {failed}")
