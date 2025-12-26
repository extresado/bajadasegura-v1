
import React, { useState } from 'react';
import type { View } from '../types';
import TonalButton from './NeonButton';
import SosIcon from './icons/SosIcon';
import ChatIcon from './icons/ChatIcon';
import EvaluationIcon from './icons/EvaluationIcon';
import SubstanceIcon from './icons/SubstanceIcon';
import TarIcon from './icons/TarIcon';
import GlobalHeader from './GlobalHeader';
import Footer from './Footer';
import { spanishStrings as strings } from '../i18n/strings';

interface MainMenuProps {
  onNavigate: (view: View) => void;
  onOpenMenu: () => void;
  isUrgentHelpLoading: boolean;
}

interface TransitionState {
  view: View;
  rect: DOMRect;
  color: 'primary' | 'secondary' | 'tertiary' | 'error';
  bgImage: string;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNavigate, onOpenMenu, isUrgentHelpLoading }) => {
  const [transition, setTransition] = useState<TransitionState | null>(null);

  const handleNavigateWithTransition = (view: View, rect: DOMRect, color: TransitionState['color'], bgImage: string) => {
    setTransition({ view, rect, color, bgImage });
    
    // El tiempo debe coincidir con la duración de la animación CSS
    setTimeout(() => {
      onNavigate(view);
    }, 600);
  };

  const menuItems = [
    {
      id: 'chat' as View,
      color: 'primary' as const,
      title: strings.chatButtonTitle,
      subtitle: "Conversación privada con nuestra IA. Resolvemos dudas sobre consumo, gestión emocional y riesgos en tiempo real.",
      badge: "ACTIVO 24H",
      bgImage: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a",
      icon: <ChatIcon />,
      delay: "animate-fall-down"
    },
    {
      id: 'evaluation' as View,
      color: 'secondary' as const,
      title: strings.evaluationButtonTitle,
      subtitle: "Test de autopercepción guiado. Analiza tus patrones de consumo y recibe feedback personalizado para tu bienestar.",
      badge: "AUTO-TEST",
      bgImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
      icon: <EvaluationIcon />,
      delay: "animate-fall-down [animation-delay:150ms]"
    },
    {
      id: 'substances' as View,
      color: 'secondary' as const,
      title: strings.substancesButtonTitle,
      subtitle: "Biblioteca completa sobre sustancias (G, Mefe, Tina...). Efectos, dosis, tiempos y protocolos de seguridad específicos.",
      badge: "INFORMACIÓN",
      bgImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853",
      icon: <SubstanceIcon />,
      delay: "animate-fall-down [animation-delay:300ms]"
    },
    {
      id: 'tar' as View,
      color: 'tertiary' as const,
      title: strings.tarButtonTitle,
      subtitle: "Buscador de interacciones. Verifica cómo afectan las sustancias a tu tratamiento VIH, PrEP o medicación hormonal.",
      badge: "SALUD / TAR",
      bgImage: "https://images.unsplash.com/photo-1576086213369-97a306d36557",
      icon: <TarIcon />,
      delay: "animate-fall-down [animation-delay:450ms]"
    },
    {
      id: 'urgent' as View,
      color: 'error' as const,
      title: strings.urgentHelpButtonTitle,
      subtitle: "Protocolos SOS inmediatos y geolocalización de recursos de emergencia. Contacto directo con servicios especializados.",
      badge: "SOS",
      bgImage: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8",
      icon: <SosIcon />,
      delay: "animate-fall-down [animation-delay:600ms]",
      fullWidth: true
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <GlobalHeader onOpenMenu={onOpenMenu} />
      
      <main className="flex-grow flex flex-col px-4 sm:px-10 pt-32 sm:pt-44 pb-16 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-8 w-full">
          {menuItems.map((item) => (
            <TonalButton
              key={item.id}
              color={item.color}
              title={item.title}
              subtitle={item.subtitle}
              badge={item.badge}
              bgImage={item.bgImage}
              icon={item.icon}
              onClick={(rect) => handleNavigateWithTransition(item.id, rect, item.color, item.bgImage)}
              isLoading={item.id === 'urgent' && isUrgentHelpLoading}
              className={`${item.fullWidth ? 'md:col-span-2' : ''} md:h-48 lg:h-52 ${item.delay}`}
              isHidden={transition?.view === item.id}
            />
          ))}
        </div>
      </main>
      <Footer />

      {/* Capa de expansión para la transición */}
      {transition && (
        <div 
          className="fixed z-[100] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden flex flex-col items-center justify-center text-center"
          style={{
            top: transition.rect.top,
            left: transition.rect.left,
            width: transition.rect.width,
            height: transition.rect.height,
            borderRadius: '2rem',
            animation: 'expand-to-fullscreen 0.6s forwards cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Fondo idéntico al botón */}
          <div className={`absolute inset-0 bg-slate-950`}>
             <img 
               src={`${transition.bgImage}?auto=format&fit=crop&q=85&w=1200`} 
               alt="" 
               className="w-full h-full object-cover saturate-[2] brightness-[0.4]" 
             />
             <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-transparent to-transparent"></div>
          </div>
          
          {/* Indicador de carga sutil durante la expansión */}
          <div className="relative z-10 animate-pulse">
            <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-teal-400 animate-spin"></div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes expand-to-fullscreen {
          0% {
            top: ${transition?.rect.top}px;
            left: ${transition?.rect.left}px;
            width: ${transition?.rect.width}px;
            height: ${transition?.rect.height}px;
            border-radius: 2rem;
          }
          100% {
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MainMenu;
