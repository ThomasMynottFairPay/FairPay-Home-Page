import { BarChart3, Bot, LineChart, Sparkles } from "lucide-react";

export function AISection() {
  return (
    <section id="ai" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-50/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="lg:w-1/3 sticky top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-medium border border-teal-200 mb-6">
                <Sparkles className="w-3 h-3" />
                FairPay Intelligence
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Built-in AI to turn payments into clean books and clear insight.
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Go from payments received to reconciled, explained, and report-ready — without spreadsheets.
            </p>
          </div>

          <div className="lg:w-2/3 grid gap-6">
            {/* Card 1 */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex gap-6 hover:border-teal-200 transition-colors">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-teal-600 shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">AI Reconciliation Assistant</h3>
                <p className="text-slate-600">
                   Automatically suggests matches for unmatched payments, flags exceptions, and provides natural language explanations for why a payment failed or succeeded.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex gap-6 hover:border-teal-200 transition-colors">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Custom Dashboards & KPIs</h3>
                <p className="text-slate-600">
                   Live views of success rates, time-to-cash, and churn. Generate board-ready summaries instantly without exporting to Excel.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex gap-6 hover:border-teal-200 transition-colors">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 shrink-0">
                <LineChart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Data Insights that drive action</h3>
                <p className="text-slate-600">
                   Predictive models highlight at-risk payers before they churn and diagnose technical failure patterns across your customer base.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
