"""Convert .webp source files to .png (iopaint batch mode doesn't handle .webp
inputs reliably). Preserves paths. Deletes the .webp after successful convert.
Also regenerates masks for the new .png stems."""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from pathlib import Path
from PIL import Image, ImageDraw

SRC = Path(r"C:\Users\srbd1\Downloads\ai-work\originals")
MASKS = Path(r"C:\Users\srbd1\Downloads\ai-work\masks")

BOX_W = 0.20
BOX_H = 0.16
converted = 0
for f in list(SRC.rglob("*.webp")):
    png_path = f.with_suffix(".png")
    with Image.open(f) as im:
        rgb = im.convert("RGB")
        rgb.save(png_path, "PNG")
        w, h = im.size
    f.unlink()
    # Regenerate mask matching new .png stem
    rel = png_path.relative_to(SRC)
    mask_path = MASKS / rel  # already .png
    mask_path.parent.mkdir(parents=True, exist_ok=True)
    m = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(m)
    draw.rectangle([0, 0, int(w * BOX_W), int(h * BOX_H)], fill=255)
    m.save(mask_path)
    # Also delete old .webp mask if it exists (irrelevant now)
    old_mask = MASKS / rel.with_suffix(".webp")
    if old_mask.exists():
        old_mask.unlink()
    converted += 1
print(f"converted: {converted}")
