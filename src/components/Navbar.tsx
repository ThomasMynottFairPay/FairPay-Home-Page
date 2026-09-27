import { type MouseEvent, useEffect, useRef, useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ButtonLink, Container } from "./kit";
import { cn } from "./ui/Utils";
import { joinLink, links as site } from "../content/site";

const navLinks = [
  { name: "How it works", id: "how-it-works" },
  { name: "Products", id: "products" },
  { name: "Pricing", id: "pricing" },
  { name: "Who it's for", id: "use-cases" },
  { name: "FAQ", id: "faq" },
] as const;

const sectionIds = navLinks.map((l) => l.id);

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/**
 * FairPay mark: three small blocks become two, then one full bar.
 * Many members' volume stacking into a single pool of buying power.
 */
export function FairPayMark({ dark = false, className }: { dark?: boolean; className?: string }) {
  const fill = dark ? "#19D3AE" : "#0A7A67";
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={cn("h-[22px] w-[22px] shrink-0", className)}>
      <rect x="2" y="3.5" width="5.33" height="4.5" rx="1.6" fill={fill} opacity="0.4" />
      <rect x="9.33" y="3.5" width="5.33" height="4.5" rx="1.6" fill={fill} opacity="0.4" />
      <rect x="16.67" y="3.5" width="5.33" height="4.5" rx="1.6" fill={fill} opacity="0.4" />
      <rect x="2" y="10" width="9" height="4.5" rx="1.6" fill={fill} opacity="0.7" />
      <rect x="13" y="10" width="9" height="4.5" rx="1.6" fill={fill} opacity="0.7" />
      <rect x="2" y="16.5" width="20" height="4.5" rx="1.6" fill={fill} />
    </svg>
  );
}

/** Mark plus text wordmark. Shared with the footer. */
export function Wordmark({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <FairPayMark dark={dark} />
      <span
        className={cn(
          "text-[19px] font-semibold leading-none tracking-[-0.035em]",
          dark ? "text-white" : "text-ink",
        )}
      >
        FairPay
      </span>
    </span>
  );
}

/** Tracks which nav section sits in the middle band of the viewport. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        setActive(ids.find((id) => visible.get(id)) ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/**
 * Skip link target. Prefers an element with id="main"; falls back to the page's <main>,
 * so the link works whether or not the layout has tagged it yet.
 */
function skipToMain(e: MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById("main") ?? document.querySelector<HTMLElement>("main");
  if (!target) return;
  e.preventDefault();
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  target.scrollIntoView({ block: "start" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const active = useActiveSection(sectionIds);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape, close when resizing up to desktop, and lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        onClick={skipToMain}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-[14px] focus:font-medium focus:text-ink focus:shadow-card focus:ring-1 focus:ring-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        Skip to content
      </a>
      {/* Mobile menu scrim: a sibling of the header so it can cover the page below the bar. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            aria-hidden
            onClick={() => setOpen(false)}
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-ink/25 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      {/* Solid white once scrolled: a translucent bar turns muddy grey over the ink sections. */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
          open || scrolled ? "border-line bg-white" : "border-transparent bg-transparent",
        )}
      >
      <Container className="flex h-16 items-center">
        <a href="#" aria-label="FairPay, back to top" className={cn("-m-1 rounded-md p-1", focusRing)}>
          <Wordmark />
        </a>

        <nav aria-label="Main" className="ml-10 hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2 text-[14px] font-medium transition-colors hover:text-ink",
                      isActive ? "text-ink" : "text-body",
                      focusRing,
                    )}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <a
            href={site.bookChat}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "hidden rounded-md px-3 py-2 text-[14px] font-medium text-ink transition-colors hover:text-brand lg:inline-block",
              focusRing,
            )}
          >
            Book a chat
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <ButtonLink href={joinLink("Nav")} external className="hidden h-9 px-4 text-[14px] sm:inline-flex">
            Become a member
            <span className="sr-only"> (opens in a new tab)</span>
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "-mr-2 ml-1 inline-flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-canvas lg:hidden",
              focusRing,
            )}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </Container>

      <div id="mobile-menu" className="lg:hidden">
        <AnimatePresence>
          {open && (
              <motion.nav
                key="panel"
                aria-label="Mobile"
                className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-white shadow-float"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <Container className="pb-6 pt-2">
                  <ul>
                    {navLinks.map((link) => (
                      <li key={link.id} className="border-b border-line">
                        <a
                          href={`#${link.id}`}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center justify-between rounded-sm py-4 text-[17px] font-medium tracking-[-0.01em] text-ink",
                            focusRing,
                          )}
                        >
                          {link.name}
                          <ChevronRight className="h-4 w-4 text-subtle" aria-hidden />
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <ButtonLink href={joinLink("Mobile menu")} external className="w-full">
                      Become a member
                      <span className="sr-only"> (opens in a new tab)</span>
                    </ButtonLink>
                    <ButtonLink href={site.bookChat} external variant="secondary" className="w-full">
                      Book a chat
                      <span className="sr-only"> (opens in a new tab)</span>
                    </ButtonLink>
                  </div>
                </Container>
              </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
    </>
  );
}
