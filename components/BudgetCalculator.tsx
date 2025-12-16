
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { EventType } from '../types';
import { Button } from './Button';
import { Save, CalendarCheck } from 'lucide-react';

interface BudgetCalculatorProps {
  onSave?: (name: string, budget: number, type: EventType) => void;
  onBookNow?: (budget: number, type: EventType) => void;
}

// Defined outside component to maintain stable identity during renders
const CustomTooltip = ({ active, payload, totalBudget }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    const dataItem = item.payload; // Access original data object
    const percentage = Math.round((item.value / totalBudget) * 100);
    const formatCurrency = (value: number) => 
      new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(value);

    return (
      <div className="bg-star-900/95 border border-slate-600 p-4 rounded-xl shadow-2xl backdrop-blur-md max-w-[220px] z-50">
        <p className="text-gold-500 font-serif font-bold mb-1 text-lg">{item.name}</p>
        <p className="text-white font-medium text-base mb-1">
          {formatCurrency(item.value)}
        </p>
        <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">
          {percentage}% of Total Budget
        </p>
        {dataItem.description && (
            <p className="text-slate-300 text-xs italic border-t border-slate-700 pt-2 leading-relaxed">
              {dataItem.description}
            </p>
        )}
      </div>
    );
  }
  return null;
};

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ onSave, onBookNow }) => {
  const [budget, setBudget] = useState<number>(500000);
  const [eventType, setEventType] = useState<EventType>(EventType.WEDDING);
  const [eventName, setEventName] = useState('');
  const [savedMessage, setSavedMessage] = useState(false);

  // Distribution logic based on Indian Event Market standards
  const getDistribution = (total: number, type: EventType) => {
    switch (type) {
      case EventType.WEDDING:
        return [
          { name: 'Venue & Food', value: total * 0.45, description: "Banquet charges, catering, and premium beverages." },
          { name: 'Decor & Production', value: total * 0.20, description: "Floral design, stage setup, lighting, and sound." },
          { name: 'Media (Photo/Video)', value: total * 0.15, description: "Cinematography, drone shots, and albums." },
          { name: 'Attire & Makeup', value: total * 0.10, description: "Bridal wear, grooming, and celebrity MUAs." },
          { name: 'Entertainment', value: total * 0.10, description: "DJ, live bands, and Sangeet choreography." },
        ];
      case EventType.CORPORATE:
        return [
          { name: 'Venue & Logistics', value: total * 0.40, description: "Hall rental, transport, and accommodation." },
          { name: 'Tech & AV', value: total * 0.25, description: "LED walls, sound systems, and live streaming." },
          { name: 'F&B', value: total * 0.20, description: "Gala dinners, high tea, and refreshments." },
          { name: 'Gifting', value: total * 0.15, description: "Delegate kits, hampers, and branding." },
        ];
      default:
        return [
          { name: 'Venue', value: total * 0.30, description: "Location rental costs." },
          { name: 'Decor', value: total * 0.30, description: "Theming and floral setup." },
          { name: 'Food', value: total * 0.30, description: "Catering services." },
          { name: 'Misc', value: total * 0.10, description: "Contingency and extras." },
        ];
    }
  };

  const data = getDistribution(budget, eventType);
  const COLORS = ['#EAB308', '#CA8A04', '#FEF08A', '#A16207', '#FFFFFF'];

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(value);

  const handleSaveClick = () => {
    if (onSave && eventName.trim()) {
      onSave(eventName, budget, eventType);
      setSavedMessage(true);
      setEventName('');
      setTimeout(() => setSavedMessage(false), 3000);
    }
  };

  return (
    <div className="glass-panel p-8 rounded-2xl w-full max-w-4xl mx-auto my-12 border border-slate-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-white mb-2">StarVnt AI Budget Estimator</h2>
        <p className="text-slate-400">Plan your finances with transparent EMI options.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gold-500 mb-2">Event Type</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(EventType).map((type) => (
                <button
                  key={type}
                  onClick={() => setEventType(type)}
                  className={`px-4 py-2 rounded-md text-sm transition-colors border ${
                    eventType === type 
                    ? 'bg-gold-500 text-star-900 border-gold-500 font-bold' 
                    : 'bg-transparent text-slate-300 border-slate-600 hover:border-gold-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gold-500 mb-2">
              Estimated Budget: {formatCurrency(budget)}
            </label>
            <input
              type="range"
              min="9999"
              max="10000000"
              step="1000"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-gold-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>₹9,999</span>
              <span>₹1Cr+</span>
            </div>
          </div>

          {/* Save & Book Section */}
          <div className="pt-4 border-t border-slate-700 space-y-4">
            <div className="flex gap-2">
               <input 
                  type="text" 
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Event Name (e.g. Rohini's Wedding)"
                  className="flex-1 bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:border-gold-500 outline-none"
               />
               <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleSaveClick}
                  disabled={!eventName.trim()}
                  className="whitespace-nowrap"
               >
                 <Save size={16} className="mr-2" />
                 {savedMessage ? 'Saved!' : 'Save Plan'}
               </Button>
            </div>
            <Button 
              className="w-full" 
              onClick={() => onBookNow && onBookNow(budget, eventType)}
            >
              <CalendarCheck size={18} className="mr-2" />
              Book This Budget
            </Button>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h4 className="text-gold-500 font-medium mb-1">StarVnt EMI Promise</h4>
            <p className="text-sm text-slate-300">
              Pay as little as <span className="text-white font-bold">{formatCurrency(budget * 0.04)}/month</span> with our premium finance partners.
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[300px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip totalBudget={budget} />} />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
