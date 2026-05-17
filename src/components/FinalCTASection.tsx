import { Calendar, Play, ArrowRight } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="py-20 bg-[#001f45]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <div className="text-white">
            <h2 className="text-white mb-6 text-3xl lg:text-4xl font-bold">
              Ready for a Fair Go?
            </h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Start collecting payments fairly with our platform built on the classic Australian attitude of <strong>people helping people</strong>.
            </p>
          </div>

          {/* Right side - CTAs */}
          <div className="space-y-5">
            <a
              href="https://calendly.com/thomas-fairpay-ai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group"
            >
              <Calendar className="w-6 h-6" />
              <span className="text-lg">Book a 15-minute intro</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <button className="w-full px-8 py-4 bg-primary/30 text-white border-2 border-primary-foreground/20 rounded-xl hover:bg-primary/50 transition-all font-semibold flex items-center justify-center gap-3 group">
              <Play className="w-6 h-6" />
              <span className="text-lg">See a live demo</span>
            </button>

            <div className="text-center pt-2">
              <a
                className="text-primary-foreground/70 hover:text-white transition-colors inline-flex items-center gap-2 group"
              >
                Join the early access waitlist
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-12 border-t border-primary-foreground/10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-white font-medium mb-4">Product</div>
            <div className="space-y-2 text-sm">
              <div><a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">Features</a></div>
              <div><a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">Pricing</a></div>
              <div><a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">Security</a></div>
            </div>
          </div>

          <div>
            <div className="text-white font-medium mb-4">Use Cases</div>
            <div className="space-y-2 text-sm">
              <div><a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">Education</a></div>
              <div><a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">Fitness</a></div>
              <div><a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">Property</a></div>
            </div>
          </div>

          <div>
            <div className="text-white font-medium mb-4">Resources</div>
            <div className="space-y-2 text-sm">
              <div><a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">Documentation</a></div>
              <div><a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">API Reference</a></div>
              <div><a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">Support</a></div>
            </div>
          </div>

          <div>
            <div className="text-white font-medium mb-4">Company</div>
            <div className="space-y-2 text-sm">
              <div><a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">About</a></div>
              <div><a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">Blog</a></div>
              <div><a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">Contact</a></div>
            </div>
          </div>
        </div>

        <div className="text-center text-primary-foreground/50 text-sm">
          © {new Date().getFullYear()} FairPay. Built for the future of Australian payments.
        </div>
      </div>
    </section>
  );
}