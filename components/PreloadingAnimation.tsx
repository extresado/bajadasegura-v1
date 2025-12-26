import React, { useState, useEffect } from 'react';
import { spanishStrings as strings } from '../i18n/strings';

const PreloadingAnimation: React.FC = () => {
  const words = [
    strings.urgentHelpLoadingMessage,
    strings.loading + '...',
    'Apoyo',
    'Seguridad',
    'Información',
    'Acompañamiento',
    'Cuidado',
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const wordDisplayTime = index === 0 ? 3000 : 1500; // Show first message longer
    const fadeTime = 400;

    const timeout = setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFade(true);
      }, fadeTime);
    }, wordDisplayTime);

    return () => clearTimeout(timeout);
  }, [index, words]);

  return (
    <div className="h-12 flex items-center justify-center animate-fade-in">
      <p className={`text-sm text-gray-400 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        {words[index]}
      </p>
    </div>
  );
};

export default PreloadingAnimation;