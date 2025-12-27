
import React, { useState, useCallback } from 'react';
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
import { getNearbyUrgentResourcesWithMaps } from './services/geminiService';
import type { View, MapsResult } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('menu');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem('welcomeDismissed'));
  
  // Estados para Ayuda Urgente
  const [urgentHelpLoading, setUrgentHelpLoading] = useState(false);
  const [mapsResult, setMapsResult] = useState<MapsResult | null>(null);
  const [urgentError, setUrgentError] = useState<string | null>(null);

  const handleNavigate = useCallback((view: View) => {
    if (view === 'urgent') {
      handleUrgentHelp();
    } else {
      setCurrentView(view);
    }
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, []);

  const handleUrgentHelp = async () => {
    setUrgentHelpLoading(true);
    setUrgentError(null);
    setCurrentView('urgent');

    if (!navigator.geolocation) {
      setUrgentError("La geolocalización no es compatible con tu navegador.");
      setUrgentHelpLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const result = await getNearbyUrgentResourcesWithMaps(latitude, longitude);
          setMapsResult(result);
        } catch (err) {
          console.error("Error fetching maps data:", err);
          setUrgentError("No se pudieron cargar los recursos de emergencia.");
        } finally {
          setUrgentHelpLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setUrgentError("Necesitamos tu ubicación para encontrar los recursos más cercanos.");
        setUrgentHelpLoading(false);
      },
      { timeout: 10000 }
    );
  };

  const handleDismissWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('welcomeDismissed', 'true');
  };

  const renderView = () => {
    switch (currentView) {
      case 'menu':
        return <MainMenu onNavigate={handleNavigate} onOpenMenu={() => setIsMenuOpen(true)} isUrgentHelpLoading={urgentHelpLoading} />;
      case 'chat':
        return <ChatView onBack={() => setCurrentView('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
      case 'evaluation':
        return <EvaluationView onBack={() => setCurrentView('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
      case 'substances':
        return <SubstancesView onBack={() => setCurrentView('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
      case 'tar':
        return <TarView onBack={() => setCurrentView('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
      case 'urgent':
        return <UrgentHelpView onBack={() => setCurrentView('menu')} onOpenMenu={() => setIsMenuOpen(true)} mapsResult={mapsResult} isLoading={urgentHelpLoading} error={urgentError} />;
      case 'about':
        return <AboutView onBack={() => setCurrentView('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
      case 'chemsex':
        return <ChemsexView onBack={() => setCurrentView('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
      case 'join':
        return <JoinUsView onBack={() => setCurrentView('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
      case 'news':
        return <NewsView onBack={() => setCurrentView('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
      case 'legal':
        return <LegalNoticeView onBack={() => setCurrentView('menu')} onOpenMenu={() => setIsMenuOpen(true)} />;
      default:
        return <MainMenu onNavigate={handleNavigate} onOpenMenu={() => setIsMenuOpen(true)} isUrgentHelpLoading={urgentHelpLoading} />;
    }
  };

  return (
    <LocalizationProvider>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-fuchsia-500/30 overflow-x-hidden">
        {renderView()}
        
        <SideMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
          onNavigate={handleNavigate} 
          currentView={currentView} 
        />
        
        {showWelcome && <WelcomeModal onClose={handleDismissWelcome} />}
      </div>
    </LocalizationProvider>
  );
};

export default App;
