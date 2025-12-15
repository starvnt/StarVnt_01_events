
import React from 'react';
import { SERVICES } from '../data/mockData';

export const ServicesGrid: React.FC = () => {
  // Filter out Moniqui (svc-3) and FTAura (svc-4) to display them in their own dedicated sections
  const coreEvents = SERVICES.filter(s => s.id !== 'svc-3' && s.id !== 'svc-4');

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-gold-500 font-serif italic text-lg">The Experience</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-2 mb-6">
          Signature Events
        </h2>
        <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
        <p className="text-slate-400 max-w-2xl mx-auto">
            From intimacy to grandeur, we engineer moments that resonate.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {coreEvents.map((service) => (
          <div 
            key={service.id} 
            className="group relative overflow-hidden rounded-xl bg-slate-800 border border-slate-700 hover:border-gold-500/50 transition-all duration-300"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
              />
            </div>
            <div className="p-6 relative">
              <div className="absolute -top-10 right-6 bg-slate-900 p-3 rounded-full border border-slate-700 group-hover:border-gold-500 transition-colors shadow-lg">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{service.description}</p>
              <button className="text-gold-500 text-sm font-medium hover:text-white transition-colors uppercase tracking-wider">
                View Details &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
