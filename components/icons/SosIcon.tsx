
import React from 'react';

const SosIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="36" height="36" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="100" height="100" rx="15" fill="#DC2626" />
    <text
      x="50"
      y="55"
      fontFamily="Arial, sans-serif"
      fontSize="50"
      fontWeight="bold"
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      SOS
    </text>
  </svg>
);

export default SosIcon;