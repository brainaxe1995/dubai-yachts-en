"""OCR + mask generation — v3 with brand whitelist + code pattern.

Generates a mask combining:
  1. Primary top-left logo box (27% x 22%) — hardcoded corner
  2. Brand whitelist hits — case-insensitive substring match against
     known manufacturer names. Bypasses the digit-skip filter so
     "Sunseeker" / "Azimut" etc get masked even if OCR result includes
     digits or garbage neighbors.
  3. Cushion-code pattern — 2-3 letter prefix + 2-3 digits
     (e.g. "UD30", "JD30", "GC12"). Explicitly matched via regex.
  4. UPPERCASE Latin text >= 4 chars with no digits (registration filter).

Lower confidence threshold (0.30 vs 0.50 in v2) to catch faint
gold-on-fabric text. Bigger padding (10px vs 5px) so LaMa erases
the entire glyph halo.

Writes to ai-work/masks-v3/ mirroring source structure.
"""
import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
from pathlib import Path
from PIL import Image, ImageDraw
import numpy as np
import easyocr

SRC = Path(r"C:\Users\srbd1\Downloads\ai-work\originals")
MASKS = Path(r"C:\Users\srbd1\Downloads\ai-work\masks-v3")

PRIMARY_X, PRIMARY_Y, PRIMARY_W, PRIMARY_H = 0.0, 0.0, 0.27, 0.22

BRAND_WHITELIST = {
    "sunseeker", "azimut", "majesty", "ferretti", "gulfcraft", "gulf",
    "princess", "sunreef", "fairline", "mangusta", "riva", "benetti",
    "feadship", "lurssen", "gulf craft", "sunseekers",
}

CODE_PATTERN = re.compile(r"^[A-Z]{1,3}\d{2,3}$")

NOISE_WORDS = {"exit", "safety", "life", "vest", "warning", "fire", "danger", "no"}

CONF_MIN = 0.30
PAD = 10

reader = easyocr.Reader(['en'], gpu=False)
print("EasyOCR ready — v3 pipeline (brand whitelist + code pattern)")

def should_mask(text, conf):
    t = text.strip()
    if len(t) < 3:
        return False
    lowered = t.lower()
    if lowered in NOISE_WORDS:
        return False
    if any(brand in lowered for brand in BRAND_WHITELIST):
        return True
    if CODE_PATTERN.match(t):
        return True
    if any(c.isdigit() for c in t):
        return False
    if not all(c.isalpha() or c.isspace() for c in t):
        return False
    return len(t) >= 4 and (t.isupper() or t.istitle())

count = 0
detected = 0
hits_by_reason = {"brand": 0, "code": 0, "generic": 0}

for src in SRC.rglob("*"):
    if not src.is_file(): continue
    if src.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}: continue
    with Image.open(src) as im:
        w, h = im.size
        rgb = im.convert("RGB")
        arr = np.array(rgb)
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.rectangle([int(w*PRIMARY_X), int(h*PRIMARY_Y),
                    int(w*(PRIMARY_X+PRIMARY_W)), int(h*(PRIMARY_Y+PRIMARY_H))], fill=255)
    try:
        result = reader.readtext(arr, text_threshold=0.4, low_text=0.3)
    except Exception as e:
        print(f"  OCR skip {src.name}: {e}")
        result = []
    hits = 0
    for bbox, text, conf in result:
        if conf < CONF_MIN:
            continue
        if not should_mask(text, conf):
            continue
        t = text.strip().lower()
        if any(b in t for b in BRAND_WHITELIST):
            hits_by_reason["brand"] += 1
        elif CODE_PATTERN.match(text.strip()):
            hits_by_reason["code"] += 1
        else:
            hits_by_reason["generic"] += 1
        xs = [p[0] for p in bbox]
        ys = [p[1] for p in bbox]
        x1, y1 = int(min(xs)) - PAD, int(min(ys)) - PAD
        x2, y2 = int(max(xs)) + PAD, int(max(ys)) + PAD
        draw.rectangle([max(0,x1), max(0,y1), min(w,x2), min(h,y2)], fill=255)
        hits += 1
    if hits > 0:
        detected += 1
    rel = src.relative_to(SRC)
    out = MASKS / rel.with_suffix(".png")
    out.parent.mkdir(parents=True, exist_ok=True)
    mask.save(out)
    count += 1
    if count % 20 == 0:
        print(f"  {count}/260 processed, {detected} with extra hits (brand={hits_by_reason['brand']} code={hits_by_reason['code']} generic={hits_by_reason['generic']})")

print(f"\ntotal masks: {count}, images with extra hits: {detected}")
print(f"hit reasons: brand={hits_by_reason['brand']} code={hits_by_reason['code']} generic={hits_by_reason['generic']}")
