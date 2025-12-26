
import React from 'react';
import Footer from './Footer';
import HamburgerIcon from './icons/HamburgerIcon';
import LogoIcon from './icons/LogoIcon';
import { spanishStrings as strings } from '../i18n/strings';

interface LegalNoticeViewProps {
  onBack: () => void;
  onOpenMenu: () => void;
}

const LegalNoticeView: React.FC<LegalNoticeViewProps> = ({ onBack, onOpenMenu }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
      <header className="fixed top-0 left-0 w-full px-4 z-40">
        <div className="max-w-4xl mx-auto h-20 sm:h-24 flex justify-between items-center glass-card rounded-b-[2.5rem] px-6 shadow-2xl border-white/5 relative overflow-visible">
          <div className="flex items-center min-w-0 h-full relative z-20">
            <button onClick={onBack} className="text-white p-3 rounded-2xl hover:bg-white/10 transition-all active:scale-90 flex-shrink-0" aria-label={strings.back}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center min-w-0 ml-1 h-full">
                <div className="relative flex items-center justify-center h-full mr-4 flex-shrink-0 translate-y-2">
                    <div className="absolute -inset-10 bg-fuchsia-600/25 blur-[45px] rounded-full animate-pulse"></div>
                    <LogoIcon className="h-[120%] sm:h-[140%] w-auto relative brightness-110 saturate-150 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]" />
                </div>
                <h1 className="text-lg sm:text-xl font-black text-white leading-none tracking-tight uppercase truncate">
                  {strings.legalTitle}
                </h1>
            </div>
          </div>
          <button aria-label={strings.menu} onClick={onOpenMenu} className="p-3 hover:bg-white/10 rounded-2xl transition-all active:scale-90 flex-shrink-0 relative z-20">
              <HamburgerIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 sm:px-10 pt-32 sm:pt-40 pb-24 no-scrollbar animate-fade-in">
        <div className="space-y-12">
          <div className="space-y-4">
            <p className="text-xl font-bold text-slate-100 border-l-4 border-fuchsia-500 pl-8 py-6 bg-fuchsia-500/5 rounded-r-[2rem] shadow-inner leading-relaxed">
              {strings.legalIntroduction}
            </p>
            <p className="text-right text-[10px] font-black text-slate-500 uppercase tracking-widest px-4">
              {strings.legalLastUpdate}
            </p>
          </div>

          <section className="space-y-5 animate-fall-down">
            <h2 className="text-2xl font-black text-teal-400 tracking-tight uppercase flex items-center gap-3">
              <span className="text-white/20 text-3xl">01.</span> {strings.legalPrivacyTitle}
            </h2>
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <p className="text-slate-300 leading-relaxed text-lg font-medium">
                {strings.legalPrivacyText}
              </p>
            </div>
          </section>

          <section className="space-y-5 animate-fall-down [animation-delay:150ms]">
            <h2 className="text-2xl font-black text-teal-400 tracking-tight uppercase flex items-center gap-3">
              <span className="text-white/20 text-3xl">02.</span> {strings.legalMedicalTitle}
            </h2>
            <div className="bg-red-500/5 p-8 rounded-[2.5rem] border border-red-500/10 shadow-2xl">
              <p className="text-red-200/90 leading-relaxed text-lg italic font-bold">
                {strings.legalMedicalText}
              </p>
            </div>
          </section>

          <section className="space-y-5 animate-fall-down [animation-delay:300ms]">
            <h2 className="text-2xl font-black text-teal-400 tracking-tight uppercase flex items-center gap-3">
              <span className="text-white/20 text-3xl">03.</span> {strings.legalIntellectualTitle}
            </h2>
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <p className="text-slate-300 leading-relaxed text-lg font-medium">
                {strings.legalIntellectualText}
              </p>
            </div>
          </section>

          <section className="space-y-5 animate-fall-down [animation-delay:450ms]">
            <h2 className="text-2xl font-black text-teal-400 tracking-tight uppercase flex items-center gap-3">
              <span className="text-white/20 text-3xl">04.</span> {strings.legalDataTitle}
            </h2>
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <p className="text-slate-300 leading-relaxed text-lg font-medium">
                {strings.legalDataText}
              </p>
            </div>
          </section>

          <section className="space-y-5 animate-fall-down [animation-delay:600ms] pb-10">
            <h2 className="text-2xl font-black text-teal-400 tracking-tight uppercase flex items-center gap-3">
              <span className="text-white/20 text-3xl">05.</span> {strings.legalResponsibilityTitle}
            </h2>
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <p className="text-slate-300 leading-relaxed text-lg font-medium">
                {strings.legalResponsibilityText}
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalNoticeView;
