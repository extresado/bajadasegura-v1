
import React from 'react';

const imageUrl = 'https://raw.githubusercontent.com/extresado/App_apoyo_chemsex/refs/heads/main/1763235773220.jpg';

interface ChatAvatarIconProps {
  className?: string;
  isThinking?: boolean;
}

const ChatAvatarIcon: React.FC<ChatAvatarIconProps> = ({ className = 'w-8 h-8', isThinking = false }) => (
  <div className="relative group">
    {/* Glow effect that pulses */}
    <div className={`absolute -inset-1 bg-gradient-to-r from-teal-500 to-fuchsia-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 ${isThinking ? 'animate-pulse scale-110' : ''}`}></div>
    <img
      src={imageUrl}
      alt="Asistente de IA"
      className={`${className} object-cover rounded-full relative z-10 border-2 border-white/20 shadow-2xl transition-transform duration-500 hover:scale-105 ${isThinking ? 'animate-bounce' : ''}`}
    />
  </div>
);

export default ChatAvatarIcon;
