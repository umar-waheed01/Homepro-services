export const businessAddress = {
  line1: "St James House",
  line2: "27-43 Eastern Road",
  locality: "Romford",
  region: "England",
  postcode: "RM1 3NH",
  full: "St James House, 27-43 Eastern Road, Romford, England, RM1 3NH",
} as const;

export const businessCoordinates = {
  lat: 51.576142,
  lng: 0.185232,
} as const;

const mapsQuery = encodeURIComponent(businessAddress.full);

export const mapsLinks = {
  search: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  embed: `https://www.google.com/maps?q=${businessCoordinates.lat},${businessCoordinates.lng}&hl=en&z=16&output=embed`,
} as const;

export const siteConfig = {
  name: "HomePro Services",
  area: "Romford, Essex",
  phone: "020 0000 0000",
  email: "hello@homeproservices.co.uk",
  openingHours: "Mon–Sat: 8am–6pm · Sun: Closed",
  address: businessAddress,
  addressLine: businessAddress.full,
  coordinates: businessCoordinates,
  maps: mapsLinks,
} as const;

export const heroTrustStats = [
  { label: "150+ Customers Served", value: "150+" },
  { label: "5 Services Under One Roof", value: "5" },
  { label: "100% Free Quotes", value: "100%" },
  { label: "ECO Government Scheme Available", value: "ECO" },
] as const;

export const howItWorksSteps = [
  {
    title: "Send Us a Photo",
    description:
      "Fill in our quick form, tell us what you need, and upload a photo of the work.",
  },
  {
    title: "We Review Your Job",
    description:
      "Our team reviews your request and photo to understand exactly what’s needed.",
  },
  {
    title: "We Call You Free",
    description:
      "We call you within 24 hours with a free, no-obligation quote.",
  },
] as const;

export const aboutTrustBadges = [
  "Fully Certified & Insured",
  "Government ECO Scheme Approved",
  "At-Home Car Wash & Valeting",
  "Free No-Obligation Quotes",
  "150+ Happy Customers",
  "East London Based",
] as const;

export const testimonials = [
  {
    name: "Sarah M.",
    area: "Stratford",
    text: "Brilliant garden clearance — tidy, fast, and fairly priced. Would use HomePro again without hesitation.",
    rating: 5,
  },
  {
    name: "James T.",
    area: "Hackney",
    text: "Consumer unit upgrade and EV charger fitted in two days. Professional electricians, clear communication.",
    rating: 5,
  },
  {
    name: "Aisha K.",
    area: "Tower Hamlets",
    text: "Boiler service and a tricky leak sorted in one visit. Honest advice and no upselling.",
    rating: 5,
  },
  {
    name: "David R.",
    area: "Walthamstow",
    text: "Booked a driveway car wash — spotless finish, friendly team, and great value.",
    rating: 5,
  },
  {
    name: "Elena V.",
    area: "Leyton",
    text: "EPC done same week — helpful on ECO options too. Great experience end to end.",
    rating: 5,
  },
] as const;
