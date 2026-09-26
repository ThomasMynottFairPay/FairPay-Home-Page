import { Button } from "./ui/Button";
import { links } from "../content/site";

export function CTAStrip() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          The more of us, the better the deal.
        </h2>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Join the FairPay community as a founding member, or book a chat to see if FairPay is right for you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild>
            <a href={links.join} target="_blank" rel="noopener noreferrer">
              Become a founding member
            </a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href={links.bookChat} target="_blank" rel="noopener noreferrer">
              Book a chat
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
