import { siteConfig } from "@/lib/constants/site";

const schema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "HomePro Services",
  description:
    "Gardening, electrical, plumbing, EPC surveys and at-home car wash across East London. Free quotes and ECO scheme support.",
  url: "https://homeproservices.co.uk",
  telephone: siteConfig.phone,
  email: siteConfig.email,
  areaServed: {
    "@type": "Place",
    name: "East London",
    addressRegion: "London",
    addressCountry: "GB",
  },
  priceRange: "££",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "18:00",
  },
} as const;

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
