import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How HomePro Services collects, uses, and protects your personal data when you use our website and quote form.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1 bg-[#FAFAF8] pb-20 pt-28">
        <article className="mx-auto max-w-3xl px-4 text-[#1A1A1A] sm:px-6">
          <h1 className="font-serif text-4xl font-bold text-[#0D3D24]">Privacy Policy</h1>
          <p className="mt-2 text-sm text-[#666666]">Last updated: May 2026</p>

          <section className="mt-10 space-y-4 text-[#1A1A1A]/90">
            <h2 className="font-serif text-2xl font-semibold text-[#1D6A47]">Who we are</h2>
            <p>
              HomePro Services (“we”, “us”) is a home services business based in East London, UK.
              This policy explains how we handle personal data when you use our website and submit
              a quote request.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#1D6A47]">Data we collect</h2>
            <p>When you complete our “Get a Free Quote” form, we may collect:</p>
            <ul className="list-inside list-disc space-y-2 text-[#666666]">
              <li>Full name</li>
              <li>Phone number and email address</li>
              <li>Service type, description of work, and optional preferred contact time</li>
              <li>How you heard about us (if you choose to tell us)</li>
              <li>Optional file uploads (photos or documents relating to your job)</li>
              <li>Technical data such as IP address and browser type (via standard server logs)</li>
            </ul>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#1D6A47]">
              Purpose of processing
            </h2>
            <p className="text-[#666666]">
              We use this information to respond to your enquiry, prepare quotes, schedule visits,
              and improve our services. We do not sell your personal data.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#1D6A47]">Email communication</h2>
            <p className="text-[#666666]">
              We may email you about your quote, booking, or related services. You may opt out of
              marketing emails at any time (we will still retain core correspondence needed to
              fulfil contractual obligations where applicable).
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#1D6A47]">File uploads</h2>
            <p className="text-[#666666]">
              Files you upload are used only to assess your job. They are stored securely and
              retained only as long as needed for quoting and service delivery, unless a longer
              period is required by law or legitimate business interests (e.g. warranty disputes).
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#1D6A47]">Cookies & analytics</h2>
            <p className="text-[#666666]">
              We may use essential cookies required for the site to function, and optional analytics
              cookies to understand traffic patterns. Where required, we will obtain consent before
              setting non-essential cookies.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#1D6A47]">Your rights (UK GDPR)</h2>
            <p className="text-[#666666]">
              You may request access, correction, or deletion of your personal data, restrict or
              object to certain processing, and lodge a complaint with the ICO. Contact us using the
              details below to exercise your rights.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#1D6A47]">Contact</h2>
            <p className="text-[#666666]">
              For privacy questions or deletion requests, email{" "}
              <a className="font-medium text-[#1D6A47] underline" href="mailto:privacy@homeproservices.co.uk">
                privacy@homeproservices.co.uk
              </a>{" "}
              or write to our East London office address provided on your correspondence.
            </p>
          </section>

          <p className="mt-12 text-sm text-[#666666]">
            <Link href="/" className="font-medium text-[#1D6A47] hover:underline">
              ← Back to Home
            </Link>
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
