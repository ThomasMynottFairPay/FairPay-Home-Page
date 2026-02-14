import { CheckCheck, FileSignature, Link, Smartphone } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Link,
      title: "Connect FairPay",
      desc: "Integrate with your billing, CRM, or accounting workflow in minutes.",
    },
    {
      icon: FileSignature,
      title: "Create agreement",
      desc: "Set up one-off, ad hoc, or recurring PayTo agreements instantly.",
    },
    {
      icon: Smartphone,
      title: "Customer authorises",
      desc: "Your customer approves the agreement securely in their banking app.",
    },
    {
      icon: CheckCheck,
      title: "Settle & Reconcile",
      desc: "Payments settle in real-time with AI-powered reconciliation signals.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How FairPay works</h2>
        </div>

        <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-10" />

            <div className="grid md:grid-cols-4 gap-12">
                {steps.map((step, i) => (
                    <div key={i} className="flex flex-col items-center text-center bg-slate-50 md:bg-transparent">
                        <div className="w-24 h-24 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-teal-600 mb-6 z-10 relative">
                            <step.icon className="w-10 h-10" />
                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-slate-50">
                                {i + 1}
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                        <p className="text-slate-600 text-sm">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
