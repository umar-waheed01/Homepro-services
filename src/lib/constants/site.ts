export const siteConfig = {
  name: "HomePro Services",
  area: "East London, UK",
  phone: "020 0000 0000",
  email: "hello@homeproservices.co.uk",
  openingHours: "Mon–Sat: 8am–6pm · Sun: Closed",
  addressLine: "Serving East London & surrounding areas",
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
  "MCS Certified Solar Installer",
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
    text: "Solar install from quote to commissioning was smooth. MCS paperwork handled for us.",
    rating: 5,
  },
  {
    name: "Elena V.",
    area: "Leyton",
    text: "EPC done same week — helpful on ECO options too. Great experience end to end.",
    rating: 5,
  },
] as const;
