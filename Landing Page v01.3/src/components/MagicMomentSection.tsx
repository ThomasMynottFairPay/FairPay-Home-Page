import { Smartphone, Send, CheckCircle2, ArrowRight } from 'lucide-react';

export function MagicMomentSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-white mb-6 text-3xl lg:text-4xl">
            Set up payments instantly. Then stop thinking about them.
          </h2>
          <p className="text-lg text-indigo-100 max-w-3xl mx-auto leading-relaxed">
            Create recurring or one-off payments on the spot. Accounts are verified, payments are active immediately, and collections run automatically.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20">
            {/* Visual flow */}
            <div className="bg-white/20 backdrop-blur rounded-2xl p-8 border border-white/30 mb-10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-8 h-8" />
                  <span className="text-lg">\"Let me set that up for you now.\"</span>
                </div>
                
                <ArrowRight className="w-6 h-6 hidden md:block" />
                <div className="w-6 h-6 md:hidden rotate-90">
                  <ArrowRight className="w-6 h-6" />
                </div>
                
                <div className="flex items-center gap-3">
                  <Send className="w-8 h-8" />
                  <span className="text-lg">Send</span>
                </div>
                
                <ArrowRight className="w-6 h-6 hidden md:block" />
                <div className="w-6 h-6 md:hidden rotate-90">
                  <ArrowRight className="w-6 h-6" />
                </div>
                
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8" />
                  <span className="text-lg">Approved</span>
                </div>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-2xl text-white mb-6">
                This is the moment payments actually happen — and teams stop chasing.
              </p>
              
              <p className="text-lg text-indigo-100 leading-relaxed">
                Your customer receives a secure notification from their banking app and approves instantly. No paperwork, no bank details, no follow-ups.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}