import { Plug, Users, CheckCheck, Headphones } from "lucide-react";

export function MoreThanPayments() {
  const features = [
    { icon: Plug, title: "Connect your accounting", body: "On Connected plans, payments flow straight into Xero and your other business systems." },
    { icon: Users, title: "Know your customers", body: "Keep customer details and payment history together in one place." },
    { icon: CheckCheck, title: "Reconcile without the spreadsheet", body: "Match payments to invoices and see what's been paid at a glance." },
    { icon: Headphones, title: "Local support", body: "Talk to a real person in Australia when you need a hand." },
  ];

  return (
    <section id="features" className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">More than payments.</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            FairPay sits on top of Stripe to take the admin out of getting paid, so you can spend less time on paperwork and more on the work that matters.
          </p>
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <f.icon className="w-6 h-6 text-teal-600 mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
