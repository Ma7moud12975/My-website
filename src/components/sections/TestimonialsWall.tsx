import React from 'react';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../data/portfolioData';
import { Thumbtack } from '../ui/Thumbtack';
import { WashiTape } from '../ui/WashiTape';

export const TestimonialsWall: React.FC = () => {
  return (
    <section id="testimonials" className="py-14 md:py-20" aria-label="Client & Colleague Testimonials">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--paper-yellow)] border border-[var(--paper-yellow-border)] border-wobbly font-heading font-bold text-sm text-[var(--paper-yellow-text)] -rotate-1 mb-3">
          <Star size={16} strokeWidth={2.5} className="text-[var(--accent-red)]" fill="currentColor" />
          <span>The Sticky Wall</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--pencil-text)]">
          Evaluations & Feedback
        </h2>
        <p className="font-body text-xl sm:text-2xl text-[var(--pencil-text)]/80 mt-2">
          Feedback from competition juries, academic advisors, and engineering collaborators.
        </p>
      </div>

      {/* Pinned Notes Wall Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {TESTIMONIALS_DATA.map((t) => {
          const bgColors = {
            yellow: "bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] border-[var(--paper-yellow-border)]",
            white: "bg-[var(--paper-card)] text-[var(--pencil-text)] border-[var(--pencil-lead)]",
          };

          return (
            <div
              key={t.id}
              className={`
                relative p-6 sm:p-7
                ${bgColors[t.bgColor]}
                border-2 border-wobbly-md
                shadow-sketch
                ${t.rotation}
                hover:rotate-0 hover:scale-[1.02]
                transition-all duration-150 ease-out
                flex flex-col justify-between
                select-none cursor-default
              `}
            >
              {/* Pin or Tape decoration */}
              {t.pinnedWith === 'tack' ? (
                <Thumbtack color="red" />
              ) : (
                <WashiTape width="w-24" color="gray" tilt="-rotate-2" />
              )}

              {/* Top Quote Icon */}
              <div>
                <div className="flex items-center justify-between text-[var(--accent-blue)] mb-4 pt-2">
                  <Quote size={32} strokeWidth={2.5} className="rotate-180 opacity-80" />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[var(--accent-red)] text-base">★</span>
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="font-body text-xl text-inherit leading-relaxed italic mb-6">
                  “{t.quote}”
                </p>
              </div>

              {/* Author Info with Rough Border Avatar */}
              <div className="pt-4 border-t-2 border-dashed border-[var(--pencil-lead)]/30 flex items-center gap-3.5">
                {/* Rough Avatar Circle */}
                <div 
                  className="
                    w-12 h-12 shrink-0
                    bg-[var(--paper-bg)] border-2 border-[var(--pencil-lead)] border-wobbly-blob
                    flex items-center justify-center font-heading font-bold text-lg text-[var(--accent-blue)]
                    shadow-sketchSubtle
                  "
                >
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>

                <div>
                  <h4 className="font-heading font-bold text-lg text-inherit leading-snug">
                    {t.author}
                  </h4>
                  <p className="font-body text-base opacity-80">
                    {t.role} · <span className="font-semibold text-[var(--accent-blue)]">{t.company}</span>
                  </p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
