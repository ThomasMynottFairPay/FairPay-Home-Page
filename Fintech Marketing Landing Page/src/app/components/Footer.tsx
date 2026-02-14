import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
        
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              F
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              FairPay
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Modern payments infrastructure for Australian businesses. Built for speed, clarity, and control.
          </p>
          <div className="flex gap-4">
             <Linkedin className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
             <Twitter className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
             <Github className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Product</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-teal-400 transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">PayTo vs Cards</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">AI Reconciliation</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-teal-400 transition-colors">About us</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
           <h4 className="text-white font-semibold mb-6">Contact</h4>
           <ul className="space-y-4 text-sm">
             <li>contact@fairpay-ai.com</li>
             <li>Level 1, 100 Creek St</li>
             <li>Brisbane, QLD 4000</li>
           </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 FairPay Pty Ltd. All rights reserved.</p>
        <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-4 text-[10px] text-slate-600 text-center md:text-left">
        PayTo® and PayID® are registered trademarks of NPP Australia Ltd.
      </div>
    </footer>
  );
}
