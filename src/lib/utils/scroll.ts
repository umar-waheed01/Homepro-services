/** Scroll to a page section by id, respecting reduced-motion preference. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({
    behavior: reduced ? "auto" : "smooth",
    block: "start",
  });
}
