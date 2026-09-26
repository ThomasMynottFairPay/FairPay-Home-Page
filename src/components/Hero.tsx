import { ArrowRight, Coffee, GraduationCap, Heart, Users, Wrench, Handshake, CheckCircle2, Layers, Store } from "lucide-react";
import { Button } from "./ui/Button";
import { motion } from "motion/react";
import { links } from "../content/site";

const members = [
  { icon: Users, label: "Sports club" },
  { icon: Coffee, label: "Café" },
  { icon: Heart, label: "Charity" },
  { icon: GraduationCap, label: "Tutoring" },
  { icon: Wrench, label: "Trades" },
];

function HeroVisual() {
  return (
    <div className="relative w-full max-w-[550px] bg-slate-50 rounded-2xl border border-slate-100 p-6 md:p-8 shadow-xl overflow-hidden mx-auto lg:mr-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Members on their own */}
        <div className="w-full">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
            On their own: standard rates
          </p>
          <div className="grid grid-cols-5 gap-2">
            {members.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center border border-slate-200 text-slate-500 shadow-sm">
                  <m.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium text-slate-500 text-center leading-tight">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Flowing into the pool */}
        <div className="relative h-10 w-full flex justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, 32], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.5, ease: "easeIn" }}
              className="absolute top-0 w-2 h-2 bg-teal-500 rounded-full"
              style={{ left: `${40 + i * 10}%` }}
            />
          ))}
        </div>

        {/* The pool */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full p-5 bg-white rounded-xl border-2 border-teal-100 shadow-lg relative"
        >
          <div className="absolute -top-3 left-5 bg-teal-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
            FairPay community
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center border border-teal-100 shrink-0">
              <Layers className="w-6 h-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-slate-900">Pooled payment volume</div>
              <div className="mt-2 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "15%" }}
                  animate={{ width: ["15%", "70%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  className="h-full bg-teal-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <ArrowRight className="w-5 h-5 text-teal-600 rotate-90" />

        {/* The outcome */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full flex items-center gap-3 p-4 bg-slate-900 text-white rounded-xl shadow-xl"
        >
          <Handshake className="w-6 h-6 text-teal-400 shrink-0" />
          <div>
            <div className="text-sm font-semibold">Buying power to negotiate better rates</div>
            <div className="text-xs text-slate-400">Passed back to every member</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
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
            Founding memberships now open
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6"
          >
            Big-business payment rates, for small businesses and not-for-profits.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl leading-relaxed"
          >
            FairPay pools the payment volume of Australian small businesses and not-for-profits into real buying power. The bigger our community grows, the better the deal for every member.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <a href={links.join} target="_blank" rel="noopener noreferrer">
                Become a founding member
              </a>
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
              <a href="#how-it-works">See how it works</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t border-slate-100 w-full grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: CheckCircle2, text: "Built on Stripe" },
              { icon: Layers, text: "Cards, wallets, PayTo and invoicing" },
              { icon: Store, text: "Made for businesses under $2M" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-500">
                <item.icon className="w-5 h-5 text-teal-600 shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="lg:col-span-6 relative">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
