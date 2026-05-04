import Link from "next/link";
import { siteConfig } from "@/lib/constants/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0D3D24] py-12 text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:justify-between sm:px-6">
        <div>
          <p className="font-serif text-lg font-semibold text-[#FAFAF8]">
            HomePro Services
          </p>
          <p className="mt-2 max-w-sm text-sm">
            Expert gardening, electrical, plumbing, EPC surveys & solar across East London.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <Link href="/privacy" className="hover:text-[#C8882A]">
            Privacy policy
          </Link>
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-[#C8882A]">
            {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-[#C8882A]">
            {siteConfig.email}
          </a>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-white/45">
        © {new Date().getFullYear()} HomePro Services. All rights reserved.
      </p>
    </footer>
  );
}
