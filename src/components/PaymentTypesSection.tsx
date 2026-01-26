import { useState } from 'react';
import { Repeat, CreditCard, Zap, Shield, TrendingDown, Clock, CheckCircle, DollarSign, Calendar } from 'lucide-react';

type PaymentType = 'recurring' | 'oneoff' | 'card';

export function PaymentTypesSection() {
  const [activeTab, setActiveTab] = useState<PaymentType>('recurring');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4">
            All your payment needs, one platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From recurring memberships to one-off invoices and card payments — FairPay handles it all with the speed and reliability your organisation needs.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab('recurring')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'recurring'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Repeat className="w-5 h-5" />
              <span>Recurring Payments</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('oneoff')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'oneoff'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span>One-off & High-Value</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              <span>Card Payments</span>
            </div>
          </button>
        </div>

        {/* Tab content */}
        <div className="max-w-6xl mx-auto">
          {/* Recurring Payments */}
          {activeTab === 'recurring' && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl text-gray-900 mb-4">
                  Recurring payments that actually work
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  Set up automated payment schedules for memberships, subscriptions, fees, and retainers. PayTo® ensures funds are available before collecting — no more failed payments or awkward follow-ups.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Real-time balance verification</div>
                      <div className="text-gray-600">Know if funds are available before attempting collection</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingDown className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Reduce failures by up to 60%</div>
                      <div className="text-gray-600">PayTo® drastically reduces dishonours compared to direct debit</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Flexible scheduling</div>
                      <div className="text-gray-600">Weekly, fortnightly, monthly — whatever your billing cycle needs</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Instant settlement</div>
                      <div className="text-gray-600">Funds arrive in seconds, not days</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-100">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold text-gray-900">Recurring Schedule</h4>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Active</span>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-semibold text-gray-900">$150.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frequency</span>
                      <span className="font-semibold text-gray-900">Monthly</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next payment</span>
                      <span className="font-semibold text-gray-900">Feb 1, 2026</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Funds verified & available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* One-off & High-Value */}
          {activeTab === 'oneoff' && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl text-gray-900 mb-4">
                  Certainty for high-value payments
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  Collect deposits, retainers, annual fees, or large invoices with confidence. Get real-time approval from customers and instant settlement — perfect for payments you can't afford to fail.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Real-time customer approval</div>
                      <div className="text-gray-600">Customers authenticate each payment in their banking app</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">No amount limits</div>
                      <div className="text-gray-600">Collect $10 or $100,000 — PayTo® handles any amount</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Same-day settlement</div>
                      <div className="text-gray-600">Funds arrive in your account within seconds</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Lower costs than cards</div>
                      <div className="text-gray-600">Save up to 90% on transaction fees versus credit cards</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-100">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold text-gray-900">Payment Request</h4>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Pending</span>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Invoice</span>
                      <span className="font-semibold text-gray-900">#INV-2026-001</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-semibold text-gray-900 text-2xl">$5,250.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due date</span>
                      <span className="font-semibold text-gray-900">Jan 31, 2026</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Clock className="w-4 h-4" />
                      <span>Awaiting customer approval</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card Payments */}
          {activeTab === 'card' && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl text-gray-900 mb-4">
                  Card payments when you need them
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  Offer credit and debit card payments for customers who prefer cards. Competitive rates, instant processing, and seamless integration with your PayTo® workflows.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">All major cards accepted</div>
                      <div className="text-gray-600">Visa, Mastercard, Amex — we've got you covered</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">PCI-DSS compliant</div>
                      <div className="text-gray-600">Bank-grade security for all card transactions</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Instant processing</div>
                      <div className="text-gray-600">Real-time authorization and settlement</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Competitive pricing</div>
                      <div className="text-gray-600">Transparent rates with no hidden fees</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-900">
                    <strong>Pro tip:</strong> Encourage customers to use PayTo® for recurring payments and save up to 90% on transaction fees compared to cards.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-100">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold text-gray-900">Card Payment</h4>
                    <div className="flex gap-2">
                      <div className="w-10 h-7 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                      <div className="w-10 h-7 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">MC</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-sm text-gray-600">Card number</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded border border-gray-200 text-gray-400">
                        •••• •••• •••• 4242
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600">Expiry</label>
                        <div className="mt-1 p-3 bg-gray-50 rounded border border-gray-200 text-gray-400">
                          12/28
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">CVV</label>
                        <div className="mt-1 p-3 bg-gray-50 rounded border border-gray-200 text-gray-400">
                          •••
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-gray-200">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-semibold text-gray-900 text-xl">$89.00</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                    Pay now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
