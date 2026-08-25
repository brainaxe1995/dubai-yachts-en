import yachtHero from "@/assets/yachts/majesty-88.webp";
import fleetImg from "@/assets/yachts/sunseeker-95.webp";
import houseboatImg from "@/assets/yachts/houseboat-55.webp";
import azimutImg from "@/assets/yachts/azimut-80.webp";
import partyBirthday from "@/assets/parties/birthday.webp";
import partyWedding from "@/assets/parties/wedding.webp";
import partyProposal from "@/assets/parties/proposal.webp";
import fishingShared from "@/assets/fishing/shared.webp";
import fishingPrivate from "@/assets/fishing/private-yacht.webp";
import breakfastImg from "@/assets/packages/breakfast.webp";
import romanticImg from "@/assets/packages/romantic-dinner.webp";
import cakeImg from "@/assets/extras/cake.webp";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  image: string;
  keywords: string;
  intro: string;
  sections: { h: string; p: string[] }[];
  cta?: string;
};

export const posts: BlogPost[] = [
  {
    slug: "complete-guide-choosing-right-yacht-dubai",
    title: "Complete Guide to Choosing the Right Yacht in Dubai",
    description:
      "How to pick the right yacht size and hours based on your guest count and occasion type. A practical, complete guide with expert tips from Dubai yacht rental pros.",
    tag: "Guide",
    date: "15 August 2026",
    image: yachtHero,
    keywords: "choosing a yacht in Dubai, right yacht size, yacht rental guide, family yacht, party yacht",
    intro:
      "Choosing the right yacht is the first and most important decision when planning a sea trip in Dubai. The right choice means a fun, safe experience for every guest — the wrong one means overcrowding or unnecessary extra costs. In this guide we cover everything you need to make the best call.",
    sections: [
      {
        h: "1. Start with your guest count",
        p: [
          "Golden rule: a comfortable yacht uses about 70% of its maximum capacity. A 12-guest yacht is ideal for 8-9 people.",
          "Groups of 2-10: mini yacht 40ft or Majesty 48ft.",
          "Groups of 15-25: Majesty 66ft or Azimut 80ft.",
          "Groups of 30-50: 95ft Italian yacht or Majesty 88ft.",
          "Groups of 50+ for events: the 105ft corporate yacht seats up to 90 guests.",
        ],
      },
      {
        h: "2. Pin down the occasion",
        p: [
          "Family trips: bedrooms for downtime — yachts with at least two cabins.",
          "Birthday parties: open space for dancing — yachts with a wide upper deck.",
          "Weddings: room for decor and tables — yachts 90ft and above.",
          "Marriage proposals: privacy first — a mini yacht or 48ft yacht is plenty.",
          "Corporate events: a meeting area — the 100ft corporate yacht.",
        ],
      },
      {
        h: "3. Compare prices against time and value",
        p: [
          "Prices range from AED 450/hour (mini yacht) up to AED 5,000/hour (super yacht).",
          "The minimum booking is usually two hours — 3-4 hours gives you a better trip.",
          "Full-day trips offer the best value per hour.",
          "Prices include crew, fuel, insurance, and basic drinks.",
        ],
      },
      {
        h: "4. Ask what add-ons are included",
        p: [
          "Most yachts include drinks and basic hospitality.",
          "Cake, decor, and photographer are optional add-ons at special rates.",
          "Premium food (BBQ, buffet) needs to be ordered 24 hours in advance.",
          "Water sports (jet ski, banana boat) are charged separately by the hour.",
        ],
      },
      {
        h: "In short",
        p: [
          "Choosing the right yacht comes down to a simple formula: guests + occasion + budget + duration. Message us for a free consultation and a recommendation on the best yacht for your trip.",
        ],
      },
    ],
  },
  {
    slug: "yacht-birthday-party-ideas-dubai",
    title: "10 Unique Ideas for an Unforgettable Yacht Birthday Party in Dubai",
    description:
      "Creative ideas for hosting a luxury birthday party on a yacht in Dubai — decor, cake, music, games, and activities for every age.",
    tag: "Parties",
    date: "12 August 2026",
    image: partyBirthday,
    keywords: "yacht birthday party Dubai, yacht party planning, yacht decor, birthday cake, party on the sea",
    intro:
      "Traditional birthday parties can feel forgettable. But a birthday party on a luxury yacht in Dubai Marina? That's the kind of experience guests talk about for years. Here are 10 standout ideas to make your party the talk of the town.",
    sections: [
      {
        h: "1. Commit to a nautical theme",
        p: [
          "Pick a signature colour (gold, royal blue, turquoise) and carry it through balloons, tables, and decor.",
          "Suggested themes: Seven Seas, Pirates (for kids), Great Gatsby, Tropical Paradise.",
        ],
      },
      {
        h: "2. Time it for sunset for standout photos",
        p: [
          "Best party window: 4-8pm, so you catch the sunset.",
          "Save 30 minutes before sunset for photos with the Dubai skyline.",
        ],
      },
      {
        h: "3. Order a custom cake",
        p: [
          "We work with Dubai's top cake shops.",
          "Popular shapes: 3D yacht, Ain Dubai, mini Burj Khalifa.",
          "Flavours: Belgian chocolate, fresh strawberry, Madagascar vanilla.",
        ],
      },
      {
        h: "4. Book a professional DJ or live music",
        p: [
          "Every yacht in our fleet has a pro sound system.",
          "DJ option: Arabic or English DJ, whatever you prefer.",
          "Live oud or violin: perfect for romantic vibes.",
        ],
      },
      {
        h: "5. Interactive games and activities",
        p: [
          "Jet ski with an instructor — a thrill for the adults.",
          "Banana boat — group fun.",
          "Snorkelling — explore under the surface.",
          "Deck games: ping pong, cultural trivia.",
        ],
      },
      {
        h: "6. A full food menu",
        p: [
          "Middle Eastern buffet: mezze, grills, rice, salads.",
          "Vegetarian and halal options.",
          "Drinks: fresh juices, mocktails, Arabic tea.",
        ],
      },
      {
        h: "7. Photographer and videographer",
        p: [
          "A pro photographer catches the moments without intruding.",
          "4K video plus drone for aerial shots.",
          "Digital album ready inside 48 hours.",
        ],
      },
      {
        h: "8. Guest surprises",
        p: [
          "Custom favours (candle, keychain, luxury soap).",
          "Personalised thank-you cards.",
          "Small perfume bottles as keepsakes.",
        ],
      },
      {
        h: "9. Lights and lasers after dark",
        p: [
          "Coloured LED lighting turns the deck into a dance floor.",
          "A custom laser show timed to the birthday song.",
        ],
      },
      {
        h: "10. Close with a fireworks moment",
        p: [
          "Small fireworks on deck for a cinematic ending.",
          "They need a special permit — we handle it for you.",
        ],
      },
    ],
    cta: "Book your yacht birthday party",
  },
  {
    slug: "best-fishing-seasons-dubai",
    title: "Best Fishing Seasons in Dubai — Types & Times Guide",
    description:
      "Practical notes on the weather, best fishing seasons in Dubai, fish species, and gear you need before heading out on a fishing trip.",
    tag: "Fishing",
    date: "8 August 2026",
    image: fishingShared,
    keywords: "Dubai fishing trips, UAE fishing seasons, hamour sheri kingfish, Dubai deep-sea fishing, best time to fish",
    intro:
      "Fishing in Dubai's waters is unbeatable — but timing is the key. Every species has its season, and every season has its playbook. In this guide the Toot Fun team walks you through the best times to fish and which species you can expect in each one.",
    sections: [
      {
        h: "Winter (November - February) — peak season",
        p: [
          "The best season, hands down. Mild weather (18-25°C), calm water, and abundant fish.",
          "Species: hamour, sheri, farsh, tarabidi.",
          "Best hours: dawn (6-9am) and late afternoon (3-6pm).",
          "Book early — winter trips fill up a month ahead.",
        ],
      },
      {
        h: "Spring (March - May) — kingfish season",
        p: [
          "Comfortable heat (25-32°C) and calm sea.",
          "Species: kingfish, barracuda, sheri.",
          "Kingfish are strong and fast — a great sport trip.",
          "Best time: early morning before the heat picks up.",
        ],
      },
      {
        h: "Summer (June - September) — specialised dawn trips",
        p: [
          "High temperatures (35-45°C) — we recommend pre-sunrise trips.",
          "Species: tuna, mackerel, sardine.",
          "Deep-sea tuna trips need bigger boats and longer runs.",
          "Bring strong sunscreen and a wide-brim hat.",
        ],
      },
      {
        h: "Autumn (October - November) — start of peak season",
        p: [
          "Temperatures drop gradually — ideal weather.",
          "Species: hamour, sheri, kingfish, tuna.",
          "Big variety — great for beginners and pros alike.",
          "Prices start climbing as peak season nears.",
        ],
      },
      {
        h: "What to bring",
        p: [
          "Gear: we provide everything (rods, line, bait).",
          "Clothing: comfortable, hat, sunglasses, non-slip shoes.",
          "Seasickness tablets for anyone who's sensitive to the swell.",
          "A camera for your first catch.",
        ],
      },
    ],
  },
  {
    slug: "romantic-marriage-proposal-yacht-dubai",
    title: "How to Plan a Romantic Marriage Proposal on a Yacht in Dubai — Step by Step",
    description:
      "A detailed guide to proposing on a yacht in Dubai: choosing the yacht, decor, ring, and the moment of 'yes'. Expert tips for an unforgettable moment.",
    tag: "Occasions",
    date: "3 August 2026",
    image: partyProposal,
    keywords: "yacht proposal, Dubai engagement, romantic yacht, proposal planning",
    intro:
      "A proposal is a single moment that becomes a lifelong story. Choosing a yacht in Dubai Marina, with sunset as your backdrop, turns that moment into cinema. Here's a full step-by-step guide to planning the perfect proposal.",
    sections: [
      {
        h: "1. Choose the right yacht",
        p: [
          "Mini yacht 40ft: complete privacy (2-4 people).",
          "Majesty 48ft: more space plus a surprise for 12 guests.",
          "Majesty 55ft: for the bigger celebration after the 'yes' — 15-18 guests.",
        ],
      },
      {
        h: "2. Nail the timing",
        p: [
          "Half an hour before sunset — the magic-hour light.",
          "Best months: October - March (mild weather).",
          "Skip peak summer unless it's after sunset.",
        ],
      },
      {
        h: "3. Decor and details",
        p: [
          "Rose petals across the deck.",
          "Safe, battery-operated candles.",
          "A 'Will You Marry Me?' light-up sign.",
          "A champagne bottle with two engraved flutes.",
          "The ring, hidden strategically.",
        ],
      },
      {
        h: "4. Music",
        p: [
          "Her favourite song, cued for the moment.",
          "Live oud option — an authentic Arabic feel.",
          "A romantic global playlist.",
        ],
      },
      {
        h: "5. The hidden photographer",
        p: [
          "A photographer catches the moment before she notices.",
          "Drone for aerial shots.",
          "Full 4K video to keep forever.",
        ],
      },
      {
        h: "6. Family and friends surprise",
        p: [
          "A second yacht arrives with family after the 'yes'.",
          "Drone carrying a congratulations banner.",
          "Small fireworks for a stunning finish.",
        ],
      },
      {
        h: "7. Romantic dinner to follow",
        p: [
          "A luxury buffet or five-course dinner.",
          "Her favourite dishes.",
          "A custom engagement cake.",
        ],
      },
      {
        h: "Final tips",
        p: [
          "Book at least three weeks in advance.",
          "Check the weather two days out.",
          "Keep the ring safe — use a small pouch.",
          "Leave the planning to us — this is what we do.",
        ],
      },
    ],
    cta: "Plan your proposal with our experts",
  },
  {
    slug: "breakfast-on-yacht-dubai",
    title: "Breakfast on a Yacht in Dubai — How to Build a Perfect Morning",
    description:
      "Why the yacht breakfast package beats a standard hotel breakfast, what's included, and who it suits. A luxury breakfast on a yacht in Dubai Marina.",
    tag: "Packages",
    date: "28 July 2026",
    image: breakfastImg,
    keywords: "yacht breakfast package Dubai, sea breakfast, luxury breakfast Dubai, morning yacht",
    intro:
      "Hotel breakfast has become predictable. Breakfast on your own yacht while the sun rises over Dubai Marina? That's a different experience entirely. Here's what makes the yacht breakfast package special, who it suits, and how to book.",
    sections: [
      {
        h: "Why breakfast on a yacht",
        p: [
          "Total calm before the city gets loud.",
          "360° views of Dubai's landmarks.",
          "Full privacy — no crowds, no waiting.",
          "Perfect weather in the early morning, even in summer.",
        ],
      },
      {
        h: "What's in the package",
        p: [
          "A 4-hour trip (7am - 11am).",
          "Middle Eastern breakfast: foul, hummus, cheese, eggs, labneh, honey.",
          "Arabic coffee, green tea, fresh juices.",
          "Dates and local jam.",
          "Seats up to 12 guests on the 48ft yacht.",
          "Price: AED 3,000 / 4 hours.",
        ],
      },
      {
        h: "Who it suits",
        p: [
          "Couples on their honeymoon.",
          "Families over the weekend.",
          "Informal business meetings.",
          "Celebrating a special occasion (engagement, retirement, anniversary).",
          "Travellers looking for a standout experience.",
        ],
      },
      {
        h: "Tips for the best experience",
        p: [
          "Book at least two days ahead.",
          "Arrive at the marina by 6:45am.",
          "Bring a camera for sunrise shots.",
          "Wear light, comfortable clothes — mornings are cool.",
          "Let us know in advance about any food allergies.",
        ],
      },
    ],
    cta: "Book the yacht breakfast package",
  },
  {
    slug: "sport-yacht-vs-super-yacht-dubai",
    title: "Sport Yacht vs Super Yacht in Dubai — A Simple Guide",
    description:
      "A simple breakdown of yacht types in Dubai — size, speed, prices, and use cases. Know the difference before you book.",
    tag: "Fleet",
    date: "22 July 2026",
    image: fleetImg,
    keywords: "yacht types, sport yacht, super yacht, luxury yacht, yacht size",
    intro:
      "'Yacht' is a word that covers a lot of different boats — from small speed boats to 100-foot floating palaces. This guide simplifies the differences so you can pick what fits.",
    sections: [
      {
        h: "1. Sport yacht",
        p: [
          "Size: 30-60ft.",
          "Speed: fast (35+ knots).",
          "Traits: light, quick, modern styling.",
          "Best for: short trips, quick tours, fishing.",
          "Our examples: mini yacht 40ft, Majesty 48.",
          "Price: AED 450-650/hour.",
        ],
      },
      {
        h: "2. Luxury yacht",
        p: [
          "Size: 60-100ft.",
          "Speed: mid-range (20-30 knots).",
          "Traits: spacious, cabins, jacuzzi.",
          "Best for: parties, longer trips, big families.",
          "Our examples: Azimut 80, Majesty 88.",
          "Price: AED 1,500-2,000/hour.",
        ],
      },
      {
        h: "3. Super yacht",
        p: [
          "Size: 100ft+.",
          "Speed: slower (15-25 knots).",
          "Traits: a full floating palace, cinema, games lounge.",
          "Best for: major events, corporate, premium parties.",
          "Our examples: 105ft corporate yacht, Sunseeker 95 super yacht.",
          "Price: AED 3,000-5,000/hour.",
        ],
      },
      {
        h: "Which one fits you",
        p: [
          "Small group (2-6) → sport yacht.",
          "Family or small party (10-20) → luxury yacht.",
          "Big party or corporate event (30+) → super yacht.",
        ],
      },
    ],
  },
  {
    slug: "best-yacht-party-add-ons-dubai",
    title: "Best Add-ons for a Standout Yacht Party in Dubai — Full Guide",
    description:
      "From cake and decor to photographer and DJ — the complete guide to add-ons that make the difference at Dubai yacht parties.",
    tag: "Add-ons",
    date: "18 July 2026",
    image: cakeImg,
    keywords: "yacht party add-ons, yacht cake, party decor, yacht DJ, yacht photographer",
    intro:
      "A luxury yacht without add-ons is like a great dish without seasoning. The add-ons are what turn a good trip into a great one. Here's the shortlist of what's worth adding and how to pick.",
    sections: [
      {
        h: "Custom cake",
        p: [
          "Custom shapes (yacht, Burj Khalifa, logo).",
          "Premium flavours (Belgian chocolate, strawberry, vanilla).",
          "Multiple tiers (2-5).",
          "Tip: book at least three days in advance.",
        ],
      },
      {
        h: "Decor and balloons",
        p: [
          "Balloons in your colours.",
          "Balloon arches at the entrance.",
          "Banners with the birthday name.",
          "Coloured LED lighting.",
          "Rose petals for a romantic mood.",
        ],
      },
      {
        h: "Fruit platter and Arabic sweets",
        p: [
          "Fresh tropical fruit (mango, pineapple, strawberry).",
          "Arabic sweet platters (baklava, kunafa, maamoul).",
          "Premium Swiss chocolate.",
        ],
      },
      {
        h: "Photographer and videographer",
        p: [
          "Pro photographer to capture the moments.",
          "4K video with drone for aerial angles.",
          "Digital album ready inside 48 hours.",
          "Instant photo printing as guest keepsakes.",
        ],
      },
      {
        h: "Catering",
        p: [
          "Middle Eastern buffet (mezze, grills, rice).",
          "Western buffet (pasta, steak, salads).",
          "Live BBQ on deck.",
          "Vegetarian and halal always available.",
        ],
      },
      {
        h: "Water sports",
        p: [
          "Jet ski: from AED 300 / half hour.",
          "Banana boat: group fun.",
          "Donut ride: a hit with kids.",
          "Snorkelling: explore under the surface.",
        ],
      },
    ],
  },
  {
    slug: "required-documents-yacht-boarding-dubai",
    title: "What Documents Are Required to Board a Yacht in Dubai? A Quick Guide",
    description:
      "A quick checklist of IDs, age, and permits you need before your yacht trip in Dubai. Know the rules before you book.",
    tag: "Guide",
    date: "10 July 2026",
    image: houseboatImg,
    keywords: "Dubai yacht documents, ID passport yacht, yacht boarding rules, fishing permits",
    intro:
      "Trip prep starts with the paperwork. Avoid marina-day surprises by knowing what you need up front. Here's a quick checklist covering everything you should bring.",
    sections: [
      {
        h: "1. Personal ID",
        p: [
          "Residents: original valid Emirates ID.",
          "Tourists: original valid passport.",
          "Kids: ID or passport — not required for infants.",
          "Heads-up: phone photos aren't accepted — bring originals.",
        ],
      },
      {
        h: "2. Age requirements",
        p: [
          "No minimum age — infants are welcome with a proper life vest.",
          "Under-5s: parental supervision throughout the trip.",
          "Youth groups (under 18): a responsible adult must be present.",
        ],
      },
      {
        h: "3. Special permits",
        p: [
          "Fishing: no personal licence needed — the boat's licence covers it.",
          "Diving: PADI certification or equivalent required.",
          "Water sports (jet ski): written consent plus age 18+.",
        ],
      },
      {
        h: "4. Booking documents",
        p: [
          "Deposit receipt (we send via WhatsApp).",
          "Confirmation message with marina location and boarding time.",
          "Balance payment receipt (optional).",
        ],
      },
      {
        h: "5. Extra tips",
        p: [
          "Arrive at the marina 15-20 minutes before your slot.",
          "No legally prohibited items on board.",
          "Check the weather with us on WhatsApp before the trip.",
          "Let us know in advance about any special health conditions.",
        ],
      },
    ],
  },
  {
    slug: "book-azimut-80ft-jacuzzi-yacht-dubai",
    title: "Booking an 80ft Azimut Yacht with Jacuzzi in Dubai — Beyond Ordinary",
    description:
      "A detailed look at the Azimut 80ft yacht in Dubai — the design, features, jacuzzi, and best uses.",
    tag: "Fleet",
    date: "5 July 2026",
    image: azimutImg,
    keywords: "Azimut 80ft yacht, yacht with jacuzzi Dubai, Azimut rental, Italian super yacht",
    intro:
      "One of the most iconic Italian names in marine luxury, the Azimut 80ft packs everything you expect from Italian design — elegance, power, and refinement. Plus one bonus feature: a deck jacuzzi for a unique way to unwind on Dubai's water.",
    sections: [
      {
        h: "Technical specs",
        p: [
          "Length: 80ft (24.4m).",
          "Capacity: up to 35 guests.",
          "Cabins: 3 main cabins.",
          "Engine: twin — top speed 28 knots.",
          "Crew: 3 (captain, sailor, host).",
        ],
      },
      {
        h: "Standout features",
        p: [
          "Deck jacuzzi for 6.",
          "Open bar with a dance area.",
          "Interior lounge with a large screen.",
          "Fully equipped galley.",
          "High-end Bose sound system.",
          "Controllable LED lighting.",
        ],
      },
      {
        h: "Best uses",
        p: [
          "Half-day parties for larger groups (30-35 guests).",
          "Weekend trips with overnight stay.",
          "Premium proposals.",
          "Small corporate events (executive retreats).",
          "Anniversary celebrations.",
        ],
      },
      {
        h: "Price and booking",
        p: [
          "Price: AED 1,500/hour (includes crew and fuel).",
          "Minimum booking: two hours.",
          "Best duration: 4-6 hours to make the most of the features.",
          "Book 3-5 days ahead to lock in availability.",
        ],
      },
      {
        h: "Who this yacht suits",
        p: [
          "Mid-to-large groups (20-35).",
          "Anyone looking for luxury at a fair price.",
          "Italian design fans.",
          "Anyone who wants to try a jacuzzi at sea.",
        ],
      },
    ],
    cta: "Book the Azimut 80ft yacht",
  },
  {
    slug: "romantic-dinner-on-yacht-dubai",
    title: "Romantic Dinner on a Yacht in Dubai — The Perfect Night for Couples",
    description:
      "A full guide to planning a romantic dinner on a yacht in Dubai — decor, menu, music, and the best yachts for couples.",
    tag: "Packages",
    date: "1 July 2026",
    image: romanticImg,
    keywords: "romantic dinner yacht Dubai, anniversary yacht, couples Dubai, luxury sea dinner",
    intro:
      "The week is packed with pressure and commitments. Sometimes all a relationship needs is one different night, out of the routine, away from the city. The romantic dinner package on a yacht in Dubai is built for exactly that moment.",
    sections: [
      {
        h: "What makes the package special",
        p: [
          "A private yacht — just the two of you, no sharing.",
          "A discreet crew — attentive but never intrusive.",
          "Views of the lit-up Dubai skyline.",
          "A two-hour window — enough for dinner and to enjoy the night.",
          "Price: AED 1,800 for two.",
        ],
      },
      {
        h: "Romantic decor",
        p: [
          "A table dressed with red roses.",
          "Safe, battery-operated candles.",
          "Rose petals scattered across the deck.",
          "Optional light-up sign with your names.",
          "Warm, dimmed lighting.",
        ],
      },
      {
        h: "The menu (5 courses)",
        p: [
          "Starters: bruschetta, caviar, premium cheese.",
          "Soup: cream of mushroom or French bouillabaisse.",
          "Salad: Caesar with grilled chicken.",
          "Main: your pick of steak, fish, or chicken.",
          "Dessert: cheesecake, soufflé, or chocolate-dipped strawberries.",
          "Drinks: fresh juices, tea, or coffee (no alcohol).",
        ],
      },
      {
        h: "Music",
        p: [
          "Romantic Arabic and international playlists.",
          "Live oud option (extra charge).",
          "Your song, cued for dessert.",
        ],
      },
      {
        h: "Suggested add-ons",
        p: [
          "Hidden photographer (AED 500).",
          "Custom anniversary cake (AED 300).",
          "Premium rose bouquet (AED 200).",
          "Drone for aerial photos (AED 400).",
        ],
      },
      {
        h: "Who it suits",
        p: [
          "Couples on an anniversary.",
          "Honeymoon in Dubai.",
          "As the setup for a proposal.",
          "Celebrating a promotion or win.",
          "Or simply a different night out with the person you love.",
        ],
      },
    ],
    cta: "Book your romantic dinner",
  },
];

export function findPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
