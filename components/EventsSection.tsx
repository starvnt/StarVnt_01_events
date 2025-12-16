
import React, { useState } from 'react';
import { Sparkles, Gem, Music, ArrowRight, Search, X, Check, CalendarCheck } from 'lucide-react';
import { Button } from './Button';
import { EventType } from '../types';

// Define event data for filtering and dynamic rendering
const EVENTS_DATA = [
  {
    id: 'wedding',
    title: 'Cinematic Weddings',
    subtitle: 'The Flagship',
    description: 'From the Haldi to the Reception, we turn your "Raja-Rani" moments into a Bollywood masterpiece. Drone films, live direction, and heritage venues.',
    longDescription: "We don't just plan weddings; we direct them. Our signature 'Cinematic Wedding' package includes a full-scale production team, ensuring every ritual from the Haldi to the Bidaai is captured with the grandeur of a Bollywood masterpiece.",
    features: ["Drone Cinematography", "Live Direction Team", "Heritage Venue Sourcing", "Bridal Entry Choreography", "Global Guest Concierge", "Real-time Social Edits"],
    image: 'https://picsum.photos/seed/wedding123/1200/800',
    icon: Sparkles,
    accentColor: 'text-gold-500',
    hoverBorder: 'hover:border-gold-500',
    eventType: EventType.WEDDING,
    defaultBudget: 2500000
  },
  {
    id: 'corporate',
    title: 'Corporate Tech',
    subtitle: 'MICE & Summits',
    description: 'Award nights, conferences, and launches executed with military precision. Tech-first engagement for global delegates.',
    longDescription: "Transform boring conferences into electrifying experiences. We specialize in high-tech MICE events, product launches, and award nights that engage global delegates through immersive AV and seamless logistics.",
    features: ["Holographic Presentations", "RFID Guest Management", "Live Streaming Setup", "VIP Delegate Handling", "Custom Branding Suites"],
    image: 'https://picsum.photos/seed/corp55/600/400',
    icon: Gem,
    accentColor: 'text-blue-400',
    hoverBorder: 'hover:border-blue-500',
    eventType: EventType.CORPORATE,
    defaultBudget: 800000
  },
  {
    id: 'music',
    title: 'StarVnt Music',
    subtitle: 'Entertainment',
    description: 'Book top DJs, Bands, and Celebrity performers instantly. From EDM nights to Classical soirees.',
    longDescription: "From intimate acoustic soirees to thunderous EDM festivals. StarVnt Music provides instant access to India's top DJs, bands, and celebrity performers, handled with professional technical riders and stage production.",
    features: ["Celebrity Booking", "Concert Grade Sound", "Intelligent Lighting", "Artist Hospitality", "License Management"],
    image: 'https://picsum.photos/seed/dj/600/400',
    icon: Music,
    accentColor: 'text-purple-400',
    hoverBorder: 'hover:border-purple-500',
    eventType: EventType.CONCERT,
    defaultBudget: 200000
  }
];

const QUICK_FILTERS = ['Wedding', 'Corporate', 'Music', 'MICE'];

interface EventsSectionProps {
  onBookNow?: (budget: number, type: EventType) => void;
  onAskAura?: () => void;
  onExplore?: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onBookNow, onAskAura, onExplore }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<typeof EVENTS_DATA[0] | null>(null);

  const filteredEvents = EVENTS_DATA.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(value);

  return (
    <section id="events" className="py-24 bg-star-900 relative">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
            <span className="text-gold-500 font-serif italic text-lg">The Core Experience</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-2 mb-6">
            Signature Productions
            </h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
            <p className="text-slate-400 max-w-2xl mx-auto">
                We don't just plan events; we direct cinematic experiences. <br/>
                Choose your stage.
            </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-16 relative animate-[fadeIn_0.5s_ease-out]">
            <div className="relative">
                <input 
                    type="text"
                    placeholder="Search events (e.g. Wedding, Corporate)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-full pl-12 pr-12 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder-slate-500 shadow-xl"
                />
                <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
                {searchTerm && (
                    <button 
                        onClick={() => setSearchTerm('')}
                        className="absolute right-4 top-3.5 text-slate-500 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>
            
            {/* Quick Keyword Filters */}
            <div className="flex justify-center gap-2 mt-4 flex-wrap">
              {QUICK_FILTERS.map(filter => (
                <button
                  key={filter}
                  onClick={() => setSearchTerm(searchTerm === filter ? '' : filter)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${
                    searchTerm === filter 
                    ? 'bg-gold-500 text-star-900 border-gold-500' 
                    : 'bg-transparent text-slate-400 border-slate-700 hover:border-gold-500 hover:text-gold-500'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
        </div>

        {/* Content Area */}
        {searchTerm ? (
            /* Filtered Grid View */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-[fadeIn_0.3s_ease-out] min-h-[400px]">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                        <div 
                            key={event.id} 
                            onClick={() => setSelectedEvent(event)}
                            className={`group relative h-[350px] rounded-2xl overflow-hidden border border-slate-700 ${event.hoverBorder} transition-colors cursor-pointer`}
                        >
                            <img 
                                src={event.image} 
                                alt={event.title} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-star-900 via-star-900/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <div className={`flex items-center gap-2 mb-2 ${event.accentColor}`}>
                                    <event.icon size={18} />
                                    <span className="uppercase tracking-widest text-[10px] font-bold">{event.subtitle}</span>
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-white mb-2">{event.title}</h3>
                                <p className="text-slate-300 text-sm line-clamp-2 mb-4">{event.description}</p>
                                
                                <div className="flex items-center justify-between mt-4">
                                  <span className="text-gold-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                      Details <ArrowRight size={12} />
                                  </span>
                                  <Button 
                                    size="sm" 
                                    className="py-1 px-3 text-xs flex items-center gap-1"
                                    title={`Book starting at ${formatCurrency(event.defaultBudget)}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (onBookNow) onBookNow(event.defaultBudget, event.eventType);
                                    }}
                                  >
                                    <CalendarCheck size={14} /> Quick Book
                                  </Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center text-slate-500 py-12">
                        <Search size={48} className="mb-4 opacity-20" />
                        <p>No events found matching "{searchTerm}"</p>
                        <Button variant="ghost" onClick={() => setSearchTerm('')} className="mt-4">Clear Search</Button>
                    </div>
                )}
            </div>
        ) : (
            /* Default Cinematic Layout */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-[fadeIn_0.3s_ease-out]">
                {/* Wedding Card - Spans full width on mobile, 8 cols on desktop */}
                <div 
                    onClick={() => setSelectedEvent(EVENTS_DATA[0])}
                    className="md:col-span-8 group relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-slate-700 hover:border-gold-500 transition-colors cursor-pointer"
                >
                    <img 
                        src="https://picsum.photos/seed/wedding123/1200/800" 
                        alt="Cinematic Weddings" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-star-900 via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <div className="flex items-center gap-2 mb-2 text-gold-500">
                            <Sparkles size={20} />
                            <span className="uppercase tracking-widest text-xs font-bold">The Flagship</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">Cinematic Weddings</h3>
                        <p className="text-slate-300 max-w-md mb-6 line-clamp-2 md:line-clamp-none">
                            From the Haldi to the Reception, we turn your "Raja-Rani" moments into a Bollywood masterpiece. Drone films, live direction, and heritage venues.
                        </p>
                        
                        <div className="flex gap-4">
                           <Button variant="outline" className="backdrop-blur-sm bg-black/30 border-white/30 text-white hover:bg-white hover:text-star-900 hover:border-white">
                                View Details
                           </Button>
                           <Button 
                              title={`Book starting at ${formatCurrency(EVENTS_DATA[0].defaultBudget)}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onBookNow) onBookNow(EVENTS_DATA[0].defaultBudget, EVENTS_DATA[0].eventType);
                              }}
                           >
                              <CalendarCheck size={16} className="mr-2" /> Quick Book
                           </Button>
                        </div>
                    </div>
                </div>

                {/* Vertical Stack for Corporate & Music */}
                <div className="md:col-span-4 flex flex-col gap-6">
                    
                    {/* Corporate Card */}
                    <div 
                        onClick={() => setSelectedEvent(EVENTS_DATA[1])}
                        className="flex-1 group relative rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-colors cursor-pointer min-h-[200px]"
                    >
                        <img 
                            src="https://picsum.photos/seed/corp55/600/400" 
                            alt="Corporate MICE" 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50 group-hover:opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-star-900 via-star-900/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                            <div className="flex items-center gap-2 mb-1 text-blue-400">
                                <Gem size={16} />
                                <span className="uppercase tracking-widest text-[10px] font-bold">MICE & Summits</span>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-white mb-3">Corporate Tech</h3>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-blue-400 font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">View Details</span>
                                <Button 
                                  size="sm" 
                                  className="text-xs py-1 px-3 h-auto z-10 flex items-center gap-1"
                                  title={`Book starting at ${formatCurrency(EVENTS_DATA[1].defaultBudget)}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (onBookNow) onBookNow(EVENTS_DATA[1].defaultBudget, EVENTS_DATA[1].eventType);
                                  }}
                                >
                                  <CalendarCheck size={14} /> Quick Book
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Music Card */}
                    <div 
                        onClick={() => setSelectedEvent(EVENTS_DATA[2])}
                        className="flex-1 group relative rounded-2xl overflow-hidden border border-slate-700 hover:border-purple-500 transition-colors cursor-pointer min-h-[200px]"
                    >
                        <img 
                            src="https://picsum.photos/seed/dj/600/400" 
                            alt="Concerts & DJ" 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50 group-hover:opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-star-900 via-star-900/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                            <div className="flex items-center gap-2 mb-1 text-purple-400">
                                <Music size={16} />
                                <span className="uppercase tracking-widest text-[10px] font-bold">Entertainment</span>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-white mb-3">StarVnt Music</h3>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-purple-400 font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">View Details</span>
                                <Button 
                                  size="sm" 
                                  className="text-xs py-1 px-3 h-auto bg-purple-500 hover:bg-purple-400 text-white z-10 flex items-center gap-1"
                                  title={`Book starting at ${formatCurrency(EVENTS_DATA[2].defaultBudget)}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (onBookNow) onBookNow(EVENTS_DATA[2].defaultBudget, EVENTS_DATA[2].eventType);
                                  }}
                                >
                                  <CalendarCheck size={14} /> Quick Book
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )}
        
        <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-slate-500 text-sm md:mr-4">Looking for more details?</p>
            {onExplore && (
                <Button variant="outline" className="gap-2" onClick={onExplore}>
                    Explore All Events <ArrowRight size={16} />
                </Button>
            )}
            <Button className="gap-2" onClick={onAskAura}>
                Ask Aura+ to Recommend <Sparkles size={16} />
            </Button>
        </div>

        {/* Detail Modal */}
        {selectedEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-star-900/95 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}></div>
                <div className="relative w-full max-w-2xl bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 animate-[fadeIn_0.3s_ease-out] flex flex-col max-h-[90vh]">
                    
                    {/* Header Image */}
                    <div className="relative h-48 shrink-0">
                        <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                        <button 
                            onClick={() => setSelectedEvent(null)}
                            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"
                        >
                            <X size={20}/>
                        </button>
                        <div className="absolute bottom-4 left-6">
                             <div className={`flex items-center gap-2 mb-1 ${selectedEvent.accentColor}`}>
                                <selectedEvent.icon size={20} />
                                <span className="uppercase tracking-widest text-xs font-bold">{selectedEvent.subtitle}</span>
                             </div>
                             <h2 className="text-3xl font-serif font-bold text-white">{selectedEvent.title}</h2>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="p-8 overflow-y-auto">
                        <p className="text-slate-300 mb-8 leading-relaxed text-lg">
                            {selectedEvent.longDescription}
                        </p>
                        
                        <div className="mb-8">
                            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-b border-slate-700 pb-2">Included Experiences</h4>
                            <div className="grid md:grid-cols-2 gap-y-3 gap-x-6">
                                {selectedEvent.features?.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 text-slate-400 text-sm">
                                        <Check size={16} className={`shrink-0 mt-0.5 ${selectedEvent.accentColor}`} />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                             <Button variant="ghost" onClick={() => setSelectedEvent(null)}>Close</Button>
                             <Button onClick={() => {
                                if (onBookNow) onBookNow(selectedEvent.defaultBudget, selectedEvent.eventType);
                             }}>
                                Book This Experience <CalendarCheck size={16} className="ml-2" />
                             </Button>
                        </div>
                    </div>

                </div>
            </div>
        )}

      </div>
    </section>
  );
};
