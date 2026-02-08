import { Calendar, Play, ArrowRight } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <div className="text-white">
            <h2 className="text-white mb-6 text-3xl lg:text-4xl">
              Ready for easy, automated payments?
            </h2>
            <p className="text-lg text-indigo-100 leading-relaxed">
              Start collecting recurring, one-off, and high-value payments with our <strong>low-cost, AI-enabled platform</strong>.
            </p>
          </div>
          
          {/* Right side - CTAs */}
          <div className="space-y-5">
            <button className="w-full px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group">
              <Calendar className="w-6 h-6" />
              <span className="text-lg">Book a 15-minute intro</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="w-full px-8 py-4 bg-indigo-500 text-white border-2 border-indigo-400 rounded-xl hover:bg-indigo-400 transition-all flex items-center justify-center gap-3 group">
              <Play className="w-6 h-6" />
              <span className="text-lg">See a live demo</span>
            </button>
            
            <div className="text-center pt-2">
              <a 
                href="#" 
                className="text-indigo-100 hover:text-white transition-colors inline-flex items-center gap-2 group"
              >
                Join the early access waitlist
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-12 border-t border-indigo-500/30">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-white mb-4">Product</div>
            <div className="space-y-2 text-sm">
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Features</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Pricing</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Security</a></div>
            </div>
          </div>
          
          <div>
            <div className="text-white mb-4">Use Cases</div>
            <div className="space-y-2 text-sm">
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Education</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Fitness</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Property</a></div>
            </div>
          </div>
          
          <div>
            <div className="text-white mb-4">Resources</div>
            <div className="space-y-2 text-sm">
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Documentation</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">API Reference</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Support</a></div>
            </div>
          </div>
          
          <div>
            <div className="text-white mb-4">Company</div>
            <div className="space-y-2 text-sm">
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">About</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Blog</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Contact</a></div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-indigo-300 text-sm">
          © 2024 FairPay. Built for the future of Australian payments.
        </div>
      </div>
    </section>
  );
}