import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/Accordion";
import { Placeholder } from "./Placeholder";
import { community, founding, formatAud, placeholders, rates } from "../content/site";

export function FAQ() {
  const goal = formatAud(community.firstGoalAud);
  const items: { q: string; a: React.ReactNode }[] = [
    {
      q: "How does FairPay make money?",
      a: `We add ${rates.fairpayMarginPct}% to each transaction on top of Stripe's standard rate, and offer optional monthly plans with accounting integration and local support. No hidden fees.`,
    },
    {
      q: "How will pooling our volume lower my fees?",
      a: `Payment pricing improves with volume. Larger businesses get custom pricing and cheaper routing. By pooling our members' payments, we build the volume to negotiate better rates and pass them back to members. Our first milestone is ${goal}.`,
    },
    {
      q: "What do founding members get?",
      a: `If you join before our community reaches ${goal}, we waive our ${rates.fairpayMarginPct}% margin for your first ${founding.marginFreeYears} years, so you pay Stripe's standard rate and nothing more. You also get ${founding.freePlanMonths} months of our Connected plan free (worth ${formatAud(founding.freePlanValueAud)}), and every community discount we unlock along the way.`,
    },
    {
      q: "Who processes my payments? Does FairPay hold my money?",
      a: <Placeholder>{placeholders.fundsFlow}</Placeholder>,
    },
    {
      q: "Which payment types can I accept?",
      a: "Cards, Apple Pay and Google Pay, PayTo, and invoices your customers can pay online.",
    },
    {
      q: "What if I already process more than $2M a year?",
      a: "FairPay is designed for businesses under $2M, but get in touch. As our community grows, the deal gets better for businesses of every size.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Questions, answered</h2>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-lg text-slate-800">{item.q}</AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
