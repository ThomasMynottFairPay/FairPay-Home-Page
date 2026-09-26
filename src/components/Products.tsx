import { CreditCard, Smartphone, Landmark, FileText } from "lucide-react";

export function Products() {
  const products = [
    { icon: CreditCard, title: "Cards", body: "Accept Visa, Mastercard and more, online or by payment link." },
    { icon: Smartphone, title: "Apple Pay and Google Pay", body: "Let customers pay in a tap with the wallets they already use." },
    { icon: Landmark, title: "PayTo", body: "Pay by bank, straight from your customer's account, with capped fees on large payments." },
    { icon: FileText, title: "Invoicing", body: "Send invoices your customers can pay online by card or bank." },
  ];

  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Every way to get paid, in one place.</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            We resell Stripe's payment products, so your payments run on world-class infrastructure trusted by businesses everywhere.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.title} className="p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-teal-50 hover:border-teal-100 transition-colors">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-teal-600 mb-6">
                <p.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-slate-600 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
