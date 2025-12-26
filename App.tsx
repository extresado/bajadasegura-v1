
import React, { useState, useEffect, useCallback } from 'react';
import { LocalizationProvider } from './context/LocalizationContext';
import MainMenu from './components/MainMenu';
import ChatView from './components/ChatView';
import EvaluationView from './components/EvaluationView';
import SubstancesView from './components/SubstancesView';
import TarView from './components/TarView';
import UrgentHelpView from './components/UrgentHelpView';
import AboutView from './components/AboutView';
import ChemsexView from './components/ChemsexView';
import JoinUsView from './components/JoinUsView';
import NewsView from './components/NewsView';
import LegalNoticeView from './components/LegalNoticeView';
import SideMenu from './components/SideMenu';
import WelcomeModal from './components/WelcomeModal';
import type { View, MapsResult } from './types';
import { getNearbyUrgentResourcesWithMaps } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('menu');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  
  const [mapsResult, setMapsResult] = useState<MapsResult | null>(null);
  const [isUrgentHelpLoading, setIsUrgentHelpLoading] = useState(false);
  const [urgentHelpError, setUrgentHelpError] = useState<string | null>(null);

  const handleFetchUrgentResources = useCallback(async (silent = false) => {
    if (!silent) setIsUrgentHelpLoading(true);
    setUrgentHelpError(null);

    if (!navigator.geolocation) {
      if (!silent) {
        setUrgentHelpError("La geolocalización no es compatible con tu navegador.");
        setIsUrgentHelpLoading(false);
      }
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const data = await getNearbyUrgentResourcesWithMaps(latitude, longitude);
          setMapsResult({
            text: data.text,
            links: data.mapsLinks
          });
        } catch (err) {
          console.error("Error fetching resources:", err);
          if (!silent) setUrgentHelpError("No pudimos conectar con los servicios de mapas. Llama directamente al 112.");
        } finally {
          setIsUrgentHelpLoading(false);
        }
      },
      (error) => {
        if (!silent) {
          setUrgentHelpError("Permiso de ubicación denegado. No podemos buscar recursos locales sin tu posición.");
          setIsUrgentHelpLoading(false);
        }
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  }, []);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowWelcomeModal(true);
      localStorage.setItem('hasVisited', 'true');
    }
    
    // Precarga silenciosa de recursos SOS al entrar
    handleFetchUrgentResources(true);
  }, [handleFetchUrgentResources]);

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Si navega a urgente y no hay resultados o hay error, reintenta cargar (esta vez con UI de carga)
    if (view === 'urgent' && (!mapsResult || urgentHelpError)) {
      handleFetchUrgentResources();
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'menu':
        return <MainMenu onNavigate={handleNavigate} onOpenMenu={() => setIsMenuOpen(true)} isUrgentHelpLoading={isUrgentHelpLoading} />;
      case 'urgent':
        return (
          <UrgentHelpView 
            onBack={() => handleNavigate('menu')} 
            onOpenMenu={() => setIsMenuOpen(true)}
            mapsResult={mapsResult}
            isLoading={isUrgentHelpLoading}
            error={urgentHelpError}
          />
        );
      default:
        // Render rest of views...
        if (currentView === 'chat') return <ChatView onBack={() => handleNavigate('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
        if (currentView === 'evaluation') return <EvaluationView onBack={() => handleNavigate('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
        if (currentView === 'substances') return <SubstancesView onBack={() => handleNavigate('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
        if (currentView === 'tar') return <TarView onBack={() => handleNavigate('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
        if (currentView === 'about') return <AboutView onBack={() => handleNavigate('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
        if (currentView === 'chemsex') return <ChemsexView onBack={() => handleNavigate('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
        if (currentView === 'join') return <JoinUsView onBack={() => handleNavigate('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
        if (currentView === 'news') return <NewsView onBack={() => handleNavigate('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
        if (currentView === 'legal') return <LegalNoticeView onBack={() => handleNavigate('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
        return <MainMenu onNavigate={handleNavigate} onOpenMenu={() => setIsMenuOpen(true)} isUrgentHelpLoading={isUrgentHelpLoading} />;
    }
  };

  return (
    <LocalizationProvider>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-fuchsia-500/30 overflow-x-hidden">
        <div className="flex-1 flex flex-col">
          {renderView()}
        </div>
        <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onNavigate={handleNavigate} currentView={currentView} />
        {showWelcomeModal && <WelcomeModal onClose={() => setShowWelcomeModal(false)} />}
      </div>
    </LocalizationProvider>
  );
};

export default App;
