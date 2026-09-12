"""Blur / low-quality detector for dubai-yacht-cards-final.

Metrics per image:
- Laplacian variance (low = blurry)
- Original source width (small = was upscaled, likely soft)
- File size at 1920x1200 (small = low detail)

Reports images sorted by combined quality score (worst first).
"""
import sys, io, csv
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from pathlib import Path
from PIL import Image
import numpy as np

FINAL = Path(r"C:\Users\srbd1\Downloads\dubai-yacht-cards-final")
ORIG = Path(r"C:\Users\srbd1\Downloads\ai-work\originals")

def laplacian_var(arr):
    """Fast 3x3 Laplacian variance using numpy (no cv2)."""
    if arr.ndim == 3:
        arr = arr.mean(axis=2)
    k = np.array([[0,1,0],[1,-4,1],[0,1,0]], dtype=np.float32)
    from scipy.signal import convolve2d
    lap = convolve2d(arr.astype(np.float32), k, mode="valid")
    return float(lap.var())

def brenner(arr):
    """Brenner focus metric — sum of squared differences of pixels 2 apart."""
    if arr.ndim == 3:
        arr = arr.mean(axis=2)
    d = arr[2:, :].astype(np.float32) - arr[:-2, :].astype(np.float32)
    return float((d*d).sum() / arr.size)

results = []
count = 0
for src in FINAL.rglob("*.webp"):
    rel = src.relative_to(FINAL)
    try:
        with Image.open(src) as im:
            im_small = im.resize((640, 400))
            arr = np.array(im_small)
        blur = laplacian_var(arr)
        brenner_score = brenner(arr)
        # Match original by stem+category
        orig_matches = list(ORIG.rglob(src.stem + ".*"))
        orig_w = None
        if orig_matches:
            with Image.open(orig_matches[0]) as om:
                orig_w = om.width
        size_kb = src.stat().st_size // 1024
        results.append({
            "path": str(rel),
            "laplacian": round(blur, 1),
            "brenner": round(brenner_score, 1),
            "orig_w": orig_w or 0,
            "size_kb": size_kb,
        })
        count += 1
        if count % 30 == 0:
            print(f"  {count}/260 analyzed", flush=True)
    except Exception as e:
        print(f"  skip {rel}: {e}")

# Sort worst-first: low laplacian = blurry
results.sort(key=lambda r: (r["laplacian"], r["brenner"]))

print(f"\n{'='*100}")
print(f"BOTTOM 40 (worst quality first):\n")
print(f"{'laplacian':>10} {'brenner':>10} {'orig_w':>7} {'kb':>5}  path")
print("-" * 120)
for r in results[:40]:
    print(f"{r['laplacian']:>10} {r['brenner']:>10} {r['orig_w']:>7} {r['size_kb']:>5}  {r['path']}")

print(f"\n{'='*100}")
print(f"BLURRY THRESHOLD (laplacian < 40): {sum(1 for r in results if r['laplacian'] < 40)} images")
print(f"BORDERLINE (laplacian 40-80): {sum(1 for r in results if 40 <= r['laplacian'] < 80)} images")
print(f"OK (laplacian >= 80): {sum(1 for r in results if r['laplacian'] >= 80)} images")

# CSV output for reference
csv_path = FINAL.parent / "dubai-yacht-cards-quality.csv"
with open(csv_path, "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=["path","laplacian","brenner","orig_w","size_kb"])
    w.writeheader()
    w.writerows(results)
print(f"\nCSV: {csv_path}")
