import React from 'react';

const EnglishFlagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    {...props}
  >
    <rect width="512" height="512" fill="#00247d" />
    <path
      fill="#fff"
      d="M0 204.8h512V307.2H0zM204.8 0h102.4v512H204.8z"
    />
    <path
      fill="#cf142b"
      d="M0 221.76h512v68.48H0zM221.76 0h68.48v512h-68.48z"
    />
  </svg>
);

export default EnglishFlagIcon;