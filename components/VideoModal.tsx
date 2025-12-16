
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 animate-[fadeIn_0.3s_ease-out]">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white text-white hover:text-black rounded-full transition-colors border border-white/10"
        >
          <X size={24} />
        </button>
        
        <video 
          className="w-full h-full object-cover"
          autoPlay
          controls
          controlsList="nodownload"
        >
          {/* Using a high-quality wedding/event stock video representing the vision */}
          <source src="https://videos.pexels.com/video-files/5636066/5636066-uhd_2160_3840_24fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none">
           <h3 className="text-white font-serif font-bold text-2xl mb-1">The StarVnt Vision 2026</h3>
           <p className="text-gold-500 text-sm tracking-widest uppercase font-bold">Where AI meets Human Emotion</p>
        </div>
      </div>
    </div>
  );
};
