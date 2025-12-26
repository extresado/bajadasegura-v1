import React from 'react';
import { spanishStrings as strings } from '../i18n/strings';

interface AddictionBarProps {
  level: number; // A number from 1 to 10
}

const AddictionBar: React.FC<AddictionBarProps> = ({ level }) => {
  const levelNormalized = Math.max(1, Math.min(10, level || 1));
  const widthPercentage = levelNormalized * 10;

  let barColorClass = 'bg-green-500';
  let levelText = strings.addictionLevelLow;

  if (levelNormalized >= 4 && levelNormalized <= 6) {
    barColorClass = 'bg-yellow-500';
    levelText = strings.addictionLevelModerate;
  } else if (levelNormalized >= 7 && levelNormalized <= 8) {
    barColorClass = 'bg-orange-500';
    levelText = strings.addictionLevelHigh;
  } else if (levelNormalized >= 9) {
    barColorClass = 'bg-red-600';
    levelText = strings.addictionLevelVeryHigh;
  }

  return (
    <div className="my-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-300">{strings.substanceAddictionPotentialTitle}</span>
        <span className={`text-sm font-bold text-white`}>{levelText}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className={`${barColorClass} h-2.5 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${widthPercentage}%` }}
          role="progressbar"
          aria-valuenow={levelNormalized}
          aria-valuemin={1}
          aria-valuemax={10}
          aria-label={`${strings.substanceAddictionPotentialTitle}: ${levelText}`}
        ></div>
      </div>
    </div>
  );
};

export default AddictionBar;