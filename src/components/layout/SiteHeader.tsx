"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { scrollToSection } from "@/lib/utils/scroll";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#quote", label: "Free quote" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const MENU_CLOSE_MS = 280;

function sectionHref(pathname: string, hash: string) {
  return pathname === "/" ? hash : `/${hash}`;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const closeMenu = useCallback(() => setOpen(false), []);

  const navigateToSection = useCallback(
    (hash: string) => {
      closeMenu();

      if (pathname !== "/") {
        window.location.href = `/${hash}`;
        return;
      }

      const id = hash.replace("#", "");
      window.setTimeout(() => scrollToSection(id), MENU_CLOSE_MS);
    },
    [closeMenu, pathname],
  );

  function handleMobileNavClick(
    e: MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) {
    e.preventDefault();
    navigateToSection(hash);
  }

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeMenu]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0D3D24]/90 backdrop-blur-xl">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link
            href="/"
            className="min-w-0 truncate font-serif text-base font-semibold tracking-tight text-[#FAFAF8] sm:text-xl"
            onClick={closeMenu}
          >
            HomePro<span className="text-[#C8882A]"> Services</span>
          </Link>
          <nav
            className="hidden items-center gap-6 lg:gap-8 md:flex"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={sectionHref(pathname, item.href)}
                className="text-sm font-medium text-white/80 transition hover:text-[#E8F5EE]"
              >
                {item.label}
              </a>
            ))}
            <Button asChild size="sm" className="font-bold">
              <a href={sectionHref(pathname, "#quote")}>Get a free quote</a>
            </Button>
          </nav>
          <button
            type="button"
            className="-mr-1 shrink-0 rounded-lg p-2 text-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <>
              <motion.button
                type="button"
                aria-label="Close menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 top-14 bg-black/50 sm:top-16 md:hidden"
                onClick={closeMenu}
              />
              <motion.div
                id="mobile-nav"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-x-0 top-full z-10 overflow-hidden border-t border-white/10 bg-[#0D3D24] shadow-2xl shadow-black/30 md:hidden"
              >
                <nav
                  className="max-h-[min(70dvh,calc(100dvh-3.5rem))] overflow-y-auto overscroll-contain px-4 py-3 sm:px-6 sm:py-4"
                  aria-label="Mobile primary"
                  style={{
                    paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
                  }}
                >
                  <ul className="flex flex-col gap-0.5">
                    {nav.map((item) => (
                      <li key={item.href}>
                        <a
                          href={sectionHref(pathname, item.href)}
                          className={cn(
                            "flex min-h-11 items-center rounded-lg px-3 text-[0.9375rem] font-medium text-white/90",
                            "transition-colors active:bg-white/15 sm:min-h-12 sm:text-base",
                            "hover:bg-white/10",
                          )}
                          onClick={(e) => handleMobileNavClick(e, item.href)}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 border-t border-white/10 pt-3">
                    <Button asChild className="h-11 w-full font-bold sm:h-12">
                      <a
                        href={sectionHref(pathname, "#quote")}
                        onClick={(e) => handleMobileNavClick(e, "#quote")}
                      >
                        Get a free quote
                      </a>
                    </Button>
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
