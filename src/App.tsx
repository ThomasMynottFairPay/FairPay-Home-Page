import { HeroSection } from './components/HeroSection';
import { QualificationSection } from './components/QualificationSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
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
      <ProblemSection />
      <QualificationSection />
      <SolutionSection />
      <PayToWorkflowsSection />
      <MidPageCTASection />
      <RecurringSection />
      <OneOffPaymentsSection />
      <CardPaymentsSection />
      <BecsSection />
      <IndustrySection />
      <IntegrationSection />
      <TestimonialSection />
      <FinalCTASection />
    </div>
  );
}