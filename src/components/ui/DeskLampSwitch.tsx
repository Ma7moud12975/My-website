import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

export const DeskLampSwitch: React.FC = () => {
  const [isPulling, setIsPulling] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const playClickSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio context might be restricted, silent fallback
    }
  };

  const handlePull = () => {
    setIsPulling(true);
    playClickSound();

    setTimeout(() => {
      toggleTheme();
      setIsPulling(false);
    }, 150);
  };

  return (
    <div className="hidden md:flex fixed top-0 right-6 sm:right-10 md:right-12 z-50 pointer-events-auto select-none flex-col items-center">
      {/* Hand-drawn Lamp Fixture Mount at top border */}
      <div className="w-8 h-3 bg-[var(--pencil-lead)] rounded-b border border-[var(--pencil-lead)] shadow-xs" />

      {/* Pull chain cord */}
      <button
        type="button"
        onClick={handlePull}
        className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
        title={isDark ? "Pull cord for Daylight Paper" : "Pull cord for Blueprint Mode"}
        aria-label="Toggle Desk Lamp Blueprint Mode"
      >
        {/* Chain links */}
        <div 
          className={`
            w-0.5 bg-[var(--pencil-lead)] transition-all duration-150 ease-out flex flex-col items-center
            ${isPulling ? 'h-14' : 'h-10 group-hover:h-12'}
          `}
        >
          {/* Small beaded dots along the chain */}
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)] my-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] my-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--pencil-lead)] my-1" />
        </div>

        {/* Pull Ring / Bell handle */}
        <div 
          className={`
            w-6 h-6 rounded-full border-2 border-[var(--pencil-lead)]
            ${isDark ? 'bg-[var(--accent-blue)] text-white' : 'bg-[var(--paper-yellow)] text-[var(--pencil-text)]'}
            shadow-sketchSubtle flex items-center justify-center
            transition-transform duration-150
            ${isPulling ? 'scale-125 translate-y-1' : 'group-hover:scale-110'}
          `}
        >
          <span className="text-[11px] leading-none">
            {isDark ? '🌙' : '💡'}
          </span>
        </div>

        {/* Playful Floating Tag */}
        <span 
          className="
            absolute -bottom-8 right-0 px-2 py-0.5
            bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] border border-[var(--paper-yellow-border)] border-wobbly
            font-heading text-[11px] font-bold whitespace-nowrap
            opacity-0 group-hover:opacity-100 transition-opacity duration-150
            shadow-xs rotate-2 pointer-events-none
          "
        >
          {isDark ? "Switch to Daylight ☀️" : "Switch to Blueprint 🌙"}
        </span>
      </button>
    </div>
  );
};

