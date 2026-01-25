import { Shield, CheckCircle2, Zap, FileCheck } from 'lucide-react';

export function OneOffPaymentsSection() {
  return (
    <section id="high-trust" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-3xl lg:text-4xl">
            One-off and high-value payments made safe and simple
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-3">
            <strong className="text-gray-900">Designed to prevent invoice redirection fraud and wrong-account payments.</strong>
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Perfect for deposits, outstanding balances, casual bookings, invoices, and high-trust industries like conveyancing.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left side - benefits */}
              <div className="p-10 bg-gradient-to-br from-indigo-50 to-white">
                <div className="space-y-6">
                  <div key={0} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-indigo-600" />
                    </div>
                    <p className="text-gray-700 pt-2">Bank-verified recipient = no redirection scams</p>
                  </div>
                  <div key={1} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                    </div>
                    <p className="text-gray-700 pt-2">Customer approves in their banking app</p>
                  </div>
                  <div key={2} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-indigo-600" />
                    </div>
                    <p className="text-gray-700 pt-2">Instant settlement</p>
                  </div>
                  <div key={3} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-6 h-6 text-indigo-600" />
                    </div>
                    <p className="text-gray-700 pt-2">Full audit trail for compliance</p>
                  </div>
                </div>
              </div>
              
              {/* Right side - message */}
              <div className="p-10 bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <div className="text-2xl mb-2">
                      High trust for big payments.
                    </div>
                    <div className="text-xl text-indigo-100">
                      Simple for everything else.
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-indigo-400/30">
                    <p className="text-indigo-100 leading-relaxed">
                      Whether it's a $50 casual booking or a $500,000 conveyancing deposit, 
                      FairPay gives you and your customer peace of mind.
                    </p>
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