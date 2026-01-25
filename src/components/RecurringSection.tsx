import { FileText, Smartphone, Repeat, ArrowRight } from 'lucide-react';

export function RecurringSection() {
  const steps = [
    {
      icon: FileText,
      title: 'Set up payment',
      description: 'Enter amount and schedule.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Smartphone,
      title: 'Customer approves instantly',
      description: 'A secure prompt appears in their banking app.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Repeat,
      title: 'Payments run automatically',
      description: 'No chasing. No admin. No surprises.',
      color: 'from-cyan-500 to-cyan-600'
    }
  ];

  return (
    <section className="hidden py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-3xl lg:text-4xl">
            Instant recurring payments — solved.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Account-to-account payments that are cheaper than cards. <strong>Most organisations save 40–70% compared to card fees.</strong>
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-indigo-200 via-blue-200 to-cyan-200 z-0" />
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-4 relative">
              {steps.map((step, index) => (
                <div key={index} className="relative flex flex-col items-center text-center">
                  {/* Icon circle with gradient */}
                  <div className={`relative z-10 w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-xl`}>
                    <step.icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                  </div>
                  
                  {/* Step number badge */}
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-2 z-20">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-sm text-gray-600 shadow-md">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Arrow connector for mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <ArrowRight className="w-6 h-6 text-gray-300 rotate-90" />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-gray-900">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom detail */}
          <div className="mt-16 text-center">
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 flex items-center justify-center gap-2 mx-auto">
              Set up your first payment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}