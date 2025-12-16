
import React from 'react';

const LOCATIONS = ['Kolkata', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Jaipur', 'Goa', 'Udaipur'];
const SERVICES = ['Wedding Planner', 'Corporate Events', 'Birthday Decoration', 'DJ Booking', 'Photographers', 'Makeup Artists'];
const USP_TERMS = ['AI Event Planner', 'Wedding on EMI', 'Luxury Gifting', 'Budget Calculator'];

export const FooterDirectory: React.FC = () => {
  return (
    <div className="bg-black border-t border-slate-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h5 className="text-gold-500 font-bold uppercase tracking-widest text-xs mb-6 border-b border-slate-800 pb-2">
          StarVnt Ecosystem • Search Directory
        </h5>
        
        <div className="grid md:grid-cols-4 gap-8 text-xs text-slate-600">
          
          {/* Column 1: Top Services by City (Programmatic SEO Simulation) */}
          <div>
            <h6 className="text-slate-400 font-semibold mb-3">Popular Searches</h6>
            <ul className="space-y-2">
              {LOCATIONS.slice(0, 5).map(city => (
                <li key={city}>
                  <a href={`#`} className="hover:text-gold-500 transition-colors">
                    Wedding Planner in {city}
                  </a>
                </li>
              ))}
              {LOCATIONS.slice(0, 3).map(city => (
                <li key={`corp-${city}`}>
                  <a href={`#`} className="hover:text-gold-500 transition-colors">
                    Corporate Events in {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Niche Categories */}
          <div>
            <h6 className="text-slate-400 font-semibold mb-3">Specialty Events</h6>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gold-500">Bengali Wedding Planner</a></li>
              <li><a href="#" className="hover:text-gold-500">Destination Weddings India</a></li>
              <li><a href="#" className="hover:text-gold-500">Haldi & Mehendi Decor</a></li>
              <li><a href="#" className="hover:text-gold-500">Sangeet Choreography</a></li>
              <li><a href="#" className="hover:text-gold-500">Kids Birthday Themes</a></li>
              <li><a href="#" className="hover:text-gold-500">Proposal Planning</a></li>
            </ul>
          </div>

          {/* Column 3: Tech & Finance (USP SEO) */}
          <div>
            <h6 className="text-slate-400 font-semibold mb-3">StarVnt Exclusives</h6>
            <ul className="space-y-2">
              {USP_TERMS.map(term => (
                <li key={term}>
                  <a href="#" className="hover:text-gold-500">{term}</a>
                </li>
              ))}
              <li><a href="#" className="hover:text-gold-500">Marriage Loan India</a></li>
              <li><a href="#" className="hover:text-gold-500">Event Cost Estimator</a></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
             <h6 className="text-slate-400 font-semibold mb-3">Event Guides (2026)</h6>
             <ul className="space-y-2">
               <li><a href="#" className="hover:text-gold-500">Wedding Checklist 2026</a></li>
               <li><a href="#" className="hover:text-gold-500">Top 10 Venues in Kolkata</a></li>
               <li><a href="#" className="hover:text-gold-500">Wedding Photography Trends</a></li>
               <li><a href="#" className="hover:text-gold-500">Corporate Gifting Guide</a></li>
               <li><a href="#" className="hover:text-gold-500">Why choose Aura+ AI?</a></li>
             </ul>
          </div>

        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-900 text-[10px] text-slate-700 leading-relaxed text-justify">
          <p>
            StarVnt Entertainment is India's first AI-powered event management ecosystem. We serve all major pincodes including Kolkata (700001-700156), Mumbai, Delhi NCR, Bangalore, and Hyderabad. 
            Services offered: Wedding Planning, Birthday Party Decoration, Corporate Event Management, MICE, Product Launches, Artist Management, DJ Booking, Photography, Videography, and Luxury Gifting (Moniqui). 
            Financing options provided through partnered NBFCs for 'Wedding on EMI'. Aura+ AI is a proprietary technology of StarVnt International. © 2026.
          </p>
        </div>
      </div>
    </div>
  );
};
