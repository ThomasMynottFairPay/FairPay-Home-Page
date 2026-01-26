import { ArrowRight, CheckCircle, TrendingDown, Zap, Shield, Lock, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full mb-6">
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Trusted by 500+ Australian organisations</span>
            </div>
            
            <h1 className="text-gray-900 mb-3 text-5xl lg:text-6xl">
              The new way to<br />collect payments
            </h1>
            <div className="text-3xl lg:text-4xl text-gray-600 mb-6">
              – fast, safe & easy.
            </div>
            
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              Stop using outdated direct-debit payments and start using PayTo®. Get instant, secure and low-cost funds into your organisation — without the admin overhead.
            </p>
            
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Payments that just work — without chasing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 flex items-center justify-center gap-2">
                Start collecting payments
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                See how it works
              </button>
            </div>
            
            {/* Security & Compliance badges */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Bank-level security</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">PCI-DSS Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">NPP Certified</span>
              </div>
            </div>
            
            {/* Industry pills - more compact */}
            <div>
              <p className="text-sm text-gray-500 mb-3">Designed for:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">Schools & Education</span>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">Childcare</span>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">Strata Management</span>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">Health & Wellness</span>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">Professional Services</span>
              </div>
            </div>
          </div>
          
          {/* Right side visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* Mobile mockup */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm mx-auto border border-gray-200">
                <div className="aspect-[9/16] bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-3 h-3 rounded-full bg-white/30"></div>
                    <div className="w-20 h-3 rounded-full bg-white/30"></div>
                    <div className="w-3 h-3 rounded-full bg-white/30"></div>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center justify-center text-white">
                    <CheckCircle className="w-20 h-20 mb-6" strokeWidth={1.5} />
                    <div className="text-center">
                      <div className="mb-2 opacity-80">PayTo® Agreement</div>
                      <div className="text-2xl mb-4">Approved</div>
                      <div className="text-sm opacity-70">Your payment setup is complete</div>
                    </div>
                  </div>
                  
                  <div className="h-1 w-1/3 mx-auto bg-white/30 rounded-full"></div>
                </div>
              </div>
              
              {/* Dashboard card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-5 border border-gray-200 max-w-[200px]">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-xs text-gray-500">Failures</div>
                      <div className="text-green-600">↓ 60%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-indigo-600" />
                    <div>
                      <div className="text-xs text-gray-500">Settlement</div>
                      <div className="text-indigo-600">Instant</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}