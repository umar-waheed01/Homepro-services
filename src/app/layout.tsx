import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://homeproservices.co.uk"),
  title: {
    default:
      "HomePro Services | Gardening, Electrical, Plumbing, EPC & Solar — East London",
    template: "%s | HomePro Services",
  },
  description:
    "HomePro Services offers expert gardening, electrical, plumbing, EPC surveys and solar installation across East London. Free quotes and ECO scheme support available.",
  openGraph: {
    title:
      "HomePro Services | Gardening, Electrical, Plumbing, EPC & Solar — East London",
    description:
      "Expert home services across East London — free quotes, certified tradespeople, ECO scheme support.",
    locale: "en_GB",
    type: "website",
    siteName: "HomePro Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "HomePro Services — East London",
    description:
      "Gardening, electrical, plumbing, EPC surveys & solar. Free quotes.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${dmSans.variable} h-full scroll-smooth`}>
      <body className="flex min-h-full flex-col bg-[#0D3D24] font-sans text-[#1A1A1A] antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
