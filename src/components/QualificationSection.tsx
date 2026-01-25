import { useState, useEffect } from 'react';

export function QualificationSection() {
  const [sectorIndex, setSectorIndex] = useState(0);
  const [outcomeIndex, setOutcomeIndex] = useState(0);
  const [rotateType, setRotateType] = useState<'sector' | 'outcome'>('sector');
  const [fade, setFade] = useState(true);

  const sectors = [
    "schools & education",
    "childcare",
    "strata management",
    "health & wellness"
  ];

  const outcomes = [
    "certainty for high-value payments",
    "payments that don't fail",
    "cash flow you can rely on",
    "less time chasing customers"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        if (rotateType === 'sector') {
          setSectorIndex((prev) => (prev + 1) % sectors.length);
          setRotateType('outcome');
        } else {
          setOutcomeIndex((prev) => (prev + 1) % outcomes.length);
          setRotateType('sector');
        }
        setFade(true);
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, [rotateType]);

  return (
    <section className="py-12 bg-gradient-to-br from-indigo-600 to-blue-700 border-b border-indigo-700">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-wide text-white/80">
            Built for organisations with recurring payments
          </p>
        </div>
        
        <h2 className="text-2xl md:text-3xl text-white leading-snug mb-6">
          Are you in{' '}
          <span 
            className={`text-orange-300 font-semibold transition-all duration-300 ease-in-out inline-block ${
              fade && rotateType === 'outcome' ? 'opacity-100 translate-y-0' : rotateType === 'sector' && !fade ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            {sectors[sectorIndex]}
          </span>
          {' '}and need{' '}
          <span 
            className={`text-orange-300 font-semibold transition-all duration-300 ease-in-out inline-block ${
              fade && rotateType === 'sector' ? 'opacity-100 translate-y-0' : rotateType === 'outcome' && !fade ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            {outcomes[outcomeIndex]}
          </span>
          ?
        </h2>

        <p className="text-white/90 leading-relaxed mb-4 text-lg">
          FairPay is built for organisations that collect fees, retainers, memberships, deposits, or donations — without the admin.
        </p>

        <p className="text-sm text-white/70">
          Used by childcare centres, schools, strata managers, and service providers.
        </p>
      </div>
    </section>
  );
}