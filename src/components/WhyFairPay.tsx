import { ArrowRight, CreditCard, LayoutDashboard, Layers } from "lucide-react";
import { Button } from "./ui/Button";
import dashboardImg from "../assets/e287b9ddbc46fe69bea91b1706929aa1ae75360e.png";

export function WhyFairPay() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            PayTo is the rail. FairPay is the platform.
          </h2>
          <p className="text-lg text-slate-600">
            FairPay turns PayTo capability into a complete collections engine: automated agreements, lifecycle management, workflows, and reporting.
          </p>
        </div>

        {/* Platform Image */}
        <div className="mb-16 -mx-4 md:mx-0">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
            {/* Browser Bar Decoration */}
            <div className="h-8 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            </div>
            <img
              src={dashboardImg}
              alt="FairPay Dashboard Interface showing collections and payment agreements"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
            <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center mb-6">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">PayTo collections, end-to-end</h3>
            <p className="text-slate-600 flex-1 mb-6">
              Create agreements, manage changes, and keep payments flowing with real-time visibility into every transaction status.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-6">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">One platform for all payments</h3>
            <p className="text-slate-600 flex-1 mb-6">
              Accept cards too — use as a fallback for failed PayTo payments or as a primary option, all managed in one dashboard.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center mb-6">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Built for finance-grade operations</h3>
            <p className="text-slate-600 flex-1 mb-6">
              Smarter workflows, cleaner data, and better visibility across every payer and transaction for your finance team.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="primary" className="group">
            See FairPay in action
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
