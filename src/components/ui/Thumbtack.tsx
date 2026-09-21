import React from 'react';

interface ThumbtackProps {
  className?: string;
  color?: 'red' | 'blue' | 'yellow';
}

export const Thumbtack: React.FC<ThumbtackProps> = ({ 
  className = "",
  color = 'red'
}) => {
  const pinColors = {
    red: { body: "#ff4d4d", shadow: "#c92a2a", dot: "#ffffff" },
    blue: { body: "#2d5da1", shadow: "#1c3f73", dot: "#ffffff" },
    yellow: { body: "#eab308", shadow: "#a16207", dot: "#ffffff" }
  };

  const current = pinColors[color];

  return (
    <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none ${className}`}>
      <svg 
        width="28" 
        height="32" 
        viewBox="0 0 28 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[2px_3px_0px_rgba(45,45,45,0.4)]"
      >
        {/* Metal pin shadow underneath */}
        <path d="M14 20 L14 30" stroke="var(--pencil-lead)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Pin base disc */}
        <ellipse cx="14" cy="20" rx="9" ry="3.5" fill={current.shadow} stroke="var(--pencil-lead)" strokeWidth="2" />
        {/* Main circular head with hand-drawn wobble */}
        <circle cx="14" cy="11" r="9" fill={current.body} stroke="var(--pencil-lead)" strokeWidth="2" />
        {/* Highlight sheen */}
        <circle cx="11.5" cy="8.5" r="2.8" fill={current.dot} opacity="0.75" />
      </svg>
    </div>
  );
};
