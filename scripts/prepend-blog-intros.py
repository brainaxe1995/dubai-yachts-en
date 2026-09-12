"""Prepend an intro H2 + hook paragraph to each of the 10 English blog posts.
Mirrors the Arabic blog H2-intro structure applied 2026-08-25 (see
project-blog-refresh-2026-08-25.md memory).

Anchor per post: match on `slug: "SLUG",` then find the next `sections: [\n      {`
and inject a new intro block right after `sections: [`.
"""
import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
from pathlib import Path

FILE = Path(r'C:\Users\srbd1\OneDrive\Desktop\mY pROJECTS\dubai-yache-react\english\src\data\blog.ts')

INTROS = {
    "complete-guide-choosing-right-yacht-dubai": {
        "h": "How to choose the right yacht for your trip in Dubai?",
        "p": "The right choice comes down to three factors: __guest count__, __occasion type__, and __trip duration__. The sections below break each one down with practical examples.",
    },
    "yacht-birthday-party-ideas-dubai": {
        "h": "Best yacht birthday party ideas in Dubai",
        "p": "A __birthday party on a yacht in Dubai__ is an experience no venue can match. Here are 10 ideas to make the night unforgettable — from decor to menu to fireworks.",
    },
    "best-fishing-seasons-dubai": {
        "h": "When does the best fishing season in Dubai start?",
        "p": "The __best fishing season in Dubai__ runs __November through February__ — mild weather, calm sea, and peak __hammour__ and __sheri__ catches. The full breakdown by season is below.",
    },
    "romantic-marriage-proposal-yacht-dubai": {
        "h": "Best ideas for a romantic marriage proposal on a yacht in Dubai",
        "p": "A __marriage proposal on a yacht in Dubai__ combines total privacy, a cinematic sunset backdrop, and a moment neither of you will ever forget. Here's a step-by-step plan.",
    },
    "breakfast-on-yacht-dubai": {
        "h": "Enjoy the best breakfast package on a yacht in Dubai",
        "p": "A __breakfast package on a yacht in Dubai__ turns a normal morning into an unforgettable one — calm waters, marina views, and a full Arabic breakfast on board.",
    },
    "sport-yacht-vs-super-yacht-dubai": {
        "h": "The difference between a sport yacht and a super yacht when renting a yacht in Dubai",
        "p": "__Sport__, __luxury__, and __super yachts__ each serve a different trip style. Here's a simple side-by-side so you can pick the right one for your Dubai cruise.",
    },
    "best-yacht-party-add-ons-dubai": {
        "h": "Standout add-ons that make a yacht party in Dubai more fun and luxurious",
        "p": "The right add-ons take a __yacht party in Dubai__ from good to unforgettable. These are the ones we book most often — from __custom cakes__ to __water sports__.",
    },
    "required-documents-yacht-boarding-dubai": {
        "h": "Documents and yacht booking requirements in Dubai before you sail",
        "p": "Before you board a yacht in Dubai, there are a few standard documents to prepare. This quick guide covers everything you need, plus the small extras that make check-in painless.",
    },
    "book-azimut-80ft-jacuzzi-yacht-dubai": {
        "h": "Book an 80ft Azimut yacht with jacuzzi for rent in Dubai",
        "p": "The __80ft Azimut with jacuzzi__ is one of the most in-demand yachts in Dubai — full specs, standout features, and the trip types it suits are covered below.",
    },
    "romantic-dinner-on-yacht-dubai": {
        "h": "A private romantic dinner experience aboard a luxury yacht in Dubai",
        "p": "A __romantic dinner on a yacht in Dubai__ is the ultimate escape from routine — a private cruise, discreet crew, and a 5-course dinner with the Dubai skyline as your backdrop.",
    },
}

src = FILE.read_text(encoding='utf-8')
count = 0
for slug, intro in INTROS.items():
    # Anchor: match slug entry then its next `sections: [\n`
    pat = re.compile(
        r'(slug: "' + re.escape(slug) + r'",[\s\S]*?sections: \[\n)',
        re.MULTILINE,
    )
    m = pat.search(src)
    if not m:
        print(f"  MISS {slug}")
        continue
    # Check idempotent — if intro already present just after `sections: [`, skip
    after = src[m.end():m.end()+400]
    if intro["h"] in after[:300]:
        print(f"  SKIP (already has intro) {slug}")
        continue
    injection = (
        '      {\n'
        f'        h: "{intro["h"]}",\n'
        '        p: [\n'
        f'          "{intro["p"]}",\n'
        '        ],\n'
        '      },\n'
    )
    src = src[:m.end()] + injection + src[m.end():]
    count += 1
    print(f"  OK   {slug}")

FILE.write_text(src, encoding='utf-8')
print(f"\ninjected {count}/10 intros")
