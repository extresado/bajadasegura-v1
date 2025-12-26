
import React from 'react';

const imageUrl = `https://raw.githubusercontent.com/extresado/App_apoyo_chemsex/refs/heads/main/logo_bajada.png`;

interface LogoIconProps {
  className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({ className = 'w-32 h-32' }) => (
  <div className={`relative ${className} group flex items-center justify-center`}>
    {/* Aura de iluminación sutil */}
    <div className="absolute inset-1 bg-fuchsia-500/20 blur-xl rounded-full animate-pulse group-hover:bg-fuchsia-500/40 transition-colors duration-700"></div>
    
    {/* Halo central para profundidad */}
    <div className="absolute inset-4 bg-teal-400/10 blur-lg rounded-full animate-pulse [animation-delay:1s]"></div>

    <img
      src={imageUrl}
      alt="Bajada Segura Logo"
      className="h-full w-auto object-contain relative z-10 drop-shadow-[0_0_10px_rgba(217,70,239,0.4)] group-hover:scale-105 transition-transform duration-700"
    />
  </div>
);

export default LogoIcon;
