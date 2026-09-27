import { ChevronRight, Plus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/Accordion";
import { Container, Eyebrow, Headline, Reveal, Section } from "./kit";
import { community, founding, formatAud, links, rates } from "../content/site";

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
      q: "Which payment types can I accept?",
      a: "Cards, Apple Pay and Google Pay, PayTo, and invoices your customers can pay online.",
    },
    {
      q: "What if I already process more than $2M a year?",
      a: "FairPay is designed for businesses under $2M, but get in touch. As our community grows, the deal gets better for businesses of every size.",
    },
  ];

  return (
    // overflow-clip (not hidden) so the sticky intro column can stick to the viewport.
    <Section id="faq" tone="white" className="overflow-clip py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>FAQ</Eyebrow>
              <Headline lead="Questions, answered." />
              <p className="mt-5 max-w-[360px] text-[17px] leading-[1.6] text-body">
                How FairPay works, what it costs and what founding members get. Anything else, we're happy to talk it
                through.
              </p>
              <a
                href={links.bookChat}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-1 rounded-sm text-[15px] font-medium text-brand transition-colors hover:text-brand-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                Book a chat
                <span className="sr-only"> (opens in a new tab)</span>
                <ChevronRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-7 lg:col-start-6">
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
              {items.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`item-${i}`}
                  className="border-b border-line first:border-t last:border-b"
                >
                  <AccordionTrigger className="group items-center gap-6 rounded-sm py-6 text-[17px] font-medium leading-[1.4] tracking-[-0.01em] text-ink hover:no-underline hover:text-brand-deep focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand focus-visible:ring-0 md:text-[18px] [&>svg]:hidden">
                    <span>{item.q}</span>
                    <span
                      aria-hidden
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-body ring-1 ring-line transition-[transform,color,box-shadow] duration-300 group-hover:text-ink group-hover:ring-ink/25 group-data-[state=open]:rotate-45 group-data-[state=open]:text-ink"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[62ch] pb-7 pr-10 text-[16px] leading-[1.65] text-body">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
