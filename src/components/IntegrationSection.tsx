import { Database, FileSpreadsheet, Webhook, CheckCircle2, BarChart3 } from 'lucide-react';

export function IntegrationSection() {
  return (
    <section id="integration" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-3xl lg:text-4xl">
            Works with your existing systems
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side */}
          <div>
            <p className="text-lg text-gray-700 mb-8">
              FairPay is <strong>easy to connect</strong> to your workflow:
            </p>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <div className="text-gray-900 mb-1">Payment links</div>
                  <div className="text-sm text-gray-600">Send via email, SMS, or embed on your site</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Webhook className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-gray-900 mb-1">One-off & recurring requests</div>
                  <div className="text-sm text-gray-600">Flexible payment options for any use case</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <div className="text-gray-900 mb-1">Instant approvals</div>
                  <div className="text-sm text-gray-600">Real-time tracking and notifications</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-gray-900 mb-1">Automatic reconciliation</div>
                  <div className="text-sm text-gray-600">Sync to Xero, MYOB, QuickBooks</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Dashboard illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-white/60"></div>
                  <div className="w-3 h-3 rounded-full bg-white/60"></div>
                  <div className="w-3 h-3 rounded-full bg-white/60"></div>
                </div>
                
                <div className="text-white/90 text-sm mb-4">FairPay Dashboard</div>
                
                <div className="space-y-3">
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-4 h-4 text-white" />
                      <div className="text-white text-sm">Connected ERPs</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded bg-white/30"></div>
                      <div className="w-8 h-8 rounded bg-white/30"></div>
                      <div className="w-8 h-8 rounded bg-white/30"></div>
                    </div>
                  </div>
                  
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-white text-sm mb-2">Live Payment Status</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-white/80">Approved</div>
                        <div className="text-xs text-green-300">●</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-white/80">Processing</div>
                        <div className="text-xs text-blue-300">●</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-white/80">Settled</div>
                        <div className="text-xs text-green-300">●</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating connection icons */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
              <Database className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
              <Webhook className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}