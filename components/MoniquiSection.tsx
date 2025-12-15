
import React from 'react';
import { Gift, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from './Button';

export const MoniquiSection: React.FC = () => {
  return (
    <section id="moniqui" className="relative py-24 bg-gradient-to-b from-star-900 to-slate-900 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute top-10 left-10 w-64 h-64 border border-gold-500 rounded-full"></div>
         <div className="absolute bottom-10 right-10 w-96 h-96 border border-gold-500 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="order-2 md:order-1 animate-[slideInLeft_0.5s_ease-out]">
            <div className="flex items-center gap-2 mb-4">
               <Gift className="text-gold-500" size={24} />
               <span className="text-gold-500 font-bold uppercase tracking-[0.2em] text-sm">Moniqui Gift</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              The Art of <br/> 
              <span className="italic text-gold-400">Timeless Gifting</span>
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Elevate your event with <strong>Moniqui</strong> — our exclusive luxury gifting vertical. 
              We specialize in handcrafted Shantiniketan leather bags and bespoke hampers that serve as 
              the perfect return gift for weddings or corporate delegates.
            </p>
            
            <ul className="space-y-4 mb-8">
              {['Handcrafted Leather from Bengal', 'Custom Embossing & Branding', 'Eco-friendly & Sustainable', 'Bulk Orders with EMI'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-400">
                  <div className="w-1.5 h-1.5 bg-gold-500 rotate-45"></div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="gap-2"
                onClick={() => alert("Redirecting to Moniqui Online Store...")}
              >
                Shop Now <ShoppingBag size={16} />
              </Button>
              <Button variant="outline" className="gap-2">
                View Catalog <ArrowRight size={16} />
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="order-1 md:order-2 relative group">
             <div className="absolute inset-0 bg-gold-500 transform rotate-3 rounded-2xl opacity-20 transition-transform group-hover:rotate-6"></div>
             <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl aspect-[4/5]">
               <img 
                 src="https://picsum.photos/seed/leatherbag/800/1000" 
                 alt="Moniqui Leather Bag" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                  <p className="text-gold-400 font-serif italic text-xl">"A gift they remember forever."</p>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
