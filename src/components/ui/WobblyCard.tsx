import React from 'react';
import { WashiTape } from './WashiTape';
import { Thumbtack } from './Thumbtack';

export interface WobblyCardProps {
  children: React.ReactNode;
  bg?: 'white' | 'yellow' | 'paper' | 'muted';
  decoration?: 'tape' | 'tack' | 'none';
  tilt?: 'left' | 'right' | 'none';
  shadow?: 'normal' | 'deep' | 'subtle' | 'none';
  className?: string;
  onClick?: () => void;
  tabIndex?: number;
  role?: string;
  'aria-label'?: string;
}

export const WobblyCard: React.FC<WobblyCardProps> = ({
  children,
  bg = 'white',
  decoration = 'none',
  tilt = 'none',
  shadow = 'normal',
  className = "",
  onClick,
  ...props
}) => {
  const bgStyles = {
    white: "bg-[var(--paper-card)] text-[var(--pencil-text)]",
    yellow: "bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)]",
    paper: "bg-[var(--paper-bg)] text-[var(--pencil-text)]",
    muted: "bg-[var(--paper-muted)] text-[var(--pencil-text)]",
  };

  const tiltStyles = {
    left: "-rotate-1 hover:rotate-0",
    right: "rotate-1 hover:rotate-0",
    none: "",
  };

  const shadowStyles = {
    normal: "shadow-sketch",
    deep: "shadow-sketch-deep",
    subtle: "shadow-sketch-subtle",
    none: "",
  };

  return (
    <div
      className={`
        relative border-2 border-[var(--pencil-lead)] border-wobbly-md
        transition-all duration-150 ease-out
        ${bgStyles[bg]}
        ${tiltStyles[tilt]}
        ${shadowStyles[shadow]}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {decoration === 'tape' && <WashiTape />}
      {decoration === 'tack' && <Thumbtack />}
      {children}
    </div>
  );
};
