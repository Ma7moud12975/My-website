import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export const DeskMug: React.FC = () => {
  const [cups, setCups] = useState(3);
  const [isSipping, setIsSipping] = useState(false);
  const [speech, setSpeech] = useState<string | null>(null);

  const quotes = [
    "Fueling next commit! ☕",
    "Mocha level: 100% ✨",
    "Code is just converted espresso 💡",
    "Pencils sharpened, coffee hot! ✏️",
    "Bug fixed with caffeine magic 🪄",
  ];

  const handleSip = () => {
    if (isSipping) return;
    setIsSipping(true);
    setCups((c) => c + 1);
    
    // Pick random witty quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setSpeech(randomQuote);

    // Micro confetti burst
    confetti({
      particleCount: 20,
      spread: 45,
      origin: { x: 0.08, y: 0.9 },
      colors: ['#ff4d4d', '#fff9c4', '#2d5da1'],
    });

    setTimeout(() => {
      setIsSipping(false);
    }, 400);

    setTimeout(() => {
      setSpeech(null);
    }, 3000);
  };

  return (
    <aside 
      aria-label="Interactive Desk Coffee Mug"
      className="hidden md:flex flex-col items-start fixed bottom-6 left-6 sm:left-8 z-30 select-none group"
    >
      {/* Speech bubble pop-up note */}
      {speech ? (
        <div 
          className="
            mb-2 px-3 py-1.5 bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)]
            border-2 border-[var(--paper-yellow-border)] border-wobbly
            shadow-sketchSubtle font-heading text-xs font-bold
            animate-jiggle -rotate-2
          "
        >
          {speech}
        </div>
      ) : (
        <div 
          className="
            mb-1 px-2.5 py-1 bg-[var(--paper-card)] text-[var(--pencil-text)]
            border border-dashed border-[var(--pencil-lead)] border-wobbly
            font-heading text-[11px] font-bold text-[var(--accent-blue)]
            opacity-0 group-hover:opacity-100 transition-opacity duration-150
            -rotate-1
          "
        >
          Click for fresh brew! ☕
        </div>
      )}

      {/* Hand-drawn Coffee Mug Button */}
      <button
        type="button"
        onClick={handleSip}
        className={`
          relative p-2 bg-[var(--paper-card)] border-2 border-[var(--pencil-lead)] border-wobbly
          shadow-sketch hover:bg-[var(--paper-yellow)]
          transition-all duration-100 ease-out
          active:translate-x-1 active:translate-y-1 active:shadow-none
          cursor-pointer
          ${isSipping ? 'scale-90 rotate-3' : 'hover:-rotate-2'}
        `}
        title="Mahmoud's Studio Coffee Mug"
        aria-label="Click to drink coffee"
      >
        {/* Steam curls SVG animation */}
        <div className="absolute -top-3.5 left-3 flex gap-1 pointer-events-none">
          <span className="inline-block text-[var(--pencil-text)]/60 text-xs font-bold animate-bounce duration-1000">~</span>
          <span className="inline-block text-[var(--accent-red)]/70 text-xs font-bold animate-bounce duration-1000 delay-150">~</span>
          <span className="inline-block text-[var(--accent-blue)]/70 text-xs font-bold animate-bounce duration-1000 delay-300">~</span>
        </div>

        {/* Mug Icon & SVG */}
        <div className="flex items-center gap-2 px-1">
          <svg width="28" height="26" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Mug Body */}
            <rect x="2" y="5" width="20" height="21" rx="4" fill="var(--paper-yellow)" stroke="var(--pencil-lead)" strokeWidth="2.5" />
            {/* Handle */}
            <path d="M22 9 C 28 9, 28 19, 22 20" stroke="var(--pencil-lead)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Coffee liquid surface line */}
            <line x1="4" y1="9" x2="20" y2="9" stroke="var(--accent-red)" strokeWidth="2" strokeDasharray="3 2" />
            {/* Cute face on mug */}
            <circle cx="8" cy="15" r="1.5" fill="var(--pencil-lead)" />
            <circle cx="16" cy="15" r="1.5" fill="var(--pencil-lead)" />
            <path d="M10 18 Q12 21 14 18" stroke="var(--pencil-lead)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          
          <div className="flex flex-col text-left">
            <span className="font-heading font-bold text-xs text-[var(--pencil-text)] leading-none">
              Studio Mug
            </span>
            <span className="font-body text-xs text-[var(--accent-red)] font-bold">
              {cups} cups in
            </span>
          </div>
        </div>
      </button>
    </aside>
  );
};
