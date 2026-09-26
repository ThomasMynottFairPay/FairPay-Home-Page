import { Scale, Receipt, Building } from "lucide-react";

export function ProblemSection() {
  const points = [
    {
      icon: Scale,
      title: "No negotiating power",
      body: "On your own, your payment volume is too small for a provider to offer you a better deal.",
    },
    {
      icon: Receipt,
      title: "The standard rate, every time",
      body: "Every tap, click and invoice is charged at the full standard rate, and it adds up across the year.",
    },
    {
      icon: Building,
      title: "Bigger businesses pay less",
      body: "Larger businesses get custom pricing and cheaper routing for exactly the same payments.",
    },
  ];

  return (
    <section id="problem" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Small volume. Standard rates.</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Payment providers save their best pricing for big businesses. If you're a small business or not-for-profit, you pay the standard rate on everything, with no one negotiating for you.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {points.map((p) => (
            <div key={p.title} className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-teal-600 mb-6">
                <p.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{p.title}</h3>
              <p className="text-slate-600 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
