import { UserPlus, Link2, CheckCircle, Bell } from 'lucide-react';

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4">
            Simple to set up, easy to manage
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in minutes. Your customers approve payments in their banking app — no forms, no hassle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="text-sm font-semibold text-indigo-600 mb-2">STEP 1</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Create payment</h3>
            <p className="text-gray-600">
              Set up a recurring schedule or send a one-time payment request
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Link2 className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="text-sm font-semibold text-indigo-600 mb-2">STEP 2</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer approves</h3>
            <p className="text-gray-600">
              They authorize in their banking app — secure, instant, no passwords to remember
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="text-sm font-semibold text-indigo-600 mb-2">STEP 3</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Funds arrive instantly</h3>
            <p className="text-gray-600">
              Money hits your account in seconds, not days — with instant confirmation
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="text-sm font-semibold text-indigo-600 mb-2">STEP 4</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay informed</h3>
            <p className="text-gray-600">
              Real-time notifications keep you and your customers in the loop
            </p>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white/30"></div>
                <div className="w-3 h-3 rounded-full bg-white/30"></div>
                <div className="w-3 h-3 rounded-full bg-white/30"></div>
              </div>
              <div className="text-white text-sm font-medium">FairPay Dashboard</div>
              <div className="w-20"></div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <div className="text-sm text-green-700 mb-1">Collected Today</div>
                  <div className="text-3xl font-semibold text-green-900">$24,350</div>
                  <div className="text-xs text-green-600 mt-2">↑ 12% vs yesterday</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <div className="text-sm text-blue-700 mb-1">Active Agreements</div>
                  <div className="text-3xl font-semibold text-blue-900">1,247</div>
                  <div className="text-xs text-blue-600 mt-2">+23 this week</div>
                </div>
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
                  <div className="text-sm text-indigo-700 mb-1">Success Rate</div>
                  <div className="text-3xl font-semibold text-indigo-900">98.5%</div>
                  <div className="text-xs text-indigo-600 mt-2">Industry avg: 85%</div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-900">Recent Payments</h4>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Sarah Chen</div>
                        <div className="text-sm text-gray-500">Monthly membership</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">$150.00</div>
                      <div className="text-sm text-gray-500">2 mins ago</div>
                    </div>
                  </div>
                  <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Melbourne Property Trust</div>
                        <div className="text-sm text-gray-500">Strata levy - Q1</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">$4,200.00</div>
                      <div className="text-sm text-gray-500">8 mins ago</div>
                    </div>
                  </div>
                  <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">James Wilson</div>
                        <div className="text-sm text-gray-500">Annual school fees</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">$12,500.00</div>
                      <div className="text-sm text-gray-500">15 mins ago</div>
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
