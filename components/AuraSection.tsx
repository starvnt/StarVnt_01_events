
import React from 'react';

export const AuraSection: React.FC = () => {
  return (
    <section id="aura" className="py-24 bg-star-800 relative overflow-hidden animate-[fadeIn_0.5s_ease-out]">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-gold-500 font-bold uppercase tracking-wider text-sm">Meet Aura+</span>
          <h2 className="text-4xl font-serif text-white mt-2 mb-6">India's First Luxury <br/> AI Event Curator</h2>
          <div className="space-y-6 text-slate-300 leading-relaxed">
            <p>
              Aura+ isn't just a chatbot. It's a relationship builder. It understands the "Raja-Rani" emotion 
              behind an Indian wedding and the precision required for a corporate summit.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                Instant Moodboards & Timelines
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
            <div className="pt-4">
              <p className="text-sm text-slate-400 italic mb-4">"Try asking: 'Plan a Haldi ceremony in Kolkata for 200 people'"</p>
            </div>
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
                <p className="text-xs uppercase tracking-widest mt-1">Live Demo</p>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};
