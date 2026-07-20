import React from 'react';

interface CrosshairProps {
  position: 'tl' | 'tr' | 'bl' | 'br';
  color?: string;
  className?: string;
}

export const Crosshair: React.FC<CrosshairProps> = ({ position, color = 'white', className = '' }) => {
  const positions = {
    tl: 'top-0 left-0 border-t-6 border-l-6',
    tr: 'top-0 right-0 border-t-6 border-r-6',
    bl: 'bottom-0 left-0 border-b-6 border-l-6',
    br: 'bottom-0 right-0 border-b-6 border-r-6',
  };

  return (
    <div
      className={`absolute w-6 h-6 md:w-10 md:h-10 pointer-events-none z-10 ${positions[position]} ${className}`}
      style={{ borderColor: color }}
    />
  );
};
