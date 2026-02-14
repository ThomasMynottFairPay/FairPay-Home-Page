import { AlertCircle, Banknote, Clock, FileWarning } from "lucide-react";

export function ProblemSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Legacy payment rails were built for yesterday.
          </h2>
          <p className="text-lg text-slate-600">
            Most organisations are stuck choosing between high-cost payments, high-effort payments, or both.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-6">
              <Banknote className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">High-cost</h3>
            <p className="text-slate-600 leading-relaxed">
              Percentage-based card fees and surcharge complexity eat into margins or frustrate customers.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-6">
              <FileWarning className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">High-effort</h3>
            <p className="text-slate-600 leading-relaxed">
              Manual follow-up on failed payments, messy reference numbers, and spreadsheet reconciliation.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Both</h3>
            <p className="text-slate-600 leading-relaxed">
              Slow collections combined with admin overload means your team spends less time on value-adding work.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
            <p className="text-xl md:text-2xl font-semibold text-slate-800 max-w-4xl mx-auto leading-tight">
                “If collections are slow and reconciliation is manual, your cashflow isn’t the only thing that suffers, your team does too.”
            </p>
        </div>
      </div>
    </section>
  );
}
