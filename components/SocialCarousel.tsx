

import React from 'react';
import SpotifyIcon from './icons/SpotifyIcon';
import InstagramIcon from './icons/InstagramIcon';
import TelegramIcon from './icons/TelegramIcon';
import TikTokIcon from './icons/TikTokIcon';

const socialLinks = [
  { 
    name: 'Spotify', 
    icon: SpotifyIcon,
    url: 'https://open.spotify.com/show/6GD9frcAEz35HOxROP1CF8?si=X9r3aoJERe6_Et8sHPT7Mg',
    color: 'cyan'
  },
  { 
    name: 'Instagram', 
    icon: InstagramIcon,
    url: 'https://www.instagram.com/bajadasegura',
    color: 'magenta'
  },
  {
    name: 'TikTok',
    icon: TikTokIcon,
    url: 'https://www.tiktok.com/@bajadasegura',
    color: 'cyan'
  },
  { 
    name: 'Telegram', 
    icon: TelegramIcon,
    url: 'https://t.me/bajadasegura',
    color: 'purple'
  },
];

const colorStyles = {
    cyan: 'border-cyan-500/50 hover:border-cyan-400 text-cyan-400',
    magenta: 'border-fuchsia-500/50 hover:border-fuchsia-400 text-fuchsia-400',
    purple: 'border-purple-500/50 hover:border-purple-400 text-purple-400',
};

const SocialCarousel: React.FC = () => {
  const duplicatedLinks = [...socialLinks, ...socialLinks, ...socialLinks];
  
  return (
    <div className="relative w-full overflow-hidden group h-16 flex items-center">
      <div 
        className="flex animate-scroll group-hover:[animation-play-state:paused]"
        style={{ width: `calc(11rem * ${duplicatedLinks.length})`}}
      >
        {duplicatedLinks.map((link, index) => (
          <a
            key={`${link.name}-${index}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-shrink-0 w-40 mx-2 flex items-center justify-center p-3 bg-gray-900/80 border-2 rounded-full shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:rotate-[-3deg] ${colorStyles[link.color as keyof typeof colorStyles]}`}
          >
            <link.icon className="w-6 h-6 mr-2.5" />
            <span className="text-base font-semibold text-white">{link.name}</span>
          </a>
        ))}
      </div>
      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default SocialCarousel;