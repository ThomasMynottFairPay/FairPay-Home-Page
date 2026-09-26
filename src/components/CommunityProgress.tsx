import { Award } from "lucide-react";
import { Button } from "./ui/Button";
import { Placeholder } from "./Placeholder";
import { community, founding, formatAud, links } from "../content/site";

export function CommunityProgress() {
  const { processedAud, updatedOn, firstGoalAud } = community;
  const pct = processedAud === null ? 0 : Math.min(100, (processedAud / firstGoalAud) * 100);

  return (
    <section id="community" className="py-16 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-2">Community progress</p>
            <h2 className="text-2xl md:text-3xl font-bold">
              {processedAud === null ? (
                <Placeholder>[Placeholder: $ processed]</Placeholder>
              ) : (
                formatAud(processedAud)
              )}{" "}
              processed by the FairPay community
            </h2>
          </div>
          <p className="text-slate-300 md:text-right">
            Next goal: <span className="font-semibold text-white">{formatAud(firstGoalAud)}</span>, when our first community discount unlocks.
          </p>
        </div>

        <div
          className="h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={firstGoalAud}
          aria-valuenow={processedAud ?? 0}
          aria-label="Community payment volume toward the first goal"
        >
          <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>$0</span>
          <span>
            {updatedOn ? `Updated ${updatedOn}` : <Placeholder>[Placeholder: last updated date]</Placeholder>}
          </span>
          <span>{formatAud(firstGoalAud)}</span>
        </div>

        <div className="mt-10 p-6 md:p-8 rounded-2xl bg-teal-600/10 border border-teal-500/30 flex flex-col md:flex-row gap-6 md:items-center">
          <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">Join before we reach {formatAud(firstGoalAud)} and become a founding member</h3>
            <p className="text-slate-300">
              No FairPay margin for {founding.marginFreeYears} years, {founding.freePlanMonths} months of Connected free (worth {formatAud(founding.freePlanValueAud)}), and every community discount we unlock.
            </p>
          </div>
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 shrink-0" asChild>
            <a href={links.join} target="_blank" rel="noopener noreferrer">
              Claim founding membership
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
