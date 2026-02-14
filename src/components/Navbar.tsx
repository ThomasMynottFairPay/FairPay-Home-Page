import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/Button";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { name: "Product", href: "#product" },
  { name: "Why PayTo", href: "#why-payto" },
  { name: "AI + Reconciliation", href: "#ai" },
  { name: "Use cases", href: "#use-cases" },
  { name: "Pricing", href: "#pricing" },
  { name: "Resources", href: "#resources" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-100" : "bg-white/0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            F
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            FairPay
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#waitlist"
            className="text-sm font-medium text-slate-600 hover:text-teal-600"
          >
            Join waitlist
          </a>
          <Button size="sm">Book a demo</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-slate-900 py-2 border-b border-slate-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Button variant="secondary" className="w-full justify-center">
                  Join waitlist
                </Button>
                <Button className="w-full justify-center">Book a demo</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
