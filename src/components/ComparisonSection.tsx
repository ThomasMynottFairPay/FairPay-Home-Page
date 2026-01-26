import { X, Check, AlertCircle, Clock, TrendingUp, Shield } from 'lucide-react';

export function ComparisonSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4">
            The old way vs. the FairPay way
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See why organisations are switching from outdated direct debit to PayTo®
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Old Way - Direct Debit */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">Old Way</h3>
                <p className="text-gray-600">Traditional Direct Debit</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="text-gray-700">
                  <strong>High failure rates</strong> — 15-25% of payments bounce due to insufficient funds
                </div>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="text-gray-700">
                  <strong>Delayed settlements</strong> — wait 3-5 business days for funds to arrive
                </div>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="text-gray-700">
                  <strong>Manual chasing</strong> — admin teams spend hours following up failed payments
                </div>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="text-gray-700">
                  <strong>No visibility</strong> — won't know if payment failed until days later
                </div>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="text-gray-700">
                  <strong>Dishonour fees</strong> — get charged when customer has insufficient funds
                </div>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="text-gray-700">
                  <strong>Poor customer experience</strong> — embarrassing failed payment notifications
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-300">
              <div className="text-sm text-gray-600">Typical success rate</div>
              <div className="text-3xl font-bold text-red-600">75-85%</div>
            </div>
          </div>

          {/* New Way - PayTo */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-300 rounded-2xl p-8 relative">
            <div className="absolute -top-4 right-8 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
              Recommended
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">FairPay Way</h3>
                <p className="text-indigo-700">PayTo® on the NPP</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-gray-900">
                  <strong>Ultra-low failures</strong> — real-time balance checks mean 95%+ success rates
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-gray-900">
                  <strong>Instant settlement</strong> — funds arrive in your account within seconds
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-gray-900">
                  <strong>Zero admin overhead</strong> — automated workflows handle everything
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-gray-900">
                  <strong>Complete visibility</strong> — know payment status in real-time
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-gray-900">
                  <strong>No dishonour fees</strong> — funds verified before collection
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-gray-900">
                  <strong>Seamless customer experience</strong> — approve in their trusted banking app
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-indigo-200">
              <div className="text-sm text-indigo-700">Typical success rate</div>
              <div className="text-3xl font-bold text-green-600">95-98%</div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">60%</div>
                <div className="text-indigo-100">Fewer failed payments</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">90%</div>
                <div className="text-indigo-100">Less admin time chasing payments</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">Instant</div>
                <div className="text-indigo-100">Settlement vs 3-5 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}