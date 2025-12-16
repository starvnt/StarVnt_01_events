
import React from 'react';
import { Gift, ArrowRight, ShoppingBag, Quote, Star } from 'lucide-react';
import { Button } from './Button';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Riya Sen",
    role: "Fashion Influencer",
    quote: "The leather quality is exquisite. My wedding return gifts were the talk of the town.",
    image: "https://picsum.photos/seed/riya/100/100"
  },
  {
     id: 2,
     name: "Vogue India",
     role: "Featured",
     quote: "Moniqui captures the essence of Bengal's heritage with modern luxury standards.",
     image: "https://picsum.photos/seed/magazine/100/100"
  },
  {
    id: 3,
    name: "A. Chatterjee",
    role: "CEO, TechSpace",
    quote: "We ordered 500 bespoke hampers for our corporate jubilee. Flawless execution.",
    image: "https://picsum.photos/seed/ceo/100/100"
  }
];

export const MoniquiSection: React.FC = () => {
  return (
    <section id="moniqui" className="relative py-24 bg-gradient-to-b from-star-900 to-slate-900 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute top-10 left-10 w-64 h-64 border border-gold-500 rounded-full"></div>
         <div className="absolute bottom-10 right-10 w-96 h-96 border border-gold-500 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          
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

          {/* Visual - Video Section */}
          <div className="order-1 md:order-2 relative group">
             <div className="absolute inset-0 bg-gold-500 transform rotate-3 rounded-2xl opacity-20 transition-transform group-hover:rotate-6"></div>
             <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl aspect-[4/5] bg-slate-800">
               <video 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                 autoPlay
                 muted
                 loop
                 playsInline
                 poster="https://picsum.photos/seed/leatherbag/800/1000"
               >
                 {/* Pexels stock video of leather crafting/luxury texture */}
                 <source src="https://videos.pexels.com/video-files/3756003/3756003-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                 Your browser does not support the video tag.
               </video>
               
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
               
               <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
                  <p className="text-gold-400 font-serif italic text-xl mb-3">"A gift they remember forever."</p>
                  <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest bg-black/50 w-fit px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Live Atelier View
                  </div>
               </div>
             </div>
          </div>

        </div>

        {/* Testimonials Section */}
        <div className="relative border-t border-slate-800 pt-16">
           <div className="text-center mb-10">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">Social Proof</span>
              <h3 className="text-2xl font-serif text-white mt-2">Loved by Icons</h3>
           </div>
           
           <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="group bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-gold-500/30 transition-all hover:-translate-y-1">
                   <div className="flex items-start gap-4 mb-4">
                      <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-slate-600 group-hover:border-gold-500 transition-colors" />
                      <div>
                        <h4 className="text-white font-serif font-bold">{t.name}</h4>
                        <span className="text-xs text-gold-500 uppercase tracking-wider">{t.role}</span>
                      </div>
                   </div>
                   <div className="relative">
                      <Quote className="absolute -top-2 -left-2 text-gold-500/10 w-8 h-8 transform -scale-x-100" />
                      <p className="text-slate-400 text-sm leading-relaxed relative z-10 italic">
                        "{t.quote}"
                      </p>
                   </div>
                   <div className="flex gap-1 mt-4">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} size={12} className="text-gold-500 fill-gold-500" />
                     ))}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};
