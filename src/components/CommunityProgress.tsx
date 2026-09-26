import { Check, Flag } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink, Container, Eyebrow, Headline, Pill, Reveal, Section } from "./kit";
import { Placeholder } from "./Placeholder";
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
  // Keep the "You are here" label inside the track at either end.
  const shift = pct < 12 ? "0%" : pct > 88 ? "-100%" : "-50%";

  return (
    <div>
      {/* Marker label and goal flag */}
      <div className="relative h-8" aria-hidden>
        {known && (
          <span
            className="absolute bottom-2 whitespace-nowrap rounded bg-white px-1.5 py-0.5 text-[11px] font-medium text-ink"
            style={{ left: `${pct}%`, transform: `translateX(${shift})` }}
          >
            You are here
          </span>
        )}
        <Flag className="absolute bottom-2 right-0 h-4 w-4 text-brand-bright" strokeWidth={1.75} />
      </div>

      {/* Track */}
      <div
        role="progressbar"
        aria-label={`Community payment volume toward the first goal of ${formatAud(goal)}`}
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={known ? value : undefined}
        aria-valuetext={known ? `${formatAud(value)} of ${formatAud(goal)}` : "Community total not yet published"}
        className="relative h-2 rounded-full bg-white/10 ring-1 ring-inset ring-white/5"
      >
        {known ? (
          <>
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-brand to-brand-bright"
              initial={reduce ? false : { width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={reduce ? { width: `${pct}%` } : undefined}
            />
            {/* Connector from label to track */}
            <span aria-hidden className="absolute -top-2 h-2 w-px bg-white/60" style={{ left: `${pct}%` }} />
            {/* Current position */}
            <span
              aria-hidden
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pct}%` }}
            >
              {!reduce && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-brand-bright/50"
                  animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <span className="absolute inset-0 rounded-full bg-white ring-[3px] ring-brand-bright" />
            </span>
          </>
        ) : (
          <span aria-hidden className={cn("absolute inset-0 rounded-full", HATCH)} />
        )}
      </div>

      {/* Ruler */}
      <div aria-hidden className="relative mt-3 h-2.5">
        {Array.from({ length: TICKS + 1 }, (_, i) => (
          <span
            key={i}
            className={cn("absolute top-0 w-px", i % 5 === 0 ? "h-2.5 bg-white/40" : "h-1.5 bg-white/15")}
            style={{ left: i === TICKS ? "calc(100% - 1px)" : `${(i / TICKS) * 100}%` }}
          />
        ))}
      </div>

      {/* Milestone labels */}
      <ol className="relative mt-2 h-11 text-[12px]">
        {MILESTONES.map((f, i) => {
          const first = i === 0;
          const last = i === MILESTONES.length - 1;
          return (
            <li
              key={f}
              className={cn("absolute top-0", last && "text-right")}
              style={{ left: `${f * 100}%`, transform: `translateX(${first ? "0%" : last ? "-100%" : "-50%"})` }}
            >
              <span className={cn("block whitespace-nowrap", first ? "text-white/55" : "font-mono tabular", last ? "text-white" : "text-white/55")}>
                {first ? "Start" : axisLabel(f * goal)}
              </span>
              {last && (
                <span className="mt-1 block whitespace-nowrap text-brand-bright">First community discount unlocks</span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function VolumeCard() {
  const { processedAud, updatedOn, firstGoalAud } = community;

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-ink text-white ring-1 ring-ink shadow-float">
      {/* Restrained glow, top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_92%_0%,rgba(25,211,174,0.16),transparent_70%)]"
      />

      {/* Module header */}
      <div className="relative flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line-dark px-6 py-4 md:px-10">
        <div className="flex items-center gap-2.5 text-[13px] text-white/75">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-bright" />
          Community volume
          <span className="rounded px-1.5 py-0.5 font-mono text-[11px] text-white/55 ring-1 ring-white/15">AUD</span>
        </div>
        <p className="text-[12px] text-white/55">
          {updatedOn ? `Updated ${updatedOn}` : <Placeholder>[Placeholder: last updated date]</Placeholder>}
        </p>
      </div>

      {/* Figures */}
      <div className="relative flex flex-1 flex-col justify-center gap-10 px-6 pb-6 pt-8 md:px-10 md:pb-8 md:pt-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[13px] text-white/60">
              Processed by the FairPay community
              {processedAud === null && <Placeholder>[Placeholder: $ processed]</Placeholder>}
            </p>
            {/* Display scale holds with or without data; no stand-in total is ever shown. */}
            <p className="mt-3 text-[44px] font-medium leading-none tracking-[-0.04em] tabular sm:text-[56px] md:text-[72px]">
              {processedAud === null ? (
                <>
                  <span aria-hidden className="text-white/25">
                    &mdash;
                  </span>
                  <span className="sr-only">Not yet published</span>
                </>
              ) : (
                formatAud(processedAud)
              )}
            </p>
          </div>
          <dl className={cn("grid shrink-0 gap-8 sm:text-right", processedAud !== null && "grid-cols-2")}>
            <div>
              <dt className="text-[12px] text-white/55">First goal</dt>
              <dd className="mt-1 font-mono text-[15px] text-white tabular">{formatAud(firstGoalAud)}</dd>
            </div>
            {processedAud !== null && (
              <div>
                <dt className="text-[12px] text-white/55">Still to go</dt>
                <dd className="mt-1 font-mono text-[15px] text-white tabular">
                  {formatAud(Math.max(0, firstGoalAud - processedAud))}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <ProgressTrack value={processedAud} goal={firstGoalAud} />
      </div>

      {/* Legend */}
      <div
        aria-hidden
        className="relative flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line-dark px-6 py-3.5 text-[12px] text-white/50 md:px-10"
      >
        {processedAud === null ? (
          <span className="flex items-center gap-2">
            <span className={cn("h-2 w-3.5 rounded-full ring-1 ring-white/20", HATCH)} />
            Total not yet published
          </span>
        ) : (
          <>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-bright" />
              Processed
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white/15 ring-1 ring-white/25" />
              To first goal
            </span>
          </>
        )}
        <span className="ml-auto hidden font-mono tabular sm:inline">Ticks every {axisLabel(community.firstGoalAud / TICKS)}</span>
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
      <h3 className="mt-4 text-[21px] font-medium leading-[1.25] tracking-[-0.03em] text-balance text-ink md:text-[22px]">
        Join before we reach {formatAud(firstGoalAud)} and become a founding member.
      </h3>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {benefits.map((b) => (
          <li key={b.title} className="flex items-start gap-3 py-3">
            <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.25} />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-medium text-ink">{b.title}</p>
              <p className="text-[13px] text-subtle">{b.detail}</p>
            </div>
            <span className="shrink-0 pt-px text-[13px] text-body tabular-nums">{b.value}</span>
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
              When the community reaches {formatAud(firstGoalAud)} in processed payments, our first community
              discount unlocks. Join before then and you become a founding member.
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
