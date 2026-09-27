import { Check, Flag } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink, Container, Eyebrow, Headline, Pill, Reveal, Section } from "./kit";
import { cn } from "./ui/Utils";
import { community, founding, formatAud, links } from "../content/site";

/** Minor ticks on the ruler; every fifth is a major tick at a milestone. */
const TICKS = 20;
const MILESTONES = [0, 0.25, 0.5, 0.75, 1];

/** Compact axis label derived from the goal: $500k, $1M, $1.5M, $2M. */
function axisLabel(n: number) {
  if (n >= 1_000_000) return `$${+(n / 1_000_000).toFixed(2)}M`;
  return `$${Math.round(n / 1_000)}k`;
}

/** Neutral hatch for a track whose position is not yet published. */
const HATCH = "bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.12)_0_4px,transparent_4px_8px)]";

function ProgressTrack({ value, goal }: { value: number | null; goal: number }) {
  const reduce = useReducedMotion();
  const known = value !== null;
  const pct = known ? Math.min(100, Math.max(0, (value / goal) * 100)) : 0;

  return (
    <div>
      {/* Track */}
      <div
        role="progressbar"
        aria-label={`Community payment volume toward the first goal of ${formatAud(goal)}`}
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={known ? value : 0}
        aria-valuetext={known ? `${formatAud(value)} of ${formatAud(goal)}` : `Just getting started, goal ${formatAud(goal)}`}
        className="relative h-4 rounded-full bg-white/10 ring-1 ring-inset ring-white/10 md:h-5"
      >
        {known ? (
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-brand to-brand-bright"
            initial={reduce ? false : { width: 0 }}
            whileInView={{ width: `${Math.max(pct, 1.5)}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={reduce ? { width: `${Math.max(pct, 1.5)}%` } : undefined}
          />
        ) : (
          <>
            <span aria-hidden className={cn("absolute inset-0 rounded-full", HATCH)} />
            {/* A small lit segment at the start: the community is live, the total is still small. */}
            <span aria-hidden className="absolute inset-y-0 left-0 w-3 rounded-full bg-brand-bright md:w-4" />
          </>
        )}
        {/* Goal marker */}
        <span aria-hidden className="absolute -right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-brand-bright text-ink shadow-[0_0_0_6px_rgba(25,211,174,0.15)] md:h-9 md:w-9">
          <Flag className="h-4 w-4" strokeWidth={2.25} />
        </span>
      </div>

      {/* Ruler */}
      <div aria-hidden className="relative mt-4 h-2.5">
        {Array.from({ length: TICKS + 1 }, (_, i) => (
          <span
            key={i}
            className={cn("absolute top-0 w-px", i % 5 === 0 ? "h-2.5 bg-white/40" : "h-1.5 bg-white/15")}
            style={{ left: i === TICKS ? "calc(100% - 1px)" : `${(i / TICKS) * 100}%` }}
          />
        ))}
      </div>

      {/* Milestone labels */}
      <ol aria-hidden className="relative mt-2 h-6 text-[13px] md:text-[15px]">
        {MILESTONES.map((f, i) => {
          const first = i === 0;
          const last = i === MILESTONES.length - 1;
          return (
            <li
              key={f}
              className={cn("absolute top-0 whitespace-nowrap font-mono tabular", last ? "font-semibold text-brand-bright" : "text-white/60", !first && !last && "hidden sm:block")}
              style={{ left: `${f * 100}%`, transform: `translateX(${first ? "0%" : last ? "-100%" : "-50%"})` }}
            >
              {first ? "$0" : axisLabel(f * goal)}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function VolumeCard() {
  const { processedAud, updatedOn, firstGoalAud } = community;
  const pct = processedAud === null ? null : Math.min(100, (processedAud / firstGoalAud) * 100);

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-ink text-white ring-1 ring-ink shadow-float">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_95%_0%,rgba(25,211,174,0.2),transparent_70%)]"
      />

      <div className="relative flex flex-1 flex-col gap-8 p-6 sm:p-8 md:gap-10 md:p-10">
        {/* The goal, front and centre */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2.5 text-[15px] font-medium text-brand-bright md:text-[17px]">
              <Flag aria-hidden className="h-4 w-4" strokeWidth={2.25} />
              Our first goal
            </p>
            <p className="mt-3 text-[52px] font-medium leading-[0.95] tracking-[-0.045em] tabular sm:text-[72px] md:text-[88px]">
              {formatAud(firstGoalAud)}
            </p>
          </div>
          {updatedOn && <p className="text-[13px] text-white/55">Updated {updatedOn}</p>}
        </div>

        <p className="max-w-[560px] text-[18px] leading-[1.5] text-white/80 md:text-[21px]">
          Once our members have processed this much together, the{" "}
          <span className="font-medium text-white">first community discount unlocks</span> for every member.
        </p>

        <div className="mt-auto">
          {/* Where we are */}
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[15px] md:text-[17px]">
            {processedAud === null ? (
              <p className="text-white/80">
                <span className="font-medium text-white">Founding memberships are open.</span> Every member moves the bar.
              </p>
            ) : (
              <p className="text-white/80">
                <span className="font-mono font-medium text-white tabular">{formatAud(processedAud)}</span> processed so far
              </p>
            )}
            {pct !== null && (
              <p className="font-mono text-white/60 tabular">{Math.floor(pct)}% of the way</p>
            )}
          </div>
          <ProgressTrack value={processedAud} goal={firstGoalAud} />
        </div>
      </div>
    </div>
  );
}

function FoundingOffer() {
  const { firstGoalAud, processedAud } = community;
  const open = processedAud === null || processedAud < firstGoalAud;
  const benefits = [
    {
      title: "No FairPay margin",
      detail: "from the day you join",
      value: `${founding.marginFreeYears} years`,
    },
    {
      title: "Connected plan free",
      detail: `worth ${formatAud(founding.freePlanValueAud)}`,
      value: `${founding.freePlanMonths} months`,
    },
    {
      title: "Community discounts",
      detail: "every one we unlock",
      value: "Included",
    },
  ];

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-line shadow-card md:p-8">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-medium text-brand">Founding membership</p>
        {open && <Pill tone="success">Open</Pill>}
      </div>
      <h3 className="mt-4 text-[24px] font-medium leading-[1.2] tracking-[-0.03em] text-balance text-ink md:text-[26px]">
        Join before we reach {formatAud(firstGoalAud)} and become a founding member.
      </h3>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {benefits.map((b) => (
          <li key={b.title} className="flex items-start gap-3 py-4">
            <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.25} />
            <div className="min-w-0 flex-1">
              <p className="text-[16px] font-medium text-ink">{b.title}</p>
              <p className="text-[14px] text-subtle">{b.detail}</p>
            </div>
            <span className="shrink-0 pt-px text-[15px] font-medium text-ink tabular-nums">{b.value}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        <ButtonLink href={links.join} external className="w-full">
          Claim founding membership
          <span className="sr-only"> (opens in a new tab)</span>
        </ButtonLink>
      </div>
    </div>
  );
}

export function CommunityProgress() {
  const { firstGoalAud } = community;

  return (
    <Section id="community" tone="canvas" className="py-24 md:py-32">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Community progress</Eyebrow>
            <Headline lead="The FairPay community." rest="Every member adds to our pooled buying power." />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="max-w-[460px] text-[17px] leading-[1.6] text-body">
              Every payment through FairPay counts toward our shared goal. Members who join before we reach it become
              founding members, with benefits that last well beyond it.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-12 lg:gap-5">
          <Reveal className="lg:col-span-8">
            <VolumeCard />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <FoundingOffer />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
