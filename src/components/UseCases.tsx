import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Container, Eyebrow, Headline, MethodMark, Pill, Reveal, Section, Tile } from "./kit";
import { cn } from "./ui/Utils";

// Everything inside the mockups below is illustrative: fictional organisations, names and AUD amounts.

const EASE = [0.22, 1, 0.36, 1] as const;

const money = (n: number) => n.toLocaleString("en-AU", { style: "currency", currency: "AUD" });

type Method = "Visa" | "Mastercard" | "Apple Pay" | "Google Pay" | "PayTo";

/** Faint dot grid behind each mockup, fading out towards the edges (same treatment as Products). */
const DOTS: React.CSSProperties = {
  backgroundImage: "radial-gradient(circle, #D5DDE7 1px, transparent 1.4px)",
  backgroundSize: "14px 14px",
  maskImage: "radial-gradient(ellipse 85% 80% at 50% 40%, #000 30%, transparent 85%)",
  WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 50% 40%, #000 30%, transparent 85%)",
};

/**
 * Tiles sit two to a row and share the row's tracks (CSS subgrid), so each pair's headings and
 * stages line up whatever the heading length. Applied to both the Reveal wrapper and the Tile.
 */
const PAIR = "md:row-span-2 md:grid md:grid-rows-subgrid md:gap-y-0";

/** One stage height for every tile: mockups are laid out against it and bleed off its bottom edge. */
const STAGE_H = "min-h-[330px] md:min-h-[340px]";

/* ---------- Shared mockup bits ---------- */

function Surface({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("overflow-hidden rounded-xl bg-white text-left ring-1 ring-line", className)}>{children}</div>;
}

function OrgMark({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      className={cn(
        "grid h-7 w-7 shrink-0 place-items-center rounded-md bg-brand-tint text-[10px] font-semibold tracking-[0.02em] text-brand-deep",
        className,
      )}
    >
      {initials}
    </span>
  );
}

/**
 * The inset panel a tile's mockup sits on: canvas with a dot grid, as in Products.
 * It is a size container, so the mockups adapt to the tile they are in rather than the viewport.
 */
function Stage({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn("@container relative overflow-hidden rounded-xl bg-canvas ring-1 ring-line/70", className)}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0" style={DOTS} />
      {children}
    </div>
  );
}

function CaseTile({
  title,
  detail,
  label,
  children,
}: {
  title: string;
  detail: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Tile className={cn("flex h-full flex-col", PAIR)}>
      <div className="px-6 pt-7 sm:px-8 sm:pt-8 lg:px-8 lg:pt-9 xl:px-9">
        <Heading title={title} detail={detail} />
      </div>
      <Stage label={label} className={cn("mx-2.5 mb-2.5 mt-7 flex-1 md:mt-9", STAGE_H)}>
        {children}
      </Stage>
    </Tile>
  );
}

/** Tile heading: ink title, body-colour sentence, read as one line (same type as the Products tiles). */
function Heading({ title, detail }: { title: string; detail: string }) {
  return (
    <h3 className="max-w-[34rem] text-[17px] font-medium leading-[1.45] tracking-[-0.015em] text-ink sm:text-[18px] lg:text-[17px] xl:text-[18px]">
      {title}. <span className="font-normal text-body">{detail}</span>
    </h3>
  );
}

/* ---------- Charities: donation sheet over a donations list ---------- */

const DONATIONS: { amount: number; status: "Succeeded" | "Pending"; name: string; method: Method; last4?: string }[] = [
  { amount: 50, status: "Succeeded", name: "Priya Raman", method: "Apple Pay" },
  { amount: 25, status: "Succeeded", name: "Tom Kelly", method: "Visa", last4: "4821" },
  { amount: 100, status: "Succeeded", name: "Anonymous", method: "Google Pay" },
  { amount: 30, status: "Succeeded", name: "Lena Fischer", method: "Mastercard", last4: "1077" },
  { amount: 20, status: "Pending", name: "Sam Okafor", method: "PayTo" },
  { amount: 75, status: "Succeeded", name: "Grace Liu", method: "Visa", last4: "9310" },
  { amount: 40, status: "Succeeded", name: "Mia Harris", method: "Apple Pay" },
  { amount: 15, status: "Succeeded", name: "Daniel Ng", method: "Mastercard", last4: "3346" },
];

const DONATION_COLS =
  "grid grid-cols-[58px_minmax(0,1fr)_auto] gap-x-3 px-4 @min-[600px]:grid-cols-[58px_74px_minmax(0,1fr)_auto]";

function DonationStage() {
  return (
    <>
      {/* The list sits behind and runs off the bottom; hidden on narrow tiles, where the sheet takes the stage. */}
      <Surface className="absolute left-[244px] right-4 top-12 hidden shadow-card @min-[500px]:block">
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <span className="text-[12px] font-medium text-ink">Donations</span>
          <span className="rounded px-1.5 py-0.5 text-[10.5px] text-body ring-1 ring-line">Last 7 days</span>
        </div>
        <div className={cn(DONATION_COLS, "border-b border-line bg-canvas/70 py-1.5 text-[10.5px] font-medium text-subtle")}>
          <span>Amount</span>
          <span className="hidden @min-[600px]:block">Status</span>
          <span>Donor</span>
          <span>Method</span>
        </div>
        {DONATIONS.map((d) => (
          <div key={d.name} className={cn(DONATION_COLS, "items-center border-b border-line/70 py-2 text-[11.5px] last:border-b-0")}>
            <span className="font-mono text-ink tabular">{money(d.amount)}</span>
            <span className="hidden @min-[600px]:block">
              <Pill tone={d.status === "Succeeded" ? "success" : "pending"}>{d.status}</Pill>
            </span>
            <span className="truncate text-body">{d.name}</span>
            <span className="flex items-center gap-1.5 text-subtle">
              <MethodMark name={d.method} />
              {d.last4 && <span className="hidden font-mono text-[10.5px] tabular @min-[560px]:inline">{d.last4}</span>}
            </span>
          </div>
        ))}
      </Surface>

      <Surface className="absolute left-1/2 top-7 w-[220px] -translate-x-1/2 shadow-float @min-[500px]:left-6 @min-[500px]:translate-x-0">
        <div className="px-4 pt-4">
          <div className="flex items-center gap-2">
            <OrgMark initials="NF" />
            <div className="leading-tight">
              <p className="text-[12px] font-medium text-ink">Northside Food Relief</p>
              <p className="mt-0.5 text-[10.5px] text-subtle">Community pantry appeal</p>
            </div>
          </div>
          <p className="mt-4 text-[11px] font-medium text-body">Choose an amount</p>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {[25, 50, 100].map((v) => (
              <span
                key={v}
                className={cn(
                  "rounded-md py-1.5 text-center font-mono text-[12px] tabular ring-1",
                  v === 50 ? "bg-brand-tint text-brand-deep ring-brand" : "bg-white text-ink ring-line",
                )}
              >
                ${v}
              </span>
            ))}
          </div>
          <div className="mt-1.5 rounded-md px-2.5 py-1.5 text-[11px] text-subtle ring-1 ring-line">Other amount</div>
          <div className="mt-3 flex h-8 items-center justify-center rounded-md bg-ink text-[11.5px] font-medium text-white">
            Donate with Apple Pay
          </div>
          <div className="mt-1.5 flex h-8 items-center justify-center rounded-md text-[11.5px] font-medium text-ink ring-1 ring-line">
            Pay by card
          </div>
        </div>
        <div className="mt-3.5 flex items-center justify-between border-t border-line bg-canvas/70 px-4 py-2 text-[10.5px] text-subtle">
          <span>Receipt sent by email</span>
          <span className="flex gap-1">
            <MethodMark name="Visa" />
            <MethodMark name="Mastercard" />
          </span>
        </div>
      </Surface>
    </>
  );
}

/* ---------- Clubs: membership receipt ---------- */

function MembershipStage() {
  const items: [string, number][] = [
    ["Senior membership", 165],
    ["Insurance levy", 20],
  ];
  const rows: [string, React.ReactNode][] = [
    ["Member", "Ava Thompson"],
    [
      "Paid with",
      <span className="flex items-center gap-1.5">
        <MethodMark name="PayTo" />
        PayTo
      </span>,
    ],
    ["Date", "22 Sep 2026"],
    ["Member no.", <span className="font-mono tabular">RNC-0412</span>],
  ];
  return (
    <div className="absolute inset-x-0 top-12 flex justify-center px-6">
      <div className="relative w-full max-w-[284px]">
        <div className="absolute inset-x-7 -top-5 h-24 rounded-xl bg-white/60 ring-1 ring-line" />
        <div className="absolute inset-x-3.5 -top-2.5 h-24 rounded-xl bg-white/90 ring-1 ring-line" />
        <Surface className="relative shadow-float">
          <div className="flex items-start justify-between gap-3 px-4 pt-4">
            <div className="flex items-center gap-2">
              <OrgMark initials="RN" className="bg-ink text-white" />
              <div className="leading-tight">
                <p className="text-[12px] font-medium text-ink">Riverside Netball Club</p>
                <p className="mt-0.5 text-[10.5px] text-subtle">Membership receipt</p>
              </div>
            </div>
            <Pill tone="success">Paid</Pill>
          </div>
          <div className="px-4 pt-4">
            <p className="font-mono text-[24px] leading-none tracking-[-0.02em] text-ink tabular">{money(185)}</p>
            <p className="mt-1.5 text-[11.5px] text-body">2027 season</p>
          </div>
          <div className="mt-4 border-t border-line px-4 py-1.5 text-[11.5px]">
            {items.map(([label, amount]) => (
              <div key={label} className="flex items-center justify-between py-1">
                <span className="text-body">{label}</span>
                <span className="font-mono text-ink tabular">{money(amount)}</span>
              </div>
            ))}
          </div>
          <dl className="border-t border-line px-4 py-1 text-[11.5px]">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between border-b border-line/60 py-1.5 last:border-b-0">
                <dt className="text-subtle">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Surface>
      </div>
    </div>
  );
}

/* ---------- Schools: term fee collection ---------- */

const FAMILIES: { name: string; paid: boolean; method?: Method }[] = [
  { name: "Chen family", paid: true, method: "PayTo" },
  { name: "Nguyen family", paid: true, method: "Visa" },
  { name: "Singh family", paid: false },
  { name: "O'Brien family", paid: true, method: "Apple Pay" },
  { name: "Patel family", paid: true, method: "PayTo" },
  { name: "Williams family", paid: false },
];

function TermFeesStage() {
  const reduce = useReducedMotion();
  return (
    <Surface className="absolute left-1/2 top-7 w-[calc(100%-40px)] max-w-[340px] -translate-x-1/2 shadow-card">
      <div className="px-4 pt-4">
        <div className="flex items-baseline justify-between">
          <p className="text-[12px] font-medium text-ink">Term 4 fees</p>
          <span className="text-[10.5px] text-subtle">Due 17 Oct</span>
        </div>
        <p className="mt-0.5 text-[10.5px] text-subtle">Bright Minds Tutoring</p>
        <div className="mt-3.5 flex items-baseline gap-1.5">
          <span className="font-mono text-[20px] leading-none tracking-[-0.02em] text-ink tabular">$7,000</span>
          <span className="text-[11px] text-subtle">
            of <span className="font-mono tabular">$8,400</span> collected
          </span>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-canvas ring-1 ring-line/60">
          <motion.div
            className="h-full rounded-full bg-brand-bright"
            initial={{ width: reduce ? "83%" : "8%" }}
            whileInView={{ width: "83%" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          />
        </div>
        <p className="mt-1.5 text-[10.5px] text-subtle">
          <span className="tabular">20</span> of <span className="tabular">24</span> families paid
        </p>
      </div>
      <ul className="mt-3 border-t border-line">
        {FAMILIES.map((f) => (
          <li key={f.name} className="flex items-center gap-2 border-b border-line/60 px-4 py-2 text-[11.5px] last:border-b-0">
            <span className="min-w-0 flex-1 truncate text-body">{f.name}</span>
            {f.method && <MethodMark name={f.method} className="hidden @min-[400px]:inline-flex" />}
            <Pill tone={f.paid ? "success" : "pending"}>{f.paid ? "Paid" : "Due 17 Oct"}</Pill>
            <span className="w-[58px] text-right font-mono text-ink tabular">{money(350)}</span>
          </li>
        ))}
      </ul>
    </Surface>
  );
}

/* ---------- Trades: invoice list, with one invoice being paid ---------- */

type InvoiceStatus = "Draft" | "Open" | "Paid";

const INVOICES: { no: string; customer: string; due: string; amount: number; status: InvoiceStatus }[] = [
  { no: "INV-0144", customer: "Tom Kelly", due: "–", amount: 345, status: "Draft" },
  { no: "INV-0143", customer: "Marco Rossi", due: "14 Oct", amount: 1480, status: "Open" },
  { no: "INV-0142", customer: "Harbour Street Café", due: "6 Oct", amount: 819.5, status: "Open" },
  { no: "INV-0141", customer: "Seacliff Gardens", due: "29 Sep", amount: 2240, status: "Paid" },
  { no: "INV-0140", customer: "Riverside Netball Club", due: "24 Sep", amount: 385, status: "Paid" },
  { no: "INV-0139", customer: "Priya Sharma", due: "19 Sep", amount: 260, status: "Paid" },
  { no: "INV-0138", customer: "Grace Liu", due: "12 Sep", amount: 495, status: "Paid" },
];

/** The invoice that gets paid while the tile is on screen. */
const PAYING = "INV-0143";

const INVOICE_COLS =
  "grid grid-cols-[minmax(0,1fr)_68px_52px] items-center gap-x-3 px-4 @min-[480px]:grid-cols-[minmax(0,1fr)_52px_68px_52px]";

const STATUS_TONE: Record<InvoiceStatus, "neutral" | "info" | "success"> = { Draft: "neutral", Open: "info", Paid: "success" };

function InvoicesStage() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setTimeout(() => setPaid(true), 1400);
    return () => window.clearTimeout(id);
  }, [inView, reduce]);

  const settled = paid || !!reduce;
  const paying = INVOICES.find((i) => i.no === PAYING)!;

  return (
    <div ref={ref}>
      <Surface className="absolute left-5 right-5 top-7 shadow-card @min-[480px]:right-10">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
          <div className="flex items-center gap-2">
            <OrgMark initials="CP" className="h-6 w-6" />
            <span className="text-[12px] font-medium text-ink">Invoices</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="hidden rounded px-1.5 py-0.5 text-[10.5px] text-body ring-1 ring-line @min-[400px]:inline">
              Coastline Plumbing
            </span>
            <span className="rounded bg-brand px-2 py-0.5 text-[10.5px] font-medium text-white">New invoice</span>
          </div>
        </div>
        <div className={cn(INVOICE_COLS, "border-b border-line bg-canvas/70 py-1.5 text-[10.5px] font-medium text-subtle")}>
          <span>Customer</span>
          <span className="hidden @min-[480px]:block">Due</span>
          <span className="text-right">Amount</span>
          <span>Status</span>
        </div>
        {INVOICES.map((inv) => {
          const status: InvoiceStatus = inv.no === PAYING && settled ? "Paid" : inv.status;
          const flash = inv.no === PAYING && paid;
          return (
            <motion.div
              key={inv.no}
              initial={false}
              animate={flash ? { backgroundColor: ["rgba(230,247,242,1)", "rgba(230,247,242,0)"] } : undefined}
              transition={{ duration: 2.2, ease: "easeOut" }}
              className={cn(INVOICE_COLS, "border-b border-line/60 py-2 text-[11.5px] last:border-b-0")}
            >
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-ink">{inv.customer}</span>
                <span className="block font-mono text-[10px] text-subtle tabular">{inv.no}</span>
              </span>
              <span className="hidden text-body tabular @min-[480px]:block">{inv.due}</span>
              <span className="text-right font-mono text-ink tabular">{money(inv.amount)}</span>
              <span className="relative">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={status}
                    className="inline-flex"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <Pill tone={STATUS_TONE[status]}>{status}</Pill>
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>
          );
        })}
      </Surface>

      {/* Payment notification over the older rows. Table inset 40px + columns 212px from the right: at 242px wide
          and 16px in, the card's left edge falls in the gutter before "Due", so no column is half covered. */}
      <AnimatePresence>
        {settled && (
          <motion.div
            className="absolute bottom-7 right-4 hidden w-[242px] @min-[480px]:block"
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
          >
            <Surface className="flex items-start gap-2.5 p-3 shadow-float">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-deep">
                <Check className="h-3 w-3" strokeWidth={2.5} />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[12px] font-medium text-ink">Payment received</span>
                <span className="mt-1 block text-[11px] text-body">
                  <span className="font-mono tabular">{money(paying.amount)}</span> from {paying.customer}
                </span>
                <span className="mt-1.5 flex items-center gap-1.5 font-mono text-[10px] text-subtle tabular">
                  {paying.no}
                  <MethodMark name="Visa" />
                  4821
                </span>
              </span>
            </Surface>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Property: strata levies ---------- */

const LEVIES: {
  lot: number;
  owner: string;
  amount: number;
  tone: "success" | "info" | "pending";
  status: string;
  via?: Method;
}[] = [
  { lot: 3, owner: "J. Wu", amount: 1245, tone: "success", status: "Paid", via: "PayTo" },
  { lot: 7, owner: "A. Morgan", amount: 1245, tone: "success", status: "Paid", via: "Visa" },
  { lot: 12, owner: "R. Das", amount: 1610, tone: "info", status: "Scheduled", via: "PayTo" },
  { lot: 15, owner: "K. Byrne", amount: 1245, tone: "pending", status: "Due 1 Nov" },
  { lot: 18, owner: "S. Walsh", amount: 1245, tone: "success", status: "Paid", via: "Mastercard" },
  { lot: 21, owner: "M. Haddad", amount: 1610, tone: "success", status: "Paid", via: "PayTo" },
  { lot: 24, owner: "E. Park", amount: 1245, tone: "pending", status: "Due 1 Nov" },
];

const LEVY_COLS =
  "grid grid-cols-[minmax(0,1fr)_70px_76px] items-center gap-x-3 px-4 @min-[420px]:grid-cols-[minmax(0,1fr)_62px_70px_76px]";

function LevyStage() {
  return (
    <Surface className="absolute left-1/2 top-7 w-[calc(100%-40px)] max-w-[400px] -translate-x-1/2 shadow-card @min-[600px]:max-w-[500px]">
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div className="leading-tight">
          <p className="text-[12px] font-medium text-ink">Admin fund levy, Q4</p>
          <p className="mt-0.5 text-[10.5px] text-subtle">Seacliff Gardens · SP 40127</p>
        </div>
        <span className="rounded px-1.5 py-0.5 text-[10.5px] text-body ring-1 ring-line">All lots</span>
      </div>
      <div className={cn(LEVY_COLS, "border-b border-line bg-canvas/70 py-1.5 text-[10.5px] font-medium text-subtle")}>
        <span>Lot</span>
        <span className="hidden @min-[420px]:block">Paid with</span>
        <span className="text-right">Amount</span>
        <span>Status</span>
      </div>
      {LEVIES.map((l) => (
        <div key={l.lot} className={cn(LEVY_COLS, "border-b border-line/60 py-2 text-[11.5px] last:border-b-0")}>
          <span className="min-w-0 leading-tight">
            <span className="block text-ink">
              Lot <span className="tabular">{l.lot}</span>
            </span>
            <span className="block truncate text-[10.5px] text-subtle">{l.owner}</span>
          </span>
          <span className="hidden @min-[420px]:block">
            {l.via ? <MethodMark name={l.via} /> : <span className="text-subtle">–</span>}
          </span>
          <span className="text-right font-mono text-ink tabular">{money(l.amount)}</span>
          <span>
            <Pill tone={l.tone}>{l.status}</Pill>
          </span>
        </div>
      ))}
    </Surface>
  );
}

/* ---------- Any small business: café dashboard with a live payment feed ---------- */

const CAFE_POOL: { desc: string; method: Method; amount: number }[] = [
  { desc: "2 × flat white", method: "Apple Pay", amount: 11 },
  { desc: "Chicken wrap, iced latte", method: "Visa", amount: 19.5 },
  { desc: "Long black", method: "Google Pay", amount: 4.8 },
  { desc: "Banana bread, chai", method: "Mastercard", amount: 12.3 },
  { desc: "Big breakfast", method: "Apple Pay", amount: 24 },
  { desc: "3 × cappuccino", method: "Visa", amount: 16.5 },
  { desc: "Soup of the day", method: "Google Pay", amount: 14 },
  { desc: "Toastie, OJ", method: "Apple Pay", amount: 17.8 },
  { desc: "Catering order", method: "PayTo", amount: 168 },
];

const HOURLY = [14, 38, 64, 82, 56, 44, 70];
const HOUR_LABELS = ["6am", "7", "8", "9", "10", "11", "12pm"];
const VISIBLE_ROWS = 7;
const BASE_VOLUME = 1180.3;
const BASE_COUNT = 124;

function clock(k: number) {
  const mins = 12 * 60 + 6 + k * 3;
  const h24 = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${h24 < 12 ? "am" : "pm"}`;
}

function CafeDashboard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  const [tick, setTick] = useState(VISIBLE_ROWS - 1);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 3200);
    return () => window.clearInterval(id);
  }, [reduce, inView]);

  const rows = Array.from({ length: VISIBLE_ROWS }, (_, i) => tick - i);
  let volume = BASE_VOLUME;
  for (let k = 0; k <= tick; k++) volume += CAFE_POOL[k % CAFE_POOL.length].amount;

  return (
    <Surface className="absolute inset-x-4 top-7 shadow-card @min-[540px]:inset-x-6">
      <div ref={ref} className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-2">
          <OrgMark initials="HS" className="h-6 w-6" />
          <span className="text-[12px] font-medium text-ink">Harbour Street Café</span>
        </div>
        <span className="rounded px-1.5 py-0.5 text-[10.5px] text-body ring-1 ring-line">Today</span>
      </div>

      <div className="@min-[540px]:grid @min-[540px]:grid-cols-[1fr_1.2fr]">
        <div className="border-b border-line p-4 @min-[540px]:border-b-0 @min-[540px]:border-r">
          <div className="flex gap-8">
            <div>
              <p className="text-[10.5px] text-subtle">Gross volume</p>
              <p className="mt-1 font-mono text-[20px] leading-none tracking-[-0.02em] text-ink tabular">{money(volume)}</p>
            </div>
            <div>
              <p className="text-[10.5px] text-subtle">Payments</p>
              <p className="mt-1 font-mono text-[20px] leading-none tracking-[-0.02em] text-ink tabular">
                {BASE_COUNT + tick + 1}
              </p>
            </div>
          </div>
          <div className="mt-6 hidden @min-[540px]:block">
            <p className="mb-2 text-[10.5px] text-subtle">By hour</p>
            <div className="flex h-[120px] items-end gap-1.5 border-b border-line">
              {HOURLY.map((h, i) => (
                <span
                  key={i}
                  className={cn("flex-1 rounded-t-[3px]", i === HOURLY.length - 1 ? "bg-brand" : "bg-brand-bright/55")}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="mt-1.5 flex gap-1.5 text-[9.5px] text-subtle">
              {HOUR_LABELS.map((l) => (
                <span key={l} className="flex-1 text-center">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between px-4 pb-1.5 pt-3 text-[10.5px] font-medium text-subtle">
            <span>Latest payments</span>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && <span className="absolute inset-0 animate-ping rounded-full bg-brand-bright/70" />}
                <span className="relative h-1.5 w-1.5 rounded-full bg-brand-bright" />
              </span>
              Live
            </span>
          </div>
          <ul className="relative h-[259px] overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout">
              {rows.map((k, i) => {
                const p = CAFE_POOL[k % CAFE_POOL.length];
                return (
                  <motion.li
                    key={k}
                    layout
                    initial={{ opacity: 0, y: -10, backgroundColor: "rgba(230,247,242,1)" }}
                    animate={{ opacity: 1, y: 0, backgroundColor: "rgba(230,247,242,0)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE, backgroundColor: { duration: 1.6 } }}
                    className={cn("flex items-center gap-2.5 border-t border-line/70 px-4 py-2 text-[11.5px]", i === 0 && "border-line")}
                  >
                    <span className="w-[52px] shrink-0 font-mono text-[10.5px] text-subtle tabular">{clock(k)}</span>
                    <MethodMark name={p.method} className="shrink-0" />
                    <span className="min-w-0 flex-1 truncate text-body">{p.desc}</span>
                    <span className="font-mono text-ink tabular">{money(p.amount)}</span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </Surface>
  );
}

/* ---------- Section ---------- */

export function UseCases() {
  return (
    <Section id="use-cases" tone="canvas" className="py-24 md:py-32">
      <Container>
        <Reveal className="max-w-[820px]">
          <Eyebrow>Who it's for</Eyebrow>
          <Headline
            lead={
              <>
                Made for small businesses and <span className="whitespace-nowrap">not-for-profits.</span>
              </>
            }
            rest="From the local netball club to the plumber down the road."
          />
        </Reveal>

        {/* Mixed spans: 7/5, then 5/7 twice (tablet: wide, pair, wide, wide, wide). Each pair shares its row tracks, so headings and stages align. */}
        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          <Reveal className={cn(PAIR, "md:col-span-2 lg:col-span-7")}>
            <CaseTile
              title="Charities & community groups"
              detail="Donations by card, Apple Pay or Google Pay."
              label="Illustrative donation page for Northside Food Relief, over a list of recent donations"
            >
              <DonationStage />
            </CaseTile>
          </Reveal>
          <Reveal delay={0.06} className={cn(PAIR, "lg:col-span-5")}>
            <CaseTile
              title="Clubs & associations"
              detail="Annual memberships, paid by card or PayTo."
              label="Illustrative membership receipt from Riverside Netball Club, paid with PayTo"
            >
              <MembershipStage />
            </CaseTile>
          </Reveal>

          <Reveal className={cn(PAIR, "lg:col-span-5")}>
            <CaseTile
              title="Schools, tutoring & programs"
              detail="Term fees and program payments."
              label="Illustrative term fee tracker for Bright Minds Tutoring showing which families have paid"
            >
              <TermFeesStage />
            </CaseTile>
          </Reveal>
          <Reveal delay={0.06} className={cn(PAIR, "md:col-span-2 lg:col-span-7")}>
            <CaseTile
              title="Professional services & trades"
              detail="Invoices your customers can pay online."
              label="Illustrative invoice list for Coastline Plumbing, with an invoice being paid online"
            >
              <InvoicesStage />
            </CaseTile>
          </Reveal>

          <Reveal className={cn(PAIR, "md:col-span-2 lg:col-span-5")}>
            <CaseTile
              title="Property, strata & facilities"
              detail="Levies and facility fees."
              label="Illustrative strata levy list for Seacliff Gardens showing paid, scheduled and due lots"
            >
              <LevyStage />
            </CaseTile>
          </Reveal>
          <Reveal delay={0.06} className={cn(PAIR, "md:col-span-2 lg:col-span-7")}>
            <CaseTile
              title="Any small business"
              detail="Online orders and pre-orders by card, digital wallet or PayTo."
              label="Illustrative sales dashboard for Harbour Street Café with a live feed of card and wallet payments"
            >
              <CafeDashboard />
            </CaseTile>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
