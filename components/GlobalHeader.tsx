
import React from 'react';
import LogoIcon from './icons/LogoIcon';
import HamburgerIcon from './icons/HamburgerIcon';
import WhatsAppButton from './WhatsAppButton';
import { spanishStrings as strings } from '../i18n/strings';

interface GlobalHeaderProps {
  onOpenMenu: () => void;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ onOpenMenu }) => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        {/* Fondo del Header: Cristal oscuro con desenfoque extremo */}
        <div className="absolute inset-0 h-20 sm:h-24 bg-gradient-to-b from-slate-950/95 via-slate-950/80 to-transparent backdrop-blur-2xl border-b border-white/5 pointer-events-none"></div>

        <header className="relative max-w-7xl mx-auto px-6 sm:px-10 h-20 sm:h-24 flex justify-between items-center pointer-events-auto">
          
          {/* Contenedor del Logo con aura superpuesta */}
          <div className="relative flex items-center h-full transition-all duration-700 hover:scale-105 cursor-pointer z-20 translate-y-1 sm:translate-y-2">
             <div className="absolute -inset-6 bg-fuchsia-600/20 blur-[40px] rounded-full animate-pulse"></div>
             <LogoIcon className="h-[100%] sm:h-[120%] w-auto relative brightness-110 saturate-150 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]" />
          </div>

          <div className="flex items-center gap-3 sm:gap-5 relative z-20">
            <WhatsAppButton />
            <button 
                aria-label={strings.menu} 
                onClick={onOpenMenu} 
                className="p-2.5 sm:p-3.5 bg-slate-900/40 backdrop-blur-2xl hover:bg-fuchsia-500/20 rounded-2xl transition-all active:scale-90 border border-white/10 shadow-2xl group/btn"
            >
              <HamburgerIcon className="w-6 h-6 sm:w-7 sm:h-7 group-hover/btn:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        </header>
    </div>
  );
};

export default React.memo(GlobalHeader);
