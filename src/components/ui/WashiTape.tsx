import React from 'react';

interface WashiTapeProps {
  className?: string;
  width?: string;
  tilt?: string;
  label?: string;
  color?: 'gray' | 'red' | 'blue' | 'yellow';
}

export const WashiTape: React.FC<WashiTapeProps> = ({
  className = "",
  width = "w-28",
  tilt = "rotate-2",
  label,
  color = "gray"
}) => {
  const colorStyles = {
    gray: "bg-[var(--washi-bg)] text-[var(--pencil-text)] border-t border-b border-[var(--pencil-lead)]/20",
    red: "bg-[var(--accent-red)]/25 text-[var(--pencil-text)] border-t border-b border-[var(--accent-red)]/40",
    blue: "bg-[var(--accent-blue)]/20 text-[var(--pencil-text)] border-t border-b border-[var(--accent-blue)]/40",
    yellow: "bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] border-t border-b border-[var(--paper-yellow-border)]/60",
  };

  return (
    <div 
      className={`absolute -top-3.5 left-1/2 -translate-x-1/2 h-7 ${width} ${tilt} ${colorStyles[color]} z-20 flex items-center justify-center shadow-sm select-none pointer-events-none transition-transform duration-200 ${className}`}
      style={{
        clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 95% 100%, 5% 100%, 2% 85%)',
        backdropFilter: 'blur(2px)',
      }}
    >
      {label && (
        <span className="font-heading text-xs uppercase tracking-widest font-bold opacity-80">
          {label}
        </span>
      )}
    </div>
  );
};
