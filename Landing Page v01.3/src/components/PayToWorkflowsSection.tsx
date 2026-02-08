import { Settings, BarChart3, RefreshCw, FileSpreadsheet, Users, Shield } from 'lucide-react';

export function PayToWorkflowsSection() {
  const merchantFeatures = [
    {
      icon: Settings,
      title: 'Set-and-forget payment automation',
      description: 'Create payments once and let FairPay handle pauses, changes, retries, and expiry automatically.'
    },
    {
      icon: BarChart3,
      title: 'Easy-to-use dashboards',
      description: 'See what\'s approved, paid, overdue, or needs attention — all in one simple view.'
    },
    {
      icon: RefreshCw,
      title: 'AI-enabled smart retries',
      description: 'Reduce failed payments and arrears automatically without manual follow-ups.'
    },
    {
      icon: FileSpreadsheet,
      title: 'Built-in customer communications',
      description: 'Clear confirmations and reminders, without confusion or surprises.'
    }
  ];

  return (
    <section id="payto" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-3xl lg:text-4xl">
            The automated PayTo® platform powering your revenue
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            FairPay goes further than basic payment rails by providing the <strong>easy, automated workflows</strong> businesses need to manage payments every month — keeping costs low.
          </p>
        </div>
        
        {/* Merchant operations blocks */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {merchantFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Team value */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-10 mb-8 border border-indigo-100">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl text-gray-900 mb-3">
                Less chasing. Less admin. More time for better work.
              </h3>
              <p className="text-gray-700 leading-relaxed">
                FairPay helps finance and admin teams move away from monthly arrears chasing and focus on strategic work and better customer service.
              </p>
            </div>
          </div>
        </div>
        
        {/* Customer trust */}
        <div className="bg-white rounded-3xl p-10 mb-12 border-2 border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl text-gray-900 mb-3">
                Clear, bank-approved customer experiences
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Customers approve payments in their own banking app, receive clear confirmations, and stay informed with the right communications at the right time — no confusion, no surprises.
              </p>
            </div>
          </div>
        </div>
        
        {/* Differentiation */}
        <div className="hidden bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl p-10 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl mb-2 leading-relaxed">
              Other providers expose PayTo®. FairPay manages the entire payment lifecycle.
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
}