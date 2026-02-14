import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProblemSection } from "./components/ProblemSection";
import { WhyPayTo } from "./components/WhyPayTo";
import { WhyFairPay } from "./components/WhyFairPay";
import { AISection } from "./components/AISection";
import { HowItWorks } from "./components/HowItWorks";
import { UseCases } from "./components/UseCases";
import { WhyNow } from "./components/WhyNow";
import { FAQ } from "./components/FAQ";
import { CTAStrip } from "./components/CTAStrip";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <WhyPayTo />
        <WhyFairPay />
        <AISection />
        <HowItWorks />
        <UseCases />
        <WhyNow />
        <FAQ />
        <CTAStrip />
      </main>
      <Footer />
    </div>
  );
}