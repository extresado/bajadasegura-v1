
import React from 'react';
import Footer from './Footer';
import type { MapsResult } from '../types';
import HamburgerIcon from './icons/HamburgerIcon';
import EmergencyCallButton from './EmergencyCallButton';
import LoadingSpinner from './LoadingSpinner';
import MarkdownRenderer from './MarkdownRenderer';
import { spanishStrings as strings } from '../i18n/strings';

interface UrgentHelpViewProps {
  onBack: () => void;
  onOpenMenu: () => void;
  mapsResult: MapsResult | null;
  isLoading: boolean;
  error: string | null;
}

const ROCKET_IMAGE = "https://raw.githubusercontent.com/extresado/App_apoyo_chemsex/refs/heads/main/cohete.png";

const UrgentHelpView: React.FC<UrgentHelpViewProps> = ({ onBack, onOpenMenu, mapsResult, isLoading, error }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
      <header className="fixed top-3 left-0 w-full px-4 z-40">
        <div className="max-w-4xl mx-auto h-16 sm:h-20 flex justify-between items-center glass-card rounded-[1.8rem] px-6 shadow-2xl border-white/5 relative overflow-visible">
          <div className="flex items-center min-w-0 h-full relative z-20">
            <button onClick={onBack} className="text-white p-3 rounded-2xl hover:bg-white/10 transition-all active:scale-90 flex-shrink-0" aria-label={strings.back}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center min-w-0 ml-1 h-full">
                <div className="relative flex items-center justify-center h-full mr-4 flex-shrink-0 translate-y-3">
                    <div className="absolute -inset-10 bg-fuchsia-600/25 blur-2xl rounded-full animate-pulse"></div>
                    <img src={ROCKET_IMAGE} alt="" className="h-[160%] sm:h-[180%] w-auto object-contain relative z-10 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]" />
                </div>
                <h1 className="text-lg sm:text-xl font-black text-white leading-none tracking-tight uppercase truncate">
                  AYUDA URGENTE (SOS)
                </h1>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 relative z-20">
            <EmergencyCallButton />
            <button aria-label={strings.menu} onClick={onOpenMenu} className="p-3 hover:bg-white/10 rounded-2xl transition-all active:scale-90">
                <HamburgerIcon className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 sm:px-10 pt-32 sm:pt-40 pb-24 no-scrollbar">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center">
            <LoadingSpinner message="Localizando recursos mediante Google Maps..." />
          </div>
        ) : error ? (
          <div className="p-8 glass-card rounded-[2.2rem] border-red-500/20 text-center animate-fade-in">
             <p className="text-red-400 font-bold text-lg mb-6">{error}</p>
             <a href="tel:112" className="inline-block px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl transition-all transform active:scale-95 shadow-xl">
               LLAMAR AL 112 AHORA
             </a>
          </div>
        ) : mapsResult ? (
          <div className="space-y-8 animate-message-entry">
            <div className="glass-card p-6 sm:p-8 rounded-[2.2rem] border-teal-500/10">
               <h2 className="text-teal-400 font-black text-xs uppercase tracking-[0.3em] mb-4">Recomendación del Asistente</h2>
               <MarkdownRenderer content={mapsResult.text} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mapsResult.links.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-[2rem] glass-card border-white/5 hover:border-teal-500/40 transition-all duration-500 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                       </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-black text-lg leading-tight mb-1">{link.title}</h3>
                      <p className="text-teal-400 text-xs font-bold uppercase tracking-widest">Ver en Google Maps</p>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/20 group-hover:text-teal-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              ))}
            </div>

            <div className="p-6 rounded-[2rem] bg-red-950/20 border border-red-500/20 text-center">
               <p className="text-red-400/80 text-sm font-bold leading-relaxed mb-4 italic">
                 Recuerda: Si la situación es de riesgo vital inminente, no esperes.
               </p>
               <EmergencyCallButton className="w-16 h-16 mx-auto" />
            </div>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default UrgentHelpView;
