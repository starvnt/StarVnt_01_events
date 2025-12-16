
import React, { useState } from 'react';
import { X, CheckCircle, Loader, AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import { sendBookingEmail } from '../services/emailService';
import { SavedEvent, BookingSubmission } from '../types';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  eventData?: SavedEvent | null; // Pre-fill data if available
  currentBudget?: number;       // Use current calculator value if not saved
  currentType?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ 
  isOpen, 
  onClose, 
  eventData,
  currentBudget,
  currentType
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Initialize budget state with existing data or the minimum requirement
  const [finalBudget, setFinalBudget] = useState<number>(
    eventData?.budget || currentBudget || 9999
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    venue: '',
    address: '',
    guests: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Data Cleaning
    const cleanEmail = formData.email.trim();
    const cleanPhone = formData.phone.trim();
    
    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError('Please enter a valid email address (e.g., user@example.com)');
      setLoading(false);
      return;
    }

    // Phone Validation (Indian Format: 10 digits, starts with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setError('Please enter a valid 10-digit mobile number.');
      setLoading(false);
      return;
    }

    // Date Validation (Tomorrow to 2 Years)
    const inputDate = new Date(formData.date);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const twoYearsLater = new Date(today);
    twoYearsLater.setFullYear(twoYearsLater.getFullYear() + 2);

    if (inputDate < tomorrow) {
      setError('Event date must be from tomorrow onwards.');
      setLoading(false);
      return;
    }

    if (inputDate > twoYearsLater) {
      setError('Bookings are only open for the next 2 years.');
      setLoading(false);
      return;
    }

    if (finalBudget < 9999) {
      setError('Minimum budget requirement is ₹9,999');
      setLoading(false);
      return;
    }

    try {
      // Generate a mock booking ID
      const bookingId = 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      const submission: BookingSubmission = {
        booking_id: bookingId,
        customer_name: formData.name,
        customer_email: cleanEmail,
        customer_phone: cleanPhone,
        event_date: formData.date,
        venue_name: formData.venue,
        venue_address: formData.address,
        guest_count: parseInt(formData.guests) || 0,
        event_type: eventData?.eventType || currentType || 'General Event',
        amount_paid: finalBudget
      };

      await sendBookingEmail(submission);
      
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      // Display the actual error message from the service
      setError(err.message || 'Failed to process booking. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError('');
    setFormData({ name: '', email: '', phone: '', date: '', venue: '', address: '', guests: '' });
    onClose();
  };

  // Calculate min and max date strings for the date input
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];
  
  const maxDate = new Date(now);
  maxDate.setFullYear(maxDate.getFullYear() + 2);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-star-900/90 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-slate-800 border border-gold-500/30 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
        
        {success ? (
          <div className="p-12 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">Booking Confirmed!</h3>
            <p className="text-slate-300 mb-8">
              A confirmation email has been sent to <span className="text-gold-500">{formData.email}</span>.
              <br/>Welcome to the StarVnt family.
            </p>
            <Button onClick={handleClose}>Return to Dashboard</Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center p-6 border-b border-slate-700 bg-slate-800/50">
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Finalize Booking</h3>
                <p className="text-xs text-gold-500 uppercase tracking-wider">
                  {eventData?.name || `${currentType} Planning`}
                </p>
              </div>
              <button onClick={handleClose} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-gold-500 outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="10-digit mobile"
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-gold-500 outline-none"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Email Address</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-gold-500 outline-none"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Event Date</label>
                  <input 
                    required
                    type="date" 
                    min={minDateStr}
                    max={maxDateStr}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-gold-500 outline-none"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Guest Count (Approx)</label>
                  <input 
                    required
                    type="number" 
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-gold-500 outline-none"
                    value={formData.guests}
                    onChange={e => setFormData({...formData, guests: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Venue Name (Optional)</label>
                <input 
                  type="text" 
                  placeholder="Leave blank if undecided"
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-gold-500 outline-none"
                  value={formData.venue}
                  onChange={e => setFormData({...formData, venue: e.target.value})}
                />
              </div>

              <div className="bg-star-900/50 p-4 rounded border border-slate-700">
                 <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-slate-400">Estimated Budget (Min. ₹9,999)</label>
                    <span className="text-xs text-gold-500 font-mono">INR</span>
                 </div>
                 <input 
                    type="number" 
                    min="9999"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xl font-bold text-gold-500 focus:border-gold-500 outline-none"
                    value={finalBudget}
                    onChange={e => setFinalBudget(Number(e.target.value))}
                 />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-xs md:text-sm bg-red-900/20 p-3 rounded border border-red-900/50">
                  <AlertTriangle size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full py-4 mt-2" 
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader className="animate-spin" size={16} /> Connecting to Server...
                  </span>
                ) : "Confirm Booking Request"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
