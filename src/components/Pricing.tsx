import { Check, Award } from "lucide-react";
import { Button } from "./ui/Button";
import { Placeholder } from "./Placeholder";
import { plans, rates, founding, placeholders, formatAud, links, community } from "../content/site";

const pct = (n: number) => `${Number(n.toFixed(2))}%`;

export function Pricing() {
  const rows = [
    {
      type: "Cards and digital wallets",
      standard: `${pct(rates.cards.stripePct + rates.fairpayMarginPct)} + ${rates.cards.fixedCents}c`,
      founding: `${pct(rates.cards.stripePct)} + ${rates.cards.fixedCents}c`,
    },
    {
      type: "PayTo",
      standard: `${pct(rates.payto.stripePct + rates.fairpayMarginPct)} + ${rates.payto.fixedCents}c`,
      founding: `${pct(rates.payto.stripePct)} + ${rates.payto.fixedCents}c`,
      note: <Placeholder>{placeholders.paytoCap}</Placeholder>,
    },
    {
      type: "Invoicing",
      standard: <Placeholder>{placeholders.invoicingFee}</Placeholder>,
      founding: <Placeholder>{placeholders.invoicingFee}</Placeholder>,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Simple, honest pricing.</h2>
          <p className="text-xl text-slate-600">
            Stripe's standard rate plus a {pct(rates.fairpayMarginPct)} FairPay margin. That margin is how we make money, and founding members don't pay it for their first {founding.marginFreeYears} years.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 rounded-2xl border flex flex-col ${
                plan.highlight ? "border-teal-500 shadow-lg ring-1 ring-teal-500" : "border-slate-200"
              }`}
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-slate-900">${plan.priceAud}</span>
                <span className="text-slate-500"> /month</span>
              </div>
              {plan.priceAud > 0 && (
                <p className="text-xs mb-2">
                  <Placeholder>{placeholders.gst}</Placeholder>
                </p>
              )}
              {plan.highlight && (
                <p className="text-sm font-medium text-teal-700 mb-2">
                  Free for {founding.freePlanMonths} months for founding members
                </p>
              )}
              <p className="text-slate-600 mb-6">{plan.blurb}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-slate-700">
                    <Check className="w-5 h-5 text-teal-600 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant={plan.highlight ? "default" : "secondary"} className="w-full" asChild>
                <a href={links.join} target="_blank" rel="noopener noreferrer">
                  Get started
                </a>
              </Button>
            </div>
          ))}
        </div>

        {/* Transaction fees */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Transaction fees</h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="p-4 font-semibold">Payment type</th>
                  <th className="p-4 font-semibold">Standard</th>
                  <th className="p-4 font-semibold text-teal-700">Founding members</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r.type}>
                    <td className="p-4 font-medium text-slate-900">
                      {r.type}
                      {r.note && <div className="mt-1 text-xs">{r.note}</div>}
                    </td>
                    <td className="p-4 text-slate-700">{r.standard}</td>
                    <td className="p-4 font-semibold text-teal-700">{r.founding}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            Rates are for domestic payments and apply to all plans. Founding member rates apply for {founding.marginFreeYears} years from joining, for members who join before the community reaches {formatAud(community.firstGoalAud)}.
          </p>

          <div className="mt-8 p-6 rounded-2xl bg-teal-50 border border-teal-100 flex gap-4 items-start">
            <Award className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
            <p className="text-slate-700">
              <span className="font-semibold text-slate-900">Founding members</span> pay Stripe's standard rate with nothing added for {founding.marginFreeYears} years, get {founding.freePlanMonths} months of Connected free (worth {formatAud(founding.freePlanValueAud)}), and receive every community discount we unlock along the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
