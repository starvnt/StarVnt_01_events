
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(100);

  useEffect(() => {
    // Cinematic load time (approx 2.5 seconds)
    const totalTime = 2500; 
    const intervalTime = 30;
    const steps = totalTime / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      
      // Add some randomness to make it feel organic
      const jitter = Math.random() * 2; 
      const newProgress = Math.min((currentStep / steps) * 100 + jitter, 100);
      
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setOpacity(0); // Trigger fade out
          setTimeout(onComplete, 700); // Unmount after transition
        }, 200);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-star-900 flex flex-col items-center justify-center transition-opacity duration-700 ease-out`}
      style={{ opacity: opacity / 100, pointerEvents: opacity === 0 ? 'none' : 'auto' }}
    >
       {/* Ambient Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <div className="relative mb-12 transform scale-110 md:scale-125 animate-[fadeIn_1s_ease-out]">
             <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-[0.15em]">
                STAR<span className="text-gold-500">VNT</span>
             </h1>
             <div className="absolute -right-8 -top-4 bg-slate-800/80 border border-gold-500/30 px-2 py-0.5 rounded backdrop-blur-md">
                <span className="text-[10px] text-gold-500 font-mono tracking-widest">EST. 2026</span>
             </div>
        </div>

        {/* Cinematic Progress Bar */}
        <div className="w-64 md:w-80 h-[2px] bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200 shadow-[0_0_20px_rgba(234,179,8,0.8)] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Status Indicators */}
        <div className="mt-4 flex flex-col items-center gap-2">
             <span className="text-gold-500 font-mono text-xs tracking-widest font-bold">{Math.round(progress)}%</span>
             <span className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-medium animate-pulse">
                {progress < 40 ? 'Initializing Core...' : progress < 80 ? 'Curating Experience...' : 'Ready'}
             </span>
        </div>
      </div>
    </div>
  );
};
