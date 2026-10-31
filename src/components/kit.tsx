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
  const bg = tone === "ink" ? "bg-ink text-paper" : tone === "canvas" ? "bg-canvas" : "bg-white";
  return (
    <section id={id} className={cn("relative scroll-mt-20 overflow-hidden", bg, className)}>
      {guides && <GuideLines dark={tone === "ink"} />}
      {children}
    </section>
  );
}

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={cn("mb-4 text-[13px] font-bold uppercase tracking-[0.12em]", dark ? "text-brand-bright" : "text-brand-deep")}>
      {children}
    </p>
  );
}

/**
 * Two-tone headline, the brand's signature move: state it in forest, then pay it off in
 * raised forest on light or mint on forest. Keep the lead short and declarative.
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
    xl: "text-[46px] leading-[0.95] tracking-[-0.04em] sm:text-[60px] lg:text-[76px]",
    lg: "text-[34px] leading-[1.0] md:text-[48px]",
    md: "text-[24px] leading-[1.1] md:text-[28px]",
  };
  return (
    <Tag className={cn("font-extrabold tracking-[-0.035em] text-balance", sizes[size], dark ? "text-paper" : "text-ink", className)}>
      {lead}
      {rest && (
        <>
          {" "}
          <span className={dark ? "text-brand-bright" : "text-brand-deep"}>{rest}</span>
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
    primary: "bg-brand text-paper hover:bg-brand-deep",
    secondary: "bg-transparent text-ink ring-2 ring-inset ring-ink hover:bg-ink/5",
    light: "bg-brand-bright text-ink hover:bg-[#B5EBCF]",
    ghostDark: "text-brand-bright ring-2 ring-inset ring-brand-bright/70 hover:ring-brand-bright",
  };
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-1 rounded-full px-6 text-[16px] font-bold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-bright",
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
        "relative overflow-hidden rounded-[20px]",
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
    success: "bg-[#DDF5E8] text-[#1C5A46]",
    pending: "bg-[#FBEFD0] text-[#8A5A00]",
    info: "bg-[#E8EEF9] text-[#24426E]",
    neutral: "bg-canvas text-body",
  };
  return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold", tones[tone])}>{children}</span>;
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
