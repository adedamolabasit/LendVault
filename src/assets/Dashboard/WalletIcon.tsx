import React from "react";

export const WalletIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="64"
      height="64"
      fill="none"
    >
      <rect
        x="8"
        y="16"
        width="48"
        height="32"
        rx="6"
        stroke="#4B5563" 
        strokeWidth="2"
        fill="#E5E7EB" 
      />

      <path
        d="M8 22C8 20.3431 9.34315 19 11 19H53C54.6569 19 56 20.3431 56 22V24H8V22Z"
        fill="#D1D5DB"
      />

      <circle cx="48" cy="32" r="4" fill="#374151" />

      <rect
        x="16"
        y="26"
        width="24"
        height="12"
        rx="2"
        fill="#9CA3AF" 
      />
    </svg>
  );
};

