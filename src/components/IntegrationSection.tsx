import { Database, FileSpreadsheet, Webhook, CheckCircle2, BarChart3, Zap } from 'lucide-react';

export function IntegrationSection() {
  return (
    <section id="integration" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-4xl lg:text-5xl">
            Works with tools you already use
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect FairPay to your existing systems in minutes. No complex setup required.
          </p>
        </div>
        
        {/* Popular integrations logos */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-200">
              <span className="text-lg font-semibold text-gray-700">Xero</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-200">
              <span className="text-lg font-semibold text-gray-700">MYOB</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-200">
              <span className="text-lg font-semibold text-gray-700">QuickBooks</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-200">
              <span className="text-lg font-semibold text-gray-700">Stripe</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Links</h3>
            <p className="text-gray-600">
              Send via email, SMS, or embed on your website. No coding required.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <Webhook className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">API Access</h3>
            <p className="text-gray-600">
              Full API documentation for custom integrations and automations.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Auto Reconciliation</h3>
            <p className="text-gray-600">
              Automatic sync with your accounting software. Zero manual entry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}