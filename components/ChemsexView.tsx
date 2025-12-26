
import React from 'react';
import Footer from './Footer';
import HamburgerIcon from './icons/HamburgerIcon';
import { spanishStrings as strings } from '../i18n/strings';

interface ChemsexViewProps {
  onBack: () => void;
  onOpenMenu: () => void;
}

const ROCKET_IMAGE = "https://raw.githubusercontent.com/extresado/App_apoyo_chemsex/refs/heads/main/cohete.png";

const ChemsexView: React.FC<ChemsexViewProps> = ({ onBack, onOpenMenu }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
      <header className="fixed top-3 left-0 w-full px-4 z-40">
        <div className="max-w-4xl mx-auto h-16 sm:h-20 flex justify-between items-center glass-card rounded-[1.8rem] px-6 shadow-2xl border-white/5">
          <div className="flex items-center min-w-0">
            <button onClick={onBack} className="text-white p-3 rounded-2xl hover:bg-white/10 transition-all active:scale-90 flex-shrink-0" aria-label={strings.back}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center min-w-0 ml-1">
                <div className="relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 mr-3 flex-shrink-0">
                    <div className="absolute inset-0 bg-fuchsia-500/20 blur-xl rounded-full animate-pulse"></div>
                    <img src={ROCKET_IMAGE} alt="" className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" />
                </div>
                <h1 className="text-base sm:text-xl font-black text-white leading-none tracking-tight uppercase truncate">
                    {strings.whatIsChemsexMenuItem}
                </h1>
            </div>
          </div>
          <button aria-label={strings.menu} onClick={onOpenMenu} className="p-3 hover:bg-white/10 rounded-2xl transition-all active:scale-90 flex-shrink-0">
              <HamburgerIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 sm:px-10 pt-28 sm:pt-36 pb-24 no-scrollbar text-slate-300 leading-relaxed space-y-12 animate-fade-in">
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-teal-400 tracking-tight">{strings.chemsexSimpleExplanationTitle}</h2>
          <p className="text-lg font-bold">
            {strings.chemsexSimpleExplanationText}
          </p>
        </section>
        
        <section className="space-y-4">
            <h2 className="text-3xl font-black text-fuchsia-400 tracking-tight">{strings.chemsexCanaryIslandsTitle}</h2>
              <p className="text-lg font-bold">
                {strings.chemsexCanaryIslandsText}
            </p>
        </section>
        
        <section className="space-y-4 bg-slate-800/30 p-8 rounded-[2.5rem] border border-white/5">
            <h2 className="text-3xl font-black text-teal-400 tracking-tight">{strings.chemsexHarmReductionTitle}</h2>
            <p className="text-lg font-bold">
                {strings.chemsexHarmReductionText}
            </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ChemsexView;
