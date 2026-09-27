// Shared building blocks for the FairPay page. See DESIGN.md for the rules they encode.
import { ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "./ui/Utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("relative mx-auto w-full max-w-[1200px] px-5 md:px-8", className)}>{children}</div>;
}

/** Hairline vertical guides at the container edges, a quiet structural signature on light sections. */
export function GuideLines({ dark = false }: { dark?: boolean }) {
  const line = dark ? "border-line-dark/70" : "border-line";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      <div className={cn("mx-auto h-full max-w-[1200px] border-x", line)} />
    </div>
  );
}

type Tone = "white" | "canvas" | "ink";

export function Section({
  id,
  tone = "white",
  guides = true,
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  guides?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const bg = tone === "ink" ? "bg-ink text-white" : tone === "canvas" ? "bg-canvas" : "bg-white";
  return (
    <section id={id} className={cn("relative scroll-mt-20 overflow-hidden", bg, className)}>
      {guides && <GuideLines dark={tone === "ink"} />}
      {children}
    </section>
  );
}

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={cn("mb-4 text-[13px] font-medium tracking-wide", dark ? "text-brand-bright" : "text-brand")}>
      {children}
    </p>
  );
}

/**
 * Two-tone headline: the lead clause in ink, the continuation in the body colour.
 * Keep the lead short and declarative; the rest explains.
 */
export function Headline({
  lead,
  rest,
  as: Tag = "h2",
  size = "lg",
  dark = false,
  className,
}: {
  lead: React.ReactNode;
  rest?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "lg" | "md";
  dark?: boolean;
  className?: string;
}) {
  const sizes = {
    xl: "text-[40px] leading-[1.04] sm:text-[56px] lg:text-[68px]",
    lg: "text-[30px] leading-[1.1] md:text-[40px]",
    md: "text-[24px] leading-[1.15] md:text-[28px]",
  };
  return (
    <Tag className={cn("font-medium tracking-[-0.035em] text-balance", sizes[size], dark ? "text-white" : "text-ink", className)}>
      {lead}
      {rest && (
        <>
          {" "}
          <span className={dark ? "text-white/60" : "text-body"}>{rest}</span>
        </>
      )}
    </Tag>
  );
}

type ButtonVariant = "primary" | "secondary" | "light" | "ghostDark";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  arrow = true,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  arrow?: boolean;
  className?: string;
}) {
  const styles: Record<ButtonVariant, string> = {
    primary: "bg-brand text-white hover:bg-brand-deep",
    secondary: "bg-white text-ink ring-1 ring-line hover:ring-ink/25",
    light: "bg-white text-ink hover:bg-white/90",
    ghostDark: "text-white ring-1 ring-white/25 hover:ring-white/60",
  };
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex h-11 items-center justify-center gap-1 rounded-md px-5 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        styles[variant],
        className,
      )}
    >
      {children}
      {arrow && <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </a>
  );
}

/**
 * Fade-and-rise on first view. motion/react animates in JS, so the CSS reduced-motion rule
 * does not reach it: with prefers-reduced-motion the content renders in place, fully visible.
 */
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Bento tile: white card on hairline border, optional visual area. */
export function Tile({ className, children, dark = false }: { className?: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        dark ? "bg-ink-soft ring-1 ring-line-dark" : "bg-white ring-1 ring-line shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ---------- Product UI mockup primitives ---------- */

export function BrowserFrame({ url, children, className }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl bg-white ring-1 ring-line shadow-float", className)}>
      <div className="flex items-center gap-3 border-b border-line bg-canvas px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </div>
        <div className="mx-auto rounded-md bg-white px-3 py-0.5 text-[11px] text-subtle ring-1 ring-line">{url}</div>
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[2.2rem] bg-ink p-2 shadow-float", className)}>
      <div className="relative overflow-hidden rounded-[1.8rem] bg-white">
        <div className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />
        <div className="pt-9">{children}</div>
      </div>
    </div>
  );
}

type PillTone = "success" | "pending" | "info" | "neutral";

export function Pill({ tone = "neutral", children }: { tone?: PillTone; children: React.ReactNode }) {
  const tones: Record<PillTone, string> = {
    success: "bg-[#E3F8EF] text-[#0A6B4F]",
    pending: "bg-[#FFF4DB] text-[#8A5A00]",
    info: "bg-[#E8F0FF] text-[#2152B8]",
    neutral: "bg-canvas text-body",
  };
  return <span className={cn("inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium", tones[tone])}>{children}</span>;
}

/** Neutral text marks for payment methods. Not official logos. */
export function MethodMark({ name, className }: { name: "Visa" | "Mastercard" | "Amex" | "Apple Pay" | "Google Pay" | "PayTo"; className?: string }) {
  // Never wraps: a two-line chip breaks the row rhythm of every table it sits in.
  const base =
    "inline-flex h-5 min-w-8 shrink-0 items-center justify-center whitespace-nowrap rounded-[4px] px-1.5 text-[9px] font-semibold leading-none ring-1 ring-line bg-white text-ink";
  if (name === "Mastercard")
    return (
      <span className={cn(base, "gap-0 px-1", className)} aria-label="Mastercard">
        <span className="h-3 w-3 rounded-full bg-[#EB001B]" />
        <span className="-ml-1.5 h-3 w-3 rounded-full bg-[#F79E1B] mix-blend-multiply" />
      </span>
    );
  const label: Record<string, string> = { Visa: "VISA", Amex: "AMEX", "Apple Pay": "Apple Pay", "Google Pay": "G Pay", PayTo: "PayTo" };
  return (
    <span className={cn(base, name === "Visa" && "italic text-[#1A1F71]", className)} aria-label={name}>
      {label[name]}
    </span>
  );
}
