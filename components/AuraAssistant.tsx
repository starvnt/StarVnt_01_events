
import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Sparkles, MessageCircle, WifiOff } from 'lucide-react';
import { createAuraChat, sendMessageToAura } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AuraAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chatSession, setChatSession] = useState<any | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat
  useEffect(() => {
    const chat = createAuraChat();
    setChatSession(chat);
    
    // Initial greeting
    setMessages([
      {
        id: 'init-1',
        role: 'model',
        text: "Namaste! I am Aura+, your personal event curator. \n\nHow can I help you visualize your dream event today?",
        timestamp: new Date()
      }
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Use existing session or try to create one if missing
    let activeSession = chatSession;
    if (!activeSession) {
       activeSession = createAuraChat();
       setChatSession(activeSession);
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const responseText = await sendMessageToAura(activeSession, userMsg.text);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I'm having trouble connecting right now. Please try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Check if we are using the Mock Session (by checking if 'sendMessage' is not native)
  const isOffline = chatSession && chatSession.constructor.name === "MockChatSession";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`
          pointer-events-auto transition-all duration-500 ease-in-out origin-bottom-right
          w-[calc(100vw-3rem)] sm:w-[400px] h-[500px] sm:h-[600px] rounded-2xl glass-panel shadow-2xl overflow-hidden flex flex-col mb-4
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-20'}
        `}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gold-600 to-gold-400 p-4 flex justify-between items-center text-star-900">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-star-900 rounded-full relative">
              <Sparkles size={16} className="text-gold-400" />
              {isOffline && (
                  <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-0.5 border border-star-900" title="Offline Mode">
                      <WifiOff size={8} className="text-white" />
                  </div>
              )}
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight">Aura+</h3>
              <p className="text-xs font-medium opacity-80 flex items-center gap-1">
                 {isOffline ? 'Offline Demo Mode' : 'AI Event Curator'}
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-star-900/10 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-star-900/80">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed
                  ${msg.role === 'user' 
                    ? 'bg-gold-500 text-star-900 rounded-tr-none font-medium' 
                    : 'bg-slate-800 text-gray-100 rounded-tl-none border border-slate-700'}
                `}
              >
                {/* Render simple markdown-like breaks */}
                {msg.text.split('\n').map((line, i) => (
                   <React.Fragment key={i}>
                     {line}
                     {i < msg.text.split('\n').length - 1 && <br />}
                   </React.Fragment>
                ))}
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-slate-800 rounded-2xl rounded-tl-none p-3 border border-slate-700">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-700">
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isOffline ? "Ask about Weddings, Costs, or Contacts..." : "Ask Aura to plan a wedding..."}
              className="w-full bg-slate-800 text-white rounded-full pl-4 pr-12 py-3 border focus:outline-none focus:ring-1 transition-all text-sm border-slate-700 focus:border-gold-500 focus:ring-gold-500 placeholder-slate-400"
            />
            <div className="absolute right-2 flex items-center gap-1">
               <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-gold-500 rounded-full text-star-900 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={16} />
                </button>
            </div>
          </div>
          <div className="mt-3 text-center">
             <p className="text-[10px] text-orange-400 font-medium bg-orange-900/20 py-1.5 px-3 rounded border border-orange-500/20 inline-flex items-center gap-1">
                ⚠️ Aura+ is in {isOffline ? 'Offline' : 'Demo'} mode. For bookings, 
                <a 
                  href="https://wa.me/917044198505" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-orange-300 font-bold flex items-center gap-1"
                >
                  WhatsApp <MessageCircle size={10} />
                </a>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          pointer-events-auto group relative flex items-center justify-center 
          w-16 h-16 rounded-full bg-gold-500 text-star-900 shadow-[0_0_25px_rgba(234,179,8,0.4)]
          hover:scale-105 transition-all duration-300
          ${isOpen ? 'rotate-90 scale-0 opacity-0 absolute' : 'scale-100 opacity-100'}
        `}
      >
        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-20"></div>
        <Sparkles size={28} className="animate-pulse" />
        <span className="absolute -top-10 bg-white text-star-900 text-xs font-bold px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Plan with Aura+
        </span>
      </button>

      {/* Restore Button (Hidden when closed, shows when open to minimize) */}
       <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          pointer-events-auto flex items-center justify-center 
          w-12 h-12 rounded-full bg-slate-800 text-gold-500 border border-gold-500/30 shadow-lg
          hover:bg-slate-700 transition-all duration-300 mb-4
          ${!isOpen ? 'hidden' : 'flex'}
        `}
      >
        <X size={24} />
      </button>

    </div>
  );
};
