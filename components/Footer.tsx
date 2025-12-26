
import React from 'react';
import { spanishStrings as strings } from '../i18n/strings';
import SpotifyIcon from './icons/SpotifyIcon';
import InstagramIcon from './icons/InstagramIcon';
import TelegramIcon from './icons/TelegramIcon';
import TikTokIcon from './icons/TikTokIcon';
import ShareIcon from './icons/ShareIcon';

interface FooterProps {
  onNavigate?: (view: any) => void;
}

const socialLinks = [
  { name: 'Spotify', icon: SpotifyIcon, url: 'https://open.spotify.com/show/6GD9frcAEz35HOxROP1CF8?si=X9r3aoJERe6_Et8sHPT7Mg' },
  { name: 'Instagram', icon: InstagramIcon, url: 'https://www.instagram.com/bajadasegura' },
  { name: 'TikTok', icon: TikTokIcon, url: 'https://www.tiktok.com/@bajadasegura' },
  { name: 'Telegram', icon: TelegramIcon, url: 'https://t.me/bajadasegura' },
];

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleShare = async () => {
    const shareUrl = 'https://bajadasegura.info/';
    
    const shareData = {
      title: 'Bajada Segura | Tu Espacio Seguro',
      text: '🌈 Mira este proyecto de apoyo y reducción de riesgos en chemsex para la comunidad LGTBIQ+. Sin juicios, anónimo y 24/7. ¡Pásalo! ✨',
      url: shareUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        const shareText = `${shareData.text}\n\n${shareData.url}`;
        await navigator.clipboard.writeText(shareText);
        alert('✨ Enlace copiado al portapapeles. La vista previa con el logo aparecerá automáticamente al pegarlo en redes sociales.');
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Error sharing:', err);
      }
    }
  };

  const handleLegalClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('legal');
    }
  };

  return (
    <footer className="w-full bg-slate-950/90 mt-auto py-12 px-6 border-t border-white/5 backdrop-blur-3xl">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
        
        {/* Social Icons */}
        <div className="flex justify-center items-center gap-6 sm:gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl text-slate-400 hover:text-teal-400 hover:bg-white/10 transition-all duration-300 hover:scale-110 active:scale-90 border border-white/5"
            >
              <link.icon className="w-6 h-6" />
            </a>
          ))}
          
          <div className="w-px h-10 bg-white/10 mx-2 hidden sm:block"></div>

          <button
            onClick={handleShare}
            aria-label="Compartir este proyecto"
            className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl text-slate-400 hover:text-fuchsia-400 hover:bg-white/10 transition-all duration-300 hover:scale-110 active:scale-90 border border-white/5"
          >
            <ShareIcon className="w-6 h-6" />
          </button>
        </div>
        
        {/* Bottom Section: Copyright & Legal */}
        <div className="pt-10 border-t border-white/5 w-full flex flex-col items-center text-center space-y-5">
            <div className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">
                    {strings.footerCopyrightLine1}
                </span>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest opacity-80">
                    {strings.footerCopyrightLine2}
                </span>
            </div>

            <button 
                onClick={handleLegalClick}
                className="text-[11px] font-black text-slate-500 hover:text-teal-400 transition-all duration-300 uppercase tracking-[0.3em] bg-white/5 px-8 py-3 rounded-full border border-white/5 hover:border-teal-500/30 hover:shadow-[0_0_15px_rgba(45,212,191,0.1)] active:scale-95"
            >
                {strings.footerLegalNotice}
            </button>
        </div>
        
        {/* Disclaimer */}
        <p className="max-w-3xl text-[10px] leading-relaxed text-slate-600 text-center italic opacity-70 px-4 pb-2">
            {strings.footerDisclaimer}
        </p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
