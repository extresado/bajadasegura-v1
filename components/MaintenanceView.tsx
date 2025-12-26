
import React, { useState, useCallback } from 'react';
import LogoIcon from './icons/LogoIcon';
import SocialCarousel from './SocialCarousel';

interface MaintenanceViewProps {
  onUnlock?: () => void;
}

const MaintenanceView: React.FC<MaintenanceViewProps> = ({ onUnlock }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = useCallback(() => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 5 && onUnlock) {
      onUnlock();
    }

    // Reset counter after 2 seconds of inactivity
    setTimeout(() => setClickCount(0), 2000);
  }, [clickCount, onUnlock]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="z-10 flex flex-col items-center text-center max-w-2xl mx-auto w-full">
        <div 
            onClick={handleLogoClick}
            className="mb-8 p-6 bg-slate-800/50 rounded-3xl border border-slate-700/50 shadow-2xl backdrop-blur-sm animate-fade-in transform hover:scale-105 transition-transform duration-500 cursor-pointer active:scale-95"
            title="Dev Access"
        >
            <LogoIcon className="w-48 h-48 sm:w-64 sm:h-64" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Estamos en <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-teal-400">Obras</span> 🚧
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-lg animate-fade-in px-4" style={{ animationDelay: '0.4s' }}>
          Estamos trabajando para mejorar la experiencia de <strong>Bajada Segura</strong>.
          <br className="hidden sm:block" />
          Volveremos muy pronto con nuevas funcionalidades y más apoyo.
        </p>

        <div className="w-full max-w-md animate-fade-in overflow-hidden" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm text-slate-500 mb-4 uppercase tracking-wider font-semibold">Mantente informado en</p>
            <div className="mask-gradient-sides">
                <SocialCarousel />
            </div>
        </div>
      </div>

      <div className="absolute bottom-6 flex flex-col items-center gap-1 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">© 2025 Bajada Segura</span>
        <span className="text-[9px] font-bold text-slate-700 uppercase tracking-[0.2em]">by canarylab.app</span>
      </div>
    </div>
  );
};

export default MaintenanceView;
