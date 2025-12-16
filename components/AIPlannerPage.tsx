
import React from 'react';
import { AuraSection } from './AuraSection';
import { SEO } from './SEO';
import { Button } from './Button';
import { MessageCircle, Sparkles, Brain, Clock, IndianRupee } from 'lucide-react';

export const AIPlannerPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen animate-[fadeIn_0.5s_ease-out]">
      <SEO 
        title="AI Event Planner (Aura+) — Demo Mode | StarVnt"
        description="Aura+ is StarVnt’s AI event planner assisting users with ideas, budgets, timelines & EMI options. Experience the future of event planning."
        keywords="AI event planner, Aura+, AI wedding planner India, Event budget calculator AI"
        canonical="https://starvnt.com/ai-event-planner"
        schemaType="Service"
      />

      {/* Hero Wrapper for Aura Section */}
      <div className="relative">
         <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
               Your Personal <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI Event Curator</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
               Aura+ is StarVnt’s proprietary AI engine. It doesn't just plan; it visualizes, budgets, and styles your event in seconds.
            </p>
         </div>
         
         <AuraSection />
      </div>

      {/* AI Features Grid */}
      <div className="bg-slate-900 py-24 border-t border-slate-800">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
               <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                  <Brain className="text-purple-400 w-12 h-12 mb-6" />
                  <h3 className="text-2xl font-serif text-white mb-4">Intelligent Ideation</h3>
                  <p className="text-slate-400 leading-relaxed">
                     Stuck on themes? Aura+ analyzes thousands of global trends to generate unique moodboards tailored to your cultural preferences.
                  </p>
               </div>
               <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                  <IndianRupee className="text-gold-500 w-12 h-12 mb-6" />
                  <h3 className="text-2xl font-serif text-white mb-4">Smart Budgeting</h3>
                  <p className="text-slate-400 leading-relaxed">
                     Input your total budget, and Aura+ allocates funds across venues, decor, and food, ensuring 0% wastage.
                  </p>
               </div>
               <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                  <Clock className="text-pink-400 w-12 h-12 mb-6" />
                  <h3 className="text-2xl font-serif text-white mb-4">24/7 Availability</h3>
                  <p className="text-slate-400 leading-relaxed">
                     Planning happens at midnight? Aura+ is always awake to answer queries about venues, EMI plans, and timelines.
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* Direct Human Handoff */}
      <div className="bg-star-900 py-24 text-center">
         <h2 className="text-3xl font-serif text-white mb-8">Loved the Demo? Let's Build it for Real.</h2>
         <a 
            href="https://wa.me/917044198505" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-green-900/20 text-lg"
         >
            <MessageCircle size={24} className="fill-current" />
            Chat with StarVnt Experts
         </a>
      </div>

    </div>
  );
};
