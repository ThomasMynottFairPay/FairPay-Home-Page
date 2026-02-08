import { ArrowRight, CheckCircle, TrendingDown, Zap, GraduationCap, Dumbbell, Building2, Heart, Briefcase, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side */}
          <div>
            <h1 className="text-gray-900 mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Traditional payments cost you time & money
            </h1>

            <div className="text-xl sm:text-2xl lg:text-3xl text-gray-600 mb-8 leading-relaxed">
              <span className="text-indigo-600 font-semibold">FairPay</span> is the new way to collect funds.
              <br className="hidden sm:block" />
              <span className="font-medium">Easy, Automated, Low-Cost</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="https://forms.monday.com/forms/f0983dc8fc193913bbc6a34a60df7d5b?r=apse2&waitlist="
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                Start collecting payments
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#calculator" className="px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                Calculate your savings
              </a>
            </div>

            {/* Trust bar */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500 mb-6">Trusted by organisations across industries</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Schools & Education</span>
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Fitness & Gyms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Property Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Churches & Nonprofits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Professional Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Membership Clubs</span>
                </div>
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