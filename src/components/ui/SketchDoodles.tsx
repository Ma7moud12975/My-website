import React from 'react';

// Hand-drawn curved arrow pointing from subtitle to primary CTA button
export const HandDrawnArrow: React.FC<{ className?: string; text?: string }> = ({ 
  className = "", 
  text = "my best stuff!" 
}) => {
  return (
    <div className={`flex flex-col items-center pointer-events-none select-none ${className}`}>
      {text && (
        <span className="font-heading text-sm text-[var(--accent-blue)] -rotate-6 font-bold tracking-wide mb-1">
          {text}
        </span>
      )}
      <svg 
        width="110" 
        height="75" 
        viewBox="0 0 110 75" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-[var(--accent-blue)] stroke-[2.5]"
      >
        {/* Playful curved path */}
        <path 
          d="M15 10 C 35 15, 75 20, 80 48 C 82 58, 76 62, 72 65" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          strokeDasharray="200"
          strokeDashoffset="0"
        />
        {/* Arrow head */}
        <path 
          d="M60 55 C 65 62, 70 66, 73 67 C 77 62, 85 54, 90 50" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    </div>
  );
};

// Hand-drawn red marker scribble underline
export const RedScribbleUnderline: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 240 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-4 ${className}`}
      preserveAspectRatio="none"
    >
      <path 
        d="M3 14 C 45 6, 95 18, 140 10 C 175 4, 210 16, 237 9" 
        stroke="#ff4d4d" 
        strokeWidth="4.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M12 17 C 60 11, 120 18, 180 12 C 205 9, 225 15, 235 13" 
        stroke="#ff4d4d" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        opacity="0.8"
      />
    </svg>
  );
};

// Blue ballpoint marker scribble underline
export const BlueScribbleUnderline: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 160 14" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-3 ${className}`}
      preserveAspectRatio="none"
    >
      <path 
        d="M2 10 C 35 4, 85 12, 120 7 C 140 4, 150 9, 158 8" 
        stroke="#2d5da1" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
      />
    </svg>
  );
};

// Decorative Floating Sketched Star / Sparkle
export const FloatingSketchStar: React.FC<{ className?: string; size?: number; color?: string }> = ({ 
  className = "", 
  size = 48,
  color = "#ff4d4d"
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 50 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-gentle-bounce ${className}`}
    >
      {/* Hand-drawn 4-point star burst */}
      <path 
        d="M25 4 C26 14, 28 20, 46 25 C33 27, 28 32, 25 46 C23 33, 17 27, 4 25 C18 22, 23 16, 25 4Z" 
        fill={color} 
        stroke="var(--pencil-lead)" 
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Hand-drawn inner swirl / highlight */}
      <circle cx="25" cy="25" r="3" fill="var(--paper-yellow)" stroke="var(--pencil-lead)" strokeWidth="1.5" />
    </svg>
  );
};

// Sketched Corner Frame Marks (L-shaped sketchy brackets)
export const SketchCornerBrackets: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = "var(--pencil-lead)" 
}) => {
  return (
    <>
      {/* Top Left */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 30 30" 
        fill="none" 
        className="absolute -top-3 -left-3 pointer-events-none"
      >
        <path d="M28 6 H8 C6 6, 6 6, 6 8 V28" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M22 10 H10 V22" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
      {/* Top Right */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 30 30" 
        fill="none" 
        className="absolute -top-3 -right-3 pointer-events-none"
      >
        <path d="M2 6 H22 C24 6, 24 6, 24 8 V28" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M8 10 H20 V22" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
      {/* Bottom Left */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 30 30" 
        fill="none" 
        className="absolute -bottom-3 -left-3 pointer-events-none"
      >
        <path d="M28 24 H8 C6 24, 6 24, 6 22 V2" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M22 20 H10 V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
      {/* Bottom Right */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 30 30" 
        fill="none" 
        className="absolute -bottom-3 -right-3 pointer-events-none"
      >
        <path d="M2 24 H22 C24 24, 24 24, 24 22 V2" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M8 20 H20 V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    </>
  );
};

// Hand-drawn Checkmark
export const SketchedCheckmark: React.FC<{ checked?: boolean; className?: string }> = ({ 
  checked = true, 
  className = "" 
}) => {
  return (
    <svg 
      width="22" 
      height="22" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <rect 
        x="2.5" 
        y="2.5" 
        width="19" 
        height="19" 
        rx="3" 
        fill={checked ? "var(--paper-yellow)" : "var(--paper-card)"} 
        stroke="var(--pencil-lead)" 
        strokeWidth="2.5" 
        style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
      />
      {checked && (
        <path 
          d="M5 12 L10 17 L19 6" 
          stroke="var(--accent-blue)" 
          strokeWidth="3.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      )}
    </svg>
  );
};

// Hand-drawn speech bubble tail
export const SpeechBubbleTail: React.FC<{ className?: string; fill?: string }> = ({ 
  className = "",
  fill = "var(--paper-card)"
}) => {
  return (
    <svg 
      width="34" 
      height="24" 
      viewBox="0 0 34 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute ${className}`}
    >
      <path 
        d="M2 0 C 8 8, 14 18, 32 22 C 22 18, 18 10, 20 0 Z" 
        fill={fill} 
        stroke="var(--pencil-lead)" 
        strokeWidth="2.5" 
        strokeLinejoin="round"
      />
      {/* Mask out top border to merge seamlessly with speech container */}
      <line x1="2" y1="0.5" x2="20" y2="0.5" stroke={fill} strokeWidth="4" />
    </svg>
  );
};

// Hand-drawn Paper Airplane icon
export const HandDrawnPaperPlane: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg 
      width="22" 
      height="22" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M2 12 L22 2 L13 22 L10 14 L2 12 Z" 
        fill="var(--accent-red)" 
        stroke="var(--pencil-lead)" 
        strokeWidth="2.5" 
        strokeLinejoin="round" 
      />
      <path 
        d="M22 2 L10 14" 
        stroke="var(--pencil-lead)" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
    </svg>
  );
};

// Hand-drawn Sketched GitHub Icon
export const SketchedGithub: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Hand-drawn Sketched LinkedIn Icon
export const SketchedLinkedin: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
    <path d="M6 10.5V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M11 17V10.5M11 13.5C11 11.5 12.5 10.5 14.5 10.5C16.5 10.5 18 11.8 18 14V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Hand-drawn Sketched Twitter / X Icon
export const SketchedTwitter: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 4L19.5 20M4 20L19.5 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Hand-drawn Sketched Facebook Icon
export const SketchedFacebook: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
    <path
      d="M16 11h-3V8.5c0-.8.4-1.5 1.5-1.5h1.5V4h-2.5C11 4 10 5.2 10 7.5V11H8v3h2v7h3v-7h2.5l.5-3z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

