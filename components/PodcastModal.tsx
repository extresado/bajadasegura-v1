import React from 'react';
import { spanishStrings as strings } from '../i18n/strings';

interface PodcastModalProps {
  onClose: () => void;
}

const PodcastModal: React.FC<PodcastModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div 
        className="w-11/12 max-w-md p-6 md:p-8 bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-cyan-300 mb-2">{strings.podcastModalTitle}</h2>
        <p className="text-slate-300 mb-4">
          {strings.podcastModalText}
        </p>
        
        <iframe 
            data-testid="embed-iframe" 
            style={{ borderRadius: '12px', width: '100%' }} 
            src="https://open.spotify.com/embed/episode/1BuJ2z802g1vo54lpzMgcw?utm_source=generator" 
            height="152" 
            frameBorder="0" 
            allowFullScreen={true} 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
        </iframe>

        <button
          onClick={onClose}
          className="w-full py-3 px-6 mt-6 font-bold text-lg rounded-xl bg-fuchsia-600 text-white hover:bg-fuchsia-500 transition-colors active:scale-95"
          aria-label={strings.close}
        >
          {strings.close}
        </button>
      </div>
    </div>
  );
};

export default PodcastModal;