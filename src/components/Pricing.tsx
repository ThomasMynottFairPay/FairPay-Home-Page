import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ChevronRight } from "lucide-react";
import { ButtonLink, Container, Eyebrow, Headline, MethodMark, Pill, Reveal, Section } from "./kit";
import { community, founding, formatAud, joinLink, links, plans, rates } from "../content/site";
import { cn } from "./ui/Utils";

/* ---------- Helpers ---------- */

const pct = (n: number) => `${Number(n.toFixed(2))}%`;
const rate = (percent: number, fixedCents: number) => `${pct(percent)} + ${fixedCents}c`;
const round2 = (n: number) => Math.round(n * 100) / 100;
// Mockup amounts show cents, like real payment software.
const aud = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

const NewTab = () => <span className="sr-only"> (opens in a new tab)</span>;

/* ---------- Plans: three columns inside one hairline container ---------- */

type Plan = (typeof plans)[number];

function PlanColumn({ plan }: { plan: Plan }) {
  const paid = plan.priceAud > 0;
  const featured = Boolean(plan.highlight);
  const [first, ...others] = plan.features;
  const inherits = first.startsWith("Everything in");
  const items = inherits ? others : plan.features;

  return (
    <div
      className={cn(
        "relative flex flex-col px-6 py-8 sm:px-8 md:row-span-4 md:grid md:grid-rows-subgrid md:gap-0 md:px-6 lg:px-9 lg:py-10",
        featured && "bg-[linear-gradient(180deg,rgba(230,247,242,0.75)_0%,rgba(230,247,242,0)_42%)]",
      )}
    >
      {featured && <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-brand" />}

      <div>
        <h3 className="text-[17px] font-medium leading-snug tracking-[-0.015em] text-ink">{plan.name}</h3>
        <p className="mt-2 max-w-[32ch] text-[14.5px] leading-[1.55] text-body">{plan.blurb}</p>
      </div>

      <div className="mt-8">
        <p className="flex items-baseline gap-1.5">
          <span className="tabular text-[44px] font-medium leading-none tracking-[-0.045em] text-ink lg:text-[52px]">
            {formatAud(plan.priceAud)}
          </span>
          <span className="text-[15px] text-subtle">
            <span aria-hidden>/month</span>
            <span className="sr-only">per month</span>
          </span>
        </p>
        {featured && (
          <div className="mt-4 flex flex-col items-start gap-2 text-[12.5px] leading-snug">
            {featured && (
              <p className="inline-flex items-center gap-2 rounded-md bg-brand-tint px-2 py-1 font-medium text-brand-deep ring-1 ring-brand/15">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                Free for {founding.freePlanMonths} months for founding members
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-8">
        <ButtonLink href={joinLink(`Pricing - ${plan.name}`)} external variant={featured ? "primary" : "secondary"} className="w-full">
          {paid ? "Get started" : "Start free"}
          <span className="sr-only"> with {plan.name}</span>
          <NewTab />
        </ButtonLink>
      </div>

      <div className="mt-8 border-t border-line pt-6">
        <p className="text-[13px] text-subtle">{inherits ? `${first}, plus` : "Includes"}</p>
        <ul className="mt-4 space-y-3">
          {items.map((f) => (
            <li key={f} className="flex gap-2.5 text-[14.5px] leading-[1.45] text-ink">
              <Check aria-hidden className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.25} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Plans() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-line shadow-card">
      <div className="grid divide-y divide-line md:grid-cols-3 md:grid-rows-[auto_auto_auto_1fr] md:divide-x md:divide-y-0">
        {plans.map((plan) => (
          <PlanColumn key={plan.name} plan={plan} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Transaction fees table ---------- */

type Mark = "Visa" | "Mastercard" | "Apple Pay" | "Google Pay" | "PayTo";

type FeeRow = {
  type: string;
  marks: Mark[];
  note?: string;
  standard?: string;
  foundingRate?: string;
  pending?: string;
};

const FEE_ROWS: FeeRow[] = [
  {
    type: "Cards and digital wallets",
    marks: ["Visa", "Mastercard", "Apple Pay", "Google Pay"],
    standard: rate(rates.cards.stripePct + rates.fairpayMarginPct, rates.cards.fixedCents),
    foundingRate: rate(rates.cards.stripePct, rates.cards.fixedCents),
  },
  {
    type: "PayTo",
    marks: ["PayTo"],
    standard: rate(rates.payto.stripePct + rates.fairpayMarginPct, rates.payto.fixedCents),
    foundingRate: rate(rates.payto.stripePct, rates.payto.fixedCents),
    note: `Founding rate capped at $${rates.payto.stripeCapAud.toFixed(2)} per payment`,
  },
];

// The founding column's tint ends on the last row that has rates, with rounded corners.
const LAST_RATED = FEE_ROWS.reduce((at, row, i) => (row.pending ? at : i), 0);

function RowIdentity({ row }: { row: FeeRow }) {
  return (
    <>
      {row.marks.length > 0 && (
        <span className="mt-2.5 flex flex-wrap gap-1" aria-hidden>
          {row.marks.map((m) => (
            <MethodMark key={m} name={m} />
          ))}
        </span>
      )}
      {row.note && (
        <span className="mt-2.5 block text-[12px] leading-snug">
          {row.note}
        </span>
      )}
    </>
  );
}

/** Below `sm`, each payment type stacks: name and marks, then the standard and founding rates as rows. */
function FeeList() {
  return (
    <ul aria-label="Transaction fees by payment type" className="divide-y divide-line border-y border-line sm:hidden">
      {FEE_ROWS.map((row) => (
        <li key={row.type} className="py-6">
          <p className="text-[15px] font-medium leading-snug tracking-[-0.01em] text-ink">{row.type}</p>
          <RowIdentity row={row} />
          {row.pending ? (
            <p className="mt-4 text-[12.5px] leading-snug">
              {row.pending}
            </p>
          ) : (
            <dl className="mt-4 space-y-1.5">
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 px-3 py-2">
                <dt className="text-[13px] text-ink">Standard</dt>
                <dd className="whitespace-nowrap text-right font-mono text-[14px] tabular text-ink">{row.standard}</dd>
                <dd className="col-span-2 mt-0.5 text-[12px] leading-snug text-subtle">
                  Includes {pct(rates.fairpayMarginPct)} FairPay margin
                </dd>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 rounded-lg bg-brand-tint px-3 py-2">
                <dt className="text-[13px] font-medium text-brand-deep">
                  Founding members <span aria-hidden>&middot;</span>
                  <span className="sr-only">,</span> first {founding.marginFreeYears} years
                </dt>
                <dd className="whitespace-nowrap text-right font-mono text-[14px] font-medium tabular text-brand-deep">
                  {row.foundingRate}
                </dd>
                <dd className="col-span-2 mt-0.5 text-[12px] leading-snug text-body">No FairPay margin</dd>
              </div>
            </dl>
          )}
        </li>
      ))}
    </ul>
  );
}

function FeeTable() {
  const cellX = "px-5";
  const rule = "border-b border-line";
  const tint = "bg-brand-tint/55";

  return (
    <table className="hidden w-full table-fixed border-separate border-spacing-0 text-left sm:table">
      <caption className="sr-only">Transaction fees by payment type, standard and founding member rates</caption>
      <colgroup>
        <col className="w-[40%]" />
        <col className="w-[30%]" />
        <col className="w-[30%]" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col" className={cn(rule, "pb-3 pr-3 align-bottom text-[13px] font-normal text-subtle")}>
            Payment type
          </th>
          <th scope="col" className={cn(rule, cellX, "pb-3 align-bottom text-[13px] font-medium text-ink")}>
            Standard
          </th>
          <th
            scope="col"
            className={cn(
              cellX,
              tint,
              "rounded-t-lg border-b border-brand/10 pb-3 pt-4 align-bottom text-[13px] font-medium text-brand-deep",
            )}
          >
            Founding members
            <span className="block font-normal text-body">First {founding.marginFreeYears} years</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {FEE_ROWS.map((row, i) => {
          const last = i === LAST_RATED;
          return (
            <tr key={row.type}>
              <th scope="row" className={cn(rule, "py-5 pr-3 align-top font-normal")}>
                <span className="block text-[15px] font-medium leading-snug tracking-[-0.01em] text-ink">{row.type}</span>
                <RowIdentity row={row} />
              </th>
              {row.pending ? (
                <td colSpan={2} className={cn(rule, cellX, "py-5 align-top text-[12.5px] leading-snug")}>
                  {row.pending}
                </td>
              ) : (
                <>
                  <td className={cn(rule, cellX, "py-5 align-top")}>
                    <span className="block whitespace-nowrap font-mono text-[15px] tabular text-ink">
                      {row.standard}
                    </span>
                    <span className="mt-1.5 block text-[12px] leading-snug text-subtle">
                      Includes {pct(rates.fairpayMarginPct)} FairPay margin
                    </span>
                  </td>
                  <td
                    className={cn(
                      cellX,
                      tint,
                      "py-5 align-top",
                      last ? "rounded-b-lg" : "border-b border-brand/10",
                    )}
                  >
                    <span className="block whitespace-nowrap font-mono text-[15px] font-medium tabular text-brand-deep">
                      {row.foundingRate}
                    </span>
                    <span className="mt-1.5 block text-[12px] leading-snug text-body">No FairPay margin</span>
                  </td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/* ---------- Fee breakdown mockup (interactive, illustrative) ---------- */

const EXAMPLE_PAYMENT = 120;

function Amount({ value, className }: { value: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={cn("relative inline-flex justify-end overflow-hidden font-mono tabular", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function FeeLine({ label, detail, value, total = false }: { label: string; detail?: string; value: string; total?: boolean }) {
  return (
    <div className={cn("flex items-start justify-between gap-4 py-2.5", total && "mt-1 border-t border-line pt-3")}>
      <dt className="min-w-0">
        <span className={cn("block text-[12.5px]", total ? "font-medium text-ink" : "text-ink")}>{label}</span>
        {detail && <span className="mt-0.5 block text-[11px] leading-snug text-subtle">{detail}</span>}
      </dt>
      <dd>
        <Amount value={value} className={cn("text-[12.5px]", total ? "font-medium text-ink" : "text-ink")} />
      </dd>
    </div>
  );
}

function FeeBreakdown() {
  const [isFounding, setIsFounding] = useState(false);
  const stripeFee = round2((EXAMPLE_PAYMENT * rates.cards.stripePct) / 100 + rates.cards.fixedCents / 100);
  const margin = isFounding ? 0 : round2((EXAMPLE_PAYMENT * rates.fairpayMarginPct) / 100);
  const total = round2(stripeFee + margin);

  const toggle = (active: boolean) =>
    cn(
      "inline-flex h-8 flex-1 items-center justify-center whitespace-nowrap rounded-[5px] px-3 text-[12.5px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand sm:flex-none",
      active ? "bg-white text-ink shadow-[0_1px_2px_rgba(11,27,46,0.08)] ring-1 ring-line" : "text-body hover:text-ink",
    );

  return (
    <figure className="relative overflow-hidden rounded-2xl bg-canvas p-4 ring-1 ring-line sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(70% 60% at 85% 10%, rgba(230,247,242,0.95), rgba(230,247,242,0) 70%)" }}
      />

      <div className="relative mx-auto max-w-[400px] overflow-hidden rounded-xl bg-white ring-1 ring-line shadow-float">
        {/* App chrome */}
        <div className="flex items-center justify-between gap-3 border-b border-line bg-canvas/60 px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <span
              aria-hidden
              className="grid h-5 w-5 shrink-0 place-items-center rounded-[5px] bg-ink text-[8px] font-semibold text-white"
            >
              RN
            </span>
            <span className="truncate text-[12px] font-medium text-ink">Riverside Netball Club</span>
          </div>
          <span className="shrink-0 text-[11px] text-subtle">Payment details</span>
        </div>

        {/* Payment summary */}
        <div className="px-4 pt-4 sm:px-5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-mono text-[22px] font-medium tracking-[-0.02em] text-ink tabular">{aud(EXAMPLE_PAYMENT)}</span>
            <span className="text-[12px] text-subtle">AUD</span>
            <Pill tone="success">Succeeded</Pill>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] text-body">
            <span aria-hidden className="inline-flex">
              <MethodMark name="Visa" />
            </span>
            <span className="font-mono tabular">&bull;&bull;&bull;&bull; 4821</span>
            <span aria-hidden className="text-line">|</span>
            <span>Winter season registration</span>
          </div>
        </div>

        {/* Fee breakdown */}
        <div className="mt-4 border-t border-line px-4 pb-3 pt-3.5 sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2.5">
            <p className="text-[12px] font-medium text-ink">Fee breakdown</p>
            <div
              role="group"
              aria-label="Show fees for"
              className="flex w-full gap-1 rounded-lg bg-canvas p-1 ring-1 ring-line sm:inline-flex sm:w-auto"
            >
              <button type="button" aria-pressed={!isFounding} onClick={() => setIsFounding(false)} className={toggle(!isFounding)}>
                Standard
              </button>
              <button type="button" aria-pressed={isFounding} onClick={() => setIsFounding(true)} className={toggle(isFounding)}>
                Founding member
              </button>
            </div>
          </div>

          <dl className="mt-2" aria-live="polite">
            <FeeLine
              label="Stripe's standard rate"
              detail={rate(rates.cards.stripePct, rates.cards.fixedCents)}
              value={aud(stripeFee)}
            />
            <FeeLine
              label="FairPay margin"
              detail={
                isFounding
                  ? `Not charged for your first ${founding.marginFreeYears} years`
                  : pct(rates.fairpayMarginPct)
              }
              value={aud(margin)}
            />
            <FeeLine label="Total fee" value={aud(total)} total />
          </dl>
        </div>
      </div>

      <figcaption className="relative mt-4 text-center text-[12px] leading-snug text-subtle">
        Illustrative example: a {aud(EXAMPLE_PAYMENT)} domestic card payment.
      </figcaption>
    </figure>
  );
}

/* ---------- Section ---------- */

export function Pricing() {
  return (
    <Section id="pricing" tone="white" className="py-24 md:py-32">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Pricing</Eyebrow>
            <Headline
              lead="Simple, honest pricing."
              rest={`Stripe's standard rate plus a ${pct(rates.fairpayMarginPct)} FairPay margin.`}
            />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="max-w-[460px] text-[17px] leading-[1.6] text-body">
              That margin is how we make money, and founding members don't pay it for their first{" "}
              {founding.marginFreeYears} years.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="mt-12 md:mt-16">
          <Plans />
        </Reveal>

        <div className="mt-20 md:mt-28">
          <Reveal>
            <Headline as="h3" size="md" lead="Transaction fees." rest="The same rates on every plan." />
          </Reveal>

          <div className="mt-8 grid gap-10 md:mt-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            <Reveal className="lg:col-span-7">
              <FeeList />
              <FeeTable />
              <p className="mt-6 max-w-[62ch] text-[13px] leading-[1.6] text-subtle">
                Rates are for domestic payments and apply to all plans. Founding member rates apply for{" "}
                {founding.marginFreeYears} years from joining, for members who join before the community reaches{" "}
                <span className="tabular">{formatAud(community.firstGoalAud)}</span>. Invoicing is included in every
                plan;{" "}
                <a href={links.bookChat} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-2 hover:text-ink">
                  ask us about invoicing fees
                </a>
                .
              </p>
              <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.55] text-body">
                Founding members also get {founding.freePlanMonths} months of Connected free (worth{" "}
                <span className="tabular">{formatAud(founding.freePlanValueAud)}</span>).{" "}
                <a
                  href={joinLink("Pricing footnote")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-0.5 whitespace-nowrap rounded-sm font-medium text-brand hover:text-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  Become a founding member
                  <ChevronRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                  <NewTab />
                </a>
              </p>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5">
              <FeeBreakdown />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
