import { Calendar, Play, ArrowRight, CheckCircle } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-white mb-6 text-4xl lg:text-5xl">
            Ready to transform your payments?
          </h2>
          <p className="text-xl text-indigo-100 leading-relaxed max-w-3xl mx-auto">
            Join 500+ organisations collecting payments faster, with fewer failures, and zero admin overhead.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-3 text-white">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
            <span>Live in minutes, not weeks</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
            <span>No setup fees or hidden costs</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
            <span>Free migration support</span>
          </div>
        </div>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group">
            <span className="text-lg font-semibold">Get started free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 group">
            <Play className="w-5 h-5" />
            <span className="text-lg font-semibold">Watch demo</span>
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-indigo-200 text-sm">
            Questions? <a href="#" className="text-white underline hover:no-underline">Talk to our team</a> — we're here to help.
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-12 border-t border-indigo-500/30">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-white font-semibold mb-4">Product</div>
            <div className="space-y-2 text-sm">
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">PayTo® Payments</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Card Payments</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Pricing</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Security</a></div>
            </div>
          </div>
          
          <div>
            <div className="text-white font-semibold mb-4">Industries</div>
            <div className="space-y-2 text-sm">
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Schools & Childcare</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Strata & Property</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Health & Wellness</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Professional Services</a></div>
            </div>
          </div>
          
          <div>
            <div className="text-white font-semibold mb-4">Resources</div>
            <div className="space-y-2 text-sm">
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Documentation</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">API Reference</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Migration Guide</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Support</a></div>
            </div>
          </div>
          
          <div>
            <div className="text-white font-semibold mb-4">Company</div>
            <div className="space-y-2 text-sm">
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">About FairPay</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Blog</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Contact</a></div>
              <div><a href="#" className="text-indigo-200 hover:text-white transition-colors">Careers</a></div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-indigo-300 text-sm pb-8">
          <p>© 2026 FairPay. Built for the future of Australian payments.</p>
          <p className="mt-2 text-xs text-indigo-400">PayTo® is a registered trademark of NPP Australia Limited.</p>
        </div>
      </div>
    </section>
  );
}