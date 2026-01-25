import { ArrowRight, FileX, CheckCircle2, Zap, AlertTriangle } from 'lucide-react';

export function BecsSection() {
  return (
    <section className="hidden py-20 bg-gradient-to-br from-amber-50 to-orange-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-3xl lg:text-4xl">
            Ready for the transition away from direct debit?
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <div>
            <div className="prose prose-lg">
              <p className="text-gray-700 mb-6">
                Australia is moving on from old direct debit systems. Modern bank payments provide:
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-gray-900 mb-1">Instant settlement</div>
                  <div className="text-sm text-gray-600">Money arrives in seconds, not days</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-gray-900 mb-1">Verified bank accounts</div>
                  <div className="text-sm text-gray-600">Real-time validation before payments</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-gray-900 mb-1">Real-time approvals</div>
                  <div className="text-sm text-gray-600">Customers approve instantly in their banking app</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-gray-900 mb-1">Reliable recurring schedules</div>
                  <div className="text-sm text-gray-600">Set once and payments run automatically</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-gray-700 mb-4">
                Don't wait for your provider to retire legacy products. Switch early to keep your payments uninterrupted.
              </p>
              <p className="text-gray-900">
                <strong>Switch early so nothing breaks later.</strong> FairPay handles the transition from legacy direct debit, including migration support — so you can sit back while we do the heavy lifting.
              </p>
            </div>
          </div>
          
          {/* Right side */}
          <div>
            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-6">
              <h3 className="text-gray-900 mb-6">The transition timeline</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <FileX className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="w-0.5 h-12 bg-gray-300"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-gray-900 mb-1">BECS Direct Debit</div>
                    <div className="text-sm text-gray-500">Legacy system — ending 2030</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="w-0.5 h-12 bg-indigo-300"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-gray-900 mb-1">PayTo® (NPP Mandates)</div>
                    <div className="text-sm text-gray-500">Modern digital agreements</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-gray-900 mb-1">Real-time Payments</div>
                    <div className="text-sm text-gray-500">Instant settlement & verification</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Callout box */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                <div className="text-lg">Don&apos;t wait for your provider to shut off old products.</div>
              </div>
              <p className="text-sm text-white/90">
                Start migrating to PayTo® today and future-proof your payment infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}