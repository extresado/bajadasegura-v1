
import React, { useState } from 'react';
import { chatCompletion } from '../services/geminiService';
import Footer from './Footer';
import HamburgerIcon from './icons/HamburgerIcon';
import LoadingSpinner from './LoadingSpinner';
import { spanishStrings as strings } from '../i18n/strings';
import MarkdownRenderer from './MarkdownRenderer';

const ROCKET_IMAGE = "https://raw.githubusercontent.com/extresado/App_apoyo_chemsex/refs/heads/main/cohete.png";

const TarView: React.FC<{ onBack: () => void; onOpenMenu: () => void }> = ({ onBack, onOpenMenu }) => {
  const chemsList = [
    strings.tarMephedrone, strings.tarGHB, strings.tarMeth, strings.tarCocaine,
    strings.tarKetamine, strings.tarPoppers, strings.tarMDMA, strings.tarSildenafil,
    strings.tarTadalafil, strings.tarAlcohol,
  ];

  const [chem, setChem] = useState(chemsList[0]);
  const [art, setArt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!art.trim()) { setError(strings.tarErrorARTRequired); return; }
    setIsLoading(true); setError(null); setResult(null);

    const prompt = `Actúa como experto en farmacología y reducción de daños en chemsex. El usuario quiere saber sobre la interacción entre "${chem}" y el antirretroviral (TAR) "${art}". Proporciona una respuesta concisa y fácil en Markdown, estructurada con: **${strings.tarRiskLevel}**, **${strings.tarRiskExplanation}**, **${strings.tarKeyRecommendations}**, y **${strings.tarImportantNotice}**. Si no encuentras el TAR, da una pauta general sobre inhibidores de proteasa y boosters (Ritonavir, Cobicistat). Responde en español.`;

    try {
        const text = await chatCompletion([{ role: 'user', content: prompt }]);
        setResult(text);
    } catch (e) {
        console.error(e); setError(strings.tarErrorGenerating);
    } finally {
        setIsLoading(false);
    }
  };

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
                <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 mr-3 flex-shrink-0">
                    <div className="absolute inset-0 bg-fuchsia-500/25 blur-2xl rounded-full animate-pulse"></div>
                    <img src={ROCKET_IMAGE} alt="" className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_12px_rgba(217,70,239,0.6)]" />
                </div>
                <h1 className="text-lg sm:text-xl font-black text-white leading-none tracking-tight uppercase truncate">
                    {strings.tarHeaderTitle}
                </h1>
            </div>
          </div>
          <button aria-label={strings.menu} onClick={onOpenMenu} className="p-3 hover:bg-white/10 rounded-2xl transition-all active:scale-90 flex-shrink-0">
              <HamburgerIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 sm:px-10 pt-28 sm:pt-36 pb-24 no-scrollbar">
        <div className="space-y-10 animate-fade-in max-w-3xl mx-auto">
            <p className="text-slate-400 font-bold leading-relaxed text-lg border-l-4 border-orange-500 pl-6 py-2">
              {strings.tarIntroText}
            </p>

            <div className="space-y-8 bg-slate-800/40 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
                <div>
                    <label htmlFor="chem-select" className="block mb-3 text-xs font-black text-slate-500 uppercase tracking-widest">{strings.tarSubstanceSelectLabel}</label>
                    <select id="chem-select" value={chem} onChange={e => setChem(e.target.value)} className="w-full bg-slate-900/50 border-2 border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-orange-500/50 transition-all text-lg font-bold appearance-none cursor-pointer">
                        {chemsList.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="art-input" className="block mb-3 text-xs font-black text-slate-500 uppercase tracking-widest">{strings.tarARTInputLabel}</label>
                    <input type="text" id="art-input" value={art} onChange={e => setArt(e.target.value)} className="w-full bg-slate-900/50 border-2 border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-orange-500/50 transition-all text-lg font-bold placeholder:text-slate-700" placeholder={strings.tarARTInputPlaceholder} />
                </div>
                
                <button onClick={handleSubmit} disabled={isLoading} className="w-full py-5 px-8 bg-gradient-to-r from-orange-600 to-orange-800 text-white font-black text-xl rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30">
                    {isLoading ? strings.loading + '...' : strings.tarVerifyButton}
                </button>
            </div>

            {error && <p className="text-red-400 text-center font-bold animate-shake">{error}</p>}

            <div className="mt-6">
                {isLoading && <div className="py-10"><LoadingSpinner message={strings.tarLoadingMessage} /></div>}
                {result && (
                    <div className="p-8 bg-slate-800/60 backdrop-blur-3xl rounded-[2.5rem] border border-orange-500/20 shadow-2xl animate-fade-in">
                        <MarkdownRenderer content={result} />
                    </div>
                )}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TarView;
