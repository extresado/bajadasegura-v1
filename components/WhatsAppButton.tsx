
import React from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { spanishStrings as strings } from '../i18n/strings';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/32466900328"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-10 h-10 sm:w-12 sm:h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-90 shadow-lg"
      aria-label={strings.whatsAppAriaLabel}
    >
      {/* Ondas de pulso discretas */}
      <div className="absolute inset-0 rounded-2xl border-2 border-green-500/40 animate-ring"></div>
      
      <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
      
      {/* Tooltip Táctil inferior para el header */}
      <div className="absolute top-full mt-4 right-0 px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none whitespace-nowrap shadow-2xl backdrop-blur-3xl translate-y-2 group-hover:translate-y-0">
         ¿Ayuda directa? WhatsApp
         <div className="absolute -top-1.5 right-4 w-3 h-3 bg-slate-900 border-l border-t border-white/10 rotate-45"></div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
