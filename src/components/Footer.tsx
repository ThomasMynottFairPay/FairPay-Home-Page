import { ArrowUp, ArrowUpRight, Linkedin } from "lucide-react";
import { Container, GuideLines } from "./kit";
import { Wordmark } from "./Navbar";
import { cn } from "./ui/Utils";
import { joinLink, links } from "../content/site";

type FooterLink = { label: string; href: string; external?: boolean; icon?: typeof Linkedin };

const columns: { title: string; items: FooterLink[] }[] = [
  {
    title: "Product",
    items: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Products", href: "#products" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Get started",
    items: [
      { label: "Become a founding member", href: joinLink("Footer"), external: true },
      { label: "Book a chat", href: links.bookChat, external: true },
    ],
  },
  {
    title: "Follow",
    items: [{ label: "LinkedIn", href: links.linkedin, external: true, icon: Linkedin }],
  },
];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const linkClass =
  "group inline rounded-sm text-[14px] text-white/65 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-bright";

/** Keeps the external-link arrow attached to the last word when the label wraps. */
function ExternalLabel({ label }: { label: string }) {
  const cut = label.lastIndexOf(" ");
  const head = cut === -1 ? "" : label.slice(0, cut + 1);
  const tail = cut === -1 ? label : label.slice(cut + 1);
  return (
    <>
      {head}
      <span className="whitespace-nowrap">
        {tail}
        <ArrowUpRight
          className="ml-1 inline-block h-3.5 w-3.5 align-[-2px] text-white/40 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-white/70"
          aria-hidden
        />
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line-dark bg-ink text-white">
      <GuideLines dark />
      <Container className="pb-10 pt-20 md:pt-24">
        <h2 className="sr-only">Footer</h2>

        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Wordmark dark />
            <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.6] text-white/65">
              Pooling the payment volume of Australian small businesses and not-for-profits into real buying power.
              Built on Stripe.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:col-span-8">
            {columns.map((col) => (
              <nav key={col.title} aria-labelledby={`footer-${slug(col.title)}`}>
                <h3 id={`footer-${slug(col.title)}`} className="text-[13px] font-medium leading-none text-white">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {col.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className={linkClass}
                        >
                          {Icon && <Icon className="mr-1.5 inline-block h-4 w-4 align-[-3px]" aria-hidden />}
                          {item.external ? <ExternalLabel label={item.label} /> : item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-4 border-t border-line-dark pt-8 text-[13px] leading-[1.6] text-white/55 md:mt-24 md:grid-cols-12 md:gap-8">
          <p className="md:col-span-4">© 2026 FairPay Pty Ltd</p>
          <p className="max-w-[62ch] md:col-span-6">
            PayTo® and PayID® are registered trademarks of NPP Australia Ltd. Stripe is a trademark of Stripe, Inc.
          </p>
          <div className="md:col-span-2 md:text-right">
            <a href="#" className={cn(linkClass, "text-[13px] text-white/55")}>
              Back to top
              <ArrowUp
                className="ml-1.5 inline-block h-3.5 w-3.5 align-[-2px] transition-transform duration-200 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
