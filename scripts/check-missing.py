"""Report which source files did NOT get cleaned counterparts."""
from pathlib import Path
SRC = Path(r"C:\Users\srbd1\Downloads\ai-work\originals")
CLEAN = Path(r"C:\Users\srbd1\Downloads\ai-work\cleaned")
missing = []
for f in SRC.rglob("*"):
    if not f.is_file(): continue
    if f.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}: continue
    rel = f.relative_to(SRC)
    cleaned = CLEAN / rel.with_suffix(".png")
    if not cleaned.exists():
        missing.append(rel)
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
print(f"missing: {len(missing)}")
for m in missing[:20]:
    print(f"  {m}")
