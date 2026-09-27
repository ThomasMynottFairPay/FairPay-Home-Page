import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, ChevronRight, Lock, LockOpen } from "lucide-react";
import { Container, Eyebrow, Headline, MethodMark, Pill, Reveal, Section } from "./kit";
import { cn } from "./ui/Utils";
import { community } from "../content/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "-40px 0px" } as const;

/** Compact goal label from site.ts: 2_000_000 -> "$2M". */
function compactAud(n: number) {
  if (n >= 1_000_000) return `$${+(n / 1_000_000).toFixed(2)}M`;
  return `$${Math.round(n / 1_000)}k`;
}

const FIRST_GOAL = compactAud(community.firstGoalAud);

const money = (n: number) => n.toLocaleString("en-AU", { style: "currency", currency: "AUD" });

/** True when the viewport matches. Drives the stagger of the timeline fill. */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/* ---------- Shared mockup bits ----------
 * Every step card is one system: the same 212px height, a 48px header and a 40px footer strip,
 * so tops and bottoms line up across the row and only the body changes.
 */

function MiniCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative flex h-[212px] w-full max-w-[272px] flex-col overflow-hidden rounded-xl bg-white text-left ring-1 ring-line shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardHeader({
  title,
  sub,
  lead,
  aside,
}: {
  title: string;
  sub?: string;
  lead?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex h-12 shrink-0 items-center gap-2.5 border-b border-line px-3.5">
      {lead}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-medium leading-4 text-ink">{title}</p>
        {sub && <p className="truncate text-[11px] leading-4 text-subtle">{sub}</p>}
      </div>
      {aside}
    </div>
  );
}

function CardFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("mt-auto flex h-10 shrink-0 items-center gap-3 border-t border-line bg-canvas/70 px-3.5", className)}>
      {children}
    </div>
  );
}

type Method = "Visa" | "Mastercard" | "Apple Pay" | "Google Pay" | "PayTo" | "Invoice";

function Mark({ method, className }: { method: Method; className?: string }) {
  if (method === "Invoice") {
    return (
      <span
        className={cn(
          "inline-flex h-5 min-w-8 shrink-0 items-center justify-center whitespace-nowrap rounded-[4px] bg-white px-1.5 text-[9px] font-semibold leading-none text-ink ring-1 ring-line",
          className,
        )}
      >
        Invoice
      </span>
    );
  }
  return <MethodMark name={method} className={className} />;
}

/* ---------- Step 1: account set-up ---------- */

const SETUP = [
  { label: "Business details", meta: "ABN added", mono: false },
  { label: "Payout account", meta: "•• 4821", mono: true },
  { label: "Payment methods", meta: "4 on", mono: false },
];

// One mark per launch product: cards, digital wallets, PayTo, invoicing.
const SETUP_METHODS: Method[] = ["Visa", "Google Pay", "PayTo", "Invoice"];

function SetupCard() {
  const reduce = useReducedMotion();
  return (
    <MiniCard>
      <CardHeader
        lead={
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-ink text-[10px] font-semibold text-white">
            RN
          </span>
        }
        title="Riverside Netball Club"
        sub="Account setup"
        aside={<Pill tone="success">Live</Pill>}
      />
      <ul className="divide-y divide-line px-3.5 py-2">
        {SETUP.map((s, i) => (
          <li key={s.label} className="flex h-9 items-center gap-2">
            <motion.span
              className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand text-white"
              initial={reduce ? false : { scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={VIEW}
              transition={{ duration: 0.35, delay: 0.35 + i * 0.18, ease: EASE }}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </motion.span>
            <span className="truncate text-[12px] leading-4 text-ink">{s.label}</span>
            <span className={cn("ml-auto shrink-0 text-[11px] leading-4 text-subtle", s.mono && "font-mono tabular")}>
              {s.meta}
            </span>
          </li>
        ))}
      </ul>
      <CardFooter className="gap-1.5">
        {SETUP_METHODS.map((m) => (
          <Mark key={m} method={m} />
        ))}
      </CardFooter>
    </MiniCard>
  );
}

/* ---------- Step 2: payments flowing into the pool ---------- */

const PAYMENTS: { org: string; method: Method; amount: number }[] = [
  { org: "Harbour St Café", method: "Visa", amount: 18.4 },
  { org: "Riverside NC", method: "PayTo", amount: 120 },
  { org: "Coastline", method: "Invoice", amount: 462 },
  { org: "Northside Pantry", method: "Google Pay", amount: 35 },
  { org: "Bright Minds", method: "Apple Pay", amount: 85 },
  { org: "Harbour St Café", method: "Mastercard", amount: 9.5 },
];
const SEGMENTS = 16;
const START_TICK = 2;

function PoolFeed() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [tick, setTick] = useState(START_TICK);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 2600);
    return () => window.clearInterval(id);
  }, [reduce, inView]);

  const n = PAYMENTS.length;
  const rows = [0, 1, 2].map((k) => (((tick - k) % n) + n) % n);
  const latest = PAYMENTS[tick % n];
  const filled = 5 + ((tick - START_TICK) % 10);

  return (
    <div ref={ref} className="w-full max-w-[272px]">
      <MiniCard>
        <CardHeader
          title="Payments"
          sub="Today"
          aside={
            <span className="flex shrink-0 items-center gap-1.5 text-[11px] leading-4 text-subtle">
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-brand"
                    animate={{ scale: [1, 2.6], opacity: [0.5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              Live
            </span>
          }
        />

        {/* Ledger: member, method, amount. Fixed height so arriving rows never move the card. */}
        <ul className="relative h-[105px] shrink-0 overflow-hidden px-3.5">
          <AnimatePresence initial={false} mode="popLayout">
            {rows.map((idx) => {
              const p = PAYMENTS[idx];
              return (
                <motion.li
                  key={idx}
                  layout={!reduce}
                  initial={{ opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex h-[35px] items-center gap-2 border-b border-line"
                >
                  <span className="min-w-0 flex-1 truncate text-[12px] leading-4 text-ink">{p.org}</span>
                  <Mark method={p.method} />
                  <span className="min-w-[52px] shrink-0 text-right font-mono text-[12px] leading-4 text-ink tabular">
                    {money(p.amount)}
                  </span>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        <div className="flex flex-1 flex-col justify-center bg-canvas/70 px-3.5">
          <div className="flex items-center justify-between text-[11px] leading-4">
            <span className="text-body">Community pool</span>
            <motion.span
              key={tick}
              className="font-mono text-brand tabular"
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25, ease: EASE }}
            >
              +{money(latest.amount)}
            </motion.span>
          </div>
          <div className="mt-2 grid grid-cols-16 gap-[3px]">
            {Array.from({ length: SEGMENTS }, (_, i) => (
              <span
                key={i}
                className={cn(
                  "h-2 rounded-[2px] transition-colors duration-500",
                  i < filled ? (i === filled - 1 ? "bg-brand-bright" : "bg-brand") : "bg-line",
                )}
              />
            ))}
          </div>
        </div>
      </MiniCard>
    </div>
  );
}

/* ---------- Step 3: pricing review ---------- */

const REVIEW = [
  { method: "Cards & wallets", share: 0.82 },
  { method: "PayTo", share: 0.48 },
  { method: "Invoicing", share: 0.3 },
];

function Toggle({ delay }: { delay: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-flex h-4 w-7 shrink-0 rounded-full bg-line">
      <motion.span
        className="absolute inset-0 rounded-full bg-brand"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: 0.3, delay }}
      />
      <motion.span
        className="absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-white shadow-[0_1px_2px_rgba(11,27,46,0.25)]"
        initial={reduce ? false : { x: 0 }}
        whileInView={{ x: 12 }}
        viewport={VIEW}
        transition={{ duration: 0.3, delay, ease: EASE }}
        style={reduce ? { x: 12 } : undefined}
      />
    </span>
  );
}

function RateReview() {
  const reduce = useReducedMotion();
  return (
    <MiniCard>
      <CardHeader title="Pricing review" sub="FairPay community" aside={<Pill tone="pending">In progress</Pill>} />

      <div className="px-3.5">
        <div className="flex h-7 items-center gap-3 text-[11px] leading-4 text-subtle">
          <span className="w-[108px] shrink-0">Method</span>
          <span>Pooled volume</span>
        </div>
        <ul>
          {REVIEW.map((r, i) => (
            <li key={r.method} className="flex h-8 items-center gap-3 border-t border-line">
              <span className="w-[108px] shrink-0 truncate text-[12px] leading-4 text-ink">{r.method}</span>
              <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-canvas ring-1 ring-inset ring-line">
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full bg-brand"
                  initial={reduce ? false : { width: 0 }}
                  whileInView={{ width: `${r.share * 100}%` }}
                  viewport={VIEW}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: EASE }}
                  style={reduce ? { width: `${r.share * 100}%` } : undefined}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <CardFooter className="justify-between">
        <span className="text-[12px] leading-4 text-ink">Pass back to members</span>
        <Toggle delay={1.2} />
      </CardFooter>
    </MiniCard>
  );
}

/* ---------- Step 4: milestone notification ---------- */

/** Where the first milestone flag sits on the track (the next one is at the far end). */
const FLAG_AT = 60;
const UNLOCK_DELAY = 1.15;

function LockSwap() {
  const reduce = useReducedMotion();
  return (
    <span className="relative grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
      <motion.span
        className="absolute inset-0 grid place-items-center"
        initial={reduce ? false : { opacity: 1 }}
        whileInView={{ opacity: 0 }}
        viewport={VIEW}
        transition={{ duration: 0.25, delay: UNLOCK_DELAY }}
        style={reduce ? { opacity: 0 } : undefined}
      >
        <Lock className="h-3.5 w-3.5" strokeWidth={2} />
      </motion.span>
      <motion.span
        className="absolute inset-0 grid place-items-center"
        initial={reduce ? false : { opacity: 0, y: 2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEW}
        transition={{ duration: 0.35, delay: UNLOCK_DELAY + 0.05, ease: EASE }}
      >
        <LockOpen className="h-3.5 w-3.5" strokeWidth={2} />
      </motion.span>
    </span>
  );
}

function MilestoneCard() {
  const reduce = useReducedMotion();
  return (
    <MiniCard>
      <CardHeader lead={<LockSwap />} title="Community discount unlocked" sub="FairPay community" />

      <div className="flex flex-1 flex-col justify-center px-3.5">
        <div className="flex items-center justify-between gap-3">
          <Pill tone="success">Milestone 1</Pill>
          <span className="text-[11px] leading-4 text-subtle">Pooled volume</span>
        </div>

        {/* Track with the first milestone flag; the fill runs up to it. */}
        <div className="relative mt-4 h-5">
          <span className="absolute inset-x-0 bottom-0 h-1.5 overflow-hidden rounded-full bg-canvas ring-1 ring-inset ring-line">
            <motion.span
              className="absolute inset-y-0 left-0 rounded-full bg-brand"
              initial={reduce ? false : { width: 0 }}
              whileInView={{ width: `${FLAG_AT}%` }}
              viewport={VIEW}
              transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
              style={reduce ? { width: `${FLAG_AT}%` } : undefined}
            />
          </span>
          <span className="absolute bottom-0 h-5 w-px bg-ink" style={{ left: `${FLAG_AT}%` }}>
            <motion.span
              className="absolute left-px top-0 h-2.5 w-3 origin-left bg-brand [clip-path:polygon(0_0,100%_0,72%_50%,100%_100%,0_100%)]"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEW}
              transition={{ duration: 0.3, delay: UNLOCK_DELAY - 0.05, ease: EASE }}
            />
          </span>
          <span className="absolute -bottom-0.5 right-0 h-2.5 w-2.5 rounded-full bg-white ring-1 ring-line" />
        </div>
        <div className="relative mt-1.5 h-4 text-[11px] leading-4">
          <span className="absolute left-0 font-mono text-subtle tabular">$0</span>
          <span className="absolute -translate-x-1/2 font-mono text-ink tabular" style={{ left: `${FLAG_AT}%` }}>
            {FIRST_GOAL}
          </span>
          <span className="absolute right-0 text-subtle">Next</span>
        </div>
      </div>

      <CardFooter className="justify-between">
        <span className="truncate text-[12px] leading-4 text-ink">Membership</span>
        <span className="flex shrink-0 items-center gap-1 text-[11px] font-medium leading-4 text-brand">
          <Check className="h-3 w-3" strokeWidth={2.5} />
          Founding member
        </span>
      </CardFooter>
    </MiniCard>
  );
}

/* ---------- Timeline ---------- */

const STEPS = [
  {
    title: "Join FairPay",
    body: "Take cards, digital wallets, PayTo and invoices through FairPay, built on Stripe.",
    Visual: SetupCard,
  },
  {
    title: "Your volume joins the pool",
    body: "Every payment you take adds to the community's total.",
    Visual: PoolFeed,
  },
  {
    title: "We use our pooled buying power",
    body: "As the total grows, we negotiate better pricing and pass it back to members.",
    Visual: RateReview,
  },
  {
    title: "Each milestone unlocks a discount",
    body: `Our first unlocks at ${FIRST_GOAL}. Join before then and you're a founding member.`,
    Visual: MilestoneCard,
  },
];

function Node({ n, delay }: { n: number; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-white font-mono text-[11px] text-subtle ring-1 ring-line tabular">
      {n}
      <motion.span
        className="absolute inset-0 grid place-items-center rounded-full bg-brand font-mono text-[11px] font-medium text-white"
        initial={reduce ? false : { opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px 0px" }}
        transition={{ duration: 0.35, delay, ease: EASE }}
      >
        {n}
      </motion.span>
    </span>
  );
}

/**
 * The connector for one step. Horizontal on wide screens (a hairline that fills left to right,
 * step by step); vertical below that, running from this node down to the next.
 */
function Rail({ index, last, wide }: { index: number; last: boolean; wide: boolean }) {
  const reduce = useReducedMotion();
  const view = { once: true, margin: "-80px 0px" } as const;
  const delay = wide ? 0.3 + index * 0.45 : 0.15;
  const start = index === 0 ? "left-6" : "left-0";

  return (
    <div aria-hidden className="relative col-start-1 [grid-row:1/3] xl:order-2 xl:flex xl:h-14 xl:items-center xl:px-6">
      {/* Horizontal (xl) */}
      <span className={cn("absolute right-0 top-1/2 hidden h-px bg-line xl:block", start)} />
      <motion.span
        className={cn("absolute right-0 top-1/2 hidden h-px origin-left bg-brand xl:block", start)}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={view}
        transition={{ duration: 0.45, delay, ease: "linear" }}
      />

      {/* Vertical (below xl) */}
      {!last && (
        <>
          <span className="absolute -bottom-14 left-[13.5px] top-7 w-px bg-line xl:hidden" />
          <motion.span
            className="absolute -bottom-14 left-[13.5px] top-7 w-px origin-top bg-brand xl:hidden"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={view}
            transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
          />
        </>
      )}

      <Node n={index + 1} delay={delay} />
    </div>
  );
}

const DOTS: React.CSSProperties = {
  backgroundImage: "radial-gradient(circle, #D5DDE7 1px, transparent 1.4px)",
  backgroundSize: "14px 14px",
  maskImage: "radial-gradient(ellipse 75% 70% at 50% 50%, #000 25%, transparent 80%)",
  WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 50% 50%, #000 25%, transparent 80%)",
};

export function HowItWorks() {
  const wide = useMediaQuery("(min-width: 80rem)");

  return (
    <Section id="how-it-works" tone="canvas" className="py-24 md:py-32">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-7">
            <Eyebrow>How it works</Eyebrow>
            <Headline
              lead="Your volume. Our buying power."
              rest="The more members who join, the better the deal for everyone."
            />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="max-w-[460px] text-[17px] leading-[1.6] text-body">
              Every payment you take adds to one shared total. The bigger it grows, the stronger our position when we
              negotiate, and the better the pricing we pass back to members.
            </p>
            <a
              href="#pricing"
              className="group mt-4 inline-flex items-center gap-1 rounded-sm text-[15px] font-medium text-brand transition-colors hover:text-brand-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              See pricing
              <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14 md:mt-20">
          <ol className="xl:grid xl:grid-cols-4 xl:overflow-hidden xl:rounded-2xl xl:bg-white xl:ring-1 xl:ring-line xl:shadow-card">
            {STEPS.map(({ title, body, Visual }, i) => (
              <li
                key={title}
                className={cn(
                  "grid grid-cols-[28px_minmax(0,1fr)] gap-x-4 pb-14 last:pb-0 sm:gap-x-6",
                  "md:grid-cols-[28px_minmax(0,5fr)_minmax(0,7fr)] md:gap-x-8",
                  "xl:flex xl:flex-col xl:gap-0 xl:border-l xl:border-line xl:pb-0 xl:first:border-l-0",
                )}
              >
                <Rail index={i} last={i === STEPS.length - 1} wide={wide} />

                <div className="col-start-2 row-start-1 pt-0.5 xl:order-3 xl:px-6 xl:pb-10 xl:pt-1">
                  <h3 className="text-[17px] font-medium leading-snug tracking-[-0.015em] text-ink">{title}</h3>
                  <p className="mt-2 max-w-[440px] text-[15px] leading-[1.55] text-body">{body}</p>
                </div>

                {/* Every card shares one top line at xl; the cards are all 212px tall, so bottoms line up too. */}
                <div
                  aria-hidden
                  className={cn(
                    "relative col-start-2 row-start-2 mt-6 flex items-center justify-center overflow-hidden rounded-xl bg-white px-5 py-8 ring-1 ring-line",
                    "md:col-start-3 md:row-start-1 md:mt-0 md:py-10",
                    "xl:order-1 xl:h-[292px] xl:items-start xl:rounded-none xl:px-4 xl:pb-0 xl:pt-10 xl:ring-0",
                  )}
                >
                  <span className="pointer-events-none absolute inset-0" style={DOTS} />
                  <Visual />
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
