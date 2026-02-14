import { FileSpreadsheet, Settings2, UserCheck, Zap } from "lucide-react";

export function WhyPayTo() {
  return (
    <section id="why-payto" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium border border-teal-100 mb-6">
                The Solution
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Meet PayTo®: fast, bank-authorised, account-to-account payments.
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            PayTo lets customers pay directly from their bank account and authorise agreements in their own online banking app. It's the modern alternative to Direct Debit.
            </p>

            <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100">
                <p className="text-lg font-medium text-teal-900">
                    Faster collections. Less admin. Lower cost versus card-heavy stacks.
                </p>
                <p className="text-sm text-teal-700 mt-2 opacity-80">
                    (Provider pricing varies)
                </p>
            </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
            {[
                {
                    icon: UserCheck,
                    title: "Real-time sign-up",
                    desc: "Instant verification of account details when the agreement is created."
                },
                {
                    icon: Zap,
                    title: "Fast payments",
                    desc: "Funds settle in real-time, removing the 'pending' limbo of traditional methods."
                },
                {
                    icon: FileSpreadsheet,
                    title: "More data",
                    desc: "Rich data travels with the payment for easier automated reconciliation."
                },
                {
                    icon: Settings2,
                    title: "Customer control",
                    desc: "Customers can view and manage agreements directly in their banking app."
                }
            ].map((item, i) => (
                <div key={i} className="flex flex-col gap-3">
                    <div className="w-10 h-10 bg-white border border-slate-200 shadow-sm rounded-lg flex items-center justify-center text-teal-600">
                        <item.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
