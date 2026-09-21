import React from 'react';
import { Thumbtack } from './Thumbtack';
import { WashiTape } from './WashiTape';

interface StickyNoteProps {
  children: React.ReactNode;
  tilt?: '-rotate-1' | '-rotate-2' | '-rotate-3' | 'rotate-1' | 'rotate-2' | 'rotate-3' | string;
  pinnedWith?: 'tack' | 'tape' | 'none';
  color?: 'yellow' | 'paper' | 'red-tint' | 'blue-tint';
  className?: string;
  tapeLabel?: string;
  onClick?: () => void;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  children,
  tilt = '-rotate-2',
  pinnedWith = 'tack',
  color = 'yellow',
  className = "",
  tapeLabel,
  onClick,
}) => {
  const colorStyles = {
    yellow: "bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] border-[var(--paper-yellow-border)]",
    paper: "bg-[var(--paper-card)] text-[var(--pencil-text)] border-[var(--pencil-lead)]",
    'red-tint': "bg-[#ffe4e6] text-[#881337] dark:bg-[#3d1a24] dark:text-[#fecdd3] border-[var(--pencil-lead)] dark:border-[#f43f5e]",
    'blue-tint': "bg-[#e0f2fe] text-[#0369a1] dark:bg-[#162a45] dark:text-[#bae6fd] border-[var(--pencil-lead)] dark:border-[#38bdf8]",
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative p-5 border-2 border-wobbly
        shadow-sketch transition-transform duration-150 ease-out
        hover:rotate-0 hover:scale-[1.02]
        ${colorStyles[color]}
        ${tilt}
        ${className}
      `}
    >
      {pinnedWith === 'tack' && <Thumbtack />}
      {pinnedWith === 'tape' && <WashiTape label={tapeLabel} />}
      {children}
    </div>
  );
};
