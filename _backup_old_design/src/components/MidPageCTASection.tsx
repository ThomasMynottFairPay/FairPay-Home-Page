import { Calendar, ArrowRight } from 'lucide-react';

export function MidPageCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 to-blue-600">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-white mb-6 text-3xl lg:text-4xl">
          See how FairPay works in practice
        </h2>
        <p className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          A 15-minute walkthrough of how teams set up, manage, and collect payments — without chasing.
        </p>

        <a
          href="https://calendly.com/thomas-fairpay-ai/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-3 group mb-6"
        >
          <Calendar className="w-6 h-6" />
          <span className="text-lg">Book a 15-minute walkthrough</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>

        <p className="text-sm text-indigo-100">
          No setup required · Built for recurring and high-trust payments
        </p>
      </div>
    </section>
  );
}
