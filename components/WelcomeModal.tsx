
import React, { useState, useEffect } from 'react';
import { spanishStrings as strings } from '../i18n/strings';

interface WelcomeModalProps {
  onClose: () => void;
}

const ROCKET_IMAGE = "https://raw.githubusercontent.com/extresado/App_apoyo_chemsex/refs/heads/main/cohete.png";

const PRELOAD_IMAGES = [
  "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853",
  "https://images.unsplash.com/photo-1576086213369-97a306d36557",
  "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8"
];

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const total = PRELOAD_IMAGES.length;

    PRELOAD_IMAGES.forEach(url => {
      const img = new Image();
      img.src = `${url}?auto=format&fit=crop&q=80&w=1000`;
      img.onload = () => {
        loadedCount++;
        const progress = Math.round((loadedCount / total) * 100);
        setPreloadProgress(progress);
        if (loadedCount === total) {
          setTimeout(() => setIsReady(true), 500);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === total) setIsReady(true);
      };
    });
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-11/12 max-w-lg p-6 md:p-8 bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] text-slate-200 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-600/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 blur-3xl rounded-full"></div>

        <div className="flex items-center gap-4 mb-6">
            <div className="relative w-14 h-14 flex-shrink-0">
                <div className="absolute inset-0 bg-fuchsia-500/20 blur-xl rounded-full animate-pulse"></div>
                <img src={ROCKET_IMAGE} alt="" className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase leading-none">
              {strings.welcomeModalTitle}
            </h2>
        </div>
        
        <div className="space-y-5 max-h-[45vh] overflow-y-auto pr-2 text-base leading-relaxed text-slate-300 no-scrollbar relative z-10">
            <p className="font-bold text-slate-100">{strings.welcomeModalIntro}</p>
            
            <section className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <h3 className="text-lg font-black text-teal-400 mb-2 uppercase tracking-widest">{strings.whatIsChemsexModalTitle}</h3>
                <p className="text-sm leading-relaxed">{strings.whatIsChemsexModalText}</p>
            </section>

            <section className="p-4 rounded-2xl bg-red-950/20 border border-red-500/10">
                <h3 className="text-lg font-black text-red-400 mb-3 uppercase tracking-widest">{strings.consequencesModalTitle}</h3>
                 <ul className="space-y-3 pl-1">
                    <li className="text-sm"><strong className="text-white block mb-0.5">{strings.addictionConsequenceTitle}</strong> {strings.addictionConsequenceText}</li>
                    <li className="text-sm"><strong className="text-white block mb-0.5">{strings.physicalHealthConsequenceTitle}</strong> {strings.physicalHealthConsequenceText}</li>
                    <li className="text-sm"><strong className="text-white block mb-0.5">{strings.mentalHealthConsequenceTitle}</strong> {strings.mentalHealthConsequenceText}</li>
                </ul>
            </section>
            
            <p className="font-bold text-slate-400 pt-2 italic text-sm">{strings.welcomeModalDisclaimer}</p>
        </div>

        <div className="mt-8 space-y-4 relative z-10">
          {/* Barra de precarga */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
              <span>{isReady ? 'SISTEMA LISTO PARA EL DESPEGUE' : 'PREPARANDO MOTORES...'}</span>
              <span>{preloadProgress}%</span>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden relative">
              <div 
                className={`h-full bg-gradient-to-r from-fuchsia-500 to-teal-400 transition-all duration-700 ease-out ${isReady ? 'opacity-70' : 'animate-pulse'}`}
                style={{ width: `${preloadProgress}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`w-full py-5 px-6 font-black text-lg rounded-2xl transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 ${
              isReady 
              ? 'bg-gradient-to-r from-fuchsia-600 to-fuchsia-800 text-white hover:scale-[1.02] active:scale-95 border-t border-white/20' 
              : 'bg-slate-800 text-slate-500 cursor-wait'
            }`}
            aria-label={strings.understood}
          >
            {strings.understood}
            {isReady && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
