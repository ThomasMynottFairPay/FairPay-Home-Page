import { Button } from "./ui/Button";

export function CTAStrip() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          Ready to make payments faster, cheaper, and easier to reconcile?
        </h2>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          See how FairPay brings PayTo®, cards, and AI-powered operations together — so your team spends less time chasing payments.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg">Book a demo</Button>
          <Button size="lg" variant="secondary">Join the waitlist</Button>
        </div>
      </div>
    </section>
  );
}
