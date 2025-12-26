
import React, { useState, useEffect } from 'react';
import { chatCompletion } from '../services/geminiService';
import AddictionBar from './AddictionBar';
import Footer from './Footer';
import HamburgerIcon from './icons/HamburgerIcon';
import LoadingSpinner from './LoadingSpinner';
import { spanishStrings as strings } from '../i18n/strings';

interface SubstanceDetailProps {
  substanceName: string;
  onBack: () => void;
  onOpenMenu: () => void;
}

interface SubstanceInfo {
  efectosPrincipales: string;
  riesgosSeguridad: string;
  mezclasPrecauciones: string;
  potencialAdiccionTexto: string;
  potencialAdiccionValor: number;
  notaFinal: string;
}

const ROCKET_IMAGE = "https://raw.githubusercontent.com/extresado/App_apoyo_chemsex/refs/heads/main/cohete.png";

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="glass-card p-6 rounded-[2rem] border-white/5 shadow-2xl">
    <h3 className="text-xl font-black text-teal-400 border-b border-white/5 pb-3 mb-4 tracking-tight">{title}</h3>
    {children}
  </div>
);

const SubstanceDetail: React.FC<SubstanceDetailProps> = ({ substanceName, onBack, onOpenMenu }) => {
  const [info, setInfo] = useState<SubstanceInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const substanceStaticData: Record<string, any> = {
    [strings.substanceMephedrone]: { aliases: ['Mefe', 'Miaow Miaow', 'Sales de baño'], type: strings.substanceMephedroneType, risk: strings.substanceMephedroneRisk },
    [strings.substanceGHB]: { aliases: ['G', 'Éxtasis líquido', 'Biberón'], type: strings.substanceGHBType, risk: strings.substanceGHBRisk },
    [strings.substanceMeth]: { aliases: ['Tina', 'Meth', 'Cristal'], type: strings.substanceMethType, risk: strings.substanceMethRisk },
    [strings.substanceCocaine]: { aliases: ['Coca', 'Perico', 'Farlopa'], type: strings.substanceCocaineType, risk: strings.substanceCocaineRisk },
    [strings.substanceKetamine]: { aliases: ['Keta', 'Special K', 'Vitamina K'], type: strings.substanceKetamineType, risk: strings.substanceKetamineRisk },
    [strings.substancePoppers]: { aliases: ['Popper', 'Oro líquido'], type: strings.substancePoppersType, risk: strings.substancePoppersRisk },
  };
  const staticInfo = substanceStaticData[substanceName] || { aliases: [], type: strings.substanceUnknown, risk: strings.substanceUnknown };

  useEffect(() => {
    const fetchSubstanceInfo = async () => {
      setIsLoading(true); setError(null);
      const prompt = `Eres un asistente de IA para "Bajada Segura", enfocado en la reducción de daños en chemsex. Proporciona una ficha informativa detallada sobre: ${substanceName}. Devuelve la información estrictamente en formato JSON con la siguiente estructura: 
      {
        "efectosPrincipales": "texto",
        "riesgosSeguridad": "texto",
        "potencialAdiccionTexto": "texto",
        "potencialAdiccionValor": numero entre 1 y 10,
        "mezclasPrecauciones": "texto",
        "notaFinal": "texto"
      }. Responde en español.`;

      try {
        const jsonText = await chatCompletion([{ role: 'user', content: prompt }], true);
        setInfo(JSON.parse(jsonText));
      } catch (e) {
        console.error(e); setError(strings.substanceErrorLoading);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubstanceInfo();
  }, [substanceName]);

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
                    {substanceName}
                </h1>
            </div>
          </div>
          <button aria-label={strings.menu} onClick={onOpenMenu} className="p-3 hover:bg-white/10 rounded-2xl transition-all active:scale-90 flex-shrink-0">
              <HamburgerIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 sm:px-10 pt-28 sm:pt-36 pb-24 no-scrollbar">
        <div className="p-8 mb-10 bg-slate-800/40 rounded-[2.5rem] border border-white/5 shadow-2xl animate-fade-in">
            <h2 className="text-4xl font-black text-white mb-6 tracking-tighter">{substanceName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-teal-500/10 text-teal-400 px-4 py-3 rounded-2xl border border-teal-500/20 shadow-inner font-bold">
                  <span className="text-[10px] uppercase tracking-widest block opacity-60 mb-1">{strings.substanceAlias}</span>
                  {staticInfo.aliases.join(', ')}
                </div>
                <div className="bg-fuchsia-500/10 text-fuchsia-400 px-4 py-3 rounded-2xl border border-fuchsia-500/20 shadow-inner font-bold">
                  <span className="text-[10px] uppercase tracking-widest block opacity-60 mb-1">{strings.substanceType}</span>
                  {staticInfo.type}
                </div>
                <div className="sm:col-span-2 bg-red-500/10 text-red-400 px-4 py-3 rounded-2xl border border-red-500/20 shadow-inner font-bold">
                  <span className="text-[10px] uppercase tracking-widest block opacity-60 mb-1">{strings.substanceMainRisk}</span>
                  {staticInfo.risk}
                </div>
            </div>
        </div>
        
        {isLoading && <LoadingSpinner message={strings.substanceLoadingMessage} />}
        {error && <p className="text-center text-red-400 p-8 font-bold animate-shake">{error}</p>}
        {info && (
          <div className="space-y-6 animate-fade-in">
            <InfoCard title={strings.substanceEffectsTitle}><p className="whitespace-pre-wrap text-slate-300 font-bold leading-relaxed">{info.efectosPrincipales}</p></InfoCard>
            <InfoCard title={strings.substanceRisksTitle}><p className="whitespace-pre-wrap text-slate-300 font-bold leading-relaxed">{info.riesgosSeguridad}</p></InfoCard>
            <InfoCard title={strings.substanceAddictionPotentialTitle}>
              <AddictionBar level={info.potencialAdiccionValor} />
              <p className="whitespace-pre-wrap text-slate-300 font-bold leading-relaxed mt-4">{info.potencialAdiccionTexto}</p>
            </InfoCard>
            <InfoCard title={strings.substanceMixturesTitle}><p className="whitespace-pre-wrap text-slate-300 font-bold leading-relaxed">{info.mezclasPrecauciones}</p></InfoCard>
            <div className="pt-4 p-8 bg-slate-800/60 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <p className="whitespace-pre-wrap text-slate-200 font-black italic leading-relaxed text-center">
                {info.notaFinal}
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SubstanceDetail;
