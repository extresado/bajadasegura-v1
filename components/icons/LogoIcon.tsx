
import React from 'react';

const imageUrl = `https://raw.githubusercontent.com/extresado/bajadasegura-v1/refs/heads/main/20251227_011338_0000.png`;

interface LogoIconProps {
  className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({ className = 'w-40 h-40' }) => (
  <div className={`relative ${className} group flex items-center justify-center`}>
    {/* Resplandor exterior dinámico - sin animación de pulso */}
    <div className="absolute inset-[-30%] bg-fuchsia-600/15 blur-[60px] rounded-full group-hover:bg-fuchsia-500/30 transition-all duration-700"></div>
    
    <div className="relative h-full w-full transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1">
      {/* Imagen del Logo - Sin marcos, sin recortes */}
      <img
        src={imageUrl}
        alt="Bajada Segura Logo"
        className="h-full w-full object-contain relative z-10 brightness-110 contrast-[1.05] drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
      />
      
      {/* Reflejo de luz diagonal dinámico que barre solo la imagen */}
      <div className="absolute -inset-[50%] z-30 bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-[35deg] translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[2s] ease-in-out pointer-events-none"></div>
    </div>
  </div>
);

export default LogoIcon;
