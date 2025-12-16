
import React, { useState, useEffect } from 'react';
import { Menu, Instagram, Facebook, Youtube, ChevronDown, X } from 'lucide-react';
import { Button } from './components/Button';
import { AuraAssistant } from './components/AuraAssistant';
import { BudgetCalculator } from './components/BudgetCalculator';
import { EventsSection } from './components/EventsSection';
import { EventsPage } from './components/EventsPage'; // Imported EventsPage
import { MoniquiSection } from './components/MoniquiSection';
import { FTAuraSection } from './components/FTAuraSection';
import { AuraSection } from './components/AuraSection';
import { BookingForm } from './components/BookingForm';
import { FooterDirectory } from './components/FooterDirectory';
import { LoadingScreen } from './components/LoadingScreen';
import { SEO } from './components/SEO';
import { VideoModal } from './components/VideoModal'; // Imported VideoModal
import { SavedEvent, EventType } from './types';
import { initEmailService } from './services/emailService';

// Define View Types
type ViewState = 'home' | 'events' | 'moniqui' | 'ftaura' | 'aura';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading State
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);
  
  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingEventData, setBookingEventData] = useState<SavedEvent | null>(null);
  const [tempBookingData, setTempBookingData] = useState<{budget: number, type: EventType} | undefined>(undefined);

  // Video Modal State
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    initEmailService();
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Load saved events
    try {
      const stored = localStorage.getItem('starvnt_events');
      if (stored) {
        setSavedEvents(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error parsing saved events:", e);
      localStorage.removeItem('starvnt_events');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Close mobile menu when view changes
  }, [currentView]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

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

  // Helper to generate dynamic titles
  const getPageTitle = () => {
    switch(currentView) {
      case 'events': return 'StarVnt | Signature Events & Weddings';
      case 'moniqui': return 'Moniqui | Luxury Gifting by StarVnt';
      case 'ftaura': return 'FTAura | Fashion & Styling';
      case 'aura': return 'Aura+ | AI Event Planner';
      default: return 'StarVnt 2026 | #1 AI Wedding & Event Planner in Kolkata & India';
    }
  };

  return (
    <div className="min-h-screen bg-star-900 text-slate-200 selection:bg-gold-500 selection:text-star-900">
      
      {/* Cinematic Loader */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <SEO 
        title={getPageTitle()}
        description="Plan your Cinematic Wedding, Corporate Event, or Birthday with StarVnt. Featuring Aura+ AI Planner, Wedding EMI Options, and Luxury Gifting."
        keywords="Wedding planner, Moniqui Gifting, FTAura Style, Aura AI"
        schemaType="LocalBusiness"
      />

      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-40 transition-all duration-300 border-b border-white/5 ${
          scrolled || currentView !== 'home' || isMobileMenuOpen ? 'bg-star-900/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer z-50 relative" 
            onClick={() => setCurrentView('home')}
          >
            <span className="text-2xl font-serif font-bold text-white tracking-widest">
              STAR<span className="text-gold-500">VNT</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-gold-500 border border-gold-500/20">
              2026
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <button 
                onClick={() => setCurrentView('events')} 
                className={`transition-colors ${currentView === 'events' ? 'text-gold-500' : 'hover:text-gold-500'}`}
            >
                Events
            </button>
            <button 
                onClick={() => setCurrentView('moniqui')} 
                className={`transition-colors ${currentView === 'moniqui' ? 'text-gold-500' : 'hover:text-gold-500'}`}
            >
                Moniqui Gift
            </button>
            <button 
                onClick={() => setCurrentView('ftaura')} 
                className={`transition-colors ${currentView === 'ftaura' ? 'text-gold-500' : 'hover:text-gold-500'}`}
            >
                FTAura Style
            </button>
            <button 
                onClick={() => setCurrentView('aura')} 
                className={`flex items-center gap-1 transition-colors ${currentView === 'aura' ? 'text-gold-500' : 'text-gold-400 hover:text-gold-300'}`}
            >
              Aura+ AI <span className="animate-pulse">●</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 z-50 relative">
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white hover:text-gold-500 transition-colors p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <Button size="sm" className="hidden md:flex" onClick={() => handleQuickBooking(500000, EventType.WEDDING)}>
                Book Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-star-900/95 backdrop-blur-xl pt-28 px-8 md:hidden flex flex-col gap-8 animate-[fadeIn_0.3s_ease-out] overflow-y-auto">
           {/* Menu Items */}
           <div className="flex flex-col gap-2">
             <button onClick={() => setCurrentView('home')} className={`text-3xl font-serif font-bold text-left py-4 border-b border-white/5 transition-all ${currentView === 'home' ? 'text-gold-500 pl-4' : 'text-white hover:text-gold-500'}`}>Home</button>
             <button onClick={() => setCurrentView('events')} className={`text-3xl font-serif font-bold text-left py-4 border-b border-white/5 transition-all ${currentView === 'events' ? 'text-gold-500 pl-4' : 'text-white hover:text-gold-500'}`}>Events</button>
             <button onClick={() => setCurrentView('moniqui')} className={`text-3xl font-serif font-bold text-left py-4 border-b border-white/5 transition-all ${currentView === 'moniqui' ? 'text-gold-500 pl-4' : 'text-white hover:text-gold-500'}`}>Moniqui Gifting</button>
             <button onClick={() => setCurrentView('ftaura')} className={`text-3xl font-serif font-bold text-left py-4 border-b border-white/5 transition-all ${currentView === 'ftaura' ? 'text-gold-500 pl-4' : 'text-white hover:text-gold-500'}`}>FTAura Style</button>
             <button onClick={() => setCurrentView('aura')} className={`text-3xl font-serif font-bold text-left py-4 border-b border-white/5 transition-all flex items-center gap-3 ${currentView === 'aura' ? 'text-gold-500 pl-4' : 'text-white hover:text-gold-500'}`}>
                Aura+ AI <span className="animate-pulse text-gold-500">●</span>
             </button>
           </div>
           
           <div className="mt-4 flex flex-col gap-4 mb-12">
              <Button 
                  size="lg"
                  onClick={() => { handleQuickBooking(500000, EventType.WEDDING); setIsMobileMenuOpen(false); }}
                  className="w-full justify-center"
              >
                  Book Now
              </Button>
           </div>
        </div>
      )}

      {/* --- PAGE ROUTING --- */}

      {/* EVENTS PAGE */}
      {currentView === 'events' && (
         <EventsPage 
            onBookNow={handleQuickBooking} 
            onNavigate={setCurrentView}
         />
      )}

      {/* MONIQUI PAGE */}
      {currentView === 'moniqui' && (
         <div className="animate-[fadeIn_0.5s_ease-out] pt-20">
             <MoniquiSection />
             <div className="bg-star-900 py-16 text-center">
                <p className="text-slate-400 mb-6">Looking for something else?</p>
                <Button variant="outline" onClick={() => setCurrentView('home')}>Back to Home</Button>
             </div>
         </div>
      )}

      {/* FTAURA PAGE */}
      {currentView === 'ftaura' && (
         <div className="animate-[fadeIn_0.5s_ease-out] pt-20">
             <FTAuraSection />
             <div className="bg-star-900 py-16 text-center">
                <Button variant="outline" onClick={() => setCurrentView('home')}>Back to Home</Button>
             </div>
         </div>
      )}

      {/* AURA+ PAGE */}
      {currentView === 'aura' && (
         <div className="animate-[fadeIn_0.5s_ease-out] pt-20">
             <AuraSection />
             <div className="bg-star-900 py-12 px-6">
                <BudgetCalculator 
                  onSave={handleSaveEvent}
                  onBookNow={handleQuickBooking} 
                />
             </div>
         </div>
      )}

      {/* HOME PAGE (Landing) */}
      {currentView === 'home' && (
        <>
          <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://picsum.photos/seed/luxurywedding/1920/1080" 
                alt="Cinematic Event Production India" 
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
              <h2 className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                India’s #1 AI-powered event ecosystem. We combine cinematic production, 
                luxury gifting, and Aura+ Intelligence to create the weddings and events of the future.
              </h2>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <Button size="lg" onClick={() => setCurrentView('events')}>
                  Explore Events
                </Button>
                <Button 
                    variant="outline" 
                    size="lg" 
                    className="backdrop-blur-sm bg-star-900/30"
                    onClick={() => setIsVideoOpen(true)}
                >
                  Watch The Vision
                </Button>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
              <ChevronDown size={32} />
            </div>
          </header>

          {/* Home still previews sections for discovery, but Navbar goes to dedicated pages */}
          <EventsSection 
            onBookNow={handleQuickBooking} 
            onAskAura={() => setCurrentView('aura')} 
            onExplore={() => setCurrentView('events')} // Added navigation handler
          />
          <MoniquiSection />
          <FTAuraSection />
          <AuraSection />

          <section className="bg-star-900 py-20 px-6">
            <BudgetCalculator 
              onSave={handleSaveEvent}
              onBookNow={handleQuickBooking} 
            />
          </section>
        </>
      )}

      {/* Footer */}
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
              <li><button onClick={() => setCurrentView('events')} className="hover:text-white">Luxury Weddings</button></li>
              <li><button onClick={() => setCurrentView('events')} className="hover:text-white">Corporate Events</button></li>
              <li><button onClick={() => setCurrentView('moniqui')} className="hover:text-white">Moniqui Gifting</button></li>
              <li><button onClick={() => setCurrentView('events')} className="hover:text-white">Artist Booking</button></li>
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
      
      <FooterDirectory />

      {/* Global Components */}
      <AuraAssistant />
      
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

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
