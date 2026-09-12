"""Apply client blog doc — English side only.
Renames slugs, rewrites H1 (title) + H2 (sections[0].h) verbatim per doc.
Meta title + description live in route file `blog_.$slug.tsx` head() — those
get updated too. Post 3 meta uses doc pattern + generated desc.
Post 7 H1 uses cleaned 'Add-Ons' form per user approval.
"""
import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
from pathlib import Path

BLOG = Path(r'C:\Users\srbd1\OneDrive\Desktop\mY pROJECTS\dubai-yache-react\english\src\data\blog.ts')

# Each entry: (current slug, new slug, new title, new H2, new meta title, new meta desc)
SPEC = [
    (
        "complete-guide-choosing-right-yacht-dubai",
        "complete-guide-choosing-right-yacht-dubai",
        "Complete Guide Choosing Right Yacht Dubai",
        "How to Choose the Right Yacht Rental in Dubai",
        "Complete Guide Choosing Right Yacht Dubai | Dubai Yachts",
        "Complete Guide Choosing Right Yacht Dubai helps you compare yacht sizes, guest capacity, prices, facilities, and routes for the perfect private trip.",
    ),
    (
        "yacht-birthday-party-ideas-dubai",
        "yacht-birthday-party-ideas-dubai",
        "Best Yacht Birthday Party Ideas Dubai",
        "How to Plan an Unforgettable Birthday Celebration on a Yacht in Dubai",
        "Best Yacht Birthday Party Ideas Dubai | Dubai Yachts",
        "Best Yacht Birthday Party Ideas Dubai for decorations, themes, cakes, catering, entertainment, photography, and unforgettable celebrations on the water.",
    ),
    (
        "best-fishing-seasons-dubai",
        "best-fishing-seasons-dubai",
        "Best Fishing Seasons Dubai — Types & Times Guide",
        "When Is the Best Time to Go Fishing in Dubai?",
        "Best Fishing Seasons Dubai | Dubai Yachts",
        "Best Fishing Seasons Dubai guide covering hammour, sheri, kingfish, tuna and barracuda peak times, ideal trip windows, and top fishing spots.",
    ),
    (
        "romantic-marriage-proposal-yacht-dubai",
        "romantic-marriage-proposal-yacht-dubai",
        "How to Plan a Romantic Marriage Proposal Yacht Dubai — Step by Step",
        "How to Plan the Perfect Yacht Proposal in Dubai",
        "Romantic Marriage Proposal Yacht Dubai | Dubai Yachts",
        "Romantic Marriage Proposal Yacht Dubai ideas featuring elegant decorations, flowers, photography, sunset views, and private yacht experiences.",
    ),
    (
        "breakfast-on-yacht-dubai",
        "breakfast-on-yacht-dubai",
        "Breakfast on Yacht Dubai — How to Build a Perfect Morning",
        "Breakfast on a Yacht Dubai | Luxury Morning Cruise",
        "Breakfast on Yacht Dubai | Dubai Yachts",
        "Breakfast on Yacht Dubai offers a private morning cruise with fresh food, peaceful views, comfortable yachts, and memorable moments on the water.",
    ),
    (
        "sport-yacht-vs-super-yacht-dubai",
        "sport-yacht-vs-superyacht-dubai",  # SLUG RENAME
        "Sport Yacht vs Superyacht Dubai — A Simple Guide",
        "What Is the Difference Between a Sport Yacht and a Superyacht?",
        "Sport Yacht vs Superyacht Dubai | Dubai Yachts",
        "Sport Yacht vs Superyacht Dubai comparison covering size, speed, facilities, guest capacity, comfort, charter prices, and the best option for your trip.",
    ),
    (
        "best-yacht-party-add-ons-dubai",
        "best-yacht-party-add-ons-dubai",
        "Best Yacht Party Add-Ons Dubai — Full Guide",
        "Top Extras to Make Your Dubai Yacht Party Unforgettable",
        "Best Yacht Party Add-Ons Dubai | Dubai Yachts",
        "Best Yacht Party Add-Ons Dubai includes catering, decorations, photography, live entertainment, water sports, cakes, flowers, and private transfers.",
    ),
    (
        "required-documents-yacht-boarding-dubai",
        "required-documents-yacht-boarding-dubai",
        "Required Documents Yacht Boarding Dubai Guide",
        "What Identification Do You Need to Board a Yacht in Dubai?",
        "Required Documents Yacht Boarding Dubai | Dubai Yachts",
        "Required Documents Yacht Boarding Dubai guide covering original Emirates ID, passport requirements, guest identification, and essential boarding instructions.",
    ),
    (
        "book-azimut-80ft-jacuzzi-yacht-dubai",
        "book-azimut-80-ft-yacht-with-jacuzzi-dubai",  # SLUG RENAME
        "Book Azimut 80 Ft Yacht with Jacuzzi Dubai — Beyond Ordinary",
        "What to Expect When Renting the Azimut 80 Ft Yacht in Dubai",
        "Book Azimut 80 Ft Yacht with Jacuzzi Dubai | Dubai Yachts",
        "Book Azimut 80 Ft Yacht with Jacuzzi Dubai for a private luxury cruise featuring spacious decks, premium facilities, professional crew, and skyline views.",
    ),
    (
        "romantic-dinner-on-yacht-dubai",
        "romantic-dinner-on-yacht-dubai",
        "Romantic Dinner on Yacht Dubai — The Perfect Night for Couples",
        "How to Plan a Private Romantic Yacht Dinner in Dubai",
        "Romantic Dinner on Yacht Dubai | Dubai Yachts",
        "Romantic Dinner on Yacht Dubai with private cruising, elegant table decorations, delicious dining, skyline views, and unforgettable moments for two.",
    ),
]

src = BLOG.read_text(encoding='utf-8')

def esc(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')

for old_slug, new_slug, new_title, new_h2, meta_title, meta_desc in SPEC:
    # Find the post block for old_slug
    m = re.search(
        r'(slug: ")' + re.escape(old_slug) + r'(",\n\s+title: ")([^"]+)(",\n(?:.|\n)*?description:\s+")([^"]+)(",\n(?:.|\n)*?keywords:\s+")([^"]+)(",\n(?:.|\n)*?sections: \[\n\s+\{\n\s+h: ")([^"]+)(",)',
        src,
    )
    if not m:
        print(f"  MISS {old_slug}")
        continue
    prefix = m.group(1)
    mid1 = m.group(2)
    old_title = m.group(3)
    mid2 = m.group(4)
    old_desc = m.group(5)
    mid3 = m.group(6)
    old_kw = m.group(7)
    mid4 = m.group(8)
    old_h2 = m.group(9)
    tail = m.group(10)

    # Replace slug + title + description (used as meta desc in most places) + first H2
    new_block = (
        f'{prefix}{new_slug}{mid1}{esc(new_title)}{mid2}{esc(meta_desc)}{mid3}{old_kw}{mid4}{esc(new_h2)}{tail}'
    )
    src = src[:m.start()] + new_block + src[m.end():]
    print(f"  OK   {old_slug} -> {new_slug}")

BLOG.write_text(src, encoding='utf-8')
print("\nblog.ts updated")
