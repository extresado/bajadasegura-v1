import React from 'react';

const SpanishFlagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    {...props}
  >
    <rect width="512" height="512" fill="#aa151b" />
    <rect y="128" width="512" height="256" fill="#ffc400" />
    <path
      fill="#aa151b"
      d="M0 0h512v128H0zm0 384h512v128H0z"
    />
  </svg>
);

export default SpanishFlagIcon;