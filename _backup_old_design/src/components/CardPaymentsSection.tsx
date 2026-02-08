import { CreditCard, CheckCircle2, BarChart3 } from 'lucide-react';

export function CardPaymentsSection() {
  return (
    <section id="card-payments" className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - content */}
            <div>
              <h2 className="text-gray-900 mb-6 text-3xl lg:text-4xl">
                Accept cards too — one platform for all payments
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                If customers prefer paying by card, FairPay supports that as well. Use card payments 
                as a fallback or primary method, all managed through one clean dashboard.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">Accept card payments with ease</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">Combine bank-to-bank and card flows</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">Unified reporting and reconciliation</span>
                </div>
              </div>
            </div>
            
            {/* Right side - visual card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200">
                {/* Card icon visual */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <CreditCard className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-gray-900 mb-1">Card Payments</div>
                      <div className="text-sm text-gray-500">Visa, Mastercard, Amex</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Processing</span>
                      <span className="text-green-600">Active</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Settlement</span>
                      <span className="text-gray-900">T+1</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Success rate</span>
                      <span className="text-gray-900">98.2%</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BarChart3 className="w-4 h-4" />
                  <span>All payment types unified in one dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}