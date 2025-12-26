
import React, { useState, memo, useCallback } from 'react';
import Footer from './Footer';
import HamburgerIcon from './icons/HamburgerIcon';
import RocketIcon from './icons/RocketIcon';
import ChatIcon from './icons/ChatIcon';
import UsersIcon from './icons/UsersIcon';
import { spanishStrings as strings } from '../i18n/strings';

interface AboutViewProps {
  onBack: () => void;
  onOpenMenu: () => void;
}

const ROCKET_IMAGE = "https://raw.githubusercontent.com/extresado/App_apoyo_chemsex/refs/heads/main/cohete.png";

const colorClasses = {
  fuchsia: { text: 'text-fuchsia-400', border: 'border-fuchsia-500/50 hover:border-fuchsia-400' },
  teal: { text: 'text-teal-400', border: 'border-teal-500/50 hover:border-teal-400' },
};

type SectionId = 'mission' | 'ai' | 'philosophy';

interface Section {
    id: SectionId;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    content: string;
    color: keyof typeof colorClasses;
}

const SectionButton: React.FC<{section: Section; onClick: (id: SectionId) => void}> = memo(({ section, onClick }) => {
    const colors = colorClasses[section.color];
    return (
        <button
            onClick={() => onClick(section.id)}
            className={`w-full flex items-center gap-5 p-6 rounded-[2.2rem] border-2 bg-slate-800/40 backdrop-blur-3xl transition-all duration-500 ease-in-out hover:bg-slate-800 hover:-translate-y-1 ${colors.border} shadow-2xl`}
        >
            <div className={colors.text}>{section.icon}</div>
            <div className="text-left">
                <h3 className="text-xl font-black text-slate-100 tracking-tight">{section.title}</h3>
                <p className="text-slate-400 font-bold mt-1 text-sm">{section.subtitle}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        </button>
    );
});

const AboutView: React.FC<AboutViewProps> = ({ onBack, onOpenMenu }) => {
    const [selectedSection, setSelectedSection] = useState<SectionId | null>(null);

    const sections: Section[] = [
        {
            id: 'mission',
            title: strings.aboutMissionTitle,
            subtitle: strings.aboutMissionSubtitle,
            icon: <RocketIcon className="w-8 h-8" />,
            content: strings.aboutMissionText,
            color: 'fuchsia',
        },
        {
            id: 'ai',
            title: strings.aiChemsexTitle,
            subtitle: strings.aiChemsexSubtitle,
            icon: <ChatIcon className="w-8 h-8" />,
            content: strings.aiChemsexText,
            color: 'teal',
        },
        {
            id: 'philosophy',
            title: strings.aboutPhilosophyTitle,
            subtitle: strings.aboutPhilosophySubtitle,
            icon: <UsersIcon className="w-8 h-8" />,
            content: `${strings.aboutPhilosophyText1}\n\n${strings.aboutPhilosophyText2}`,
            color: 'fuchsia',
        },
    ];

    const selectedData = sections.find(s => s.id === selectedSection);
    
    const handleSectionClick = useCallback((id: SectionId) => {
        setSelectedSection(id);
    }, []);

  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
      <header className="fixed top-3 left-0 w-full px-4 z-40">
        <div className="max-w-4xl mx-auto h-16 sm:h-20 flex justify-between items-center glass-card rounded-[1.8rem] px-6 shadow-2xl border-white/5">
          <div className="flex items-center min-w-0">
            <button onClick={selectedSection ? () => setSelectedSection(null) : onBack} className="text-white p-3 rounded-2xl hover:bg-white/10 transition-all active:scale-90 flex-shrink-0" aria-label={strings.back}>
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
                    {strings.aboutMenuItem}
                </h1>
            </div>
          </div>
          <button aria-label={strings.menu} onClick={onOpenMenu} className="p-3 hover:bg-white/10 rounded-2xl transition-all active:scale-90 flex-shrink-0">
              <HamburgerIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 sm:px-10 pt-28 sm:pt-36 pb-24 no-scrollbar">
         {selectedSection === null ? (
            <div className="space-y-10 animate-fade-in">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tighter">Un Proyecto de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-teal-400">Comunidad</span></h2>
                    <p className="mt-3 text-slate-400 font-bold leading-relaxed">Explora los pilares de Bajada Segura. Toca una tarjeta para profundizar en nuestra misión y valores.</p>
                </div>
                <div className="space-y-5">
                    {sections.map((section) => (
                        <SectionButton
                            key={section.id}
                            section={section}
                            onClick={handleSectionClick}
                        />
                    ))}
                </div>
            </div>
         ) : selectedData ? (
            <div className="animate-fade-in space-y-8">
                <h2 className={`text-4xl font-black tracking-tighter ${colorClasses[selectedData.color].text}`}>
                    {selectedData.title}
                </h2>
                <div className="space-y-6 text-slate-300 leading-relaxed text-lg font-bold">
                    {selectedData.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="whitespace-pre-wrap selection:bg-teal-500/30">{paragraph.trim()}</p>
                    ))}
                </div>
                <button 
                  onClick={() => setSelectedSection(null)}
                  className="mt-10 py-4 px-8 bg-white/5 border border-white/10 rounded-2xl font-black text-slate-300 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                >
                  {strings.back} a Secciones
                </button>
            </div>
         ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default AboutView;
