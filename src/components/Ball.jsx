import React from 'react';
import { getBallStyle } from '../utils/lottoData';

export const Ball = ({ number, size = 'md', delay = 0, isRolling = false }) => {
  const style = getBallStyle(number);

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs font-bold',
    md: 'w-10 h-10 text-base font-extrabold',
    lg: 'w-12 h-12 text-lg font-black',
    xl: 'w-14 h-14 text-xl font-black',
  }[size] || 'w-10 h-10 text-base font-extrabold';

  return (
    <div
      style={{
        animationDelay: `${delay}ms`,
      }}
      className={`relative inline-flex items-center justify-center rounded-full shrink-0 select-none transition-all duration-300 ${sizeClasses} ${style.bg} ${style.border} ${style.glow} border shadow-lg ${
        isRolling ? 'animate-bounce' : 'transform hover:scale-110'
      }`}
    >
      {/* 3D Glass Light reflection at top-left */}
      <span className="absolute top-1 left-1.5 w-1/3 h-1/3 rounded-full bg-white/40 blur-[1px] pointer-events-none" />
      {/* Subtle inner bottom shadow */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Number */}
      <span className={`relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${style.text}`}>
        {number}
      </span>
    </div>
  );
};
