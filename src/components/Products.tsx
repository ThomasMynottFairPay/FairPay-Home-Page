import { useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { BookOpen, Check, ChevronDown, ChevronLeft, GraduationCap, Mail } from "lucide-react";
import { BrowserFrame, ButtonLink, Container, Eyebrow, Headline, MethodMark, PhoneFrame, Pill, Reveal, Section, Tile } from "./kit";
import { rates } from "../content/site";
import { cn } from "./ui/Utils";

/* ---------- Helpers ---------- */

// Mockup amounts show cents, like real payment software.
const pct = (n: number) => `${Number(n.toFixed(2))}%`;
const aud = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** True while the element is on screen and the visitor hasn't asked for reduced motion. */
function useLive(ref: RefObject<HTMLElement | null>) {
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduce = useReducedMotion();
  return inView && !reduce;
}

/** Steps through a small looping state machine; holds step 0 when not live. */
function useLoop(durations: readonly number[], live: boolean) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!live) return;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % durations.length), durations[step]);
    return () => window.clearTimeout(id);
  }, [live, step, durations]);
  return live ? step : 0;
}

/** Tile heading: short ink title, body-colour sentence, read as one line like the section headline. */
function TileHead({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  const type = "text-[17px] leading-[1.45] tracking-[-0.015em] sm:text-[18px]";
  return (
    <div className={cn("relative z-10 max-w-[34rem] px-6 pt-7 sm:px-8 sm:pt-8 lg:px-9 lg:pt-9", className)}>
      <h3 className={cn("inline font-medium text-ink", type)}>{title}</h3>{" "}
      <p className={cn("inline text-body", type)}>{children}</p>
    </div>
  );
}

/** Hairline fact rows under a tile heading (fees, payment methods). */
function Facts({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <dl className={cn("relative mx-6 mt-6 divide-y divide-line border-y border-line text-[13px] sm:mx-8 lg:mx-9", className)}>
      {children}
    </dl>
  );
}

/** Faint dot grid behind each mockup, fading out towards the edges (same treatment as Use cases). */
const dots = (colour: string): React.CSSProperties => ({
  backgroundImage: `radial-gradient(circle, ${colour} 1px, transparent 1.4px)`,
  backgroundSize: "14px 14px",
  maskImage: "radial-gradient(ellipse 85% 80% at 50% 40%, #000 30%, transparent 85%)",
  WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 50% 40%, #000 30%, transparent 85%)",
});
const DOTS = dots("#D5DDE7");
const DOTS_ON_GRADIENT = dots("rgba(255,255,255,0.28)");

/**
 * Inset stage a tile's mockup sits on: canvas with a dot grid, or the page's one accent gradient.
 * Children should be positioned (relative/absolute) so they paint above the dot layer.
 */
function Stage({
  label,
  accent = false,
  className,
  children,
}: {
  label: string;
  accent?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative overflow-hidden rounded-xl ring-1",
        accent ? "fp-panel-gradient ring-ink/10" : "bg-canvas ring-line/70",
        className,
      )}
    >
      {accent && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(70% 55% at 18% 0%, rgba(255,255,255,0.38), transparent 70%)" }}
        />
      )}
      <span aria-hidden className="pointer-events-none absolute inset-0" style={accent ? DOTS_ON_GRADIENT : DOTS} />
      {children}
    </div>
  );
}

function OrgMark({ initials, className }: { initials: string; className?: string }) {
  return (
    <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-md text-[9px] font-semibold text-white", className)}>
      {initials}
    </span>
  );
}

/* ---------- Cards and digital wallets: desktop checkout ---------- */

const ORDER = [
  { icon: GraduationCap, name: "Year 9 Maths", meta: "10 weekly sessions", amount: 450 },
  { icon: BookOpen, name: "Term 4 workbook", meta: "Qty 1", amount: 35 },
];
const ORDER_TOTAL = ORDER.reduce((sum, i) => sum + i.amount, 0);

function Field({ label, value, focused, className }: { label: string; value: string; focused?: boolean; className?: string }) {
  return (
    <div className={cn("mt-3", className)}>
      <p className="mb-1 text-[11px] font-medium text-body">{label}</p>
      <div
        className={cn(
          "flex h-8 items-center lg:h-9 rounded-md px-2.5 text-[11.5px] text-ink",
          focused ? "ring-2 ring-brand/35" : "ring-1 ring-line",
        )}
      >
        {value}
        {focused && <span className="ml-px h-3.5 w-px bg-ink" />}
      </div>
    </div>
  );
}

function Checkout() {
  return (
    <BrowserFrame url="brightmindstutoring.com.au/pay" className="w-full rounded-b-none">
      <div className="grid text-[12px] text-body sm:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        {/* Order summary */}
        <div className="border-b border-line bg-canvas/50 p-4 sm:border-b-0 sm:border-r sm:p-5">
          <div className="flex items-center gap-2">
            <OrgMark initials="BM" className="bg-sky" />
            <span className="truncate text-[12px] font-medium text-ink">Bright Minds Tutoring</span>
          </div>
          <p className="mt-4 text-[11.5px] text-subtle sm:mt-6">Term 4 tuition</p>
          <p className="mt-0.5 font-mono text-[22px] font-medium tracking-[-0.03em] text-ink tabular sm:text-[26px]">
            {aud(ORDER_TOTAL)}
          </p>
          <ul className="mt-6 hidden space-y-3.5 sm:block">
            {ORDER.map(({ icon: Icon, name, meta, amount }) => (
              <li key={name} className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-white text-subtle ring-1 ring-line lg:hidden xl:grid">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-medium text-ink">{name}</p>
                    <p className="truncate text-[11px] text-subtle">{meta}</p>
                  </div>
                </div>
                <span className="font-mono text-[11.5px] text-ink tabular">{aud(amount)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 hidden space-y-1.5 border-t border-line pt-3 text-[11.5px] sm:block">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="font-mono text-ink tabular">{aud(ORDER_TOTAL)}</dd>
            </div>
            <div className="flex justify-between font-medium text-ink">
              <dt>Total due</dt>
              <dd className="font-mono tabular">{aud(ORDER_TOTAL)}</dd>
            </div>
          </dl>
        </div>

        {/* Payment */}
        <div className="p-4 pb-6 sm:p-5 sm:pb-7">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex h-8 items-center justify-center rounded-md bg-black text-[12px] font-semibold tracking-[-0.01em] text-white">
              Apple Pay
            </div>
            <div className="flex h-8 items-center justify-center rounded-md bg-white text-[12px] font-semibold tracking-[-0.01em] text-ink ring-1 ring-line">
              Google Pay
            </div>
          </div>
          <div className="my-3.5 flex items-center gap-2.5 text-[10.5px] text-subtle">
            <span className="h-px flex-1 bg-line" />
            Or pay with card
            <span className="h-px flex-1 bg-line" />
          </div>
          <Field label="Email" value="priya.sharma@example.com" />
          <div className="mt-3">
            <p className="mb-1 text-[11px] font-medium text-body">Card information</p>
            <div className="rounded-md ring-1 ring-line">
              <div className="flex h-8 items-center justify-between gap-2 border-b border-line px-2.5 lg:h-9">
                <span className="whitespace-nowrap font-mono text-[11px] text-ink tabular">4242 4242 4242 4242</span>
                <span className="flex shrink-0 gap-1">
                  <MethodMark name="Visa" />
                  <MethodMark name="Mastercard" />
                </span>
              </div>
              <div className="grid grid-cols-2 font-mono text-[11px] text-ink tabular">
                <span className="flex h-8 items-center border-r border-line px-2.5 lg:h-9">09 / 29</span>
                <span className="flex h-8 items-center px-2.5 lg:h-9">CVC •••</span>
              </div>
            </div>
          </div>
          <Field label="Name on card" value="Priya Sharma" focused className="hidden sm:block" />
          <div className="mt-3 hidden sm:block">
            <p className="mb-1 text-[11px] font-medium text-body">Country or region</p>
            <div className="flex h-8 items-center lg:h-9 justify-between rounded-md px-2.5 text-[11.5px] text-ink ring-1 ring-line">
              Australia
              <ChevronDown className="h-3.5 w-3.5 text-subtle" />
            </div>
          </div>
          <div className="mt-4 flex h-9 items-center justify-center rounded-md bg-brand text-[12.5px] font-medium text-white lg:mt-5 lg:h-10">
            Pay {aud(ORDER_TOTAL)}
          </div>
          <p className="mt-2.5 hidden text-center text-[10.5px] text-subtle sm:block">Your receipt will be emailed to you</p>
        </div>
      </div>
    </BrowserFrame>
  );
}

function CardsTile() {
  return (
    <Tile className="flex w-full flex-col">
      <TileHead title="Cards and digital wallets.">
        Accept Visa, Mastercard and more online, and let customers pay in a tap with Apple Pay and Google Pay.
      </TileHead>
      <Stage
        label="Illustrative checkout page for Bright Minds Tutoring with Apple Pay, Google Pay and card payment"
        className="mx-2.5 mb-2.5 mt-7 flex flex-1 items-end px-4 pt-7 sm:px-8 sm:pt-9 md:mt-9 xl:px-10"
      >
        <div className="relative -mb-5 w-full">
          <Checkout />
        </div>
      </Stage>
    </Tile>
  );
}

/* ---------- PayTo: bank-app agreement approval ---------- */

const PAYTO_STEPS = [3200, 750, 3000] as const;

const AGREEMENT = [
  ["Frequency", "Monthly"],
  ["First payment", "1 Oct 2026"],
  ["Reference", "Junior membership"],
  ["From", "Everyday ••4821"],
] as const;

function PayToPhone() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useLoop(PAYTO_STEPS, useLive(ref));
  const pressing = step === 1;
  const approved = step === 2;

  return (
    <div ref={ref} className="relative -mb-16 w-[252px] shrink-0">
      <PhoneFrame>
        <div className="px-4 pb-20 text-[12px] text-body">
          <div className="flex items-center justify-between">
            <ChevronLeft className="h-4 w-4 text-ink" strokeWidth={2} />
            <p className="text-[12.5px] font-medium text-ink">PayTo agreement</p>
            <span className="w-4" />
          </div>

          <div className="mt-4 flex flex-col items-center text-center">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-[11px] font-semibold text-white">RN</span>
            <p className="mt-2 text-[13px] font-medium tracking-[-0.01em] text-ink">Riverside Netball Club</p>
            <p className="mt-0.5 text-[11px] text-subtle">wants to set up a PayTo agreement</p>
          </div>

          <div className="mt-4 rounded-xl bg-canvas px-3 pb-1 pt-2.5 ring-1 ring-line">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] text-subtle">Amount</span>
              <span className="font-mono text-[17px] font-medium tracking-[-0.02em] text-ink tabular">{aud(45)}</span>
            </div>
            <dl className="mt-2 divide-y divide-line border-t border-line text-[11px]">
              {AGREEMENT.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-2 py-1.5">
                  <dt className="text-subtle">{k}</dt>
                  <dd className="truncate text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-3 h-[72px]">
            <AnimatePresence mode="wait" initial={false}>
              {approved ? (
                <motion.div
                  key="approved"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-full items-center gap-2.5 rounded-xl bg-[#E3F8EF] px-3"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0A6B4F] text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <div>
                    <p className="text-[12px] font-medium text-[#0A6B4F]">Agreement approved</p>
                    <p className="text-[10.5px] text-[#0A6B4F]/80">First payment 1 Oct</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="review"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1"
                >
                  <motion.div
                    animate={{ scale: pressing ? 0.97 : 1 }}
                    transition={{ duration: 0.15 }}
                    className="flex h-9 items-center justify-center gap-2 rounded-lg bg-ink text-[12.5px] font-medium text-white"
                  >
                    {pressing && <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-white/30 border-t-white" />}
                    Approve
                  </motion.div>
                  <div className="flex h-8 items-center justify-center text-[11.5px] font-medium text-body">Decline</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

function PayToTile() {
  return (
    // Tablet: full-width tile split in two. Desktop: stacked in the 5-column slot.
    <Tile className="flex w-full flex-col md:grid md:grid-cols-2 lg:flex">
      <div className="md:flex md:flex-col md:pb-9 lg:block lg:pb-0">
        <TileHead title="PayTo.">Pay by bank, straight from your customer's account.</TileHead>
        <Facts className="md:mt-auto lg:mt-6">
          <div className="flex items-center justify-between gap-4 py-2.5">
            <dt className="text-body">Standard rate</dt>
            <dd className="font-mono text-ink tabular">{pct(rates.payto.stripePct + rates.fairpayMarginPct)} + {rates.payto.fixedCents}c</dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-2.5">
            <dt className="text-body">Founding members</dt>
            <dd className="font-mono text-brand tabular">{pct(rates.payto.stripePct)} + {rates.payto.fixedCents}c</dd>
          </div>
        </Facts>
      </div>
      <Stage
        accent
        label="Illustrative banking app screen approving a monthly PayTo agreement with Riverside Netball Club"
        className="mx-2.5 mb-2.5 mt-7 flex min-h-[380px] flex-1 items-end justify-center px-6 pt-10 md:my-2.5 md:ml-0 md:min-h-[440px] lg:mb-2.5 lg:ml-2.5 lg:mt-7 lg:min-h-[380px]"
      >
        <PayToPhone />
      </Stage>
    </Tile>
  );
}

/* ---------- Invoicing: hosted invoice ---------- */

const INVOICE_LINES = [
  { item: "Grease trap service", qty: "1", amount: 380 },
  { item: "Labour, per hour", qty: "2.5", amount: 275 },
  { item: "Call-out fee", qty: "1", amount: 90 },
];
const INVOICE_SUBTOTAL = INVOICE_LINES.reduce((s, l) => s + l.amount, 0);
const INVOICE_GST = INVOICE_SUBTOTAL * 0.1;
const LINE_GRID = "grid grid-cols-[minmax(0,1fr)_28px_68px] gap-x-3";

function InvoiceMock() {
  return (
    <div className="flex w-full flex-col rounded-xl bg-white text-[12px] text-body ring-1 ring-line shadow-float">
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <OrgMark initials="CP" className="bg-[#1D5C8C]" />
            <span className="truncate text-[12px] font-medium text-ink">Coastline Plumbing</span>
          </div>
          <Pill tone="info">Open</Pill>
        </div>

        <p className="mt-5 text-[11px] text-subtle">Amount due</p>
        <p className="font-mono text-[24px] font-medium tracking-[-0.03em] text-ink tabular">{aud(INVOICE_SUBTOTAL + INVOICE_GST)}</p>

        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
          {[
            ["Invoice", "INV-0142"],
            ["Billed to", "Harbour Street Café"],
            ["Issued", "22 Sep 2026"],
            ["Due", "6 Oct 2026"],
          ].map(([k, v]) => (
            <div key={k} className="min-w-0">
              <dt className="text-subtle">{k}</dt>
              <dd className={cn("truncate text-ink", k === "Invoice" && "font-mono")}>{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex h-8 items-center rounded-md bg-brand px-3.5 text-[12px] font-medium text-white">Pay online</div>
          <div className="flex gap-1">
            <MethodMark name="Visa" />
            <MethodMark name="Mastercard" />
            <MethodMark name="PayTo" />
          </div>
        </div>
      </div>

      <div className="flex-1 border-t border-line bg-canvas/60 px-4 pb-7 pt-3 sm:px-5">
        <div className={cn(LINE_GRID, "border-b border-line pb-1.5 text-[10.5px] text-subtle")}>
          <span>Description</span>
          <span className="text-right">Qty</span>
          <span className="text-right">Amount</span>
        </div>
        {INVOICE_LINES.map((l) => (
          <div key={l.item} className={cn(LINE_GRID, "border-b border-line py-2 text-[11.5px]")}>
            <span className="truncate text-ink">{l.item}</span>
            <span className="text-right font-mono tabular">{l.qty}</span>
            <span className="text-right font-mono text-ink tabular">{aud(l.amount)}</span>
          </div>
        ))}
        <dl className="ml-auto mt-2 w-[172px] space-y-1 text-[11.5px]">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-mono tabular">{aud(INVOICE_SUBTOTAL)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>GST</dt>
            <dd className="font-mono tabular">{aud(INVOICE_GST)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-1 font-medium text-ink">
            <dt>Total</dt>
            <dd className="font-mono tabular">{aud(INVOICE_SUBTOTAL + INVOICE_GST)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/** The email the customer receives, linking to the invoice above. */
function InvoiceEmail() {
  return (
    <div className="overflow-hidden rounded-xl bg-white text-[11.5px] text-body ring-1 ring-line shadow-float">
      <div className="flex items-center gap-1.5 border-b border-line bg-canvas/70 px-3.5 py-2 text-[10.5px] text-subtle">
        <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
        Inbox
        <span className="ml-auto font-mono tabular">9:14 am</span>
      </div>
      <div className="px-3.5 pb-3.5 pt-3">
        <div className="flex items-center gap-2">
          <OrgMark initials="CP" className="bg-[#1D5C8C]" />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[12px] font-medium text-ink">Coastline Plumbing</p>
            <p className="truncate text-[10.5px] text-subtle">To Harbour Street Café</p>
          </div>
        </div>
        <p className="mt-3 text-[12px] font-medium text-ink">
          Invoice <span className="font-mono">INV-0142</span>
        </p>
        <div className="mt-2 rounded-lg bg-canvas px-3 py-2.5 ring-1 ring-line">
          <p className="text-[10.5px] text-subtle">Amount due</p>
          <p className="font-mono text-[17px] font-medium tracking-[-0.02em] text-ink tabular">{aud(INVOICE_SUBTOTAL + INVOICE_GST)}</p>
          <p className="mt-0.5 text-[10.5px] text-subtle">Due 6 Oct 2026</p>
        </div>
        <div className="mt-3 flex h-8 items-center justify-center rounded-md bg-brand text-[11.5px] font-medium text-white">
          View and pay
        </div>
      </div>
    </div>
  );
}

function InvoicingTile() {
  return (
    <Tile className="grid w-full lg:grid-cols-12">
      <div className="flex flex-col lg:col-span-5 lg:pb-9">
        <TileHead title="Invoicing." className="lg:max-w-[27rem]">
          Send invoices your customers can pay online by card or bank.
        </TileHead>
        {/* Desktop only: anchors the left column. On smaller screens the invoice right below shows the same marks. */}
        <Facts className="hidden lg:mt-auto lg:block">
          <div className="flex items-center justify-between gap-4 py-2.5">
            <dt className="text-body">Customers pay by</dt>
            <dd className="flex gap-1">
              <MethodMark name="Visa" />
              <MethodMark name="Mastercard" />
              <MethodMark name="PayTo" />
            </dd>
          </div>
        </Facts>
      </div>
      <Stage
        label="Illustrative invoice email and invoice from Coastline Plumbing to Harbour Street Café with a Pay online button"
        className="mx-2.5 mb-2.5 mt-7 h-[360px] sm:h-[400px] md:mt-9 lg:col-span-7 lg:my-2.5 lg:ml-0 lg:h-[440px]"
      >
        <div className="absolute inset-x-4 top-7 flex items-start justify-center sm:inset-x-8 sm:top-9">
          <div className="relative z-10 -mr-3 mt-14 hidden w-[232px] shrink-0 md:block lg:hidden xl:block">
            <InvoiceEmail />
          </div>
          <div className="relative min-w-0 max-w-[372px] flex-1">
            <InvoiceMock />
          </div>
        </div>
      </Stage>
    </Tile>
  );
}

/* ---------- Section ---------- */

export function Products() {
  return (
    <Section id="products" tone="white" className="py-24 md:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-9">
            <Eyebrow>Products</Eyebrow>
            <Headline
              lead="Cards, wallets, PayTo and invoicing, in one place."
              rest="We resell Stripe's payment products, so your payments run on world-class infrastructure."
            />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-3 lg:flex lg:justify-end">
            <ButtonLink href="#pricing" variant="secondary">
              See pricing
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-12 lg:gap-5">
          <Reveal className="flex lg:col-span-7">
            <CardsTile />
          </Reveal>
          <Reveal delay={0.08} className="flex lg:col-span-5">
            <PayToTile />
          </Reveal>
          <Reveal className="flex lg:col-span-12">
            <InvoicingTile />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
