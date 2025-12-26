
import React from 'react';

const RocketIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.11.66-.07 1.36-.38 2.03-.87.67-.5 1.25-1.17 1.75-1.94.42-.64.72-1.37.9-2.17.18-.8.2-1.66.06-2.5l-1.35-4.11L2 2z" />
    <path d="m15 5 3.33 3.33" />
    <path d="M9 14a6.5 6.5 0 0 0 6.5-6.5" />
    <path d="M18 10c.5 1.5.5 3.5 0 5" />
    <path d="M12.5 11.5 11 13" />
    <path d="M22 2c-2.5 1.2-4.5 3.5-5 6" />
  </svg>
);

export default RocketIcon;
