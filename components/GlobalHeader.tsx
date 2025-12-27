
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
        {/* Fondo del Header: Cristal ultra-mínimo para dar protagonismo al logo */}
        <div className="absolute inset-0 h-20 sm:h-24 bg-gradient-to-b from-slate-950/95 via-slate-950/60 to-transparent backdrop-blur-xl border-b border-white/5 pointer-events-none"></div>

        <header className="relative max-w-7xl mx-auto px-6 sm:px-10 h-20 sm:h-24 flex justify-between items-center pointer-events-auto">
          
          {/* Contenedor del Logo: Aumentado masivamente y superpuesto */}
          <div className="relative flex items-center h-full transition-all duration-700 cursor-pointer z-30 translate-y-10 sm:translate-y-14">
             {/* Resplandor estático más grande */}
             <div className="absolute -inset-32 bg-fuchsia-600/10 blur-[100px] rounded-full"></div>
             <LogoIcon className="h-[350%] sm:h-[500%] w-auto relative drop-shadow-[0_0_60px_rgba(217,70,239,0.3)]" />
          </div>

          <div className="flex items-center gap-3 sm:gap-5 relative z-40">
            <WhatsAppButton />
            <button 
                aria-label={strings.menu} 
                onClick={onOpenMenu} 
                className="p-3 sm:p-4 bg-slate-900/40 backdrop-blur-2xl hover:bg-fuchsia-500/20 rounded-2xl transition-all active:scale-90 border border-white/10 shadow-2xl group/btn"
            >
              <HamburgerIcon className="w-6 h-6 sm:w-8 sm:h-8 group-hover/btn:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        </header>
    </div>
  );
};

export default React.memo(GlobalHeader);
