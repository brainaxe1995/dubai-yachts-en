"""Copy worst-quality images into a review folder for user inspection.
Preserves the Arabic subfolder structure so user can hand files back
and I can put them back in place.
"""
import sys, io, csv, shutil
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from pathlib import Path

SRC = Path(r"C:\Users\srbd1\Downloads\dubai-yacht-cards-final")
DST = Path(r"C:\Users\srbd1\Downloads\dubai-yacht-cards-needs-regen")
CSV = Path(r"C:\Users\srbd1\Downloads\dubai-yacht-cards-quality.csv")

if DST.exists():
    shutil.rmtree(DST)
DST.mkdir(parents=True, exist_ok=True)

rows = []
with open(CSV, encoding="utf-8") as f:
    for r in csv.DictReader(f):
        r["laplacian"] = float(r["laplacian"])
        r["orig_w"] = int(r["orig_w"])
        rows.append(r)

# Filter worst: laplacian < 500 OR orig source width < 800
worst = [r for r in rows if r["laplacian"] < 500 or r["orig_w"] < 800]
worst.sort(key=lambda r: (r["laplacian"], r["orig_w"]))

readme = [
    "REGENERATION LIST — dubai-yacht-cards-final soft/low-source images",
    "=" * 70,
    "Total files needing regen: " + str(len(worst)),
    "",
    "Priority: worst quality first (laplacian variance = sharpness, low = soft).",
    "orig_w = pixel width of source before pipeline — <800 means heavy upscale.",
    "",
    "Filenames + folders match the original layout — hand back with SAME name",
    "in SAME subfolder and I will drop them in.",
    "",
    "=" * 70,
    "",
    f"{'#':>3} {'laplacian':>10} {'orig_w':>7} {'kb':>5}  path",
    "-" * 100,
]

for i, r in enumerate(worst, 1):
    src_file = SRC / r["path"]
    dst_file = DST / r["path"]
    if not src_file.exists():
        print(f"  MISSING {src_file}")
        continue
    dst_file.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src_file, dst_file)
    line = f"{i:>3} {r['laplacian']:>10} {r['orig_w']:>7} {r['size_kb']:>5}  {r['path']}"
    readme.append(line)
    print(line)

(DST / "README.txt").write_text("\n".join(readme), encoding="utf-8")

print(f"\nCopied {len(worst)} files to {DST}")
print(f"README at {DST / 'README.txt'}")
