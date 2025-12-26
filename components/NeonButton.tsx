
import React, { useState, useEffect, useRef } from 'react';

interface TonalButtonProps {
  color: 'primary' | 'secondary' | 'tertiary' | 'error';
  title: string;
  subtitle: string;
  badge?: string;
  extraInfo?: string;
  bgImage?: string;
  icon?: React.ReactNode;
  onClick?: (rect: DOMRect) => void;
  isLoading?: boolean;
  className?: string;
  isHidden?: boolean;
}

const colorStyles = {
  primary: {
    border: 'border-fuchsia-500/40',
    iconBg: 'bg-fuchsia-500/30',
    iconText: 'text-fuchsia-300',
    badgeBg: 'bg-fuchsia-500/60 text-white',
    hoverBorder: 'hover:border-fuchsia-400',
    glow: 'hover:shadow-[0_0_25px_rgba(217,70,239,0.25)]',
    fallback: 'bg-fuchsia-900'
  },
  secondary: {
    border: 'border-teal-500/40',
    iconBg: 'bg-teal-500/30',
    iconText: 'text-teal-300',
    badgeBg: 'bg-teal-500/60 text-white',
    hoverBorder: 'hover:border-teal-400',
    glow: 'hover:shadow-[0_0_25px_rgba(45,212,191,0.25)]',
    fallback: 'bg-teal-900'
  },
  tertiary: {
    border: 'border-orange-500/40',
    iconBg: 'bg-orange-500/30',
    iconText: 'text-orange-300',
    badgeBg: 'bg-orange-500/60 text-white',
    hoverBorder: 'hover:border-orange-400',
    glow: 'hover:shadow-[0_0_25px_rgba(251,146,60,0.25)]',
    fallback: 'bg-orange-900'
  },
  error: {
    border: 'border-red-500/40',
    iconBg: 'bg-red-500/30',
    iconText: 'text-red-300',
    badgeBg: 'bg-red-500/60 text-white',
    hoverBorder: 'hover:border-red-400',
    glow: 'hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]',
    fallback: 'bg-red-900'
  },
};

const TonalButton: React.FC<TonalButtonProps> = ({ color, title, subtitle, badge, bgImage, icon, onClick, isLoading = false, className = "", isHidden = false }) => {
  const styles = colorStyles[color];
  const [imageLoaded, setImageLoaded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (bgImage) {
      const img = new Image();
      img.src = `${bgImage}?auto=format&fit=crop&q=80&w=1000`;
      img.onload = () => setImageLoaded(true);
    }
  }, [bgImage]);

  const handleInternalClick = () => {
    if (onClick && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      onClick(rect);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleInternalClick}
      disabled={isLoading || isHidden}
      aria-label={`${title}: ${subtitle}`}
      className={`group relative overflow-hidden p-5 sm:p-7 rounded-[2rem] glass-card transition-all duration-700 ${styles.border} ${styles.hoverBorder} ${styles.glow} ${isHidden ? 'opacity-0 scale-95 pointer-events-none' : 'hover:-translate-y-2 active:scale-[0.97]'} ${className} flex flex-col justify-between`}
    >
      {/* Capa de color de respaldo más sólida */}
      <div className={`absolute inset-0 z-0 ${styles.fallback} transition-opacity duration-700 ${imageLoaded ? 'opacity-30' : 'opacity-100'}`}></div>

      {/* Imagen de fondo mucho más vibrante */}
      {bgImage && (
        <div className={`absolute inset-0 z-0 overflow-hidden transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <img 
            src={`${bgImage}?auto=format&fit=crop&q=85&w=1000`} 
            alt="" 
            className="w-full h-full object-cover saturate-[2.2] brightness-[0.5] contrast-[1.1] group-hover:scale-110 group-hover:brightness-[0.6] transition-all duration-[4s] ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/40 to-transparent group-hover:via-transparent transition-all duration-1000"></div>
        </div>
      )}
      
      <div className="relative z-10 flex flex-col h-full w-full">
        <div className="w-full flex justify-between items-start mb-3">
          <div className={`w-12 h-12 sm:w-15 sm:h-15 rounded-2xl flex items-center justify-center ${styles.iconBg} ${styles.iconText} border border-white/20 shadow-2xl backdrop-blur-3xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
            {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6 sm:w-8 sm:h-8" })}
          </div>
          {badge && (
            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.25em] shadow-lg border border-white/10 ${styles.badgeBg} group-hover:scale-105 transition-transform`}>
              {badge}
            </span>
          )}
        </div>

        <div className="text-left w-full mt-auto">
          <h3 className="font-black text-2xl sm:text-3xl text-white tracking-tighter leading-none group-hover:text-teal-300 transition-colors mb-2 text-shadow-strong">
            {title}
          </h3>
          <p className="text-[12px] sm:text-[14px] text-slate-50 font-bold leading-snug opacity-95 md:line-clamp-none tracking-tight text-shadow-strong">
            {subtitle}
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-slate-950/95 backdrop-blur-3xl">
          <div className="w-10 h-10 rounded-full border-4 border-white/10 border-t-fuchsia-500 animate-spin shadow-[0_0_20px_rgba(217,70,239,0.4)]"></div>
        </div>
      )}

      {/* Efecto de barrido de luz */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/[0.08] to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
    </button>
  );
};

export default React.memo(TonalButton);
