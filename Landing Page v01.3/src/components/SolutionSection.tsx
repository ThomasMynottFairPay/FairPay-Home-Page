import { ArrowRight, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export function SolutionSection() {
  const paymentTypes = [
    { amount: '$2,100.00', description: 'Monthly child care fee' },
    { amount: '$80.00', description: 'Weekly gym membership' },
    { amount: '$89.00', description: 'Monthly subscription' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % paymentTypes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentPayment = paymentTypes[currentIndex];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Content */}
          <div>
            <h2 className="text-gray-900 mb-6 text-3xl lg:text-4xl">
              Easy to set up, secure in seconds
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Whether you're at enrolment, check-in, or just after a conversation — FairPay makes it <strong>easy</strong> to create a payment on the spot.
            </p>
            
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Your customer receives a secure notification from their banking app and approves instantly.
            </p>
            
            <div className="space-y-4 mb-12">
              <div className="flex items-start gap-3">
                <div className="text-gray-400 mt-1">×</div>
                <p className="text-lg text-gray-900">Automated & Paperless</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-gray-400 mt-1">×</div>
                <p className="text-lg text-gray-900">No bank details required</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-gray-400 mt-1">×</div>
                <p className="text-lg text-gray-900">Low-cost processing</p>
              </div>
            </div>
            
            <div className="border-l-4 border-indigo-600 pl-6 mb-12">
              <p className="text-xl text-gray-900 mb-2">
                "Let me set that up for you now."
              </p>
              <p className="text-gray-600">
                This is the moment payments actually happen — and where businesses stop losing revenue.
              </p>
            </div>
          </div>
          
          {/* Right: Visual */}
          <div className="relative">
            
            {/* Mobile phone mockup */}
            <div className="max-w-sm mx-auto">
              
              {/* Sending state */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">FairPay</div>
                  <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-2">Request sent to</div>
                  <div className="text-lg text-gray-900">Sarah Chen</div>
                  <div className="text-sm text-gray-500">sarah.chen@email.com</div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="text-sm text-gray-500 mb-1">Amount</div>
                  <div className="text-3xl text-gray-900">{currentPayment.amount}</div>
                  <div className="text-sm text-gray-600 mt-2">{currentPayment.description}</div>
                </div>
                
                <button className="w-full bg-indigo-600 text-white py-4 rounded-xl flex items-center justify-center gap-2">
                  <span>Send payment request</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Approval confirmation */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl border-2 border-green-200 p-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl text-gray-900 mb-2">Payment approved</h3>
                  <p className="text-green-700 mb-4">Confirmed in 3 seconds</p>
                  
                  <div className="bg-white/60 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Settled amount</div>
                    <div className="text-2xl text-gray-900">{currentPayment.amount}</div>
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