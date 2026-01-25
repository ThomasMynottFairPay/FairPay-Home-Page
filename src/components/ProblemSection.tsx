import { DollarSign, XCircle, Clock, ArrowRight, TrendingUp, Settings } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function ProblemSection() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [failedPayments, setFailedPayments] = useState('medium');
  const [timeWasted, setTimeWasted] = useState('medium');
  const [settlementDelays, setSettlementDelays] = useState('medium');
  const [dishonourFees, setDishonourFees] = useState('medium');
  const [displayTotal, setDisplayTotal] = useState(0);

  // Cost estimation values (monthly)
  const costValues = {
    failedPayments: { low: 500, medium: 2000, high: 5000 },
    timeWasted: { low: 800, medium: 2500, high: 6000 },
    settlementDelays: { low: 300, medium: 1200, high: 3000 },
    dishonourFees: { low: 400, medium: 1500, high: 4000 }
  };

  const calculateTotal = () => {
    const total = 
      costValues.failedPayments[failedPayments] +
      costValues.timeWasted[timeWasted] +
      costValues.settlementDelays[settlementDelays] +
      costValues.dishonourFees[dishonourFees];
    return total;
  };

  const monthlyTotal = calculateTotal();
  const annualTotal = monthlyTotal * 12;

  // Animate number changes
  useEffect(() => {
    const start = displayTotal;
    const end = monthlyTotal;
    const duration = 400; // ms
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out function
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeProgress;
      
      setDisplayTotal(Math.round(current));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [monthlyTotal]);

  const problems = [
    {
      icon: DollarSign,
      title: 'Lost revenue',
      description: 'Failed or late payments',
      stat: '2 – 8%',
      label: 'lost revenue from failed or late payments',
      color: 'rose'
    },
    {
      icon: Clock,
      title: 'Time wasted',
      description: 'Chasing customers each week',
      stat: '15%',
      label: 'time wasted each week chasing customers',
      color: 'amber'
    },
    {
      icon: XCircle,
      title: 'Settlement delays',
      description: 'Slowing your cash flow',
      stat: '2–3 days',
      label: 'settlement delays slowing your cash flow',
      color: 'blue'
    }
  ];

  // Slider component
  const CostSlider = ({ label, value, onChange, values }) => {
    // Map value (low/medium/high) to slider position (0/1/2)
    const valueMap = { low: 0, medium: 1, high: 2 };
    const reverseMap = ['low', 'medium', 'high'];
    
    const sliderValue = valueMap[value];
    
    const handleChange = (e) => {
      const newValue = reverseMap[parseInt(e.target.value)];
      onChange(newValue);
    };

    const handleLabelClick = (labelValue) => {
      onChange(labelValue);
    };

    const getCurrentCost = () => {
      return values[value];
    };

    return (
      <div className="pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
        <style>{`
          .cost-slider-input {
            position: relative;
            width: 100%;
            height: 28px;
            background: transparent;
            -webkit-appearance: none;
            appearance: none;
            cursor: pointer;
            outline: none;
          }
          
          .cost-slider-input::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: radial-gradient(circle, #f3f4f6 0%, #f3f4f6 50%, #e11d48 50%, #e11d48 100%);
            background-size: 100% 100%;
            border: 3px solid #e11d48;
            cursor: grab;
            box-shadow: 0 2px 6px rgba(225, 29, 72, 0.25);
            transition: all 0.15s ease;
          }
          
          .cost-slider-input::-webkit-slider-thumb:hover {
            border-width: 4px;
            transform: scale(1.1);
            box-shadow: 0 0 0 6px rgba(225, 29, 72, 0.1), 0 3px 10px rgba(225, 29, 72, 0.3);
          }
          
          .cost-slider-input:active::-webkit-slider-thumb {
            cursor: grabbing;
            background: radial-gradient(circle, #e5e7eb 0%, #e5e7eb 50%, #e11d48 50%, #e11d48 100%);
            box-shadow: 0 0 0 8px rgba(225, 29, 72, 0.15), 0 2px 8px rgba(225, 29, 72, 0.35);
          }
          
          .cost-slider-input::-moz-range-thumb {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: radial-gradient(circle, #f3f4f6 0%, #f3f4f6 50%, #e11d48 50%, #e11d48 100%);
            border: 3px solid #e11d48;
            cursor: grab;
            box-shadow: 0 2px 6px rgba(225, 29, 72, 0.25);
            transition: all 0.15s ease;
          }
          
          .cost-slider-input::-moz-range-thumb:hover {
            border-width: 4px;
            transform: scale(1.1);
            box-shadow: 0 0 0 6px rgba(225, 29, 72, 0.1), 0 3px 10px rgba(225, 29, 72, 0.3);
          }
          
          .cost-slider-input:active::-moz-range-thumb {
            cursor: grabbing;
            background: radial-gradient(circle, #e5e7eb 0%, #e5e7eb 50%, #e11d48 50%, #e11d48 100%);
            box-shadow: 0 0 0 8px rgba(225, 29, 72, 0.15), 0 2px 8px rgba(225, 29, 72, 0.35);
          }
          
          .cost-slider-input::-webkit-slider-runnable-track {
            width: 100%;
            height: 10px;
            background: transparent;
            border-radius: 999px;
          }
          
          .cost-slider-input::-moz-range-track {
            width: 100%;
            height: 10px;
            background: transparent;
            border-radius: 999px;
          }
        `}</style>
        <div className="flex items-start justify-between mb-3">
          <label className="text-sm text-gray-600 flex-1">
            {label}
          </label>
          <div className="text-sm text-rose-600 ml-4">
            ~${getCurrentCost().toLocaleString()}<span className="text-gray-400"> / month</span>
          </div>
        </div>
        
        <div className="relative py-3">
          {/* Slider track background - grey portion */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[10px] bg-gray-200 rounded-full pointer-events-none"></div>
          
          {/* Active track - red portion up to thumb */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 left-0 h-[10px] bg-rose-500 rounded-full transition-all duration-200 pointer-events-none"
            style={{ width: `${(sliderValue / 2) * 100}%` }}
          ></div>
          
          {/* Slider input */}
          <input
            type="range"
            min="0"
            max="2"
            step="1"
            value={sliderValue}
            onChange={handleChange}
            className="cost-slider-input"
          />
          
          {/* Clickable labels below */}
          <div className="flex justify-between mt-2 px-1">
            <button
              onClick={() => handleLabelClick('low')}
              className={`text-xs transition-colors cursor-pointer hover:text-gray-700 px-4 py-2 -ml-4 ${sliderValue === 0 ? 'text-gray-600' : 'text-gray-400'}`}
            >
              Low
            </button>
            <button
              onClick={() => handleLabelClick('medium')}
              className={`text-xs transition-colors cursor-pointer hover:text-gray-700 px-4 py-2 ${sliderValue === 1 ? 'text-gray-600' : 'text-gray-400'}`}
            >
              Medium
            </button>
            <button
              onClick={() => handleLabelClick('high')}
              className={`text-xs transition-colors cursor-pointer hover:text-gray-700 px-4 py-2 -mr-4 ${sliderValue === 2 ? 'text-gray-600' : 'text-gray-400'}`}
            >
              High
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-full mb-4 border border-rose-200">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">The hidden cost of legacy payments</span>
          </div>
          <h2 className="text-gray-900 mb-4 text-3xl lg:text-4xl">
            Your payment system is costing you time and money
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            The real cost of payments isn't just fees — it's failure, delay, and time lost.
          </p>
        </div>
        
        {/* Pain cards - de-emphasized */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 hover:shadow-md transition-all relative group border border-gray-100"
            >
              {/* Gradient accent on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${problem.color}-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-${problem.color}-50 flex items-center justify-center mb-4 text-${problem.color}-600 border border-${problem.color}-200`}>
                  <problem.icon className="w-6 h-6" />
                </div>
                
                {/* Large stat */}
                <div className={`text-3xl text-${problem.color}-600 mb-1`}>
                  {problem.stat}
                </div>
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                  {problem.label}
                </div>
                
                <h3 className="text-gray-900 mb-1 text-sm">{problem.title}</h3>
                <p className="text-gray-600 text-xs">{problem.description}</p>
              </div>
            </div>
          ))}
          
          {/* Fourth card - Dishonour fees */}
          <div 
            className="bg-white rounded-2xl p-6 hover:shadow-md transition-all relative group border border-gray-100"
          >
            {/* Gradient accent on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4 text-amber-600 border border-amber-200">
                <DollarSign className="w-6 h-6" />
              </div>
              
              {/* Large stat */}
              <div className="text-3xl text-amber-600 mb-1">
                $5 – $20+
              </div>
              <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                Failed settlement & dishonour fees
              </div>
              
              <h3 className="text-gray-900 mb-1 text-sm">per failure</h3>
              <p className="text-gray-600 text-xs">Dishonour fees, retry fees, and admin time. Costs that compound every time a payment fails</p>
            </div>
          </div>
        </div>
        
        {/* Hero Calculator Panel */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-3xl border-2 border-slate-200 shadow-xl p-10 lg:p-12">
            <div className="text-center mb-10">
              <h3 className="text-gray-900 mb-2 text-2xl lg:text-3xl">
                What your payments are really costing you
              </h3>
              <p className="text-sm text-gray-500">
                Based on typical failure rates, fees, and settlement delays.
              </p>
            </div>
            
            {/* The Number - Hero Element */}
            <div className="text-center mb-8">
              <div className="text-7xl lg:text-8xl text-rose-600 mb-3 transition-all duration-300">
                ${displayTotal.toLocaleString()}
              </div>
              <div className="text-xl text-gray-700 mb-2">
                lost every month
              </div>
              <div className="text-lg text-gray-500">
                ≈ ${annualTotal.toLocaleString()} per year
              </div>
            </div>

            {/* CTA to adjust */}
            {!showCalculator && (
              <div className="text-center mb-8">
                <button
                  onClick={() => setShowCalculator(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm"
                >
                  <Settings className="w-5 h-5" />
                  Adjust this for your business
                </button>
              </div>
            )}

            {/* Expanded sliders section */}
            {showCalculator && (
              <div className="mb-8 bg-white rounded-2xl p-8 border border-gray-200">
                <div className="text-sm text-gray-600 mb-6 text-center">
                  Adjust the sliders to see how quickly these costs add up.
                </div>
                <div className="space-y-6 max-w-2xl mx-auto">
                  <CostSlider
                    label="Lost revenue from failed or late payments"
                    value={failedPayments}
                    onChange={setFailedPayments}
                    values={costValues.failedPayments}
                  />
                  
                  <CostSlider
                    label="Time wasted each week chasing customers"
                    value={timeWasted}
                    onChange={setTimeWasted}
                    values={costValues.timeWasted}
                  />
                  
                  <CostSlider
                    label="Settlement delays slowing your cash flow"
                    value={settlementDelays}
                    onChange={setSettlementDelays}
                    values={costValues.settlementDelays}
                  />
                  
                  <CostSlider
                    label="Failed settlement and dishonour fees"
                    value={dishonourFees}
                    onChange={setDishonourFees}
                    values={costValues.dishonourFees}
                  />
                </div>
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowCalculator(false)}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Calm tie-back line */}
            <div className="text-center text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Payments that just work remove these losses by failing less, settling faster, and reducing admin overhead.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}