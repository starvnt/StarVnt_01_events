
import React, { useState, useEffect } from 'react';
import { Menu, User, Instagram, Facebook, Youtube, ChevronDown, Search } from 'lucide-react';
import { Button } from './components/Button';
import { AuraAssistant } from './components/AuraAssistant';
import { BudgetCalculator } from './components/BudgetCalculator';
import { EventsSection } from './components/EventsSection';
import { MoniquiSection } from './components/MoniquiSection';
import { FTAuraSection } from './components/FTAuraSection';
import { ProfileView } from './components/ProfileView';
import { BookingForm } from './components/BookingForm';
import { SearchOverlay } from './components/SearchOverlay';
import { SEO } from './components/SEO';
import { SavedEvent, EventType } from './types';
import { initEmailService } from './services/emailService';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'profile'>('home');
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);
  
  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingEventData, setBookingEventData] = useState<SavedEvent | null>(null);
  const [tempBookingData, setTempBookingData] = useState<{budget: number, type: EventType} | undefined>(undefined);

  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    initEmailService();
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Load saved events
    const stored = localStorage.getItem('starvnt_events');
    if (stored) {
      setSavedEvents(JSON.parse(stored));
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSaveEvent = (name: string, budget: number, type: EventType) => {
    const newEvent: SavedEvent = {
      id: Date.now().toString(),
      name,
      budget,
      eventType: type,
      createdAt: new Date().toISOString(),
      status: 'Draft'
    };
    
    const updated = [newEvent, ...savedEvents];
    setSavedEvents(updated);
    localStorage.setItem('starvnt_events', JSON.stringify(updated));
  };

  const handleDeleteEvent = (id: string) => {
    const updated = savedEvents.filter(e => e.id !== id);
    setSavedEvents(updated);
    localStorage.setItem('starvnt_events', JSON.stringify(updated));
  };

  const handleOpenBooking = (event?: SavedEvent) => {
    setBookingEventData(event || null);
    setTempBookingData(undefined);
    setIsBookingOpen(true);
  };

  const handleQuickBooking = (budget: number, type: EventType) => {
    setBookingEventData(null);
    setTempBookingData({ budget, type });
    setIsBookingOpen(true);
  };

  // SCHEMA: Organization & WebSite (The Core Identity)
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://starvnt.com/#organization",
        "name": "StarVnt Entertainment",
        "url": "https://starvnt.com",
        "logo": "https://starvnt.com/logo.png",
        "sameAs": [
          "https://www.facebook.com/starvnt",
          "https://www.instagram.com/starvnt",
          "https://www.youtube.com/starvnt"
        ],
        "description": "India’s first AI-powered event production ecosystem launching 2026. Specializing in Cinematic Weddings, Corporate MICE, and Luxury Gifting.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kolkata",
          "addressRegion": "WB",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9000000000",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["en", "hi", "bn"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://starvnt.com/#website",
        "url": "https://starvnt.com",
        "name": "StarVnt",
        "description": "AI-Powered Event Planning & Luxury Experiences",
        "publisher": { "@id": "https://starvnt.com/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://starvnt.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-star-900 text-slate-200 selection:bg-gold-500 selection:text-star-900">
      
      {/* SEO Injection */}
      <SEO 
        title="StarVnt 2026 | India's #1 AI-Powered Event & Wedding Planner"
        description="Plan your cinematic wedding, corporate event, or luxury party with StarVnt. Featuring Aura+ AI Planner, EMI options, and Shantiniketan gifting. Launching Jan 1, 2026."
        keywords="Event planner Kolkata, Wedding planner India, Corporate event management, Birthday decoration, Wedding EMI, Aura AI, StarVnt"
        schema={homeSchema}
      />

      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-40 transition-all duration-300 border-b border-white/5 ${
          scrolled ? 'bg-star-900/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setCurrentView('home')}
          >
            <span className="text-2xl font-serif font-bold text-white tracking-widest">
              STAR<span className="text-gold-500">VNT</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-gold-500 border border-gold-500/20">
              2026
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {currentView === 'home' && (
              <>
                <a href="#events" className="hover:text-gold-500 transition-colors">Events</a>
                <a href="#moniqui" className="hover:text-gold-500 transition-colors">Moniqui Gift</a>
                <a href="#ftaura" className="hover:text-gold-500 transition-colors">FTAura Style</a>
                <a href="#aura" className="text-gold-400 flex items-center gap-1">
                  Aura+ AI <span className="animate-pulse">●</span>
                </a>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button 
              className="p-2 text-white hover:text-gold-500 transition-colors rounded-full hover:bg-white/5"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button className="md:hidden text-white">
              <Menu size={24} />
            </button>
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex gap-2"
              onClick={() => setCurrentView(currentView === 'home' ? 'profile' : 'home')}
            >
              <User size={16} />
              {currentView === 'home' ? 'My Profile' : 'Home'}
            </Button>
            {currentView === 'home' && (
               <Button size="sm" className="hidden md:flex" onClick={() => handleQuickBooking(500000, EventType.WEDDING)}>
                 Book Now
               </Button>
            )}
          </div>
        </div>
      </nav>

      {currentView === 'profile' ? (
        <ProfileView 
          events={savedEvents} 
          onDelete={handleDeleteEvent} 
          onBook={handleOpenBooking}
          onClose={() => setCurrentView('home')} 
        />
      ) : (
        <>
          {/* Hero Section */}
          <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://picsum.photos/seed/luxurywedding/1920/1080" 
                alt="Cinematic Event" 
                className="w-full h-full object-cover opacity-40 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-star-900 via-star-900/50 to-transparent"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
              <p className="text-gold-400 font-medium tracking-[0.2em] mb-4 uppercase text-sm md:text-base animate-[fadeIn_1s_ease-out]">
                Launching January 1st, 2026
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight">
                Cinematic Life <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300">
                  Memories
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                India’s first AI-powered event ecosystem. Combining luxury production, 
                premium gifting, and AI curation to turn your moments into movies.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <Button size="lg" onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}>
                  Start Planning
                </Button>
                <Button variant="outline" size="lg" className="backdrop-blur-sm bg-star-900/30">
                  Watch The Vision
                </Button>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
              <ChevronDown size={32} />
            </div>
          </header>

          {/* EVENTS Section */}
          <EventsSection />

          {/* MONIQUI Section */}
          <MoniquiSection />

          {/* FTAURA Section */}
          <FTAuraSection />

          {/* AURA+ Section */}
          <section id="aura" className="py-24 bg-star-800 relative overflow-hidden">
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

          {/* Budget Calculator */}
          <section className="bg-star-900 py-20 px-6">
            <BudgetCalculator 
              onSave={handleSaveEvent}
              onBookNow={handleQuickBooking} 
            />
          </section>
        </>
      )}

      {/* Footer / SEO Heavy */}
      <footer className="bg-black text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-serif text-white mb-4">STAR<span className="text-gold-500">VNT</span></h3>
            <p className="max-w-md mb-6 leading-relaxed">
              Redefining the global event industry from Kolkata to the World. 
              We blend emotion, technology, and luxury to create experiences that last a lifetime.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gold-500"><Instagram size={20} /></a>
              <a href="#" className="hover:text-gold-500"><Facebook size={20} /></a>
              <a href="#" className="hover:text-gold-500"><Youtube size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white">Luxury Weddings</a></li>
              <li><a href="#" className="hover:text-white">Corporate Events</a></li>
              <li><a href="#" className="hover:text-white">Moniqui Gifting</a></li>
              <li><a href="#" className="hover:text-white">Artist Booking</a></li>
              <li><a href="#" className="hover:text-white">Event EMI Finance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Locations</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white">Event Planner Kolkata</a></li>
              <li><a href="#" className="hover:text-white">Wedding Planner Mumbai</a></li>
              <li><a href="#" className="hover:text-white">Events in Bangalore</a></li>
              <li><a href="#" className="hover:text-white">Destination Weddings Jaipur</a></li>
              <li><a href="#" className="hover:text-white">Global Events (Dubai/London)</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
          <p>&copy; 2026 StarVnt International. All Rights Reserved. Built for the Future.</p>
        </div>
      </footer>

      {/* Core Application Components */}
      <AuraAssistant />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Booking Modal */}
      <BookingForm 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        eventData={bookingEventData}
        currentBudget={tempBookingData?.budget}
        currentType={tempBookingData?.type}
      />
    </div>
  );
};

export default App;
