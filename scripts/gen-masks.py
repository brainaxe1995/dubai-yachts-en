"""Generate per-image inpaint masks: white rectangle in top-left ~15% area.
White = area to inpaint. Output mask filename matches source name exactly.
Mirrors source folder structure into MASKS_ROOT."""
from pathlib import Path
from PIL import Image, ImageDraw

SRC_ROOT = Path(r"C:\Users\srbd1\Downloads\ai-work\originals")
MASKS_ROOT = Path(r"C:\Users\srbd1\Downloads\ai-work\masks")

# Watermark box as fraction of image (x, y, w, h) — top-left corner
# Client sample shows logo occupies ~18% width, ~15% height. Add small margin.
BOX_X = 0.0
BOX_Y = 0.0
BOX_W = 0.35   # 35% width — catches outer swoosh/arc ornament of Toot Fun logo
BOX_H = 0.30   # 30% height

count = 0
for src in SRC_ROOT.rglob("*"):
    if not src.is_file():
        continue
    if src.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
        continue
    with Image.open(src) as im:
        w, h = im.size
    mask = Image.new("L", (w, h), 0)  # black
    draw = ImageDraw.Draw(mask)
    x1, y1 = int(w * BOX_X), int(h * BOX_Y)
    x2, y2 = int(w * (BOX_X + BOX_W)), int(h * (BOX_Y + BOX_H))
    draw.rectangle([x1, y1, x2, y2], fill=255)  # white = inpaint
    rel = src.relative_to(SRC_ROOT)
    # iopaint expects mask filename matching source EXACTLY (same suffix rules)
    out = MASKS_ROOT / rel.with_suffix(".png")
    out.parent.mkdir(parents=True, exist_ok=True)
    mask.save(out)
    count += 1
    if count % 40 == 0:
        print(f"  masks: {count}")
print(f"total masks: {count}")
