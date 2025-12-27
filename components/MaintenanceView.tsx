
import React from 'react';
import LogoIcon from './icons/LogoIcon';
import SocialCarousel from './SocialCarousel';

const MaintenanceView: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans w-full">
      {/* Decoración de fondo optimizada */}
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="z-10 flex flex-col items-center text-center max-w-2xl mx-auto w-full">
        <div 
            className="mb-8 p-6 bg-slate-800/50 rounded-3xl border border-slate-700/50 shadow-2xl backdrop-blur-sm animate-fall-down transform transition-transform duration-500"
        >
            <LogoIcon className="w-48 h-48 sm:w-64 sm:h-64 animate-float-logo" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 animate-fade-in uppercase tracking-tighter" style={{ animationDelay: '0.2s' }}>
          Estamos en <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-teal-400">Obras</span> 🚧
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 mb-12 leading-relaxed max-w-lg animate-fade-in px-4 font-bold" style={{ animationDelay: '0.4s' }}>
          Estamos trabajando para mejorar la experiencia de <strong>Bajada Segura</strong>.
          <br className="hidden sm:block" />
          Volveremos muy pronto con nuevas funcionalidades y más apoyo para la comunidad.
        </p>

        <div className="w-full max-w-md animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-xs text-slate-500 mb-6 uppercase tracking-[0.3em] font-black">Mantente informado en nuestras redes</p>
            <div className="relative">
              <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -top-3"></div>
              <SocialCarousel />
              <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -bottom-3"></div>
            </div>
        </div>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center gap-1.5 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">© 2025 Bajada Segura</span>
        <span className="text-[9px] font-bold text-slate-700 uppercase tracking-[0.4em]">by canarylab.app</span>
      </div>
    </div>
  );
};

export default MaintenanceView;
