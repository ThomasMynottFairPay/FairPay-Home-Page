import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/Accordion";

export function FAQ() {
  const items = [
    {
      q: "What is PayTo?",
      a: "PayTo is a new digital payment solution that offers a fast, secure and reliable way for businesses to initiate real-time payments from customers' bank accounts."
    },
    {
      q: "Is PayTo safe?",
      a: "Yes. PayTo is built on the New Payments Platform (NPP) infrastructure. Customers view and authorise agreements within their own secure online banking environment."
    },
    {
      q: "Can PayTo handle recurring payments?",
      a: "Absolutely. PayTo is designed for recurring billing, subscriptions, and instalments, with more visibility and control than traditional Direct Debit."
    },
    {
      q: "Do we still need cards?",
      a: "Cards are still useful. FairPay allows you to use PayTo as your primary low-cost channel while keeping cards as a fallback or option for customers who prefer them."
    },
    {
      q: "How does pricing work?",
      a: "FairPay charges a small platform fee plus a per-transaction rate that is typically significantly lower than card interchange fees."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">FAQ</h2>
        
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-lg text-slate-800">{item.q}</AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
