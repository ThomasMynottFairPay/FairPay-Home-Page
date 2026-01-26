import { HeroSection } from './components/HeroSection';
import { QualificationSection } from './components/QualificationSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { ComparisonSection } from './components/ComparisonSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PaymentTypesSection } from './components/PaymentTypesSection';
import { PayToWorkflowsSection } from './components/PayToWorkflowsSection';
import { MidPageCTASection } from './components/MidPageCTASection';
import { RecurringSection } from './components/RecurringSection';
import { OneOffPaymentsSection } from './components/OneOffPaymentsSection';
import { CardPaymentsSection } from './components/CardPaymentsSection';
import { BecsSection } from './components/BecsSection';
import { IndustrySection } from './components/IndustrySection';
import { IntegrationSection } from './components/IntegrationSection';
import { TestimonialSection } from './components/TestimonialSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Navigation } from './components/Navigation';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ComparisonSection />
      <HowItWorksSection />
      <PaymentTypesSection />
      <TestimonialSection />
      <IndustrySection />
      <IntegrationSection />
      <BecsSection />
      <FinalCTASection />
    </div>
  );
}