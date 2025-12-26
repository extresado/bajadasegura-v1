
import React from 'react';

const ROCKET_IMAGE = "https://raw.githubusercontent.com/extresado/App_apoyo_chemsex/refs/heads/main/cohete.png";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 w-full animate-fade-in">
      <div className="relative w-32 h-32 mb-8">
        {/* Anillo exterior pulsante */}
        <div className="absolute inset-0 rounded-full border-4 border-fuchsia-500/10 animate-ping"></div>
        
        {/* Anillos giratorios */}
        <div className="absolute inset-0 rounded-full border-t-4 border-teal-400 animate-spin duration-[1.5s]"></div>
        <div className="absolute inset-4 rounded-full border-b-4 border-fuchsia-500 animate-spin-reverse duration-[1s]"></div>
        
        {/* El Cohete en el centro */}
        <div className="absolute inset-0 flex items-center justify-center">
            <img 
                src={ROCKET_IMAGE} 
                alt="" 
                className="w-14 h-14 object-contain animate-pulse drop-shadow-[0_0_15px_rgba(217,70,239,0.6)]" 
            />
        </div>
      </div>
      
      {message && (
        <p className="text-teal-400 font-black text-xs uppercase tracking-[0.4em] text-center max-w-[280px] leading-relaxed drop-shadow-sm">
          {message}
        </p>
      )}

      <style>{`
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
