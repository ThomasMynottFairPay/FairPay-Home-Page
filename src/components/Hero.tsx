import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "motion/react";
import { Bell, Check, ChevronRight, CreditCard, FileText, Handshake, House, Search, Users } from "lucide-react";
import { BrowserFrame, ButtonLink, Container, Headline, MethodMark, PhoneFrame, Pill, Reveal, Section } from "./kit";
import { joinLink } from "../content/site";
import { cn } from "./ui/Utils";

/* ---------- Illustrative mockup data (fictional club, fictional people) ---------- */

type Method = "Visa" | "Mastercard" | "Amex" | "Apple Pay" | "Google Pay" | "PayTo";
type Status = "Succeeded" | "Processing" | "Paid";

type Payment = {
  customer: string;
  detail: string;
  method: Method;
  amount: number;
  status: Status;
  fromPhone?: boolean;
};

type Row = Payment & { key: string; time: string; fresh?: boolean };

const ROW_H = 44;
const VISIBLE_ROWS = 5;
const BASE_VOLUME = 1284.5;
const BASE_COUNT = 23;
const FIRST_ARRIVAL_MIN = 10 * 60 + 43;

const INITIAL_ROWS: Row[] = [
  { key: "i1", customer: "Maya Patel", detail: "Uniform order", method: "Visa", amount: 65, status: "Succeeded", time: "10:38 am" },
  { key: "i2", customer: "Harbour Street Café", detail: "Sponsorship invoice", method: "PayTo", amount: 750, status: "Processing", time: "10:31 am" },
  { key: "i3", customer: "Liam O'Brien", detail: "Canteen order", method: "Google Pay", amount: 12.5, status: "Succeeded", time: "10:24 am" },
  { key: "i4", customer: "Aroha Ngata", detail: "Senior season fees", method: "Mastercard", amount: 220, status: "Succeeded", time: "10:17 am" },
  { key: "i5", customer: "Jack Thompson", detail: "Term 4 fees", method: "PayTo", amount: 120, status: "Succeeded", time: "10:05 am" },
  { key: "i6", customer: "Coastline Plumbing", detail: "Sponsorship invoice", method: "Amex", amount: 500, status: "Paid", time: "9:52 am" },
];

// Payments that arrive on a loop. The first one is the checkout shown on the phone.
const ARRIVALS: Payment[] = [
  { customer: "Sophie Chen", detail: "Junior registration", method: "Apple Pay", amount: 48, status: "Succeeded", fromPhone: true },
  { customer: "Ethan Nguyen", detail: "Canteen order", method: "Google Pay", amount: 9.5, status: "Succeeded" },
  { customer: "Grace Williams", detail: "Term 4 fees", method: "PayTo", amount: 120, status: "Processing" },
  { customer: "Bright Minds Tutoring", detail: "Sponsorship invoice", method: "Visa", amount: 250, status: "Paid" },
  { customer: "Ruby Kaur", detail: "Uniform order", method: "Mastercard", amount: 65, status: "Succeeded" },
];

const STATUS_TONE: Record<Status, "success" | "pending"> = { Succeeded: "success", Paid: "success", Processing: "pending" };

const money = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Payments table columns: customer, method, amount, status.
const TABLE_COLS = "grid-cols-[minmax(0,1fr)_64px_62px_74px] gap-2.5";

function clock(totalMinutes: number) {
  const m = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  return `${((h + 11) % 12) + 1}:${String(m % 60).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

/** Drives the looping "payment arrives" story shared by the phone and the dashboard. */
function usePaymentFeed(live: boolean) {
  const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);
  const [paid, setPaid] = useState(false);
  const [stats, setStats] = useState({ volume: BASE_VOLUME, count: BASE_COUNT });
  const seq = useRef(0);

  useEffect(() => {
    if (!live) return;
    const timers = new Set<number>();
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };

    const step = () => {
      const i = seq.current++;
      const p = ARRIVALS[i % ARRIVALS.length];
      const arrive = () => {
        setRows((r) => [{ ...p, key: `live-${i}`, time: clock(FIRST_ARRIVAL_MIN + i * 3), fresh: true }, ...r].slice(0, VISIBLE_ROWS + 1));
        setStats((s) => ({ volume: s.volume + p.amount, count: s.count + 1 }));
      };
      if (p.fromPhone) {
        setPaid(true);
        later(arrive, 650);
        later(() => setPaid(false), 3600);
      } else {
        arrive();
      }
      later(step, 3800);
    };

    later(step, 1800);
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      setPaid(false);
    };
  }, [live]);

  return { rows, paid, stats };
}

/* ---------- Small mockup parts ---------- */

function Ticker({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const from = useRef(value);
  useEffect(() => {
    const node = ref.current;
    if (!node || from.current === value) return;
    const controls = animate(from.current, value, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = money(v);
      },
    });
    from.current = value;
    return () => controls.stop();
  }, [value]);
  return <span ref={ref}>{money(value)}</span>;
}

function smoothPath(pts: [number, number][]) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
}

// Cumulative volume through the day, in a 100 x 40 box (y grows downward).
const TODAY: [number, number][] = [[0, 39], [6, 38], [12, 37], [18, 35], [24, 34.5], [30, 31], [36, 29.5], [42, 28], [48, 24.5], [54, 22], [60, 20], [66, 16]];
const YESTERDAY: [number, number][] = [[0, 39], [8, 38], [16, 37], [24, 36], [32, 34], [40, 32], [48, 29.5], [56, 28], [64, 25], [72, 23], [80, 21], [88, 19], [100, 17]];

function VolumeChart() {
  const today = smoothPath(TODAY);
  const last = TODAY[TODAY.length - 1];
  return (
    <div className="relative mt-3 h-12">
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="fp-hero-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#19D3AE" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#19D3AE" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="39.5" x2="100" y2="39.5" stroke="#E4E9F0" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d={smoothPath(YESTERDAY)} fill="none" stroke="#C3CCD8" strokeWidth="1.25" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        <path d={`${today} L${last[0]},40 L0,40 Z`} fill="url(#fp-hero-area)" />
        <path d={today} fill="none" stroke="#0A7A67" strokeWidth="1.75" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <span
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-2 ring-white"
        style={{ left: `${last[0]}%`, top: `${(last[1] / 40) * 100}%` }}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-brand/40" />
      </span>
    </div>
  );
}

const NAV = [
  { icon: House, label: "Home" },
  { icon: CreditCard, label: "Payments", active: true },
  { icon: FileText, label: "Invoices" },
  { icon: Users, label: "Customers" },
  { icon: Handshake, label: "Community" },
];

const FRESH_INITIAL = { height: 0, opacity: 0, backgroundColor: "rgba(230,247,242,1)" };
const ROW_ANIMATE = { height: ROW_H, opacity: 1, backgroundColor: "rgba(230,247,242,0)" };
const ROW_TRANSITION = {
  height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  opacity: { duration: 0.35, delay: 0.1 },
  backgroundColor: { duration: 2.4, delay: 0.6 },
};

function Dashboard({ rows, volume, count }: { rows: Row[]; volume: number; count: number }) {
  return (
    <div className="flex text-[12px] text-body">
      <aside className="hidden w-[152px] shrink-0 flex-col border-r border-line bg-canvas/70 px-2.5 py-3 md:flex lg:hidden xl:flex">
        <div className="flex items-center gap-1.5 rounded-md px-1 py-1">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-ink text-[8px] font-semibold text-white">RN</span>
          <span className="truncate text-[11.5px] font-medium text-ink">Riverside Netball</span>
        </div>
        <nav className="mt-4 space-y-0.5">
          {NAV.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px]",
                active ? "bg-white font-medium text-ink ring-1 ring-line" : "text-body",
              )}
            >
              <Icon className={cn("h-3.5 w-3.5", active ? "text-brand" : "text-subtle")} strokeWidth={1.75} />
              {label}
            </div>
          ))}
        </nav>
        <p className="mt-auto px-2 pt-6 text-[11px] font-medium tracking-[-0.01em] text-subtle">FairPay</p>
      </aside>

      {/* Container query: the time only joins the row detail when the table is wide enough to show it untruncated. */}
      <div className="@container min-w-0 flex-1 px-4 pb-3 pt-4 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[15px] font-medium tracking-[-0.01em] text-ink">Payments</p>
          <div className="flex items-center gap-2 text-subtle">
            <span className="hidden h-6 items-center gap-1.5 rounded-md px-2 text-[11px] ring-1 ring-line sm:flex">
              <Search className="h-3 w-3" />
              Search
            </span>
            <Bell className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="mt-3 border-b border-line pb-3">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] text-subtle">Gross volume · Today</p>
              <p className="mt-0.5 font-mono text-[19px] font-medium tracking-[-0.02em] text-ink tabular">
                <Ticker value={volume} />
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-subtle">Payments</p>
              <p className="mt-0.5 font-mono text-[13px] text-ink tabular">{count}</p>
            </div>
          </div>
          <VolumeChart />
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-subtle tabular">
            <span>12:00 am</span>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="h-0.5 w-2.5 rounded bg-brand" />
                Today
              </span>
              <span className="flex items-center gap-1">
                <span className="h-0 w-2.5 border-t border-dashed border-[#C3CCD8]" />
                Yesterday
              </span>
            </span>
            <span>11:59 pm</span>
          </div>
        </div>

        <div className={cn("grid items-center border-b border-line py-2 text-[11px] text-subtle", TABLE_COLS)}>
          <span>Customer</span>
          <span>Method</span>
          <span className="text-right">Amount</span>
          <span>Status</span>
        </div>
        <div className="overflow-hidden" style={{ height: ROW_H * VISIBLE_ROWS }}>
          {rows.map((r) => (
            <motion.div
              key={r.key}
              initial={r.fresh ? FRESH_INITIAL : false}
              animate={ROW_ANIMATE}
              transition={ROW_TRANSITION}
              className="overflow-hidden border-b border-line/70"
              style={{ height: ROW_H }}
            >
              <div className={cn("grid h-full items-center", TABLE_COLS)}>
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-medium leading-tight text-ink">{r.customer}</p>
                  <p className="truncate text-[11px] leading-tight text-subtle">
                    {r.detail}
                    <span className="hidden @min-[400px]:inline"> · {r.time}</span>
                  </p>
                </div>
                <span>
                  <MethodMark name={r.method} className="whitespace-nowrap" />
                </span>
                <span className="text-right font-mono text-[12px] text-ink tabular">{money(r.amount)}</span>
                <span>
                  <Pill tone={STATUS_TONE[r.status]}>{r.status}</Pill>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Checkout({ paid }: { paid: boolean }) {
  return (
    <div className="relative h-[372px] px-4 pb-4 text-[12px] text-body">
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[8px] font-semibold text-white">RN</span>
        <span className="text-[12px] font-medium text-ink">Riverside Netball Club</span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {paid ? (
          <motion.div
            key="paid"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex h-[332px] flex-col items-center pt-12 text-center"
          >
            <motion.span
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="grid h-11 w-11 place-items-center rounded-full bg-brand-tint text-brand"
            >
              <Check className="h-5 w-5" strokeWidth={2.25} />
            </motion.span>
            <p className="mt-4 text-[15px] font-medium tracking-[-0.01em] text-ink">Payment complete</p>
            <p className="mt-1 text-balance text-[12px]">{money(48)} paid to Riverside Netball Club</p>
            <div className="mt-6 w-full divide-y divide-line rounded-lg text-left ring-1 ring-line">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-subtle">Paid with</span>
                <MethodMark name="Apple Pay" />
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-subtle">Receipt</span>
                <span className="font-mono text-[11px] text-ink tabular">#1042-7781</span>
              </div>
            </div>
            <div className="mt-auto flex h-9 w-full items-center justify-center rounded-lg text-[12px] font-medium text-ink ring-1 ring-line">
              Done
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="pay"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-5 text-[11px] text-subtle">Junior registration · Term 4</p>
            <p className="mt-0.5 text-[28px] font-medium leading-none tracking-[-0.03em] text-ink tabular">{money(48)}</p>
            <div className="mt-5 flex h-10 items-center justify-center gap-1 rounded-lg bg-black text-[13px] text-white">
              <span className="opacity-75">Pay with</span>
              <span className="font-semibold">Apple Pay</span>
            </div>
            <div className="my-3.5 flex items-center gap-2 text-[10px] text-subtle">
              <span className="h-px flex-1 bg-line" />
              Or pay another way
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="divide-y divide-line overflow-hidden rounded-lg ring-1 ring-line">
              <div className="flex items-center gap-2.5 px-3 py-2.5">
                <span className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-inset ring-[#C3CCD8]" />
                <span className="font-medium text-ink">Card</span>
                <span className="ml-auto flex gap-1">
                  <MethodMark name="Visa" className="min-w-7" />
                  <MethodMark name="Mastercard" className="min-w-7" />
                </span>
              </div>
              {/* Selected option: the label and mark share the first line so the hint gets the full width. */}
              <div className="flex items-start gap-2.5 bg-brand-tint/40 px-3 py-2.5">
                <span className="mt-[3px] grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-brand">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex h-5 items-center justify-between gap-2">
                    <span className="font-medium text-ink">PayTo</span>
                    <MethodMark name="PayTo" />
                  </span>
                  <span className="mt-0.5 block text-balance text-[10px] leading-snug text-subtle">Approve in your banking app</span>
                </span>
              </div>
            </div>
            <div className="mt-3 flex h-9 items-center justify-center rounded-lg bg-brand text-[12px] font-medium text-white">
              Pay {money(48)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Merchant-side notification for the phone checkout. Two stacked columns so nothing truncates at 240px. */
function PaymentToast() {
  return (
    <div className="flex gap-2.5 rounded-xl bg-white p-3 text-[11px] leading-[1.35] ring-1 ring-line shadow-float">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-[12px] font-medium text-ink">Payment received</p>
          <p className="font-mono text-[12px] font-medium text-ink tabular">{money(48)}</p>
        </div>
        <div className="mt-1 flex items-start justify-between gap-2">
          <p className="text-subtle">
            Sophie Chen
            <br />
            Junior registration
          </p>
          <MethodMark name="Apple Pay" className="shrink-0 whitespace-nowrap" />
        </div>
      </div>
    </div>
  );
}

const TOAST_IN = { opacity: 1, y: 0, scale: 1, transition: { delay: 0.6, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } };
const TOAST_OUT = { opacity: 0, y: -6, transition: { duration: 0.25 } };

/** Shown while the phone payment lands; enters with the dashboard row (650ms after the tap). */
function ToastSlot({ show, className }: { show: boolean; className: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div key="toast" initial={{ opacity: 0, y: -10, scale: 0.97 }} animate={TOAST_IN} exit={TOAST_OUT} className={className}>
          <PaymentToast />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Composition ---------- */

function HeroComposition() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const reduce = useReducedMotion();
  const { rows, paid, stats } = usePaymentFeed(inView && !reduce);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Illustrative FairPay dashboard for a netball club showing recent card, wallet and PayTo payments, beside a mobile checkout"
      className="relative"
    >
      {/* Colour field behind the mockups on smaller screens (desktop uses the section-level field). */}
      <div aria-hidden className="fp-mesh pointer-events-none absolute -inset-x-24 -bottom-16 -top-20 -z-10 opacity-90 blur-2xl lg:hidden" />

      {/* Tablet and desktop: dashboard with the phone layered over it, and a toast when a payment lands.
          The phone is anchored to the wrapper's bottom, so the bottom padding sets how far it hangs below the frame:
          pb-28 puts its top edge just under the "Invoices" nav item. It sits exactly over the dashboard sidebar
          (phone 216px = offset + 152px sidebar). At lg the phone is hidden, so nothing hangs below. */}
      <div className="relative hidden pb-28 pl-16 md:block lg:pb-0 lg:pl-0 xl:pb-28 xl:pl-10">
        <BrowserFrame
          url="app.fairpay-ai.com"
          className="w-full xl:max-[1359px]:w-[calc(100%+3rem)] min-[1360px]:w-[calc(100%+6rem)]"
        >
          <Dashboard rows={rows} volume={stats.volume} count={stats.count} />
        </BrowserFrame>
        <PhoneFrame className="absolute bottom-0 left-0 w-[216px] lg:hidden xl:-left-6 xl:block">
          <Checkout paid={paid} />
        </PhoneFrame>
        {/* Inset 24px from the frame's right edge (the frame overhangs the column by 3rem at xl, 6rem from 1360px). */}
        <ToastSlot
          show={paid}
          className="absolute -top-8 right-6 z-10 w-[264px] xl:max-[1359px]:-right-6 min-[1360px]:-right-18"
        />
      </div>

      {/* Mobile: the checkout, with the toast tucked beneath. The slot keeps its height so nothing jumps. */}
      <div className="relative mx-auto w-full max-w-[320px] md:hidden">
        <PhoneFrame className="mx-auto w-[244px]">
          <Checkout paid={paid} />
        </PhoneFrame>
        <div className="relative -mt-5 ml-auto h-[76px] w-[240px]">
          <ToastSlot show={paid} className="absolute inset-x-0 top-0" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

const METHODS: Method[] = ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay", "PayTo"];

export function Hero() {
  return (
    <Section tone="white" className="isolate">
      {/* Soft colour field anchored top-right, bleeding off-canvas, cut by a diagonal. Masked so text sits on white. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden lg:block">
        <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent_30%,black_62%)]">
          <div className="fp-mesh absolute -top-24 right-[-8rem] h-[64rem] w-[96rem]" />
          <div className="fp-mesh absolute -top-16 right-[-18rem] h-[52rem] w-[80rem] opacity-60" />
        </div>
        <div className="absolute -bottom-40 -left-20 -right-20 h-[26rem] origin-bottom-right -skew-y-[7deg] bg-white" />
      </div>

      <Container className="pb-16 pt-28 sm:pt-32 md:pb-20 lg:pt-36">
        <div className="grid items-center gap-y-16 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-6">
            <Reveal>
              <a
                href="#community"
                className="group inline-flex items-center gap-2 rounded-full bg-white/80 py-1.5 pl-3 pr-2.5 text-[13px] font-medium text-ink ring-1 ring-line backdrop-blur transition-shadow hover:ring-ink/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                Founding memberships now open
                <ChevronRight className="h-3.5 w-3.5 text-subtle transition-transform group-hover:translate-x-0.5" aria-hidden />
              </a>
            </Reveal>
            <Reveal delay={0.05}>
              <Headline
                as="h1"
                size="xl"
                lead="Big-business payment rates,"
                rest="for small businesses and not-for-profits."
                className="mt-7 max-w-[42rem] lg:text-[54px] xl:text-[60px]"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[30rem] text-[17px] leading-[1.6] text-body sm:text-[18px]">
                FairPay pools the payment volume of Australian small businesses and not-for-profits into real buying power. The
                bigger our community grows, the better the deal for every member.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={joinLink("Hero")} external className="whitespace-nowrap">
                  Become a founding member
                  <span className="sr-only"> (opens in a new tab)</span>
                </ButtonLink>
                <ButtonLink href="#how-it-works" variant="secondary" className="whitespace-nowrap">
                  See how it works
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.2}>
              <HeroComposition />
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Payment methods strip: the hero's footer. Marks grouped tightly after the label. */}
      <div className="relative border-t border-line bg-white/70 backdrop-blur-sm">
        <Container className="flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:gap-6">
          <p className="text-[14px] font-medium text-ink lg:shrink-0">Take cards, digital wallets and PayTo</p>
          <ul className="grid grid-cols-3 gap-2 md:flex md:items-center md:justify-start md:gap-2" aria-label="Payment methods">
            {METHODS.map((m) => (
              <li key={m}>
                <span className="sr-only">{m}</span>
                <span aria-hidden className="flex">
                  <MethodMark
                    name={m}
                    className="h-9 w-full whitespace-nowrap rounded-md px-3 text-[12px] md:w-auto md:min-w-[64px]"
                  />
                </span>
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-body lg:ml-auto lg:shrink-0">Built on Stripe</p>
        </Container>
      </div>
    </Section>
  );
}
