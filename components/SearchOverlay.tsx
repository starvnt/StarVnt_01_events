
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, FileText, Sparkles } from 'lucide-react';
import { ALL_CONTENT } from '../data/mockData';
import { SearchableItem } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResultCard: React.FC<{ item: SearchableItem }> = ({ item }) => (
  <div 
    className="group flex gap-4 p-4 rounded-xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700 cursor-pointer"
  >
    <div className="shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-slate-800">
      <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
          item.category === 'Service' ? 'bg-gold-500/10 text-gold-500' : 'bg-blue-500/10 text-blue-400'
        }`}>
          {item.category}
        </span>
        {item.category === 'Insight' && <span className="text-[10px] text-slate-500">• {item.readTime}</span>}
      </div>
      <h3 className="text-white font-serif font-bold text-lg leading-tight mb-1 group-hover:text-gold-500 transition-colors">
        {item.title}
      </h3>
      <p className="text-slate-400 text-sm line-clamp-2">
        {item.description}
      </p>
    </div>
  </div>
);

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchableItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      // Focus input
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Handle Search Logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = ALL_CONTENT.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.description.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query]);

  // Handle Escape Key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  // Split results by category
  const serviceResults = results.filter(r => r.category === 'Service');
  const insightResults = results.filter(r => r.category === 'Insight');

  return (
    <div className="fixed inset-0 z-[60] flex flex-col animate-[fadeIn_0.2s_ease-out]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-star-900/95 backdrop-blur-md" onClick={onClose}></div>

      {/* Content Container */}
      <div className="relative w-full max-w-4xl mx-auto px-6 mt-12 md:mt-24">
        
        {/* Header / Input */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, services, or insights..."
            className="w-full bg-transparent text-white text-3xl md:text-5xl font-serif font-bold border-b-2 border-slate-700 pb-4 focus:border-gold-500 outline-none placeholder-slate-600 transition-colors"
          />
          <button 
            onClick={onClose}
            className="absolute right-0 top-0 text-slate-500 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
        </div>

        {/* Results Area */}
        <div className="mt-12 h-[60vh] overflow-y-auto pr-4 scrollbar-hide">
          {query && results.length === 0 && (
            <div className="text-center text-slate-500 py-12">
              <p className="text-lg">No results found for "{query}".</p>
              <p className="text-sm mt-2">Try searching for "Wedding", "Corporate", or "Luxury".</p>
            </div>
          )}

          {!query && (
            <div className="text-slate-500 py-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-4">Suggested Searches</h4>
              <div className="flex flex-wrap gap-3">
                {['Wedding Planning', 'Corporate MICE', 'Leather Gifts', 'AI Budget', 'DJ Booking'].map(tag => (
                  <button 
                    key={tag} 
                    onClick={() => setQuery(tag)}
                    className="px-4 py-2 rounded-full border border-slate-700 hover:border-gold-500 hover:text-gold-500 transition-all text-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Categorized Results */}
          {query && (
            <div className="pb-20 space-y-12">
                {/* Services Section */}
                {serviceResults.length > 0 && (
                    <div className="animate-[fadeIn_0.3s_ease-out]">
                        <h3 className="text-gold-500 font-serif text-xl mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                             <Sparkles size={18} /> Services & Experiences
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {serviceResults.map(item => <ResultCard key={item.id} item={item} />)}
                        </div>
                    </div>
                )}

                {/* Insights Section */}
                {insightResults.length > 0 && (
                    <div className="animate-[fadeIn_0.4s_ease-out]">
                        <h3 className="text-slate-300 font-serif text-xl mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                            <FileText size={18} /> Insights & Blogs
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {insightResults.map(item => <ResultCard key={item.id} item={item} />)}
                        </div>
                    </div>
                )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
