import { ArrowRight, Building2, CalendarClock, CheckCircle2, CreditCard, Landmark, ShieldCheck, TrendingDown, Zap } from "lucide-react";
import { Button } from "./ui/Button";
import { motion } from "motion/react";

function HeroVisual() {
  return (
    <div className="relative w-full max-w-[550px] aspect-[4/3] bg-slate-50 rounded-2xl border border-slate-100 p-6 shadow-xl overflow-hidden mx-auto lg:mr-0 flex flex-col justify-center">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col gap-8 px-2">

        {/* TOP: Legacy Comparison (Cards/Direct Debit) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full flex items-center justify-between p-4 bg-white/60 rounded-xl border border-slate-200 border-dashed"
        >
          {/* Left: Card/Payer */}
          <div className="flex flex-col items-center gap-2 w-20">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 text-slate-400">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold text-slate-400">Cards</span>
          </div>

          {/* Middle: Slow Path */}
          <div className="flex-1 flex flex-col items-center justify-center gap-2 px-2">
            {/* Top Label: High Fees */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-100 flex items-center gap-1">
                <TrendingDown className="w-3 h-3 rotate-180" /> High fees
              </span>
            </div>

            {/* Dashed Line */}
            <div className="w-full h-[2px] bg-slate-300 relative flex items-center justify-center my-1">
              <div className="absolute inset-0 border-t-2 border-dashed border-slate-300 w-full top-[-1px]"></div>

              {/* Moving Element (Slow) */}
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute w-2 h-2 bg-slate-400 rounded-full"
              />
            </div>

            {/* Bottom Label: Delay */}
            <div className="bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm flex items-center gap-1.5">
              <CalendarClock className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] font-bold text-slate-600">2-3 Days</span>
            </div>
          </div>

          {/* Right: Merchant */}
          <div className="flex flex-col items-center gap-2 w-20">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 text-slate-400">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold text-slate-400">You</span>
          </div>
        </motion.div>


        {/* BOTTOM: FairPay / PayTo Flow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full flex items-center justify-between p-6 bg-white rounded-xl border-2 border-teal-100 shadow-lg relative overflow-visible"
        >
          {/* Label Badge */}
          <div className="absolute -top-3 left-6 bg-teal-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
            PayTo Route
          </div>

          {/* Payer Bank */}
          <div className="flex flex-col items-center gap-2 w-20 z-10">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100 shadow-sm relative">
              <Landmark className="w-7 h-7 text-indigo-600" />
              <div className="absolute -top-1.5 -right-1.5 bg-green-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-3 h-3 text-white" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-slate-700 whitespace-nowrap">Customer Acct</span>
          </div>

          {/* Fast Path */}
          <div className="flex-1 flex flex-col items-center px-4 relative h-14 justify-center">
            <div className="flex justify-center gap-3 w-full absolute -top-4">
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-1 bg-teal-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-teal-700 border border-teal-100"
              >
                <Zap className="w-3 h-3 fill-teal-600" /> INSTANT
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex items-center gap-1 bg-teal-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-teal-700 border border-teal-100"
              >
                <TrendingDown className="w-3 h-3" /> LOW COST
              </motion.span>
            </div>

            {/* Rail */}
            <div className="w-full h-3 bg-slate-100 rounded-full relative overflow-hidden mt-2 border border-slate-200/50">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(20,184,166,0.3),transparent)] w-1/2 animate-[shimmer_1.5s_infinite]" />
            </div>

            {/* Moving Payment Icon */}
            <motion.div
              animate={{ x: ["-140%", "140%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 mt-1"
            >
              <div className="flex items-center gap-1.5 bg-teal-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg border-2 border-white whitespace-nowrap">
                <span>$$$</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          </div>

          {/* Merchant Bank */}
          <div className="flex flex-col items-center gap-2 w-20 z-10">
            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center border border-teal-100 shadow-sm">
              <Building2 className="w-7 h-7 text-teal-600" />
            </div>
            <span className="text-[11px] font-bold text-teal-800">Your Acct</span>
          </div>
        </motion.div>
      </div>

      {/* Floating AI Badge (Bottom Right) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-4 right-4 bg-slate-900/95 backdrop-blur text-white p-2.5 rounded-lg shadow-2xl border border-slate-700 w-40 z-30"
      >
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-[9px] font-medium text-slate-300 uppercase tracking-wider">AI Reconciliation</span>
        </div>
        <div className="text-[11px] font-medium leading-tight">Payment Matched</div>
        <div className="text-[9px] text-slate-400 mt-0.5 leading-tight">Funds available.</div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">

        {/* Left Content */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium border border-teal-100 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            PayTo® + AI Reconciliation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6"
          >
            Payments shouldn’t cost you time and money.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl leading-relaxed"
          >
            Replace high-fee, high-admin payment rails with PayTo® collections that settle in real time — and use cards as fallback or primary when your customers prefer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <a href="https://calendly.com/thomas-fairpay-ai/30min" target="_blank" rel="noopener noreferrer">
                Book a demo
              </a>
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
              <a href="https://forms.monday.com/forms/f0983dc8fc193913bbc6a34a60df7d5b?r=apse2&waitlist=" target="_blank" rel="noopener noreferrer">
                Join the waitlist
              </a>
            </Button>
          </motion.div>

          {/* Trust Bar (Mobile/Desktop embedded) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t border-slate-100 w-full grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: ShieldCheck, text: "Bank-authorised agreements" },
              { icon: Zap, text: "Real-time via NPP" },
              { icon: CheckCircle2, text: "Richer data" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-500">
                <item.icon className="w-5 h-5 text-teal-600 shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Visual */}
        <div className="lg:col-span-6 relative">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
