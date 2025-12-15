import React from 'react';
import { Trash2, Calendar, CreditCard, Clock } from 'lucide-react';
import { Button } from './Button';
import { SavedEvent } from '../types';

interface ProfileViewProps {
  events: SavedEvent[];
  onDelete: (id: string) => void;
  onBook: (event: SavedEvent) => void;
  onClose: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ events, onDelete, onBook, onClose }) => {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(value);

  return (
    <div className="pt-24 pb-12 min-h-screen max-w-7xl mx-auto px-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex justify-between items-end mb-12 border-b border-slate-800 pb-6">
        <div>
           <h2 className="text-4xl font-serif font-bold text-white mb-2">My StarVnt Profile</h2>
           <p className="text-slate-400">Manage your saved events and upcoming bookings.</p>
        </div>
        <Button variant="outline" onClick={onClose}>Back to Home</Button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-slate-800 border-dashed">
          <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-slate-300 mb-2">No Saved Events Yet</h3>
          <p className="text-slate-500 mb-6">Use the Budget Calculator to plan and save your dream event.</p>
          <Button onClick={onClose}>Start Planning</Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-gold-500/50 transition-all group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-gold-500 uppercase tracking-wider bg-gold-500/10 px-2 py-1 rounded">
                      {event.eventType}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white mt-2">{event.name}</h3>
                  </div>
                  <button 
                    onClick={() => onDelete(event.id)}
                    className="text-slate-500 hover:text-red-400 transition-colors p-1"
                    title="Delete Plan"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-300">
                    <CreditCard size={16} className="text-gold-500" />
                    <span>Est. Budget: <span className="text-white font-medium">{formatCurrency(event.budget)}</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Clock size={16} className="text-gold-500" />
                    <span>Saved: <span className="text-sm">{new Date(event.createdAt).toLocaleDateString()}</span></span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    size="sm"
                    onClick={() => onBook(event)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
              <div className="bg-slate-900/50 px-6 py-3 text-xs text-slate-500 border-t border-slate-800 flex justify-between">
                 <span>Status</span>
                 <span className={event.status === 'Booked' ? 'text-green-500' : 'text-slate-400'}>{event.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
