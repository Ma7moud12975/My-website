import React from 'react';
import { ArrowDownRight, Download, Sparkles, Code2, PenTool, Coffee, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { 
  HandDrawnArrow, 
  RedScribbleUnderline, 
  FloatingSketchStar, 
  SketchCornerBrackets,
  SketchedLinkedin,
  SketchedTwitter,
  SketchedFacebook
} from '../ui/SketchDoodles';
import { SOCIAL_LINKS } from '../../data/portfolioData';

interface HeroProps {
  onViewProjects: () => void;
  onDownloadCV: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewProjects, onDownloadCV }) => {
  return (
    <section id="hero" className="relative pt-6 pb-16 md:py-20 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center">
        
        {/* Left Column: Story, Headline, CTAs (7 columns on large screens) */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 xl:space-y-8">
          
          {/* Sticky-note badge: "👋 Open to work" with Post-it yellow background and -2deg tilt */}
          <div 
            className="
              inline-flex items-center gap-2.5 px-5 py-2
              bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)]
              border-2 border-[var(--paper-yellow-border)] border-wobbly
              shadow-sketchSubtle -rotate-2 hover:rotate-0
              transition-transform duration-100 cursor-default select-none
            "
          >
            <span className="text-2xl" role="img" aria-label="waving hand">👋</span>
            <span className="font-heading font-bold text-base sm:text-lg">
              Open to work & collaborations
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-red)] animate-ping ml-1" />
          </div>

          {/* Headline: "AI Engineer crafting real-time vision & autonomous robotics!" */}
          <div className="relative w-full">
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.18] text-[var(--pencil-text)] max-w-3xl">
              AI Engineer crafting{' '}
              <span className="relative inline-block text-[var(--accent-red)]">
                real-time vision
                <RedScribbleUnderline className="absolute -bottom-2.5 left-0 w-full" />
              </span>{' '}
              & autonomous robotics<span className="inline-block text-[var(--accent-red)] -rotate-12 animate-bounce origin-bottom font-black">!</span>
            </h1>
          </div>

          {/* Subtitle in Patrick Hand font explaining focus on AI, CV, and Robotics */}
          <p className="font-body text-xl sm:text-2xl lg:text-3xl text-[var(--pencil-text)]/90 leading-relaxed max-w-2xl">
            Faculty of AI graduate (Delta University) & creator of AtosFit (Huawei Developer Competition 2nd Prize & WCHL Global Top 30). Engineering sub-30ms deep learning, kinematic pose estimation, and autonomous robotics platforms.
          </p>

          {/* CTA Button Group with Desktop-only Hand-drawn SVG Arrow */}
          <div className="relative pt-3 w-full sm:w-auto">
            
            {/* Desktop-only hand-drawn SVG arrow pointing from subtitle down to primary CTA */}
            <div className="hidden md:block absolute -top-10 right-0 sm:-right-28 z-10 pointer-events-none">
              <HandDrawnArrow text="look here! ✨" />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
              {/* Primary Button: "View Projects" */}
              <Button
                variant="primary"
                size="lg"
                onClick={onViewProjects}
                icon={<ArrowDownRight size={22} strokeWidth={2.5} />}
                iconPosition="right"
                aria-label="View Selected Projects"
                className="text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-3.5 w-full sm:w-auto justify-center"
              >
                View Projects
              </Button>

              {/* Secondary Button: "Download CV" */}
              <Button
                variant="secondary"
                size="lg"
                onClick={onDownloadCV}
                icon={<Download size={20} strokeWidth={2.5} />}
                aria-label="Download Curriculum Vitae"
                className="text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-3.5 w-full sm:w-auto justify-center"
              >
                Download CV
              </Button>
            </div>
          </div>

          {/* Quick Micro-skills Scribble Pill tags */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-lg font-body text-[var(--pencil-text)]/80">
            <span className="font-heading font-bold text-[var(--accent-blue)]">Core Stack:</span>
            <span className="px-3 py-1 bg-[var(--paper-card)] border border-dashed border-[var(--pencil-lead)] border-wobbly text-[var(--pencil-text)]">
              Computer Vision & OpenCV
            </span>
            <span className="px-3 py-1 bg-[var(--paper-card)] border border-dashed border-[var(--pencil-lead)] border-wobbly text-[var(--pencil-text)]">
              YOLOv9 & PyTorch
            </span>
            <span className="px-3 py-1 bg-[var(--paper-card)] border border-dashed border-[var(--pencil-lead)] border-wobbly text-[var(--pencil-text)]">
              ESP32 & Robotics
            </span>
            <span className="px-3 py-1 bg-[var(--paper-card)] border border-dashed border-[var(--pencil-lead)] border-wobbly text-[var(--pencil-text)]">
              Python & C++
            </span>
            <span className="px-3 py-1 bg-[var(--paper-card)] border border-dashed border-[var(--pencil-lead)] border-wobbly text-[var(--pencil-text)]">
              FastAPI & React
            </span>
          </div>

          {/* Direct Social Connect Links */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 text-sm font-heading font-bold">
            <span className="text-[var(--pencil-text)]/70">Connect:</span>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--paper-card)] border border-[var(--pencil-lead)] border-wobbly text-xs hover:bg-[var(--paper-yellow)] hover:-rotate-2 transition-all shadow-sketchSubtle text-inherit no-underline"
              title="Mahmoud Ayman on LinkedIn"
            >
              <SketchedLinkedin size={15} />
              <span>LinkedIn</span>
            </a>
            <a
              href={SOCIAL_LINKS.x}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--paper-card)] border border-[var(--pencil-lead)] border-wobbly text-xs hover:bg-[var(--paper-yellow)] hover:rotate-2 transition-all shadow-sketchSubtle text-inherit no-underline"
              title="Mahmoud Ayman on X (Twitter)"
            >
              <SketchedTwitter size={15} />
              <span>X (Twitter)</span>
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--paper-card)] border border-[var(--pencil-lead)] border-wobbly text-xs hover:bg-[var(--paper-yellow)] hover:-rotate-1 transition-all shadow-sketchSubtle text-inherit no-underline"
              title="Mahmoud Ayman on Facebook"
            >
              <SketchedFacebook size={15} />
              <span>Facebook</span>
            </a>
          </div>

        </div>

        {/* Right Column: Profile card (5 columns on large screens) */}
        <div className="lg:col-span-5 relative flex items-center justify-center p-2 lg:p-4">
          
          {/* Decorative Floating Sketched Star with gentle bounce animation */}
          <div className="absolute -top-4 -right-2 md:top-2 md:right-4 z-20">
            <FloatingSketchStar size={56} color="#ff4d4d" />
          </div>

          {/* Floating secondary decorative pencil/coffee doodle */}
          <div className="absolute -bottom-6 -left-4 z-20 bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] border-2 border-[var(--pencil-lead)] border-wobbly px-3.5 py-1.5 shadow-sketchSubtle rotate-6 hidden sm:flex items-center gap-1.5 font-heading text-sm font-bold">
            <Coffee size={16} strokeWidth={2.5} className="text-[var(--accent-red)]" />
            <span>fueled by mocha</span>
          </div>

          {/* Profile Card Container with L-shaped sketchy corner brackets */}
          <div 
            className="
              relative w-full max-w-[320px] sm:max-w-md xl:max-w-[480px] p-4 sm:p-6
              bg-[var(--paper-card)] border-3 border-[var(--pencil-lead)] border-wobbly-md
              shadow-sketch sm:shadow-sketchDeep -rotate-1 hover:rotate-0
              transition-all duration-200
            "
          >
            {/* L-shaped sketchy corner brackets */}
            <SketchCornerBrackets size={36} />

            {/* Inner Sketched Canvas / Portrait Frame */}
            <div className="relative border-2 border-dashed border-[var(--pencil-lead)]/35 border-wobbly p-3 sm:p-5 overflow-hidden bg-[var(--paper-bg)]/40">
              
              {/* Simulated Paper Texture / Notebook Graph Grid */}
              <div className="absolute inset-0 graph-paper opacity-60 pointer-events-none" />

              {/* Real Profile Photo with Hand-Drawn accents */}
              <div className="relative flex flex-col items-center text-center space-y-4 py-2">
                
                {/* Profile Image - Transparent Cutout with Hand-Drawn Sketch Accents */}
                <div className="relative w-full max-w-[220px] sm:max-w-[360px] xl:max-w-[400px] mx-auto select-none group">
                  <img
                    src="/profile-transparent.png"
                    alt="Mahmoud Ayman Waheed - AI Engineer"
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[6px_8px_0px_rgba(0,0,0,0.35)]"
                    loading="eager"
                  />
                </div>

                {/* Name & Tagline inside Card */}
                <div className="pt-1">
                  <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[var(--pencil-text)]">
                    Mahmoud Ayman Waheed
                  </h2>
                  <p className="font-body text-xl sm:text-2xl text-[var(--accent-blue)] font-semibold flex items-center justify-center gap-1.5 mt-0.5">
                    <span>AI Engineer · Delta University</span>
                    <span className="text-[var(--accent-red)]">✦</span>
                  </p>
                </div>

                {/* Handwritten Sticky Caption */}
                <div className="w-full pt-2 border-t-2 border-dashed border-[var(--pencil-lead)]/30 flex items-center justify-center gap-2 text-lg font-body text-[var(--pencil-text)]/85">
                  <Sparkles size={18} strokeWidth={2.5} className="text-[var(--accent-blue)]" />
                  <span>"Transforming pixels & kinematics into autonomous intelligence 🤖"</span>
                </div>

                {/* Social Quick Links inside Profile Card */}
                <div className="w-full pt-2 border-t border-dashed border-[var(--pencil-lead)]/20 flex items-center justify-center gap-2.5">
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-[var(--paper-bg)] border border-[var(--pencil-lead)] border-wobbly text-[var(--pencil-text)] hover:text-[#0077b5] hover:bg-[var(--paper-yellow)] hover:-rotate-6 transition-all shadow-sketchSubtle"
                    title="Mahmoud Ayman on LinkedIn"
                    aria-label="LinkedIn profile"
                  >
                    <SketchedLinkedin size={18} />
                  </a>
                  <a
                    href={SOCIAL_LINKS.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-[var(--paper-bg)] border border-[var(--pencil-lead)] border-wobbly text-[var(--pencil-text)] hover:text-black hover:bg-[var(--paper-yellow)] hover:rotate-6 transition-all shadow-sketchSubtle"
                    title="Mahmoud Ayman on X (Twitter)"
                    aria-label="X (Twitter) profile"
                  >
                    <SketchedTwitter size={18} />
                  </a>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-[var(--paper-bg)] border border-[var(--pencil-lead)] border-wobbly text-[var(--pencil-text)] hover:text-[#1877f2] hover:bg-[var(--paper-yellow)] hover:-rotate-3 transition-all shadow-sketchSubtle"
                    title="Mahmoud Ayman on Facebook"
                    aria-label="Facebook profile"
                  >
                    <SketchedFacebook size={18} />
                  </a>
                  <a
                    href={SOCIAL_LINKS.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 bg-[var(--paper-yellow)] border border-[var(--paper-yellow-border)] border-wobbly text-[var(--paper-yellow-text)] font-heading font-bold text-xs hover:bg-[var(--accent-red)] hover:text-white hover:rotate-3 transition-all shadow-sketchSubtle flex items-center gap-1 text-inherit no-underline"
                    title="AtosFit Website"
                  >
                    <Globe size={14} />
                    <span>atosfit.com</span>
                  </a>
                </div>

              </div>

            </div>

            {/* Simulated Tape strip at the bottom right */}
            <div 
              className="
                absolute -bottom-3 right-8 px-4 py-1
                bg-[var(--paper-muted)] text-[var(--pencil-text)] border border-[var(--pencil-lead)]/30
                font-heading text-xs uppercase tracking-widest
                rotate-3 shadow-sm select-none
              "
              style={{
                clipPath: 'polygon(0% 10%, 5% 0%, 95% 0%, 100% 10%, 97% 90%, 92% 100%, 8% 100%, 3% 90%)'
              }}
            >
              Fig. 1.0 — AI Engineer at Work
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
