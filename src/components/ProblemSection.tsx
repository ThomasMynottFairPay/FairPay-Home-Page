import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Container, Eyebrow, Headline, Pill, Reveal, Section } from "./kit";
import { cn } from "./ui/Utils";
import { rates } from "../content/site";

const cardRate = `${rates.cards.stripePct}% + ${rates.cards.fixedCents}c`;

const points = [
  {
    title: "No buying power",
    body: "On your own, your payment volume is too small for a provider to offer you a better deal.",
  },
  {
    title: "The standard rate, every time",
    body: "Every tap, click and invoice is charged at the full standard rate, and it adds up across the year.",
  },
  {
    title: "Bigger businesses pay less",
    body: "Larger businesses get custom pricing and cheaper routing for exactly the same payments.",
  },
];

/* Illustrative members, bottom of the stack first. Heights are % of the plot. */
const members = [
  { name: "Harbour Street Café", h: 14, color: "#0A7A67", you: true },
  { name: "Riverside Netball Club", h: 12, color: "#0E9478" },
  { name: "Northside Food Relief", h: 16, color: "#13B394" },
  { name: "Bright Minds Tutoring", h: 10, color: "#19D3AE" },
  { name: "Coastline Plumbing", h: 13, color: "#74E2CB" },
];
const YOU_HEIGHT = members[0].h;

const PLOT_H = "h-[150px] sm:h-[180px]";

/** Faint horizontal gridlines and a baseline, sized to the plot. */
function Grid() {
  return (
    <div className={cn("pointer-events-none absolute inset-x-0 top-0", PLOT_H)}>
      {[0, 25, 50, 75].map((t) => (
        <span key={t} className="absolute inset-x-0 border-t border-dashed border-line" style={{ top: `${t}%` }} />
      ))}
      <span className="absolute inset-x-0 bottom-0 border-t border-[#CBD3DE]" />
    </div>
  );
}

function Column({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("relative flex items-end justify-center", PLOT_H)}>{children}</div>
      <span className="mt-2 whitespace-nowrap text-[11px] text-subtle">{label}</span>
    </div>
  );
}

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <dt className="text-subtle">{term}</dt>
      <dd className="text-right text-ink">{children}</dd>
    </div>
  );
}

function OnYourOwn() {
  return (
    <div className="flex flex-col p-5 sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[13px] font-medium text-ink">On your own</p>
        <Pill>Standard rate</Pill>
      </div>
      <p className="mt-0.5 text-[12px] text-subtle">Harbour Street Café</p>

      <div className="relative mb-6 mt-6">
        <Grid />
        <div className="relative flex justify-around">
          <Column label="You">
            <div className="w-10 rounded-t-[3px] bg-brand" style={{ height: `${YOU_HEIGHT}%` }} />
          </Column>
          <Column label="Larger businesses">
            <div
              className="relative w-10 rounded-t-[3px] ring-1 ring-inset ring-[#CBD3DE]"
              style={{
                height: "78%",
                background: "repeating-linear-gradient(135deg, #E4E9F0 0 1px, #F6F8FB 1px 6px)",
              }}
            >
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <Pill tone="info">Custom pricing</Pill>
              </span>
            </div>
          </Column>
        </div>
      </div>

      <dl className="mt-auto divide-y divide-line border-t border-line text-[12px]">
        <Row term="Your card rate">
          <span className="font-mono tabular">{cardRate}</span>
        </Row>
        <Row term="Volume behind you">Just yours</Row>
      </dl>
    </div>
  );
}

function Pooled() {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col p-5 sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[13px] font-medium text-ink">Pooled with FairPay</p>
        <Pill tone="success">Pooled</Pill>
      </div>
      <p className="mt-0.5 text-[12px] text-subtle">FairPay community</p>

      <div className="mt-6 flex items-start gap-4">
        {/* Plot: members on their own, flowing into one pooled bar */}
        <div className="relative shrink-0">
          <Grid />
          <div className="relative flex items-start gap-3 px-2">
            <Column label="Members" className="hidden sm:flex">
              <div className="flex h-full items-end gap-1.5">
                {members.map((m) => (
                  <span
                    key={m.name}
                    className="w-2 rounded-t-[2px]"
                    style={{ height: `${m.h}%`, background: m.color }}
                  />
                ))}
              </div>
            </Column>
            <div className={cn("hidden items-end pb-3 sm:flex", PLOT_H)}>
              <ArrowRight className="h-4 w-4 text-subtle" strokeWidth={1.75} />
            </div>
            <Column label="Pooled">
              <div className="flex h-full w-12 flex-col-reverse gap-[2px]">
                {members.map((m, i) => (
                  <motion.span
                    key={m.name}
                    className="flex w-full items-center justify-center text-[10px] font-medium text-white"
                    style={{ height: `${m.h}%`, background: m.color }}
                    initial={reduce ? false : { opacity: 0, y: -24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: 0.25 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {m.you ? "You" : null}
                  </motion.span>
                ))}
                {/* The next member's slot */}
                <motion.span
                  className="block w-full rounded-t-[3px] border border-dashed border-brand/50 bg-brand-tint"
                  style={{ height: "9%" }}
                  animate={reduce ? undefined : { opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </Column>
          </div>
        </div>

        {/* Legend, top of stack first */}
        <ul className={cn("flex min-w-0 flex-1 flex-col justify-end gap-1.5 text-[11px] text-body", PLOT_H)}>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-[2px] border border-dashed border-brand/60 bg-brand-tint" />
            <span className="truncate text-subtle">Next member</span>
          </li>
          {[...members].reverse().map((m) => (
            <li key={m.name} className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-[2px]" style={{ background: m.color }} />
              <span className={cn("truncate", m.you && "font-medium text-ink")}>{m.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <dl className="mt-6 divide-y divide-line border-t border-line text-[12px]">
        <Row term="Volume">Pooled across members</Row>
        <Row term="Buying power">
          <span className="font-medium text-brand">Grows with every member</span>
        </Row>
      </dl>
    </div>
  );
}

function ComparisonMockup() {
  return (
    <figure className="m-0">
      <div
        role="img"
        aria-label={`Illustration. On your own, a small business pays the standard card rate of ${cardRate} while larger businesses get custom pricing. Pooled with FairPay, members' payment volumes stack into one, and buying power grows with every member.`}
        className="overflow-hidden rounded-xl bg-white ring-1 ring-line shadow-float"
      >
        {/* App chrome */}
        <div className="flex items-center justify-between gap-3 border-b border-line bg-canvas px-5 py-3">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="text-[13px] font-medium text-ink">Card pricing</span>
            <span className="truncate text-[12px] text-subtle">by monthly volume</span>
          </div>
          <div className="flex shrink-0 items-center rounded-md bg-white p-0.5 text-[11px] ring-1 ring-line">
            <span className="rounded-[4px] bg-ink px-2 py-0.5 font-medium text-white">Month</span>
            <span className="px-2 py-0.5 text-subtle">Year</span>
          </div>
        </div>

        <div className="grid divide-y divide-line sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:divide-x sm:divide-y-0">
          <OnYourOwn />
          <Pooled />
        </div>
      </div>
      <figcaption className="mt-3 text-[12px] text-subtle">
        Illustrative example. Standard rate shown is Stripe&rsquo;s public card rate in Australia.
      </figcaption>
    </figure>
  );
}

export function ProblemSection() {
  return (
    <Section id="problem" tone="white" className="py-24 md:py-32">
      <Container>
        <Reveal className="max-w-[820px]">
          <Eyebrow>The problem</Eyebrow>
          <Headline
            lead="Small volume. Standard rates."
            rest="Payment providers save their best pricing for big businesses."
          />
        </Reveal>

        <div className="mt-12 grid gap-14 md:mt-16 lg:grid-cols-12 lg:gap-12">
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="max-w-[480px] text-[17px] leading-[1.6] text-body">
              If you&rsquo;re a small business or not-for-profit, you pay the standard rate on everything, with no
              volume behind you.
            </p>
            <ol className="mt-10 max-w-[480px] border-t border-line">
              {points.map((p, i) => (
                <li key={p.title} className="grid grid-cols-[2rem_1fr] border-b border-line py-5">
                  <span aria-hidden className="pt-0.5 font-mono text-[12px] text-subtle tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-medium leading-snug text-ink">{p.title}</h3>
                    <p className="mt-1 text-[15px] leading-[1.55] text-body">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-7">
            <ComparisonMockup />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
