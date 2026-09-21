import React from 'react';
import { ArrowUp, Heart, Globe } from 'lucide-react';
import { SketchedGithub, SketchedLinkedin, SketchedTwitter, SketchedFacebook } from '../ui/SketchDoodles';
import { SOCIAL_LINKS } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { name: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: <SketchedLinkedin size={18} /> },
    { name: "X (Twitter)", href: SOCIAL_LINKS.x, icon: <SketchedTwitter size={18} /> },
    { name: "Facebook", href: SOCIAL_LINKS.facebook, icon: <SketchedFacebook size={18} /> },
    { name: "AtosFit", href: SOCIAL_LINKS.website, icon: <Globe size={18} /> },
  ];

  return (
    <footer className="mt-20 pt-10 pb-16">
      {/* Full-width divider with thick hand-drawn dashed stroke */}
      <div className="border-t-2 border-dashed border-[var(--pencil-lead)] mb-8 sm:mb-10 relative">
        <div className="absolute left-1/2 -top-3.5 -translate-x-1/2 bg-[var(--paper-bg)] px-3 sm:px-4 font-heading text-xs sm:text-sm text-[var(--pencil-soft)] select-none whitespace-nowrap">
          ✂ <span className="hidden sm:inline">- - - - - - - -</span> tear along the dotted line <span className="hidden sm:inline">- - - - - - - -</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        
        {/* Left: Scribbled Copyright & Signature */}
        <div className="text-center md:text-left space-y-1.5 max-w-md">
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-1 sm:gap-2 font-heading font-bold text-lg sm:text-xl text-[var(--pencil-text)]">
            <span>Mahmoud Ayman Waheed</span>
            <span className="hidden sm:inline text-[var(--accent-red)]">·</span>
            <span className="text-sm sm:text-base text-[var(--accent-blue)]">AI Engineer & AtosFit Founder</span>
          </div>
          <p className="font-body text-base sm:text-lg text-[var(--pencil-text)]/75">
            © {new Date().getFullYear()} Delta University AI Graduate. Crafted with deep learning & edge precision.
          </p>
          <p className="font-body text-sm sm:text-base text-[var(--accent-red)] font-semibold">
            "Crafting intelligent vision, edge kinematics, and autonomous robotics with care."
          </p>
        </div>

        {/* Center: Social links featuring responsive 2x2 grid on mobile, flex on desktop */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-2.5 w-full sm:w-auto max-w-xs sm:max-w-none">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5
                bg-[var(--paper-card)] text-[var(--pencil-text)] font-heading font-bold text-sm sm:text-base
                border-2 border-[var(--pencil-lead)] border-wobbly
                shadow-sketchSubtle hover:bg-[var(--paper-yellow)] hover:text-[var(--paper-yellow-text)] hover:border-[var(--paper-yellow-border)] hover:-rotate-2
                active:translate-x-1 active:translate-y-1 active:shadow-none
                transition-all duration-100
                focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]
              "
              aria-label={`Visit Mahmoud's ${s.name} profile`}
            >
              <span className="shrink-0">{s.icon}</span>
              <span className="group-hover:line-through group-hover:decoration-[var(--accent-red)] group-hover:decoration-2">
                {s.name}
              </span>
            </a>
          ))}
        </div>

        {/* Right: Scroll to top wobbly button */}
        <div className="w-full sm:w-auto flex justify-center md:justify-end">
          <button
            type="button"
            onClick={scrollToTop}
            className="
              inline-flex items-center justify-center gap-1.5 px-5 py-2
              bg-[var(--paper-muted)] text-[var(--pencil-text)] font-body text-base sm:text-lg
              border-2 border-[var(--pencil-lead)] border-wobbly
              shadow-sketchSubtle hover:bg-[var(--paper-yellow)] hover:text-[var(--paper-yellow-text)] hover:border-[var(--paper-yellow-border)] hover:rotate-1
              active:translate-x-1 active:translate-y-1 active:shadow-none
              transition-all duration-100
              focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]
            "
            aria-label="Scroll back to top of the sketchbook"
          >
            <span>Back to Top</span>
            <ArrowUp size={16} strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </footer>
  );
};
