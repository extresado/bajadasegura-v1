
import React, { useState, memo, useCallback } from 'react';
import SubstanceDetail from './SubstanceDetail';
import Footer from './Footer';
import HamburgerIcon from './icons/HamburgerIcon';
import { spanishStrings as strings } from '../i18n/strings';

interface SubstancesViewProps {
  onBack: () => void;
  onOpenMenu: () => void;
}

const ROCKET_IMAGE = "https://raw.githubusercontent.com/extresado/App_apoyo_chemsex/refs/heads/main/cohete.png";

const FlaskConical: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M10 2v7.31"/><path d="M14 9.31V2"/><path d="M12 16.31V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/><path d="m16 16-1.96 6H9.96L8 16"/>
    </svg>
);

const SubstanceCard: React.FC<{ name: string; onClick: (name: string) => void }> = memo(({ name, onClick }) => (
    <button
        onClick={() => onClick(name)}
        className="w-full text-left p-6 my-1 bg-slate-800/40 backdrop-blur-3xl rounded-[2rem] border border-white/5 hover:border-teal-500/40 hover:bg-slate-800 transition-all duration-500 flex items-center group shadow-2xl"
    >
        <div className="p-4 bg-teal-500/10 rounded-2xl mr-5 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all duration-500">
            <FlaskConical className="w-8 h-8 text-teal-400" />
        </div>
        <div className="flex-1">
            <span className="block text-xl font-black text-white tracking-tight">{name}</span>
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Protocolo de Reducción de Daños</span>
        </div>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 group-hover:bg-teal-500 group-hover:text-slate-900 transition-all duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
        </div>
    </button>
));

const SubstancesView: React.FC<SubstancesViewProps> = ({ onBack, onOpenMenu }) => {
    const [selectedSubstance, setSelectedSubstance] = useState<string | null>(null);

    const substances = [
        strings.substanceMephedrone, strings.substanceGHB, strings.substanceMeth,
        strings.substanceCocaine, strings.substanceKetamine, strings.substancePoppers,
    ];

    const handleCardClick = useCallback((name: string) => {
        setSelectedSubstance(name);
    }, []);

    if (selectedSubstance) {
        return <SubstanceDetail substanceName={selectedSubstance} onBack={() => setSelectedSubstance(null)} onOpenMenu={onOpenMenu} />;
    }

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
                            {strings.substancesHeaderTitle}
                        </h1>
                    </div>
                </div>
                <button aria-label={strings.menu} onClick={onOpenMenu} className="p-3 hover:bg-white/10 rounded-2xl transition-all active:scale-90 flex-shrink-0 relative z-20">
                    <HamburgerIcon className="w-7 h-7" />
                </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto px-6 sm:px-10 pt-32 sm:pt-40 pb-24 no-scrollbar">
                <div className="space-y-8 animate-fade-in">
                    <p className="text-slate-400 font-bold leading-relaxed text-lg border-l-4 border-teal-500 pl-6 py-2">
                        {strings.substancesIntroText}
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      {substances.map((substance) => (
                          <SubstanceCard key={substance} name={substance} onClick={handleCardClick} />
                      ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SubstancesView;
