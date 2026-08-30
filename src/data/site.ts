// Yacht images
import houseboat55 from "@/assets/yachts/houseboat-55.webp";
import floating100 from "@/assets/yachts/floating-100.webp";
import majesty48 from "@/assets/yachts/majesty-48.webp";
import italian95 from "@/assets/yachts/italian-95.webp";
import ferretti78 from "@/assets/yachts/ferretti-78.webp";
import mini40 from "@/assets/yachts/mini-40.webp";
import azimut80 from "@/assets/yachts/azimut-80.webp";
import sunseeker95 from "@/assets/yachts/sunseeker-95.webp";
import majesty70 from "@/assets/yachts/majesty-70.webp";
import majesty66 from "@/assets/yachts/majesty-66.webp";
import majesty55 from "@/assets/yachts/majesty-55.webp";
import azimut50 from "@/assets/yachts/azimut-50.webp";
import majesty88 from "@/assets/yachts/majesty-88.webp";
import corporate105 from "@/assets/yachts/corporate-105.webp";
import gulfcraft90 from "@/assets/yachts/gulfcraft-90.webp";

// Fishing
import fishingShared from "@/assets/fishing/shared.webp";
import fishingPrivateYacht from "@/assets/fishing/private-yacht.webp";
import fishingPrivateBoat from "@/assets/fishing/private-boat.webp";

// Parties
import partyProposal from "@/assets/parties/proposal.webp";
import partyWedding from "@/assets/parties/wedding.webp";
import partyAnniversary from "@/assets/parties/anniversary.webp";
import partyGraduation from "@/assets/parties/graduation.webp";
import partyEngagement from "@/assets/parties/engagement.webp";
import partyBirthday from "@/assets/parties/birthday.webp";

// Packages
import pkgBreakfast from "@/assets/packages/breakfast.webp";
import pkgJetski from "@/assets/packages/jetski.webp";
import pkgRomantic from "@/assets/packages/romantic-dinner.webp";

// Extras
import exCake from "@/assets/extras/cake.webp";
import exFlowers from "@/assets/extras/flowers.webp";
import exFruit from "@/assets/extras/fruit-platter.webp";
import exSweets from "@/assets/extras/arabic-sweets.webp";
import exDecorations from "@/assets/extras/decorations.webp";
import exPhotographer from "@/assets/extras/photographer.webp";
import exLuxuryTransfer from "@/assets/extras/luxury-transfer.webp";
import exJetSki from "@/assets/extras/jet-ski.webp";
import exBanana from "@/assets/extras/banana-boat.webp";
import exDonut from "@/assets/extras/donut.webp";
import exFoodBuffet from "@/assets/extras/food-buffet.webp";
import exMixedGrill from "@/assets/extras/mixed-grill.webp";

import { DEFAULT_CONFIG } from "./config";
import { imagesFor } from "./product-images";

export const CONTACT = {
  phone: DEFAULT_CONFIG.phone,
  phoneDisplay: DEFAULT_CONFIG.phoneDisplay,
  whatsapp: DEFAULT_CONFIG.whatsapp,
  email: DEFAULT_CONFIG.email,
  brand: DEFAULT_CONFIG.brand,
};

export const SITE_URL = DEFAULT_CONFIG.siteUrl;

export type Product = {
  title: string;
  desc: string;
  specs: string[];
  price: string;
  image: string;
  images?: string[];
  included?: string[];
  addOns?: { name: string; price: string }[];
};

export const yachts: Product[] = [
  {
    title: "Luxury 55 Ft Houseboat",
    desc: "Enjoy the 55ft luxury houseboat rental in Dubai with unique views and premium service.",
    specs: ["Minimum booking: 2 hours", "Fits up to 15 guests", "55 ft", "No bedrooms"],
    price: "AED 600 / Hour",
    image: houseboat55,
    images: imagesFor("houseboat-55", "yachts"),
  },
  {
    title: "Floating 100 Ft Yacht",
    desc: "Book the 100ft floating yacht for rent in Dubai and enjoy a spacious venue ideal for parties and private events on the water.",
    specs: ["Minimum booking: 2 hours", "Fits up to 50 guests", "100 ft", "2 bedrooms"],
    price: "AED 2,000 / Hour",
    image: floating100,
    images: imagesFor("floating-100", "yachts"),
  },
  {
    title: "Majesty 48 Ft Yacht",
    desc: "Choose the 48ft Majesty yacht hire in Dubai for a private trip combining comfort and luxury.",
    specs: ["Minimum booking: 2 hours", "Fits up to 12 guests", "48 ft", "2 bedrooms"],
    price: "AED 550 / Hour",
    image: majesty48,
    images: imagesFor("majesty-48", "yachts"),
  },
  {
    title: "Italian 95 Ft Yacht",
    desc: "Book a 95ft Italian yacht in Dubai — ideal for private parties and events.",
    specs: ["Minimum booking: 2 hours", "Fits up to 45 guests", "95 ft", "2 bedrooms"],
    price: "AED 1,700 / Hour",
    image: italian95,
    images: imagesFor("italian-95", "yachts"),
  },
  {
    title: "Ferretti 78 Ft Super Yacht",
    desc: "The 78ft Ferretti super-yacht hire in Dubai delivers a premium experience with generous space and refined Italian design.",
    specs: ["Minimum booking: 2 hours", "Fits up to 20 guests", "78 ft", "3 bedrooms"],
    price: "AED 5,000 / Hour",
    image: ferretti78,
    images: imagesFor("ferretti-78", "yachts"),
  },
  {
    title: "Luxury 40 Ft Mini Yacht",
    desc: "Book the 40ft mini yacht rental in Dubai for a private cruise combining comfort and privacy.",
    specs: ["Minimum booking: 1 hour", "Fits up to 10 guests", "40 ft", "1 bedroom"],
    price: "AED 450 / Hour",
    image: mini40,
    images: imagesFor("mini-40", "yachts"),
  },
  {
    title: "Azimut 80 Ft Yacht with Jacuzzi",
    desc: "The 80ft Azimut yacht rental in Dubai — a premium experience with a jacuzzi and wide spaces for extended cruises.",
    specs: ["Minimum booking: 2 hours", "Fits up to 35 guests", "80 ft", "3 bedrooms"],
    price: "AED 1,500 / Hour",
    image: azimut80,
    images: imagesFor("azimut-80", "yachts"),
  },
  {
    title: "Sunseeker 95 Ft Super Yacht",
    desc: "Pick the 95ft Sunseeker super-yacht in Dubai for a private cruise combining luxury, comfort, and stunning sea views.",
    specs: ["Minimum booking: 4 hours", "Fits up to 20 guests", "95 ft", "3 bedrooms"],
    price: "AED 4,500 / Hour",
    image: sunseeker95,
    images: imagesFor("sunseeker-95", "yachts"),
  },
  {
    title: "Majesty 70 Ft Yacht",
    desc: "The 70ft Majesty yacht rental in Dubai delivers spacious luxury and premium service for private cruises and parties.",
    specs: ["Minimum booking: 2 hours", "Fits up to 28 guests", "70 ft", "3 bedrooms"],
    price: "AED 850 / Hour",
    image: majesty70,
    images: imagesFor("majesty-70", "yachts"),
  },
  {
    title: "Majesty 66 Ft Yacht",
    desc: "Enjoy a refined cruise on the 66ft Majesty yacht charter at Dubai Marina.",
    specs: ["Minimum booking: 2 hours", "Fits up to 22 guests", "66 ft", "3 bedrooms"],
    price: "AED 800 / Hour",
    image: majesty66,
    images: imagesFor("majesty-66", "yachts"),
  },
  {
    title: "Majesty 55 Ft Yacht",
    desc: "Set sail on the 55ft Majesty yacht cruise in Dubai with comfortable spaces.",
    specs: ["Minimum booking: 2 hours", "Fits up to 18 guests", "55 ft", "2 bedrooms"],
    price: "AED 650 / Hour",
    image: majesty55,
    images: imagesFor("majesty-55", "yachts"),
  },
  {
    title: "Azimut 50 Ft Yacht",
    desc: "The 50ft Azimut yacht rental in Dubai gives you an elegant private cruise with comfortable spaces.",
    specs: ["Minimum booking: 2 hours", "Fits up to 15 guests", "50 ft", "2 bedrooms"],
    price: "AED 650 / Hour",
    image: azimut50,
    images: imagesFor("azimut-50", "yachts"),
  },
  {
    title: "Majesty 88 Ft Yacht",
    desc: "Book the 88ft luxury Majesty yacht in Dubai.",
    specs: ["Minimum booking: 2 hours", "Fits up to 45 guests", "88 ft", "4 bedrooms"],
    price: "AED 1,800 / Hour",
    image: majesty88,
    images: imagesFor("majesty-88", "yachts"),
  },
  {
    title: "Corporate 105 Ft Yacht",
    desc: "The 105ft corporate yacht rental in Dubai provides a luxury venue for meetings, events, and hosting VIP guests.",
    specs: ["Minimum booking: 2 hours", "Fits up to 90 guests", "105 ft", "2 bedrooms"],
    price: "AED 3,000 / Hour",
    image: corporate105,
    images: imagesFor("corporate-105", "yachts"),
  },
  {
    title: "Gulf Craft 90 Ft Yacht",
    desc: "Experience the 90ft Gulf Craft yacht hire at Dubai Marina with premium ambience and space ideal for private cruises.",
    specs: ["Minimum booking: 2 hours", "Fits up to 41 guests", "90 ft", "3 bedrooms"],
    price: "AED 1,300 / Hour",
    image: gulfcraft90,
    images: imagesFor("gulfcraft-90", "yachts"),
  },
];

export const fishingTrips: Product[] = [
  {
    title: "Shared Fishing Trip Dubai",
    desc: "The best shared morning fishing trip in Dubai.",
    specs: ["4-hour trip", "Fits up to 10 guests", "40 ft", "1 bedroom", "Minimum booking: 2 guests", "Shared breakfast", "Boarding: 7:00 AM"],
    price: "AED 350 / Person",
    image: fishingShared,
    images: imagesFor("shared", "fishing"),
  },
  {
    title: "Private Yacht Fishing Trip Dubai",
    desc: "Enjoy a private yacht fishing trip in Dubai with full tackle and a professional crew.",
    specs: ["4-hour trip", "Fits up to 10 guests", "48 ft", "2 bedrooms"],
    price: "AED 2,000 / 4 Hours",
    image: fishingPrivateYacht,
    images: imagesFor("private-yacht", "fishing"),
  },
  {
    title: "Private Boat Fishing Trip Dubai",
    desc: "Private boat fishing trip in Dubai with full tackle for deep-sea fishing.",
    specs: ["4-hour trip", "Fits up to 10 guests", "40 ft", "1 bedroom"],
    price: "AED 1,200 / 4 Hours",
    image: fishingPrivateBoat,
    images: imagesFor("private-boat", "fishing"),
  },
];

const partyIncludedBase = [
  "Experienced captain and crew",
  "Licensed yacht with full insurance",
  "Fuel included",
  "Soft drinks, mineral water, and ice",
  "Plates, cups, and cutlery",
  "Professional sound system",
];

const partyAddOns = [
  { name: "Mixed grill buffet (AED 100/Person)", price: "AED 100" },
  { name: "Seafood buffet (AED 150/Person)", price: "AED 150" },
  { name: "Professional photographer & videographer", price: "Ask us" },
  { name: "Professional DJ", price: "Ask us" },
];

export const parties: Product[] = [
  {
    title: "Marriage Proposal Yacht Dubai",
    desc: "Plan a romantic marriage proposal on a yacht in Dubai with a private setting, elegant decor, and unforgettable sea views.",
    specs: ["2-hour cruise", "Fits up to 12 guests", "48 ft", "2 bedrooms"],
    price: "AED 2,600 / 2 Hours",
    image: partyProposal,
    images: imagesFor("proposal", "parties"),
    included: [
      "Private 2-hour yacht cruise",
      "Custom proposal cake",
      "Romantic decor — rose petals, candles, \"Marry Me\" sign",
      "Mixed grill for two",
      "Premium bouquet of flowers",
      "Professional photographer & videographer",
      "Candles for a romantic evening",
      "Special lighting system for evening ambience",
      ...partyIncludedBase,
    ],
    addOns: partyAddOns,
  },
  {
    title: "Yacht Wedding Dubai",
    desc: "Celebrate a luxury wedding on a yacht in Dubai with elegant decor and a romantic ambience.",
    specs: ["Minimum booking: 3 hours", "Fits up to 45 guests", "95 ft", "2 bedrooms"],
    price: "AED 1,500 / 2 Hours",
    image: partyWedding,
    images: imagesFor("wedding", "parties"),
    included: [
      "Private 95ft yacht (up to 45 guests)",
      "Full wedding decor",
      "Tables and chairs for guests",
      "Custom wedding cake",
      "Floral bouquets and rose aisle",
      "Sound and lighting system for the ceremony",
      "Table service",
      ...partyIncludedBase,
    ],
    addOns: [
      ...partyAddOns,
      { name: "Floral wedding arch", price: "Ask us" },
      { name: "Officiant for the ceremony", price: "Ask us" },
    ],
  },
  {
    title: "Anniversary Yacht Party Dubai",
    desc: "Host an anniversary party on a yacht in Dubai and enjoy a private experience combining luxury and intimacy.",
    specs: ["2-hour cruise", "Fits up to 12 guests", "48 ft", "2 bedrooms"],
    price: "AED 2,100 / 2 Hours",
    image: partyAnniversary,
    images: imagesFor("anniversary", "parties"),
    included: [
      "Private 48ft yacht cruise for 2 hours",
      "Custom anniversary cake",
      "Romantic decor and balloons",
      "Rose petals",
      "Candles for a romantic ambience",
      "Special lighting system",
      ...partyIncludedBase,
    ],
    addOns: partyAddOns,
  },
  {
    title: "Graduation Yacht Party Dubai",
    desc: "Celebrate your graduation on a yacht in Dubai with friends and enjoy a unique sea experience.",
    specs: ["2-hour cruise", "Fits up to 12 guests", "48 ft", "2 bedrooms"],
    price: "AED 1,800 / 2 Hours",
    image: partyGraduation,
    images: imagesFor("graduation", "parties"),
    included: [
      "Private 48ft yacht cruise for 2 hours",
      "Custom graduation cake",
      "Decor in your university colors",
      "Balloons and party trimmings",
      "Lighting system for the party",
      ...partyIncludedBase,
    ],
    addOns: partyAddOns,
  },
  {
    title: "Engagement Yacht Party Dubai",
    desc: "Celebrate your engagement on a yacht in Dubai with family and friends on a special private cruise.",
    specs: ["2-hour cruise", "Fits up to 15 guests", "55 ft", "2 bedrooms"],
    price: "AED 1,900 / 2 Hours",
    image: partyEngagement,
    images: imagesFor("engagement", "parties"),
    included: [
      "Private 55ft yacht for 2 hours",
      "Custom engagement cake",
      "Elegant engagement decor",
      "Bouquet of flowers",
      "Rose petals and candles",
      "Special lighting system",
      ...partyIncludedBase,
    ],
    addOns: partyAddOns,
  },
  {
    title: "Yacht Birthday Party Dubai",
    desc: "Gather your guests for a birthday party on a yacht in Dubai with cake, music, and dedicated styling.",
    specs: ["2-hour cruise", "Fits up to 12 guests", "48 ft", "2 bedrooms"],
    price: "AED 1,500 / 2 Hours",
    image: partyBirthday,
    images: imagesFor("birthday", "parties"),
    included: [
      "Private 48ft yacht cruise for 2 hours",
      "Birthday cake and candles",
      "Decor and birthday balloons",
      "Rose petals",
      "Lighting system for the party",
      ...partyIncludedBase,
    ],
    addOns: partyAddOns,
  },
];

const packageIncludedBase = [
  "Experienced captain and crew",
  "Licensed yacht with full insurance",
  "Fuel included",
  "Soft drinks, mineral water, and ice",
  "Plates, cups, and cutlery",
];

export const packages: Product[] = [
  {
    title: "Yacht Breakfast Package Dubai",
    desc: "Start your morning with the breakfast on a yacht package in Dubai — a tasty meal and a calm sea cruise.",
    specs: ["4-hour trip", "Fits up to 12 guests", "48 ft", "2 bedrooms", "Breakfast on board", "1-hour jet ski"],
    price: "AED 3,000 / 4 Hours",
    image: pkgBreakfast,
    images: imagesFor("breakfast", "packages"),
    included: [
      "Private 48ft yacht cruise for 4 hours",
      "Premium Arabic breakfast on board",
      "Foul, hummus, cheese, eggs, labneh, honey, dates",
      "Arabic coffee, tea, fresh juices",
      "1-hour jet ski add-on",
      ...packageIncludedBase,
    ],
    addOns: [
      { name: "Upgrade to full international buffet", price: "Ask us" },
      { name: "Morning shoot photographer", price: "Ask us" },
    ],
  },
  {
    title: "Yacht Rental with Jet Ski Dubai",
    desc: "Combine a yacht cruise with a jet ski adventure in Dubai in one action-packed sea experience.",
    specs: ["4-hour trip", "Fits up to 12 guests", "48 ft", "2 bedrooms", "1-hour jet ski"],
    price: "AED 2,300 / 4 Hours",
    image: pkgJetski,
    images: imagesFor("jetski", "packages"),
    included: [
      "Private 48ft yacht cruise for 4 hours",
      "1-hour pro jet ski ride",
      "Certified jet ski instructor",
      "Life jackets for all riders",
      ...packageIncludedBase,
    ],
    addOns: [
      { name: "Banana boat ride", price: "Ask us" },
      { name: "Donut ride", price: "Ask us" },
      { name: "Mixed grill buffet (AED 100/Person)", price: "AED 100" },
    ],
  },
  {
    title: "Romantic Yacht Dinner Package Dubai",
    desc: "Turn your evening into a private date with the romantic dinner on a yacht package in Dubai and enchanting city views.",
    specs: ["2-hour cruise", "Fits up to 2 guests", "48 ft", "2 bedrooms", "Grill meal for 2", "Romantic cake", "Bottle of champagne"],
    price: "AED 1,800 / 2 Hours",
    image: pkgRomantic,
    images: imagesFor("romantic-dinner", "packages"),
    included: [
      "Private 48ft yacht cruise for two",
      "Grill meal for two",
      "Romantic cake",
      "Bottle of champagne",
      "5-course romantic dinner",
      "Seafood alternative to grill",
      "Decor, candles, rose petals",
      "Romantic lighting system",
      "Discreet table service",
      ...packageIncludedBase,
    ],
    addOns: [
      { name: "Discreet photographer for romantic moments", price: "Ask us" },
      { name: "Drone for aerial shots", price: "Ask us" },
      { name: "Extra premium floral bouquet", price: "Ask us" },
    ],
  },
];

export type Extra = { label: string; image: string };

export const extras: Extra[] = [
  { label: "Occasion cake", image: exCake },
  { label: "Decorations & balloons", image: exDecorations },
  { label: "Bouquet of flowers", image: exFlowers },
  { label: "Fruit platter", image: exFruit },
  { label: "Arabic sweets platter", image: exSweets },
  { label: "Food buffet", image: exFoodBuffet },
  { label: "Grill meal for 2", image: exMixedGrill },
  { label: "Professional photographer", image: exPhotographer },
  { label: "Luxury chauffeur transfer", image: exLuxuryTransfer },
  { label: "Jet ski", image: exJetSki },
  { label: "Banana boat", image: exBanana },
  { label: "Donut ride", image: exDonut },
];

export const faqs = [
  {
    q: "How much does yacht rental in Dubai start from?",
    a: "Our yacht rental rates start from AED 450 per hour. Prices vary by yacht size, guest count, and trip duration.",
  },
  {
    q: "What is the minimum booking duration?",
    a: "Most yachts have a 2-hour minimum; larger yachts require 3 to 4 hours.",
  },
  {
    q: "Can I add a cake or decorations for the occasion?",
    a: "Yes — we offer add-ons like cakes, decorations and balloons, flower bouquets, a photographer, and catering.",
  },
  {
    q: "Where do the cruises depart from?",
    a: "Most trips depart from Dubai Marina. The exact meeting point is sent after your booking is confirmed.",
  },
  {
    q: "How do I book?",
    a: "Pick a yacht or package, then message us on WhatsApp or call to confirm the date and pay a deposit.",
  },
  {
    q: "Is the crew multilingual?",
    a: "Yes — our crew speaks English, Arabic, and several other languages to serve guests from all nationalities.",
  },
  {
    q: "Are insurance and fuel included in the price?",
    a: "Yes — every price includes full insurance, fuel, captain, crew, and basic drinks and hospitality.",
  },
  {
    q: "Do I need to bring ID when boarding the yacht?",
    a: "Yes — guests must bring an original Emirates ID or passport when boarding.",
  },
  {
    q: "Can I bring pets on board?",
    a: "No — pets are not allowed on board for the safety and comfort of all guests.",
  },
  {
    q: "Can I swim during the cruise?",
    a: "Yes — swimming is allowed before 6 PM, subject to weather, the trip route, and the captain's instructions.",
  },
];

export type Testimonial = { name: string; city: string; rating: number; text: string; date: string; avatar: string };

export const testimonials: Testimonial[] = [
  {
    name: "Ahmed Al Shamsi",
    city: "Dubai",
    rating: 5,
    text: "An experience beyond description — we celebrated our anniversary on the 66ft Majesty. The crew was highly professional and the decor was stunning. We'll be back for sure.",
    date: "a week ago",
    avatar: "A",
  },
  {
    name: "Sarah Al Muhairi",
    city: "Abu Dhabi",
    rating: 5,
    text: "We hosted my daughter's birthday party on the yacht. Everything was perfect — the cake and the decor. The kids loved it and the photos came out beautifully.",
    date: "two weeks ago",
    avatar: "S",
  },
  {
    name: "Khalid Al Otaibi",
    city: "Riyadh",
    rating: 5,
    text: "I visited Dubai with the family and booked a private fishing trip. We caught plenty of fish and the crew taught the kids brilliantly. Highly recommended.",
    date: "a month ago",
    avatar: "K",
  },
  {
    name: "Mona Al Qahtani",
    city: "Dubai",
    rating: 5,
    text: "The best romantic dinner package I've tried in Dubai — delicious food, magical atmosphere, and full privacy. Thank you Toot Fun for an unforgettable night.",
    date: "a month ago",
    avatar: "M",
  },
  {
    name: "Rakesh Sharma",
    city: "Dubai",
    rating: 5,
    text: "We spent a wonderful morning with the breakfast package on the 48ft Majesty. The view of the Marina and Ain Dubai was stunning. Excellent organization.",
    date: "two months ago",
    avatar: "R",
  },
  {
    name: "Fatima Al Zaabi",
    city: "Sharjah",
    rating: 5,
    text: "We celebrated our daughter's proposal on the 80ft Azimut — the decor, photographer, and cake were exceptional. Alhamdulillah she said yes 😅",
    date: "two months ago",
    avatar: "F",
  },
  {
    name: "Michael Brown",
    city: "London",
    rating: 5,
    text: "Booked the 95ft Italian yacht for a corporate event. The team was outstanding and everything ran on time. Highly recommended for business events in Dubai.",
    date: "3 months ago",
    avatar: "M",
  },
  {
    name: "Noura Al Kaabi",
    city: "Al Ain",
    rating: 5,
    text: "Very refined service, fair prices, and fast replies on WhatsApp. We booked the 55ft yacht for a 2-hour cruise and had an excellent time.",
    date: "3 months ago",
    avatar: "N",
  },
];

// Per-URL SEO keyword clouds (each keyword becomes a clickable pill linking to its target slug)
export const keywordCloud: Record<string, string[]> = {
  "/yacht-rental-dubai/": [
    "Yacht Rental Dubai",
    "Yacht Hire In Dubai",
    "Yacht Rental In Dubai",
    "Dubai Yacht Rental",
    "Dubai Yacht Hire",
    "Yacht For Hire",
    "Yacht Hire Dubai",
    "Yacht Rentals In Dubai",
    "Dubai Yacht Rentals",
    "Yacht Trip In Dubai",
    "Dubai Yacht Trips",
    "Dubai Marina Yachts",
    "Dubai Yacht",
    "Yacht Rental Prices Dubai",
    "Boat Trip Dubai",
    "Dubai Yachts",
    "Luxury Yacht Rental Dubai Marina",
    "Yacht Rental Dubai Harbour",
    "Boat Rental Dubai",
    "Boat Tour Dubai",
    "Boat Trips Dubai",
    "Yacht Rentals Dubai",
  ],
  "/rent-a-yacht-dubai/": [
    "Rent Yacht In Dubai",
    "Yacht For Rent In Dubai",
    "Yachts For Rent In Dubai",
    "Rent Yacht Dubai",
    "Yacht For Rent",
    "Rent a Yacht Dubai",
  ],
  "/yacht-charter-dubai/": [
    "Dubai Yacht Charter",
    "Yacht For Charter",
    "Yacht Charter Dubai",
    "Yacht Charter In Dubai",
  ],
  "/yacht-booking-dubai/": [
    "Yacht For Booking",
    "Yacht Booking Dubai",
    "Book Yacht In Dubai",
  ],
  "/yacht-party-dubai/": [
    "Graduation Yacht Party Dubai",
    "Birthday Yacht Party Dubai",
    "Yacht Proposal Dubai",
    "Yacht Engagement Party Dubai",
  ],
  "/yacht-packages-dubai/": [
    "Romantic Yacht Cruise Dubai",
    "Romantic Yacht Dinner Dubai",
    "Yacht Breakfast Dubai",
    "Yacht Rental with Jet Ski Dubai",
  ],
  "/fishing-trip-dubai/": [
    "Fishing Trip Booking Dubai",
    "Fishing Boat Dubai",
    "Fishing Charter Dubai",
    "Deep Sea Fishing Dubai",
    "Fishing Dubai",
  ],
};

// External partner links — dofollow outbound, appended to keyword cloud for cross-site SEO.
export const externalKeywords: { keyword: string; href: string }[] = [
  { keyword: "Dubai Yacht Rental", href: "https://tootfunyachts.com/yacht-rental-dubai/" },
];

export const keywordCloudFlat: { keyword: string; to?: string; href?: string }[] = [
  ...Object.entries(keywordCloud).flatMap(([to, list]) => list.map((keyword) => ({ keyword, to }))),
  ...externalKeywords,
];

export const steps = [
  { t: "Pick the right yacht", d: "Browse the fleet and choose the yacht or package that fits your occasion." },
  { t: "Set the date and duration", d: "Choose the day, time, and number of hours for your trip." },
  { t: "Set the guest count", d: "Tell us the guest count so we can recommend the best size." },
  { t: "Choose add-ons", d: "Cake, decor, food, music, jet ski, and more." },
  { t: "Contact us to book", d: "Message us on WhatsApp or call to confirm details." },
  { t: "Pay the deposit", d: "A small deposit locks in your booking." },
  { t: "Receive the details", d: "We send your marina meeting point and boarding instructions." },
  { t: "Enjoy your trip", d: "Board the yacht and enjoy an unforgettable sea experience." },
];

export const stepsYacht = [
  { t: "Pick the right yacht", d: "Browse our varied yacht collection and choose the right size and style for your trip." },
  { t: "Set the date and duration", d: "Pick the trip date and time, and set the rental length (2 hours or more)." },
  { t: "Contact us to book", d: "Reach out via WhatsApp, phone, or the booking form and we'll confirm availability." },
  { t: "Pay the deposit", d: "Pay the deposit to confirm your booking. We'll send your trip and marina details." },
  { t: "Arrive at the marina", d: "Head to your assigned marina 15-20 minutes before departure for easy boarding." },
  { t: "Boarding and safety", d: "Show your original ID and listen to the crew's safety briefing before departure." },
  { t: "Enjoy your trip", d: "Enjoy the luxury sailing experience with the crew and Dubai's stunning views." },
  { t: "Unforgettable memories", d: "Capture great photos and make lasting memories on board your private yacht in Dubai." },
];

export const stepsParty = [
  { t: "Choose the party type", d: "Birthday, engagement, graduation, anniversary, proposal, or a private party." },
  { t: "Set the date and duration", d: "Choose the day, departure time, and party length." },
  { t: "Set the guest count", d: "Tell us the guest count to pick the right yacht for comfort and space." },
  { t: "Choose add-ons", d: "Decor, cake, food, music, photography, and more to customize your party." },
  { t: "Contact us to book", d: "Reach out via WhatsApp or phone to check availability." },
  { t: "Pay the deposit", d: "Pay the deposit to confirm your booking and lock in your party date." },
  { t: "Receive the details", d: "You'll get the booking details, marina location, and boarding time." },
  { t: "Enjoy your party", d: "Enjoy the atmosphere, music, and views, and celebrate with your guests on board." },
];

export const stepsFishing = [
  { t: "Choose the trip type", d: "Private or shared fishing trip depending on your group and budget." },
  { t: "Set the guest count", d: "Tell us the number of participants so we can suggest the right boat or yacht." },
  { t: "Set the date and duration", d: "Pick the right day and set the trip length, such as 4 hours or more." },
  { t: "Contact us to book", d: "Reach out on WhatsApp or phone to check availability and confirm details." },
  { t: "Pay the deposit", d: "Confirm the booking with a deposit and receive your trip confirmation." },
  { t: "Receive the details", d: "We'll send your departure point, boarding time, and trip instructions." },
  { t: "Arrive at the marina", d: "Arrive on time with a valid ID." },
  { t: "Enjoy the fishing", d: "Head out to fish and enjoy the sea ambience." },
];

export const stepsPackage = [
  { t: "Pick the right package", d: "Browse breakfast, dinner, birthday, or special packages." },
  { t: "Set the date and duration", d: "Pick your trip day and the package length that suits your plan." },
  { t: "Set the guest count", d: "Tell us the number of people so we can suggest the right yacht or package." },
  { t: "Choose add-ons", d: "Add decor, cake, food, music, or photography as you prefer." },
  { t: "Contact us to book", d: "Reach out on WhatsApp or phone to check availability." },
  { t: "Pay the deposit", d: "Confirm the booking with a deposit and receive your package confirmation." },
  { t: "Receive the details", d: "You'll get your marina, boarding time, and trip info." },
  { t: "Enjoy your package", d: "Enjoy a unique sea experience with premium service on board." },
];

export const destinations = [
  { t: "Dubai Marina cruise", d: "Sail inside the Marina channel alongside JBR and Ain Dubai with stunning sunset views." },
  { t: "Palm Jumeirah cruise", d: "Loop around the Palm with a close look at Atlantis and panoramic coastline views." },
  { t: "Sailing near Burj Al Arab", d: "Pass alongside the world's most iconic hotel — the best photo opportunity." },
  { t: "Sailing near Atlantis", d: "Enjoy Atlantis and stunning Palm Jumeirah views." },
];

export const occasions = [
  { t: "Birthdays on the water", d: "Music, cake, and full decor — we handle every detail for a special onboard celebration." },
  { t: "Engagements and anniversaries", d: "Rose petals, private hospitality, a pro photographer, and Dubai's best sunset as your backdrop." },
  { t: "Corporate events", d: "Meetings and promotional events with sound gear, hospitality packages, and customizable arrangements." },
  { t: "Family trips", d: "Kids' activities, a swim stop, and snorkeling gear included in a safe and fun family cruise." },
];

export const inclusions = [
  "Soft drinks",
  "Mineral water",
  "Ice",
  "Plates, cups, and cutlery",
  "Comfortable cabins on board",
  "Experienced captain and crew",
  "Licensed yacht",
  "Full insurance",
  "Fuel included",
];
