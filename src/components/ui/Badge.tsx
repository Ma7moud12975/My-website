import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'yellow' | 'paper' | 'red' | 'blue' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  shadow?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'yellow',
  size = 'md',
  className = "",
  shadow = false,
}) => {
  const variantStyles = {
    yellow: "bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] border-[var(--paper-yellow-border)]",
    paper: "bg-[var(--paper-bg)] text-[var(--pencil-text)] border-[var(--pencil-lead)]",
    white: "bg-[var(--paper-card)] text-[var(--pencil-text)] border-[var(--pencil-lead)]",
    red: "bg-[var(--accent-red)] text-white border-[var(--pencil-lead)]",
    blue: "bg-[var(--accent-blue)] text-white border-[var(--pencil-lead)]",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-sm",
    md: "px-4 py-1.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const shadowStyle = shadow ? "shadow-sketch" : "";

  return (
    <span
      className={`
        inline-flex items-center justify-center font-heading font-bold
        border-2 border-wobbly-blob
        select-none transition-transform duration-100 ease-out
        hover:scale-105
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${shadowStyle}
        ${className}
      `}
    >
      {children}
    </span>
  );
};
