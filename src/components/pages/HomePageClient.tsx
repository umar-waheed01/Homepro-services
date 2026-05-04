"use client";

import { QuoteServiceProvider } from "@/context/QuoteServiceContext";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export function HomePageClient() {
  return (
    <QuoteServiceProvider>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <QuoteSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </QuoteServiceProvider>
  );
}
