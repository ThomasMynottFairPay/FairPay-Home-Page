import { CreditCard } from 'lucide-react';
import logo from 'figma:asset/83a3bcbb7f3bba824e89367054df9cbbd150ed76.png';

export function Navigation() {
  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="FairPay" className="w-10 h-10 rounded-xl" />
          <span className="text-xl text-gray-900">FairPay</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#payto" className="text-gray-600 hover:text-gray-900 transition-colors">PayTo®</a>
          <a href="#high-trust" className="text-gray-600 hover:text-gray-900 transition-colors">High Trust</a>
          <a href="#card-payments" className="text-gray-600 hover:text-gray-900 transition-colors">Card Payments</a>
          <a href="#integration" className="text-gray-600 hover:text-gray-900 transition-colors">Integration</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900 transition-colors">Sign in</button>
          <a
            href="https://forms.monday.com/forms/f0983dc8fc193913bbc6a34a60df7d5b?r=apse2&waitlist="
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </nav>
  );
}