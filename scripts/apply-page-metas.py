"""Apply doc-verbatim meta title + meta description to 15 English page routes.
Each route file has a head() function with meta[] array — patches title,
description, og:title, og:description. Keeps existing keywords + og:url + links.
"""
import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
from pathlib import Path

ROUTES = Path(r'C:\Users\srbd1\OneDrive\Desktop\mY pROJECTS\dubai-yache-react\english\src\routes')

# (route filename, meta title, meta description)
METAS = [
    ("index.tsx",
     "Luxury Yacht Rental Dubai | Best Prices - Toot Fun Yachts",
     "Enjoy yacht rental Dubai with luxury yachts, competitive prices, private cruises, and a professional crew for every occasion. Book your yacht today."),
    ("cancellation-policy.tsx",
     "Easy Cancellation Policy | Toot Fun Yachts Dubai",
     "Learn about Toot Fun Yachts’ Cancellation Policy, including cancellation terms, rescheduling, refunds, and no-show conditions."),
    ("terms-and-conditions.tsx",
     "Terms and Conditions | Toot Fun Yachts Dubai",
     "Learn about Toot Fun Yachts’ terms and conditions, including booking, payment, cancellation, customer responsibilities, and the use of yacht rental services in Dubai."),
    ("privacy-policy.tsx",
     "Privacy Policy | Toot Fun Yachts Dubai",
     "Our Privacy Policy outlines our commitment to protecting your personal information and maintaining its confidentiality when using the Toot Fun Yachts website and services."),
    ("sitemap.tsx",
     "Sitemap | Toot Fun Yachts Dubai",
     "Browse the Toot Fun Yachts sitemap to easily access yacht rental, yacht parties, cruises, fishing trips, and yacht packages available in Dubai."),
    ("contact-us.tsx",
     "Contact Us | Toot Fun Yachts Dubai",
     "Contact us to book your yacht, check prices and packages, and choose the right trip with Toot Fun Yachts."),
    ("about-us.tsx",
     "About Us | Toot Fun Yachts Dubai",
     "About Us – Discover Toot Fun Yachts, our yacht rental experience, professional team, and luxury private cruise services in Dubai."),
    ("blog.tsx",
     "Blog | Yacht Rental Tips & Guide Dubai | Toot Fun Yachts",
     "Discover our blog and explore the latest tips and ideas on yacht rental, private cruises, yacht parties, and fishing trips in Dubai."),
    ("fishing-trip-dubai.tsx",
     "Best Fishing Trip Dubai | Toot Fun Yachts",
     "Book the best fishing trip Dubai with fully equipped boats, fishing gear, a professional crew, and private or shared options at competitive prices."),
    ("yacht-party-dubai.tsx",
     "Private Yacht Party Dubai | Toot Fun Yachts",
     "Book a Yacht Party Dubai experience for birthdays and special occasions with luxury yachts, stylish decorations, professional crew, and competitive packages."),
    ("yacht-rental-dubai.tsx",
     "Private Yacht Rental Dubai | From AED 450",
     "We offer yacht rental Dubai with private cruises, a wide selection of yachts, and prices starting from AED 450 per hour for all occasions."),
    ("yacht-booking-dubai.tsx",
     "Luxury Yacht Booking Dubai | Toot Fun Yachts",
     "Discover the best yacht booking options in Dubai, with prices starting from AED 450 per hour, luxury yachts, and private cruises for all occasions."),
    ("yacht-charter-dubai.tsx",
     "Private Yacht Charter Dubai | From AED 450",
     "Book a Private Yacht Charter Dubai with Toot Fun Yachts. Choose luxury yachts, private cruises, professional crew, and prices from AED 450 per hour."),
    ("rent-a-yacht-dubai.tsx",
     "Rent a Yacht Dubai | Toot Fun Yachts",
     "Rent a Yacht Dubai with Toot Fun Yachts from AED 450 per hour. Choose from luxury yachts, private cruises, professional crew, and flexible options."),
    ("yacht-packages-dubai.tsx",
     "Yacht Packages Dubai | Private Yacht Deals & Offers",
     "Discover yacht packages Dubai for private trips, birthdays, parties and special occasions, with flexible options and competitive prices."),
]

def esc(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')

for fname, meta_title, meta_desc in METAS:
    fp = ROUTES / fname
    src = fp.read_text(encoding='utf-8')
    orig = src

    # Replace title
    src = re.sub(r'(\{\s*title:\s*)"[^"]+"', lambda m: m.group(1) + f'"{esc(meta_title)}"', src, count=1)
    # Replace description (name="description")
    src = re.sub(
        r'(\{\s*name:\s*"description",\s*(?:\n\s*)?content:\s*\n?\s*)"[^"]+"',
        lambda m: m.group(1) + f'"{esc(meta_desc)}"',
        src, count=1
    )
    # Also handle multi-line format:  content:\n          "..."
    src = re.sub(
        r'(\{\s*name:\s*"description",\s*content:\s*)\n\s+"[^"]+"',
        lambda m: m.group(1) + f'"{esc(meta_desc)}"',
        src, count=1
    )
    # og:title
    src = re.sub(
        r'(\{\s*property:\s*"og:title",\s*content:\s*)"[^"]+"',
        lambda m: m.group(1) + f'"{esc(meta_title)}"',
        src, count=1
    )
    # og:description
    src = re.sub(
        r'(\{\s*property:\s*"og:description",\s*content:\s*)"[^"]+"',
        lambda m: m.group(1) + f'"{esc(meta_desc)}"',
        src, count=1
    )

    if src == orig:
        print(f"  NOCHANGE {fname}")
        continue
    fp.write_text(src, encoding='utf-8')
    print(f"  OK       {fname}")

print("\ndone")
