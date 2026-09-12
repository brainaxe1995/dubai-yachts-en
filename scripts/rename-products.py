"""Rename English product titles to match tootfunyachts.com pattern.
Pattern: `{brand-or-descriptor} {N} Ft {type}` for yachts.
Direct tootfun.com matches used verbatim where available.
"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
from pathlib import Path

SITE = Path(r'C:\Users\srbd1\OneDrive\Desktop\mY pROJECTS\dubai-yache-react\english\src\data\site.ts')

REPLACEMENTS = [
    # Yachts (15)
    ('title: "55ft Luxury Houseboat Rental in Dubai"', 'title: "Luxury 55 Ft Houseboat"'),
    ('title: "100ft Floating Yacht for Rent in Dubai"', 'title: "Floating 100 Ft Yacht"'),
    ('title: "48ft Majesty Yacht Hire in Dubai"', 'title: "Majesty 48 Ft Yacht"'),
    ('title: "95ft Italian Yacht Booking for Parties & Events in Dubai"', 'title: "Italian 95 Ft Yacht"'),
    ('title: "78ft Ferretti Super-Yacht Hire in Dubai"', 'title: "Ferretti 78 Ft Super Yacht"'),
    ('title: "40ft Mini Yacht Rental in Dubai"', 'title: "Luxury 40 Ft Mini Yacht"'),
    ('title: "80ft Azimut Yacht Rental in Dubai with Jacuzzi"', 'title: "Azimut 80 Ft Yacht with Jacuzzi"'),
    ('title: "95ft Sunseeker Super-Yacht Hire in Dubai"', 'title: "Sunseeker 95 Ft Super Yacht"'),
    ('title: "70ft Majesty Yacht Rental in Dubai"', 'title: "Majesty 70 Ft Yacht"'),
    ('title: "66ft Majesty Yacht Charter at Dubai Marina"', 'title: "Majesty 66 Ft Yacht"'),
    ('title: "55ft Majesty Yacht Cruise in Dubai"', 'title: "Majesty 55 Ft Yacht"'),
    ('title: "50ft Azimut Yacht Rental in Dubai"', 'title: "Azimut 50 Ft Yacht"'),
    ('title: "88ft Majesty Yacht in Dubai"', 'title: "Majesty 88 Ft Yacht"'),
    ('title: "105ft Corporate Yacht Rental in Dubai"', 'title: "Corporate 105 Ft Yacht"'),
    ('title: "90ft Gulf Craft Yacht Hire at Dubai Marina"', 'title: "Gulf Craft 90 Ft Yacht"'),
    # Fishing (3)
    ('title: "Shared Fishing Trip in Dubai"', 'title: "Shared Fishing Trip Dubai"'),
    ('title: "Private Yacht Fishing Trip in Dubai"', 'title: "Private Yacht Fishing Trip Dubai"'),
    ('title: "Private Boat Fishing Trip in Dubai"', 'title: "Private Boat Fishing Trip Dubai"'),
    # Parties (6)
    ('title: "Marriage Proposal on a Yacht in Dubai"', 'title: "Marriage Proposal Yacht Dubai"'),
    ('title: "Wedding on a Yacht in Dubai"', 'title: "Yacht Wedding Dubai"'),
    ('title: "Anniversary Party on a Yacht in Dubai"', 'title: "Anniversary Yacht Party Dubai"'),
    ('title: "Graduation Party on a Yacht in Dubai"', 'title: "Graduation Yacht Party Dubai"'),
    ('title: "Engagement Party on a Yacht in Dubai"', 'title: "Engagement Yacht Party Dubai"'),
    ('title: "Birthday Party on a Yacht in Dubai"', 'title: "Yacht Birthday Party Dubai"'),
    # Packages (3)
    ('title: "Breakfast on a Yacht Package in Dubai"', 'title: "Yacht Breakfast Package Dubai"'),
    ('title: "Yacht Rental with Jet Ski Package in Dubai"', 'title: "Yacht Rental with Jet Ski Dubai"'),
    ('title: "Romantic Dinner on a Yacht Package in Dubai"', 'title: "Romantic Yacht Dinner Package Dubai"'),
]

src = SITE.read_text(encoding='utf-8')
missing = []
for old, new in REPLACEMENTS:
    if old not in src:
        missing.append(old)
        continue
    src = src.replace(old, new)

SITE.write_text(src, encoding='utf-8')
print(f"applied {len(REPLACEMENTS) - len(missing)}/{len(REPLACEMENTS)} renames")
if missing:
    print("\nMISSING:")
    for m in missing: print(f"  - {m}")
