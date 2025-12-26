import React from 'react';
import PhoneIcon from './icons/PhoneIcon';
import { spanishStrings as strings } from '../i18n/strings';

const EmergencyCallButton: React.FC = () => {
  return (
    <a
      href="tel:112"
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-10 h-10 border-2 border-red-500 text-red-400 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-red-500/10 active:bg-red-500/20 animate-pulse-emergency"
      aria-label={strings.emergencyCallAriaLabel}
    >
      <PhoneIcon className="w-5 h-5" />
    </a>
  );
};

export default EmergencyCallButton;