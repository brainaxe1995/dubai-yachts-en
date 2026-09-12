"""Sample original card image dimensions across categories."""
import os
from pathlib import Path
from PIL import Image

ROOT = Path(r"C:\Users\srbd1\Downloads\dubai-yacht-images-source") / " dubai-yacht.ae"
CATS = ["يخوت للإيجار", "الحفلات", "الصيد", "الباقات"]

widths = []
for cat in CATS:
    for sub in (ROOT / cat).iterdir():
        if not sub.is_dir():
            continue
        for img in sub.iterdir():
            if img.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
                continue
            try:
                with Image.open(img) as im:
                    widths.append(im.size[0])
            except Exception as e:
                print(f"FAIL: {img.name}: {e}")

widths.sort()
n = len(widths)
print(f"total images: {n}")
print(f"widths min/median/max: {widths[0]} / {widths[n//2]} / {widths[-1]}")
print(f"< 1000 wide: {sum(1 for w in widths if w < 1000)}")
print(f"1000-1600 wide: {sum(1 for w in widths if 1000 <= w < 1600)}")
print(f">= 1600 wide: {sum(1 for w in widths if w >= 1600)}")
