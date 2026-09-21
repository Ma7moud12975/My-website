import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, MessageSquare, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../hooks/useTheme';

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['hero', 'projects', 'skills', 'testimonials', 'contact'];
      const scrollPos = window.scrollY + 220;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "#hero", id: "hero" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Skills/About", href: "#skills", id: "skills" },
    { label: "Reviews", href: "#testimonials", id: "testimonials" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header className="sticky top-4 z-40 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:pr-14 pointer-events-auto">
      <nav 
        aria-label="Main Navigation"
        className="
          bg-[var(--nav-bg)] backdrop-blur-sm
          border-2 border-[var(--pencil-lead)] border-wobbly-md
          shadow-sketch px-4 md:px-6 py-2.5
          flex items-center justify-between
          transition-all duration-150
        "
      >
        {/* Brand Logo: Sketched monogram enclosed in a wobbly pencil circle */}
        <a 
          href="#hero" 
          className="group flex items-center gap-2.5 text-inherit no-underline focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] rounded-full p-1"
          aria-label="Mahmoud Ayman Portfolio Home"
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Hand-drawn sketchy circle border */}
            <svg 
              className="absolute inset-0 w-full h-full stroke-[var(--pencil-lead)] stroke-[2.5] fill-[var(--paper-yellow)] group-hover:fill-[var(--accent-red)] group-hover:stroke-[var(--accent-red)] transition-colors"
              viewBox="0 0 40 40"
            >
              <path d="M 20 4 C 30 3, 38 10, 37 22 C 36 33, 29 38, 18 37 C 8 36, 3 28, 4 18 C 5 8, 12 4, 20 4 Z" strokeLinecap="round" />
            </svg>
            <span className="relative font-heading font-bold text-lg text-[var(--pencil-text)] group-hover:text-white transition-colors">
              MA
            </span>
          </div>
          <span className="font-heading font-bold text-xl tracking-tight hidden sm:inline-block text-[var(--pencil-text)]">
            Mahmoud<span className="text-[var(--accent-red)]">.</span>sketch
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isCurrent = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`
                  group relative font-body text-xl px-1 py-0.5
                  transition-all duration-100 hover:-rotate-1
                  focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] rounded
                  ${isCurrent ? 'font-bold text-[var(--accent-red)] scale-105' : 'text-[var(--pencil-text)]'}
                `}
              >
                <span>{link.label}</span>
                {/* Scribble wavy underline on hover or active */}
                <span 
                  className={`
                    absolute left-0 bottom-0 w-full h-1 bg-[var(--accent-red)]
                    transition-transform duration-150 origin-left border-wobbly
                    ${isCurrent ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  `}
                />
              </a>
            );
          })}
        </div>

        {/* Right CTA & Theme Switch */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Hand-Drawn Dual Segmented Theme Switch */}
          <div 
            className="
              flex items-center p-0.5 border-2 border-[var(--pencil-lead)] border-wobbly
              bg-[var(--paper-card)] shadow-sketchSubtle font-heading text-xs font-bold select-none
            "
          >
            <button
              type="button"
              onClick={() => { if (isDark) toggleTheme(); }}
              className={`
                px-2.5 py-1 rounded flex items-center gap-1 transition-all
                ${!isDark ? 'bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] border border-[var(--pencil-lead)] shadow-xs font-extrabold' : 'text-[var(--pencil-faint)] hover:text-[var(--pencil-text)]'}
              `}
              aria-pressed={!isDark}
              title="Daylight Mode"
            >
              <Sun size={14} strokeWidth={2.5} className={!isDark ? "text-amber-500" : ""} />
              <span>Day</span>
            </button>
            <button
              type="button"
              onClick={() => { if (!isDark) toggleTheme(); }}
              className={`
                px-2.5 py-1 rounded flex items-center gap-1 transition-all
                ${isDark ? 'bg-[var(--accent-blue)] text-white border border-[var(--pencil-lead)] shadow-xs font-extrabold' : 'text-[var(--pencil-faint)] hover:text-[var(--pencil-text)]'}
              `}
              aria-pressed={isDark}
              title="Blueprint Night Mode"
            >
              <Moon size={14} strokeWidth={2.5} className={isDark ? "text-amber-300" : ""} />
              <span>Night</span>
            </button>
          </div>

          <Button
            variant="yellow"
            size="sm"
            onClick={onContactClick}
            icon={<Sparkles size={16} strokeWidth={2.5} className="text-[var(--accent-red)]" />}
            aria-label="Say Hello to Mahmoud"
          >
            Say Hello!
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="
            md:hidden p-2 border-2 border-[var(--pencil-lead)] border-wobbly
            bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] shadow-sketchSubtle
            active:translate-x-[2px] active:translate-y-[2px]
            focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]
          "
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
        </button>
      </nav>

      {/* Backdrop to close mobile menu on click-outside */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-2xs md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div 
          className="
            relative z-40 md:hidden mt-2 p-4 bg-[var(--paper-card)]
            border-2 border-[var(--pencil-lead)] border-wobbly-md
            shadow-sketchDeep flex flex-col gap-2.5 animate-jiggle
          "
        >
          {navLinks.map((link) => {
            const isCurrent = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  font-heading text-lg font-bold p-2.5 rounded
                  border-b border-dashed border-[var(--pencil-lead)]/30
                  border-wobbly transition-colors flex items-center justify-between
                  ${
                    isCurrent
                      ? 'bg-[var(--paper-yellow)] text-[var(--accent-red)] font-black shadow-xs -rotate-1'
                      : 'text-[var(--pencil-text)] hover:bg-[var(--paper-yellow)]/50'
                  }
                `}
              >
                <span>{link.label}</span>
                {isCurrent && (
                  <span className="text-xs px-2 py-0.5 bg-[var(--accent-red)] text-white font-bold rounded shadow-xs">
                    Current
                  </span>
                )}
              </a>
            );
          })}
          {/* Mobile Theme Toggle */}
          <div className="flex items-center justify-between p-2 my-1 border-2 border-[var(--pencil-lead)] border-wobbly bg-[var(--paper-card)] shadow-sketchSubtle">
            <span className="font-heading font-bold text-sm text-[var(--pencil-text)]">Theme Mode:</span>
            <div className="flex items-center gap-1.5 font-heading text-xs font-bold">
              <button
                type="button"
                onClick={() => { if (isDark) toggleTheme(); }}
                className={`
                  px-2.5 py-1 rounded flex items-center gap-1 border
                  ${!isDark ? 'bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] border-[var(--pencil-lead)] font-extrabold shadow-xs' : 'border-transparent text-[var(--pencil-faint)]'}
                `}
              >
                <Sun size={14} strokeWidth={2.5} className={!isDark ? "text-amber-500" : ""} />
                <span>Day</span>
              </button>
              <button
                type="button"
                onClick={() => { if (!isDark) toggleTheme(); }}
                className={`
                  px-2.5 py-1 rounded flex items-center gap-1 border
                  ${isDark ? 'bg-[var(--accent-blue)] text-white border-[var(--pencil-lead)] font-extrabold shadow-xs' : 'border-transparent text-[var(--pencil-faint)]'}
                `}
              >
                <Moon size={14} strokeWidth={2.5} className={isDark ? "text-amber-300" : ""} />
                <span>Night</span>
              </button>
            </div>
          </div>

          <Button
            variant="yellow"
            size="md"
            className="w-full mt-2"
            onClick={() => {
              setMobileMenuOpen(false);
              onContactClick();
            }}
            icon={<MessageSquare size={18} strokeWidth={2.5} />}
          >
            Say Hello!
          </Button>
        </div>
      )}
    </header>
  );
};
