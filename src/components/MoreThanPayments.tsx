// "More than payments": the page's one dark section. Segmented tabs switch between bento views of the
// admin tools FairPay adds on top of Stripe. All mockup data is illustrative (fictional customers of
// a fictional plumbing business). Plan names, support levels and blurbs come from site.ts.
import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, ChevronDown, ChevronRight, Link2, Plus, Search, Send } from "lucide-react";
import { Container, Eyebrow, Headline, MethodMark, Pill, Reveal, Section, Tile } from "./kit";
import { plans } from "../content/site";
import { cn } from "./ui/Utils";

/* ---------- Helpers ---------- */

// Mockup amounts show cents, like real payment software.
const aud = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright";

/** True while the element is on screen and the visitor hasn't asked for reduced motion. */
function useLive(ref: RefObject<HTMLElement | null>) {
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduce = useReducedMotion();
  return inView && !reduce;
}

/** Steps through a small looping sequence while live; otherwise rests on `rest`. */
function useLoop(durations: readonly number[], live: boolean, rest: number) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!live) return;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % durations.length), durations[step]);
    return () => window.clearTimeout(id);
  }, [live, step, durations]);
  return live ? step : rest;
}

/** Tile heading: short white title, muted continuation, read as one line like the section headline. */
function TileHead({ title, children }: { title: string; children: React.ReactNode }) {
  const type = "text-[16px] leading-[1.45] tracking-[-0.012em] sm:text-[17px]";
  return (
    <div className="relative z-10 max-w-[30rem] text-pretty px-6 pt-6 sm:px-8 sm:pt-8">
      <h3 className={cn("inline font-medium text-white", type)}>{title}</h3>{" "}
      <p className={cn("inline text-white/60", type)}>{children}</p>
    </div>
  );
}

/** Mockup stage under a tile heading. Decorative: the heading carries the meaning. */
function Stage({ children, className, glow = false }: { children: React.ReactNode; className?: string; glow?: boolean }) {
  return (
    <div aria-hidden className={cn("relative mt-6 flex-1 sm:mt-7", className)}>
      {glow && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(70% 70% at 50% 100%, rgba(25,211,174,0.16), rgba(25,211,174,0) 70%)" }}
        />
      )}
      {children}
    </div>
  );
}

/** White product window rising from the tile's bottom edge; the tile crops whatever doesn't fit. */
function Window({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-x-4 bottom-0 top-0 flex flex-col overflow-hidden rounded-t-xl bg-white text-ink ring-1 ring-white/10 shadow-[0_-16px_48px_-20px_rgba(0,0,0,0.6)] sm:inset-x-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small FairPay mark for inside mockups (mirrors the navbar mark). */
function FpMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-4 w-4 shrink-0">
      <rect x="2" y="3.5" width="5.33" height="4.5" rx="1.6" fill="#0A7A67" opacity="0.4" />
      <rect x="9.33" y="3.5" width="5.33" height="4.5" rx="1.6" fill="#0A7A67" opacity="0.4" />
      <rect x="16.67" y="3.5" width="5.33" height="4.5" rx="1.6" fill="#0A7A67" opacity="0.4" />
      <rect x="2" y="10" width="9" height="4.5" rx="1.6" fill="#0A7A67" opacity="0.7" />
      <rect x="13" y="10" width="9" height="4.5" rx="1.6" fill="#0A7A67" opacity="0.7" />
      <rect x="2" y="16.5" width="20" height="4.5" rx="1.6" fill="#0A7A67" />
    </svg>
  );
}

/** Xero written as plain text in a neutral chip. Not a logo. */
function XeroTag() {
  return (
    <span className="inline-flex h-5 shrink-0 items-center rounded-[4px] bg-white px-1.5 text-[10.5px] font-semibold tracking-[-0.01em] text-ink ring-1 ring-line">
      Xero
    </span>
  );
}

type AvatarTone = "brand" | "info" | "warm" | "neutral";
const AVATAR: Record<AvatarTone, string> = {
  brand: "bg-brand-tint text-brand",
  info: "bg-[#E8F0FF] text-[#2152B8]",
  warm: "bg-[#FFF4DB] text-[#8A5A00]",
  neutral: "bg-canvas text-body ring-1 ring-line",
};

function Avatar({ initials, tone, large = false }: { initials: string; tone: AvatarTone; large?: boolean }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-semibold",
        large ? "h-10 w-10 text-[13px]" : "h-6 w-6 text-[9px]",
        AVATAR[tone],
      )}
    >
      {initials}
    </span>
  );
}

function Spinner() {
  return <span className="mr-1 inline-block h-2.5 w-2.5 animate-spin rounded-full border-[1.5px] border-current border-t-transparent" />;
}

/* ---------- Accounting: payments syncing to Xero ---------- */

const SYNCED = [
  { when: "10:14 am", who: "Riverside Netball Club", amount: 485 },
  { when: "9:52 am", who: "Bright Minds Tutoring", amount: 918 },
  { when: "9:05 am", who: "Mai Nguyen", amount: 236.5 },
  { when: "25 Sep", who: "Northside Food Relief", amount: 142.5 },
  { when: "25 Sep", who: "Seaview Strata", amount: 2140 },
  { when: "24 Sep", who: "Alex Kowalski", amount: 395 },
  { when: "24 Sep", who: "Freshwater Surf School", amount: 640 },
  { when: "23 Sep", who: "Riverside Netball Club", amount: 1250 },
  { when: "23 Sep", who: "Northside Food Relief", amount: 220 },
];
const ARRIVING = { when: "10:41 am", who: "Harbour Street Café", amount: 1320 };
const SYNC_STEPS = [1400, 1500, 4200] as const; // waiting, syncing, synced

const syncCols =
  "grid grid-cols-[minmax(0,1fr)_80px_72px] items-center gap-3 px-4 sm:grid-cols-[60px_minmax(0,1fr)_92px_80px_72px]";

function SyncRow({ row, syncing = false, fresh = false }: { row: typeof ARRIVING; syncing?: boolean; fresh?: boolean }) {
  return (
    <div className={cn(syncCols, "h-10 border-t border-line text-[12px] transition-colors duration-700", fresh && "bg-brand-tint/60")}>
      <span className="hidden text-subtle tabular sm:block">{row.when}</span>
      <span className="truncate text-ink">{row.who}</span>
      <span className="hidden truncate text-body sm:block">200 · Sales</span>
      <span className="text-right font-mono text-ink tabular">{aud(row.amount)}</span>
      <span className="flex justify-end">
        {syncing ? (
          <Pill tone="pending">
            <Spinner />
            Syncing
          </Pill>
        ) : (
          <Pill tone="success">Synced</Pill>
        )}
      </span>
    </div>
  );
}

function XeroSync() {
  const ref = useRef<HTMLDivElement>(null);
  const live = useLive(ref);
  const step = useLoop(SYNC_STEPS, live, 2);
  const reduce = useReducedMotion();

  return (
    <Window>
      <div ref={ref} className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <FpMark />
          <span className="text-[12px] font-medium">FairPay</span>
          <span className="relative mx-1 h-px w-12 bg-line">
            {step === 1 && (
              <motion.span
                className="absolute -top-[2.5px] left-0 h-1.5 w-1.5 rounded-full bg-brand"
                initial={{ x: 0 }}
                animate={{ x: 42 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </span>
          <XeroTag />
        </div>
        <Pill tone="success">Connected</Pill>
      </div>

      <div className="flex items-end justify-between gap-3 px-4 pb-3 pt-4">
        <div className="min-w-0">
          <p className="text-[13px] font-medium">Payments sent to Xero</p>
          <p className="mt-0.5 truncate text-[11px] text-subtle">Coastline Plumbing Pty Ltd</p>
        </div>
        <p className="shrink-0 text-[11px] text-subtle">{step === 1 ? "Syncing 1 payment" : "Last synced just now"}</p>
      </div>

      <div className={cn(syncCols, "h-8 border-t border-line bg-canvas text-[11px] text-subtle")}>
        <span className="hidden sm:block">Received</span>
        <span>Customer</span>
        <span className="hidden sm:block">Xero account</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Status</span>
      </div>

      <AnimatePresence initial={false}>
        {step > 0 && (
          <motion.div
            key="arriving"
            className="shrink-0 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 40, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <SyncRow row={ARRIVING} syncing={step === 1} fresh={step === 1} />
          </motion.div>
        )}
      </AnimatePresence>
      {SYNCED.map((row) => (
        <SyncRow key={`${row.who}-${row.when}`} row={row} />
      ))}
    </Window>
  );
}

function Toggle() {
  return (
    <span className="relative inline-flex h-4 w-7 shrink-0 items-center rounded-full bg-brand">
      <span className="absolute right-0.5 h-3 w-3 rounded-full bg-white shadow-[0_1px_2px_rgba(11,27,46,0.3)]" />
    </span>
  );
}

/** Xero connection settings. At desktop the tile crops it, so the last row drops out and the window fades
 *  through empty space instead of slicing a line of text. */
function Connections() {
  return (
    <Window className="lg:[mask-image:linear-gradient(to_bottom,black_calc(100%_-_32px),transparent)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <p className="text-[13px] font-medium">Connections</p>
        <p className="text-[11px] text-subtle">Settings</p>
      </div>
      <div className="flex items-center gap-3 px-4 py-3">
        <XeroTag />
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-medium">Xero</p>
          <p className="truncate text-[11px] text-subtle">Coastline Plumbing Pty Ltd</p>
        </div>
        <Pill tone="success">Connected</Pill>
      </div>
      <div className="mx-4 border-t border-line text-[12px]">
        <div className="flex h-9 items-center justify-between gap-3">
          <span className="truncate text-body">Sync payments automatically</span>
          <Toggle />
        </div>
        <div className="flex h-9 items-center justify-between gap-3 border-t border-line">
          <span className="truncate text-body">Xero account</span>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[11.5px] text-ink ring-1 ring-line">
            200 · Sales
            <ChevronDown className="h-3 w-3 text-subtle" />
          </span>
        </div>
        <div className="flex h-9 items-center justify-between gap-3 border-t border-line lg:hidden">
          <span className="text-body">Last sync</span>
          <span className="text-ink">Just now</span>
        </div>
      </div>
    </Window>
  );
}

const includesAccounting = (features: string[]) =>
  features.some((f) => /accounting integration/i.test(f) || /everything in connected/i.test(f));

// The illustrative business in these mockups (Coastline Plumbing) is on this plan.
const CURRENT_PLAN = "Connected";

/**
 * Which plans include accounting integration, derived from site.ts, drawn as a plan settings window.
 * Real information, so it stays readable to assistive tech; only the illustrative "Current plan" tag is hidden.
 */
function PlanWindow() {
  return (
    <div className="relative mx-4 mt-6 flex flex-1 flex-col overflow-hidden rounded-t-xl bg-white text-ink ring-1 ring-white/10 shadow-[0_-16px_48px_-20px_rgba(0,0,0,0.6)] sm:mx-8">
      <div aria-hidden className="flex h-8 shrink-0 items-center justify-between gap-3 border-b border-line bg-canvas px-4 text-[11px] text-subtle">
        <span className="text-[12px] font-medium text-ink">Plan</span>
        <span>Accounting integration</span>
      </div>
      <ul aria-label="Plans that include accounting integration" className="text-[12px]">
        {plans.map((plan, i) => {
          const on = includesAccounting(plan.features);
          const current = plan.name === CURRENT_PLAN;
          const afterCurrent = i > 0 && plans[i - 1].name === CURRENT_PLAN;
          return (
            <li
              key={plan.name}
              className={cn(
                "flex h-[34px] items-center justify-between gap-3 border-t px-4",
                i === 0 || current || afterCurrent ? "border-transparent" : "border-line",
                current && "bg-brand-tint/50 ring-1 ring-inset ring-brand/40",
              )}
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className={cn("truncate", current ? "font-medium text-ink" : "text-body")}>{plan.name}</span>
                {current && (
                  <span aria-hidden className="shrink-0">
                    <Pill tone="info">Current plan</Pill>
                  </span>
                )}
              </span>
              {on ? <Pill tone="success">Included</Pill> : <Pill>Not included</Pill>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- Customers: list and profile ---------- */

const CUSTOMERS: { initials: string; tone: AvatarTone; name: string; sub: string; total: number; last: string }[] = [
  { initials: "HS", tone: "warm", name: "Harbour Street Café", sub: "accounts@harbourstreetcafe.com.au", total: 6842.5, last: "26 Sep" },
  { initials: "RN", tone: "info", name: "Riverside Netball Club", sub: "treasurer@riversidenetball.org.au", total: 2915, last: "26 Sep" },
  { initials: "BM", tone: "brand", name: "Bright Minds Tutoring", sub: "office@brightmindstutoring.com.au", total: 1836, last: "26 Sep" },
  { initials: "MN", tone: "neutral", name: "Mai Nguyen", sub: "Residential · Manly", total: 236.5, last: "26 Sep" },
  { initials: "SS", tone: "info", name: "Seaview Strata", sub: "levies@seaviewstrata.com.au", total: 4280, last: "25 Sep" },
  { initials: "NF", tone: "brand", name: "Northside Food Relief", sub: "hello@northsidefoodrelief.org.au", total: 1142.5, last: "25 Sep" },
  { initials: "FS", tone: "warm", name: "Freshwater Surf School", sub: "bookings@freshwatersurf.com.au", total: 3110, last: "24 Sep" },
  { initials: "AK", tone: "neutral", name: "Alex Kowalski", sub: "Residential · Dee Why", total: 395, last: "24 Sep" },
];

function CustomerList() {
  return (
    <Window>
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <p className="text-[13px] font-medium">
          Customers <span className="ml-1 font-normal text-subtle tabular">128</span>
        </p>
        <span className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-ink ring-1 ring-line">
          <Plus className="h-3 w-3" />
          New
        </span>
      </div>
      <div className="px-4 pt-3">
        <div className="flex h-8 items-center gap-2 rounded-md px-2.5 text-[12px] text-subtle ring-1 ring-line">
          <Search className="h-3.5 w-3.5" />
          Search name or email
        </div>
        <div className="mt-2.5 flex gap-1.5 text-[11px]">
          <span className="rounded px-2 py-0.5 font-medium text-white bg-ink">All</span>
          <span className="rounded bg-canvas px-2 py-0.5 text-body">Commercial</span>
          <span className="rounded bg-canvas px-2 py-0.5 text-body">Residential</span>
          <span className="hidden rounded bg-canvas px-2 py-0.5 text-body sm:inline">Clubs</span>
        </div>
      </div>
      <ul className="mt-3 border-t border-line">
        {CUSTOMERS.map((c, i) => (
          <li
            key={c.name}
            className={cn(
              "flex items-center gap-3 border-b border-line px-4 py-2.5",
              i === 0 && "bg-brand-tint/60 shadow-[inset_2px_0_0_#0A7A67]",
            )}
          >
            <Avatar initials={c.initials} tone={c.tone} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium text-ink">{c.name}</p>
              <p className="truncate text-[11px] text-subtle">{c.sub}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-mono text-[12px] text-ink tabular">{aud(c.total)}</p>
              <p className="text-[11px] text-subtle">{c.last}</p>
            </div>
          </li>
        ))}
      </ul>
    </Window>
  );
}

type Method = "Visa" | "PayTo" | "Apple Pay";
const PROFILE_PAYMENTS: { date: string; ref: string; desc: string; method: Method; last4?: string; amount: number }[] = [
  { date: "26 Sep", ref: "INV-1047", desc: "Grease trap service", method: "Visa", last4: "4821", amount: 1320 },
  { date: "22 Aug", ref: "INV-1011", desc: "Monthly service", method: "PayTo", amount: 385 },
  { date: "25 Jul", ref: "INV-0987", desc: "Monthly service", method: "PayTo", amount: 385 },
  { date: "3 Jul", ref: "INV-0969", desc: "Hot water repair", method: "Apple Pay", amount: 712 },
  { date: "27 Jun", ref: "INV-0958", desc: "Monthly service", method: "PayTo", amount: 385 },
  { date: "26 May", ref: "INV-0931", desc: "Monthly service", method: "PayTo", amount: 385 },
];

const profileCols =
  "grid grid-cols-[minmax(0,1fr)_80px_44px] items-center gap-3 px-4 sm:grid-cols-[48px_minmax(0,1fr)_96px_80px_44px] sm:px-5";

function CustomerProfile() {
  return (
    <Window>
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 sm:px-5">
        <p className="truncate text-[11px] text-subtle">
          Customers <span className="px-1">/</span> <span className="text-ink">Harbour Street Café</span>
        </p>
        <div className="flex shrink-0 gap-1.5">
          <span className="hidden rounded-md px-2 py-1 text-[11px] font-medium text-ink ring-1 ring-line sm:inline">Edit</span>
          <span className="rounded-md bg-brand px-2 py-1 text-[11px] font-medium text-white">New invoice</span>
        </div>
      </div>

      <div className="px-4 pt-4 sm:px-5">
        <div className="flex items-start gap-3">
          <Avatar initials="HS" tone="warm" large />
          <div className="min-w-0">
            <p className="text-[15px] font-medium tracking-[-0.01em]">Harbour Street Café</p>
            <p className="truncate text-[12px] text-subtle">accounts@harbourstreetcafe.com.au</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Pill>Commercial</Pill>
              <Pill tone="info">Monthly service</Pill>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 divide-x divide-line rounded-lg ring-1 ring-line sm:grid-cols-3">
          <div className="px-3 py-2.5">
            <p className="text-[11px] text-subtle">Lifetime paid</p>
            <p className="mt-0.5 font-mono text-[13px] text-ink tabular sm:text-[14px]">{aud(6842.5)}</p>
          </div>
          <div className="px-3 py-2.5">
            <p className="text-[11px] text-subtle">Payments</p>
            <p className="mt-0.5 font-mono text-[13px] text-ink tabular sm:text-[14px]">18</p>
          </div>
          <div className="hidden px-3 py-2.5 sm:block">
            <p className="truncate text-[11px] text-subtle">Customer since</p>
            <p className="mt-0.5 text-[13px] text-ink sm:text-[14px]">Mar 2025</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between px-4 pb-2 sm:px-5">
        <p className="text-[12.5px] font-medium">Recent payments</p>
        <p className="text-[11px] font-medium text-brand">View all</p>
      </div>
      <div className={cn(profileCols, "h-8 border-t border-line bg-canvas text-[11px] text-subtle")}>
        <span className="hidden sm:block">Date</span>
        <span>Description</span>
        <span className="hidden sm:block">Method</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Status</span>
      </div>
      {PROFILE_PAYMENTS.map((p) => (
        <div key={p.ref} className={cn(profileCols, "h-10 shrink-0 border-t border-line text-[12px]")}>
          <span className="hidden text-subtle tabular sm:block">{p.date}</span>
          <span className="truncate text-ink">
            <span className="hidden font-mono text-[11px] text-subtle sm:inline">{p.ref} </span>{p.desc}
          </span>
          <span className="hidden items-center gap-1.5 text-[11px] text-body sm:flex">
            <MethodMark name={p.method} />
            {p.last4 && <span className="font-mono tabular">•• {p.last4}</span>}
          </span>
          <span className="text-right font-mono text-ink tabular">{aud(p.amount)}</span>
          <span className="flex justify-end">
            <Pill tone="success">Paid</Pill>
          </span>
        </div>
      ))}
    </Window>
  );
}

/* ---------- Reconciliation: matching payments to invoices ---------- */

const UNMATCHED = [
  {
    pay: { title: "Seaview Strata", meta: "25 Sep · PayTo", amount: 2140 },
    inv: { title: "INV-1042", meta: "Seaview Strata · Due 2 Oct", amount: 2140 },
  },
  {
    pay: { title: "Mai Nguyen", meta: "26 Sep · Apple Pay", amount: 236.5 },
    inv: { title: "INV-1045", meta: "Mai Nguyen · Due 3 Oct", amount: 236.5 },
  },
  {
    pay: { title: "Alex Kowalski", meta: "24 Sep · Google Pay", amount: 395 },
    inv: { title: "INV-1039", meta: "Alex Kowalski · Due 1 Oct", amount: 395 },
  },
];
const MATCHED_TODAY = [
  { who: "Riverside Netball Club", ref: "INV-1041", amount: 485 },
  { who: "Bright Minds Tutoring", ref: "INV-1043", amount: 918 },
  { who: "Harbour Street Café", ref: "INV-1047", amount: 1320 },
];
const MATCH_STEPS = [2600, 600, 3000] as const; // selected, pressing, matched

type CellState = "idle" | "selected" | "matched";

function Checkbox({ state }: { state: CellState }) {
  return (
    <span
      className={cn(
        "grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[4px] ring-1 transition-colors duration-300",
        state === "idle" && "bg-white ring-[#C9D2DE]",
        state === "selected" && "bg-brand ring-brand",
        state === "matched" && "bg-[#0A6B4F] ring-[#0A6B4F]",
      )}
    >
      {state !== "idle" && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
    </span>
  );
}

function MatchCell({ title, meta, amount, state }: { title: string; meta: string; amount: number; state: CellState }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-3 py-2.5 ring-1 transition-colors duration-300",
        state === "idle" && "ring-line",
        state === "selected" && "bg-brand-tint/50 ring-brand/40",
        state === "matched" && "bg-[#E3F8EF]/70 ring-[#0A6B4F]/25",
      )}
    >
      <Checkbox state={state} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-medium text-ink">{title}</p>
        <p className="truncate text-[11px] text-subtle">{meta}</p>
      </div>
      <p className="shrink-0 font-mono text-[12px] text-ink tabular">{aud(amount)}</p>
    </div>
  );
}

const pairCols = "grid grid-cols-1 gap-1.5 sm:grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)] sm:items-center sm:gap-2";

function Reconcile() {
  const ref = useRef<HTMLDivElement>(null);
  const live = useLive(ref);
  const step = useLoop(MATCH_STEPS, live, 0);
  const matched = step === 2;
  const firstState: CellState = matched ? "matched" : "selected";

  return (
    <Window>
      <div ref={ref} className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div>
          <p className="text-[13px] font-medium">Reconcile</p>
          <p className="text-[11px] text-subtle">September 2026</p>
        </div>
        <div className="flex rounded-md bg-canvas p-0.5 text-[11px] ring-1 ring-line">
          <span className="rounded-[5px] px-2 py-1 text-body">
            All <span className="text-subtle tabular">24</span>
          </span>
          <span className="rounded-[5px] bg-white px-2 py-1 font-medium text-ink ring-1 ring-line">
            Unmatched <span className="tabular">{matched ? 2 : 3}</span>
          </span>
          <span className="rounded-[5px] px-2 py-1 text-body">
            Matched <span className="text-subtle tabular">{matched ? 22 : 21}</span>
          </span>
        </div>
      </div>

      <div className={cn(pairCols, "hidden px-4 pt-3 text-[11px] text-subtle sm:grid")}>
        <span>Payments</span>
        <span />
        <span>Open invoices</span>
      </div>
      <div className="space-y-2 px-4 pt-3 sm:pt-2">
        {UNMATCHED.map((row, i) => {
          const first = i === 0;
          const state: CellState = first ? firstState : "idle";
          return (
            <div key={row.inv.title} className={cn(pairCols, !first && "hidden sm:grid")}>
              <MatchCell {...row.pay} state={state} />
              <div className="flex justify-center">
                {first && (
                  <span
                    className={cn(
                      "grid h-6 w-6 place-items-center rounded-full ring-1 transition-colors duration-300",
                      matched ? "bg-[#0A6B4F] text-white ring-[#0A6B4F]" : "bg-white text-brand ring-brand/40",
                    )}
                  >
                    <Link2 className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
              <MatchCell {...row.inv} state={state} />
            </div>
          );
        })}
      </div>

      <div className="mx-4 mt-3 flex min-h-12 shrink-0 items-center justify-between gap-3 rounded-lg bg-canvas px-3 py-2 ring-1 ring-line">
        {matched ? (
          <>
            <p className="inline-flex min-w-0 items-center gap-1.5 text-[11.5px] font-medium text-[#0A6B4F]">
              <Check className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">INV-1042 matched to payment</span>
            </p>
            <span className="shrink-0 text-[11.5px] font-medium text-body">Undo</span>
          </>
        ) : (
          <>
            <p className="min-w-0 truncate text-[11.5px] text-body">
              <span className="hidden sm:inline">1 payment, 1 invoice selected · </span>Difference{" "}
              <span className="font-mono text-ink tabular">$0.00</span>
            </p>
            <motion.span
              animate={{ scale: step === 1 ? 0.94 : 1 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "inline-flex h-7 shrink-0 items-center rounded-md px-3 text-[11.5px] font-medium text-white transition-colors",
                step === 1 ? "bg-brand-deep" : "bg-brand",
              )}
            >
              Match
            </motion.span>
          </>
        )}
      </div>

      <p className="mt-5 px-4 pb-2 text-[11px] text-subtle">Matched today</p>
      {MATCHED_TODAY.map((m) => (
        <div key={m.ref} className="flex h-10 shrink-0 items-center gap-3 border-t border-line px-4 text-[12px]">
          <span className="min-w-0 flex-1 truncate text-ink">
            {m.who} <span className="font-mono text-[11px] text-subtle">{m.ref}</span>
          </span>
          <span className="font-mono text-ink tabular">{aud(m.amount)}</span>
          <Pill tone="success">Matched</Pill>
        </div>
      ))}
    </Window>
  );
}

const STATUS = [
  { label: "Paid", count: 21, amount: 14982.5, fill: "bg-brand-bright" },
  { label: "Awaiting payment", count: 4, amount: 2310, fill: "bg-white/45" },
  { label: "Overdue", count: 1, amount: 1127.5, fill: "bg-sun" },
];
const STATUS_TOTAL = STATUS.reduce((sum, s) => sum + s.amount, 0);
const STATUS_COUNT = STATUS.reduce((sum, s) => sum + s.count, 0);

function Glance() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="mt-8 px-6 pb-6 sm:px-8 sm:pb-8 lg:mt-auto">
      <div className="flex items-baseline justify-between text-[12px] text-white/55">
        <p>September invoices</p>
        <p className="tabular">{STATUS_COUNT} invoices</p>
      </div>
      <p className="mt-1.5 font-mono text-[30px] leading-tight tracking-[-0.03em] text-white tabular sm:text-[36px]">{aud(STATUS_TOTAL)}</p>
      <motion.div
        className="mt-5 flex h-2 origin-left gap-[3px] overflow-hidden rounded-full"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {STATUS.map((s) => (
          <span key={s.label} className={cn("h-full", s.fill)} style={{ width: `${(s.amount / STATUS_TOTAL) * 100}%` }} />
        ))}
      </motion.div>
      <ul className="mt-6 divide-y divide-line-dark border-t border-line-dark">
        {STATUS.map((s) => (
          <li key={s.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 py-3 text-[13px]">
            <span className="flex min-w-0 items-center gap-2 text-white/85">
              <span className={cn("h-2 w-2 shrink-0 rounded-full", s.fill)} />
              <span className="truncate">{s.label}</span>
            </span>
            <span className="font-mono text-white tabular">{aud(s.amount)}</span>
            <span className="col-start-1 pl-4 text-[11.5px] text-white/50">
              {s.count} {s.count === 1 ? "invoice" : "invoices"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Support: onshore help by plan ---------- */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Support level per plan, read from the plan features in site.ts.
const SUPPORT = plans.map((plan) => {
  const line = plan.features.find((f) => /support/i.test(f)) ?? "";
  const days = /7 days/i.test(line) ? 7 : /business hours/i.test(line) ? 5 : 0;
  return { name: plan.name, line, days };
});

function SupportHours() {
  return (
    <ul className="mx-6 mb-6 mt-6 space-y-3 sm:mx-8 sm:mb-8 lg:mt-auto">
      {SUPPORT.map((s) => (
        <li key={s.name} className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-line-dark sm:p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
            <p className="text-[14px] font-medium text-white">{s.name}</p>
            <p className="text-[12.5px] text-white/60">{s.line}</p>
          </div>
          {s.days > 0 ? (
            <div aria-hidden className="mt-4 grid grid-cols-7 gap-1 sm:gap-1.5">
              {DAYS.map((d, i) => (
                <span
                  key={d}
                  className={cn(
                    "grid h-9 place-items-center rounded-md text-[11px] font-medium ring-1 ring-inset",
                    i < s.days
                      ? "bg-brand-bright/15 text-brand-bright ring-brand-bright/35"
                      : "bg-white/[0.03] text-white/35 ring-white/[0.06]",
                  )}
                >
                  {d}
                </span>
              ))}
            </div>
          ) : (
            <div
              aria-hidden
              className="mt-4 grid h-9 place-items-center rounded-md border border-dashed border-white/15 text-[11px] text-white/50"
            >
              By email
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function Bubble({ mine = false, name, children }: { mine?: boolean; name?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex max-w-[88%] flex-col gap-1", mine ? "items-end self-end" : "items-start self-start")}>
      {name && <p className="px-1 text-[10.5px] text-subtle">{name}</p>}
      <div className="flex items-end gap-2">
        {!mine && <Avatar initials="S" tone="brand" />}
        <p
          className={cn(
            "rounded-2xl px-3 py-2 text-[12px] leading-[1.45]",
            mine ? "rounded-br-md bg-ink text-white" : "rounded-bl-md bg-white text-ink ring-1 ring-line",
          )}
        >
          {children}
        </p>
      </div>
    </div>
  );
}

function SupportThread() {
  const ref = useRef<HTMLDivElement>(null);
  const live = useLive(ref);
  return (
    <Window>
      <div ref={ref} className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium">Connecting Xero</p>
          <p className="text-[11px] text-subtle">Onshore support · Australia</p>
        </div>
        <Pill tone="success">Open</Pill>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden bg-canvas/70 px-4 py-4">
        <p className="text-center text-[10.5px] text-subtle">Today</p>
        <Bubble mine name="Priya · Coastline Plumbing">
          Hi, can you help me connect our Xero account? I'm stuck on the last step.
        </Bubble>
        <Bubble name="Sam · FairPay support">Hi Priya, happy to help. Which step are you up to? I'll walk you through the rest.</Bubble>
        <Bubble mine>The one where I choose the account.</Bubble>
        <div className="flex items-center gap-2 self-start">
          <Avatar initials="S" tone="brand" />
          <div className="flex h-7 items-center gap-1 rounded-2xl rounded-bl-md bg-white px-3 ring-1 ring-line">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-subtle"
                animate={{ opacity: live ? [0.3, 1, 0.3] : 0.6 }}
                transition={live ? { duration: 1.2, repeat: Infinity, delay: i * 0.18 } : { duration: 0 }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 border-t border-line bg-white px-3 py-2.5">
        <div className="h-8 flex-1 rounded-md px-2.5 text-[12px] leading-8 text-subtle ring-1 ring-line">Write a reply…</div>
        <span className="grid h-8 w-8 place-items-center rounded-md bg-brand text-white">
          <Send className="h-3.5 w-3.5" />
        </span>
      </div>
    </Window>
  );
}

/* ---------- Tab panels ---------- */

/** Desktop rows total 592px in every panel; `rows` lets a panel split them unevenly. */
function Bento({ children, rows = "lg:auto-rows-[288px]" }: { children: React.ReactNode; rows?: string }) {
  return <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-12", rows)}>{children}</div>;
}

const connectedBlurb = plans.find((p) => p.name === "Connected")?.blurb ?? "";

function AccountingPanel() {
  return (
    <Bento rows="lg:grid-rows-[320px_256px]">
      <Tile dark className="flex flex-col md:col-span-2 lg:col-span-7 lg:row-span-2">
        <TileHead title="Payments flow straight into Xero.">No exports and no re-keying.</TileHead>
        <Stage glow className="min-h-[340px] sm:min-h-[400px] lg:min-h-0">
          <XeroSync />
        </Stage>
      </Tile>
      <Tile dark className="flex flex-col lg:col-span-5">
        <TileHead title="Set up once.">Connect Xero and payments keep syncing on their own.</TileHead>
        <Stage className="min-h-[224px] lg:min-h-0">
          <Connections />
        </Stage>
      </Tile>
      <Tile dark className="flex flex-col lg:col-span-5">
        <TileHead title="On Connected plans.">{connectedBlurb}</TileHead>
        <PlanWindow />
      </Tile>
    </Bento>
  );
}

function CustomersPanel() {
  return (
    <Bento>
      {/* Profile first in reading order; sits on the right at desktop. */}
      <Tile dark className="flex flex-col md:col-span-2 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
        <TileHead title="Know your customers.">Keep customer details and payment history together in one place.</TileHead>
        <Stage glow className="min-h-[420px] sm:min-h-[440px] lg:min-h-0">
          <CustomerProfile />
        </Stage>
      </Tile>
      <Tile dark className="flex flex-col md:col-span-2 lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1">
        <TileHead title="Everyone who pays you.">One list, from regulars to one-off jobs.</TileHead>
        <Stage className="min-h-[340px] lg:min-h-0">
          <CustomerList />
        </Stage>
      </Tile>
    </Bento>
  );
}

function ReconciliationPanel() {
  return (
    <Bento>
      <Tile dark className="flex flex-col md:col-span-2 lg:col-span-8 lg:row-span-2">
        <TileHead title="Reconcile without the spreadsheet.">Match payments to invoices in one place.</TileHead>
        <Stage glow className="min-h-[340px] sm:min-h-[420px] lg:min-h-0">
          <Reconcile />
        </Stage>
      </Tile>
      <Tile dark className="flex flex-col md:col-span-2 lg:col-span-4 lg:row-span-2">
        <TileHead title="See what's been paid at a glance.">Every invoice, sorted by where it's up to.</TileHead>
        <Glance />
      </Tile>
    </Bento>
  );
}

function SupportPanel() {
  return (
    <Bento>
      <Tile dark className="flex flex-col md:col-span-2 lg:col-span-7 lg:row-span-2">
        <TileHead title="Onshore support.">Help from a team in Australia, on the days your plan covers.</TileHead>
        <SupportHours />
      </Tile>
      <Tile dark className="flex flex-col md:col-span-2 lg:col-span-5 lg:row-span-2">
        <TileHead title="A real person, in Australia.">Ask a question and someone local picks it up.</TileHead>
        <Stage glow className="min-h-[400px] lg:min-h-0">
          <SupportThread />
        </Stage>
      </Tile>
    </Bento>
  );
}

const TABS = [
  { id: "accounting", label: "Accounting", Panel: AccountingPanel },
  { id: "customers", label: "Customers", Panel: CustomersPanel },
  { id: "reconciliation", label: "Reconciliation", Panel: ReconciliationPanel },
  { id: "support", label: "Support", Panel: SupportPanel },
] as const;

/* ---------- Section ---------- */

export function MoreThanPayments() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // On narrow screens the tab row scrolls sideways; keep the active tab in view. Scrolls only the tab row
  // (scrollIntoView could also move the page vertically).
  useEffect(() => {
    const scroller = scrollerRef.current;
    const tab = tabRefs.current[active];
    if (!scroller || !tab || scroller.scrollWidth <= scroller.clientWidth) return;
    const pad = 20;
    const s = scroller.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    const delta = t.left < s.left + pad ? t.left - s.left - pad : t.right > s.right - pad ? t.right - s.right + pad : 0;
    if (delta) scroller.scrollBy({ left: delta, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = TABS.length - 1;
    const next =
      e.key === "ArrowRight" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="features" tone="ink" className="py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 right-[-20%] h-[560px] w-[900px] max-w-none"
        style={{ background: "radial-gradient(closest-side, rgba(25,211,174,0.12), rgba(25,211,174,0))" }}
      />
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-7">
            <Eyebrow dark>Beyond the checkout</Eyebrow>
            <Headline
              dark
              lead="More than payments."
              rest="FairPay sits on top of Stripe to take the admin out of getting paid."
            />
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[17px] leading-[1.6] text-white/65">
              Sync payments to Xero, keep each customer's history in one place, and get help from a team in Australia.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12 md:mt-16">
          {/* Segmented control. Two by two on phones so every tab is visible; one row from `sm` up. */}
          <div
            ref={scrollerRef}
            className="sm:-mx-5 sm:overflow-x-auto sm:px-5 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            <div
              role="tablist"
              aria-label="What FairPay adds"
              className="grid w-full grid-cols-2 gap-0.5 rounded-[10px] bg-white/[0.04] p-1 ring-1 ring-inset ring-line-dark sm:flex sm:w-max"
            >
              {TABS.map((tab, i) => {
                const selected = i === active;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`features-tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls={`features-panel-${tab.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={cn(
                      "relative h-9 shrink-0 whitespace-nowrap rounded-md px-4 text-[14px] font-medium leading-none transition-colors",
                      focusRing,
                      selected ? "text-ink" : "text-white/65 hover:text-white",
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="features-tab-highlight"
                        className="absolute inset-0 rounded-md bg-white shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
                        transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.15, duration: 0.45 }}
                      />
                    )}
                    <span className="relative">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {TABS.map((tab, i) => (
            <div
              key={tab.id}
              role="tabpanel"
              id={`features-panel-${tab.id}`}
              aria-labelledby={`features-tab-${tab.id}`}
              hidden={i !== active}
              tabIndex={0}
              className={cn("mt-6 rounded-2xl md:mt-8", focusRing)}
            >
              {i === active && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <tab.Panel />
                </motion.div>
              )}
            </div>
          ))}
        </Reveal>

        <div className="mt-10 flex flex-col gap-3 border-t border-line-dark pt-6 text-[15px] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/60">Accounting integration and onshore support come with Connected plans.</p>
          <a
            href="#pricing"
            className={cn(
              "group inline-flex items-center gap-1 self-start rounded-sm font-medium text-white transition-colors hover:text-brand-bright sm:self-auto",
              focusRing,
            )}
          >
            Compare plans
            <ChevronRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Container>
    </Section>
  );
}
