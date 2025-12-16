
import React from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';

export const AuraSection: React.FC = () => {
  return (
    <section id="aura" className="py-24 bg-star-800 relative overflow-hidden animate-[fadeIn_0.5s_ease-out]">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-gold-500 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Aura+ is Live in Demo Mode
          </span>
          <h2 className="text-4xl font-serif text-white mt-2 mb-6">India's First Luxury <br/> AI Event Curator</h2>
          
          <div className="bg-slate-900/60 border border-gold-500/30 p-6 rounded-xl mb-8 backdrop-blur-sm">
             <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="text-xl">✨</span> Demo Preview Active
             </h4>
             <p className="text-slate-300 mb-6 leading-relaxed text-sm">
                Our AI-powered event planning experience is currently in preview. 
                For confirmed bookings, real-time pricing, and EMI assistance, please connect with our human experts.
             </p>
             <a 
               href="https://wa.me/917044198505" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-6 rounded-lg transition-all w-full md:w-auto justify-center shadow-lg hover:shadow-green-900/20"
             >
                <MessageCircle size={20} className="fill-current" />
                WhatsApp Us: +91 70441 98505
             </a>
          </div>

          <div className="space-y-6 text-slate-400 leading-relaxed text-sm">
            <p>
              Aura+ isn't just a chatbot. It's a relationship builder. It understands the "Raja-Rani" emotion 
              behind an Indian wedding and the precision required for a corporate summit.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                Instant Moodboards & Timelines (Demo)
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                Real-time Budget Optimization
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                Regional Language Support (Bangla, Hindi, English)
              </li>
            </ul>
          </div>
        </div>
        <div className="relative">
          {/* Abstract visual representation of AI */}
          <div className="aspect-square rounded-full border border-gold-500/20 relative flex items-center justify-center animate-[spin_20s_linear_infinite]">
              <div className="absolute inset-4 rounded-full border border-gold-500/40 border-dashed"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-star-900/80 backdrop-blur p-6 rounded-2xl border border-gold-500/30">
                <h3 className="text-2xl font-serif text-gold-400">Aura+</h3>
                <p className="text-xs uppercase tracking-widest mt-1 text-slate-400">Preview Build 2026</p>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};
