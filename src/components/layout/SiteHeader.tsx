"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#quote", label: "Free quote" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

function sectionHref(pathname: string, hash: string) {
  return pathname === "/" ? hash : `/${hash}`;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function handleMobileNavClick(e: MouseEvent<HTMLAnchorElement>, hash: string) {
    e.preventDefault();
    setOpen(false);

    // On non-home routes keep existing behavior and navigate to homepage hash.
    if (pathname !== "/") {
      window.location.href = `/${hash}`;
      return;
    }

    const id = hash.replace("#", "");
    // Wait for the menu close animation frame, then perform smooth scroll.
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0D3D24]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight text-[#FAFAF8] sm:text-xl"
        >
          HomePro<span className="text-[#C8882A]"> Services</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
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
          className="rounded-lg p-2 text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
          <span className="sr-only">Menu</span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10 bg-[#0D3D24]/95 md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile primary">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={sectionHref(pathname, item.href)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10",
                  )}
                  onClick={(e) => handleMobileNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
              <Button asChild className="mt-2 w-full font-bold">
                <a
                  href={sectionHref(pathname, "#quote")}
                  onClick={(e) => handleMobileNavClick(e, "#quote")}
                >
                  Get a free quote
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
