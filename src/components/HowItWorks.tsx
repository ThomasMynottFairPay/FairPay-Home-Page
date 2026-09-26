import { UserPlus, Layers, Handshake, Unlock } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Join FairPay",
      body: "Take cards, digital wallets, PayTo and invoices through FairPay, built on Stripe.",
    },
    {
      icon: Layers,
      title: "Your volume joins the pool",
      body: "Every payment you take adds to the community's total.",
    },
    {
      icon: Handshake,
      title: "We use our pooled buying power",
      body: "As the total grows, we negotiate better pricing and pass it back to members.",
    },
    {
      icon: Unlock,
      title: "Each milestone unlocks a discount",
      body: "Our first unlocks at $2M. Join before then and you're a founding member.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Your volume. Our buying power.</h2>
          <p className="text-xl text-slate-600">
            The more members who take payments through FairPay, the stronger our position, and the better the deal for everyone.
          </p>
        </div>
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <li key={s.title} className="relative p-8 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <span className="absolute top-6 right-6 text-5xl font-bold text-slate-100 select-none">{i + 1}</span>
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-6 relative">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3 relative">{s.title}</h3>
              <p className="text-slate-600 leading-relaxed relative">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
