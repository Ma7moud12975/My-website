import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'paper' | 'yellow' | 'outline' | 'red';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  tiltOnHover?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  tiltOnHover = true,
  className = "",
  disabled,
  ...props
}) => {
  // Base sizing
  const sizeStyles = {
    sm: "px-4 py-1.5 text-base gap-1.5",
    md: "px-6 py-2.5 text-lg gap-2",
    lg: "px-8 py-3.5 text-xl gap-2.5",
  };

  // Color variants strictly following the design system tokens
  const variantStyles = {
    // Hero Primary: White/Dark Card bg, wobbly border, 4px shadow; hover fills red marker, text white
    primary: "bg-[var(--paper-card)] text-[var(--pencil-text)] border-2 border-[var(--pencil-lead)] shadow-sketch hover:bg-[var(--accent-red)] hover:text-white hover:border-[var(--pencil-lead)] hover:translate-x-[2px] hover:translate-y-[2px]",
    
    // Hero Secondary: Muted bg, hovers to blue pen with white text
    secondary: "bg-[var(--paper-muted)] text-[var(--pencil-text)] border-2 border-[var(--pencil-lead)] shadow-sketch hover:bg-[var(--accent-blue)] hover:text-white hover:border-[var(--pencil-lead)]",
    
    // Paper / Standard Neutral
    paper: "bg-[var(--paper-bg)] text-[var(--pencil-text)] border-2 border-[var(--pencil-lead)] shadow-sketch hover:bg-[var(--paper-yellow)] hover:text-[var(--paper-yellow-text)]",
    
    // Post-it Yellow Button
    yellow: "bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] border-2 border-[var(--pencil-lead)] shadow-sketch hover:bg-[var(--paper-card)] hover:text-[var(--pencil-text)]",

    // Red Accent Button
    red: "bg-[var(--accent-red)] text-white border-2 border-[var(--pencil-lead)] shadow-sketch hover:opacity-90",

    // Outline / Tag Button
    outline: "bg-transparent text-[var(--pencil-text)] border-2 border-[var(--pencil-lead)] hover:bg-[var(--paper-muted)] shadow-sketchSubtle",
  };

  const tiltClass = tiltOnHover ? "hover:-rotate-1 hover:scale-[1.01]" : "";

  return (
    <button
      className={`
        inline-flex items-center justify-center font-body font-normal select-none
        border-wobbly
        transition-all duration-100 ease-out
        active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5da1] focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-x-0 disabled:active:translate-y-0
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${tiltClass}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
