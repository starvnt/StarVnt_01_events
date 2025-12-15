
import React from 'react';
import { Camera, Sparkles } from 'lucide-react';

export const FTAuraSection: React.FC = () => {
  return (
    <section id="ftaura" className="relative py-24 bg-star-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-8 border-b border-white/5">
           <div>
              <span className="text-purple-400 font-bold uppercase tracking-[0.2em] text-sm flex items-center gap-2 mb-2">
                <Sparkles size={16} /> FTAura Style
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                Curating Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Signature Look</span>
              </h2>
           </div>
           <p className="text-slate-400 max-w-md mt-4 md:mt-0 text-right md:text-left">
             Our in-house styling team ensures you look as cinematic as your event. 
             From bridal trousseau to corporate grooming.
           </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-12 gap-6 h-auto md:h-[500px]">
           
           {/* Large Editorial Image */}
           <div className="md:col-span-7 relative rounded-xl overflow-hidden group">
              <img 
                src="https://picsum.photos/seed/fashion/1200/800" 
                alt="Editorial Fashion" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded border border-white/20">
                <span className="text-white text-xs font-bold uppercase tracking-wider">Lookbook 2026</span>
              </div>
           </div>

           {/* Service Cards */}
           <div className="md:col-span-5 flex flex-col gap-6">
              
              <div className="flex-1 bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors flex flex-col justify-center">
                 <Camera className="text-purple-400 mb-4" size={32} />
                 <h3 className="text-2xl font-serif text-white mb-2">Bridal & Groom Styling</h3>
                 <p className="text-slate-400 text-sm">
                   Complete wardrobe consultation, color theory matching with decor, and personal shopper assistance.
                 </p>
              </div>

              <div className="flex-1 bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-pink-500/50 transition-colors flex flex-col justify-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                 <h3 className="text-2xl font-serif text-white mb-2 relative z-10">Pre-Wedding Shoots</h3>
                 <p className="text-slate-400 text-sm relative z-10">
                   Conceptualized styling for drone shoots and cinematic films. We ensure your outfit tells a story.
                 </p>
                 <button className="mt-4 text-left text-sm font-bold text-white uppercase tracking-wider hover:text-pink-400 transition-colors">
                    Book Consultation &rarr;
                 </button>
              </div>

           </div>
        </div>

      </div>
    </section>
  );
};
