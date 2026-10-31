import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CommunityProgress } from "./components/CommunityProgress";
import { ProblemSection } from "./components/ProblemSection";
import { HowItWorks } from "./components/HowItWorks";
import { Products } from "./components/Products";
import { MoreThanPayments } from "./components/MoreThanPayments";
import { Pricing } from "./components/Pricing";
import { UseCases } from "./components/UseCases";
import { FAQ } from "./components/FAQ";
import { CTAStrip } from "./components/CTAStrip";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink font-sans selection:bg-mint-300 selection:text-forest-900">
      <Navbar />
      <main>
        <Hero />
        <CommunityProgress />
        <ProblemSection />
        <HowItWorks />
        <Products />
        <MoreThanPayments />
        <Pricing />
        <UseCases />
        <FAQ />
        <CTAStrip />
      </main>
      <Footer />
    </div>
  );
}
