
import React, { useState } from 'react';
import { Sparkles, Building2, Music, PartyPopper, CalendarCheck, Check, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { EventType } from '../types';

interface EventsPageProps {
  onBookNow: (budget: number, type: EventType) => void;
  onNavigate: (view: any) => void;
}

const CATEGORIES = [
  { id: 'wedding', label: 'Luxury Weddings', icon: Sparkles, type: EventType.WEDDING, color: 'text-gold-500', bg: 'bg-gold-500' },
  { id: 'corporate', label: 'Corporate MICE', icon: Building2, type: EventType.CORPORATE, color: 'text-blue-400', bg: 'bg-blue-500' },
  { id: 'social', label: 'Social Celebrations', icon: PartyPopper, type: EventType.BIRTHDAY, color: 'text-pink-400', bg: 'bg-pink-500' },
  { id: 'entertainment', label: 'Live Entertainment', icon: Music, type: EventType.CONCERT, color: 'text-purple-400', bg: 'bg-purple-500' },
];

export const EventsPage: React.FC<EventsPageProps> = ({ onBookNow, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('wedding');

  const renderContent = () => {
    switch(activeTab) {
      case 'wedding':
        return (
          <div className="animate-[fadeIn_0.3s_ease-out]">
             <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                <div className="relative rounded-2xl overflow-hidden h-[400px] group shadow-2xl border border-slate-700">
                    <img src="https://picsum.photos/seed/wedding_detail/800/1000" alt="Wedding" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                        <span className="bg-gold-500 text-star-900 text-xs font-bold px-2 py-1 rounded mb-2 inline-block shadow-lg">BESTSELLER</span>
                        <h3 className="text-3xl font-serif text-white mb-2">Royal Heritage</h3>
                         <p className="text-sm text-slate-300">Experience the grandeur of Rajasthan's palaces or the charm of Bengal's Zamindar houses.</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-4xl font-serif text-white mb-6">The <span className="text-gold-500">Grand Indian</span> Wedding</h2>
                    <p className="text-slate-300 mb-8 leading-relaxed text-lg">
                        We don't just plan weddings; we curate a legacy. From sourcing 15th-century forts to choreographing a 500-drone light show for your Sangeet, 
                        StarVnt redefines grandeur. Every detail is meticulously crafted to tell your unique love story.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {['Destination Management', 'Bridal Styling (FTAura)', 'Guest Logistics', 'Cinematic Videography', 'Menu Curation', 'Honeymoon Planning'].map(item => (
                            <div key={item} className="flex items-center gap-2 text-slate-400 text-sm">
                                <div className="p-1 bg-slate-800 rounded-full border border-slate-700">
                                   <Check size={12} className="text-gold-500" />
                                </div>
                                {item}
                            </div>
                        ))}
                    </div>
                    <Button size="lg" onClick={() => onBookNow(2500000, EventType.WEDDING)}>
                        Start Planning <CalendarCheck size={18} className="ml-2" />
                    </Button>
                </div>
             </div>
          </div>
        );
      case 'corporate':
        return (
             <div className="animate-[fadeIn_0.3s_ease-out]">
             <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                <div className="order-2 md:order-1">
                    <h2 className="text-4xl font-serif text-white mb-6">Future-Ready <span className="text-blue-400">Corporate Events</span></h2>
                    <p className="text-slate-300 mb-8 leading-relaxed text-lg">
                        Move beyond the ballroom. We engineer high-impact product launches, global summits, and award nights using cutting-edge AV technology, holographic displays, and seamless hospitality for your delegates.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {['Global MICE', 'Product Launches', 'Tech Integration', 'VIP Delegate Management', 'Branding & Decor', 'Gala Dinners'].map(item => (
                             <div key={item} className="flex items-center gap-2 text-slate-400 text-sm">
                                <div className="p-1 bg-slate-800 rounded-full border border-slate-700">
                                   <Check size={12} className="text-blue-500" />
                                </div>
                                {item}
                            </div>
                        ))}
                    </div>
                    <Button size="lg" onClick={() => onBookNow(1000000, EventType.CORPORATE)} className="bg-blue-600 hover:bg-blue-500 text-white border-none shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                        Get Corporate Quote <ArrowRight size={18} className="ml-2" />
                    </Button>
                </div>
                <div className="order-1 md:order-2 relative rounded-2xl overflow-hidden h-[400px] group shadow-2xl border border-slate-700">
                    <img src="https://picsum.photos/seed/corporate_tech/800/1000" alt="Corporate" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-3xl font-serif text-white mb-2">Tech Summits</h3>
                         <p className="text-sm text-slate-300">Immersive experiences designed for the digital age.</p>
                    </div>
                </div>
             </div>
          </div>
        );
      case 'social':
        return (
          <div className="animate-[fadeIn_0.3s_ease-out]">
             <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                <div className="relative rounded-2xl overflow-hidden h-[400px] group shadow-2xl border border-slate-700">
                    <img src="https://picsum.photos/seed/birthday_party/800/1000" alt="Social" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                     <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-3xl font-serif text-white mb-2">Milestone Moments</h3>
                         <p className="text-sm text-slate-300">Because every year counts.</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-4xl font-serif text-white mb-6">Curated <span className="text-pink-400">Social Soirees</span></h2>
                    <p className="text-slate-300 mb-8 leading-relaxed text-lg">
                        From intimate 50th anniversaries to extravagant 21st birthdays, we bring a touch of class and fun. Themed decor, bespoke catering, and entertainment that keeps the party alive.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {['Theme Parties', 'Anniversaries', 'Baby Showers', 'Proposal Planning', 'Private Dinners', 'House Parties'].map(item => (
                            <div key={item} className="flex items-center gap-2 text-slate-400 text-sm">
                                <div className="p-1 bg-slate-800 rounded-full border border-slate-700">
                                   <Check size={12} className="text-pink-500" />
                                </div>
                                {item}
                            </div>
                        ))}
                    </div>
                    <Button size="lg" onClick={() => onBookNow(500000, EventType.BIRTHDAY)} className="bg-pink-600 hover:bg-pink-500 text-white border-none shadow-[0_0_15px_rgba(219,39,119,0.3)]">
                        Plan a Party <PartyPopper size={18} className="ml-2" />
                    </Button>
                </div>
             </div>
          </div>
        );
      case 'entertainment':
         return (
             <div className="animate-[fadeIn_0.3s_ease-out]">
             <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                <div className="order-2 md:order-1">
                    <h2 className="text-4xl font-serif text-white mb-6">StarVnt <span className="text-purple-400">Live Entertainment</span></h2>
                    <p className="text-slate-300 mb-8 leading-relaxed text-lg">
                        Access India's top talent instantly. Whether it's a Bollywood playback singer for your wedding or an EDM DJ for a college fest, we handle the booking, riders, and production.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {['Celebrity Management', 'Live Bands', 'DJs & EDM', 'Stand-up Comedy', 'Classical Artists', 'Dance Troupes'].map(item => (
                             <div key={item} className="flex items-center gap-2 text-slate-400 text-sm">
                                <div className="p-1 bg-slate-800 rounded-full border border-slate-700">
                                   <Check size={12} className="text-purple-500" />
                                </div>
                                {item}
                            </div>
                        ))}
                    </div>
                    <Button size="lg" onClick={() => onBookNow(200000, EventType.CONCERT)} className="bg-purple-600 hover:bg-purple-500 text-white border-none shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                        Book Artists <Music size={18} className="ml-2" />
                    </Button>
                </div>
                <div className="order-1 md:order-2 relative rounded-2xl overflow-hidden h-[400px] group shadow-2xl border border-slate-700">
                    <img src="https://picsum.photos/seed/dj_concert/800/1000" alt="Concert" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-purple-900/10 mix-blend-multiply"></div>
                     <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-3xl font-serif text-white mb-2">Electric Vibes</h3>
                         <p className="text-sm text-slate-300">Stage, Sound, Lights, Action.</p>
                    </div>
                </div>
             </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-star-900 pt-28 pb-20 px-6 animate-[fadeIn_0.5s_ease-out]">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center mb-16">
            <span className="text-gold-500 font-bold uppercase tracking-widest text-sm mb-4 block">Our Portfolio</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                Crafting <span className="text-gold-500">Memories</span> across <br className="hidden md:block"/> every Spectrum
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Discover our specialized divisions. From the sacred vows of a wedding to the electric energy of a concert, we master the art of celebration.
            </p>
        </div>

        {/* Tabs */}
        <div className="sticky top-20 z-30 bg-star-900/95 backdrop-blur-md py-4 border-b border-white/5 mb-12 -mx-6 px-6">
            <div className="max-w-7xl mx-auto flex overflow-x-auto gap-4 md:justify-center pb-2 md:pb-0 no-scrollbar">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all whitespace-nowrap ${
                            activeTab === cat.id 
                            ? `${cat.bg} text-white border-transparent font-bold shadow-lg` 
                            : 'bg-slate-800/50 text-slate-300 border-slate-700 hover:border-slate-500'
                        }`}
                    >
                        <cat.icon size={18} />
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto">
             {renderContent()}
        </div>

        {/* Cross Sell */}
        <div className="mt-20 py-16 bg-slate-800/30 rounded-2xl text-center border border-white/5 max-w-7xl mx-auto">
             <h3 className="text-2xl font-serif font-bold text-white mb-4">Complete Your Experience</h3>
             <div className="flex justify-center gap-4">
                 <Button variant="outline" onClick={() => onNavigate('moniqui')}>Explore Gifting</Button>
                 <Button variant="outline" onClick={() => onNavigate('ftaura')}>Explore Style</Button>
             </div>
        </div>
    </div>
  );
};
