import React from 'react';
import { STATS_DATA } from '../../data/portfolioData';
import { Thumbtack } from '../ui/Thumbtack';

export const StatsRibbon: React.FC = () => {
  return (
    <section className="my-10 md:my-20" aria-label="Quick Career Highlights">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
        {STATS_DATA.map((stat, idx) => {
          const bgColors = [
            "bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] border-[var(--paper-yellow-border)]", // post-it yellow
            "bg-[var(--paper-card)] text-[var(--pencil-text)] border-[var(--pencil-lead)]",                  // crisp sketchbook paper
            "bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] border-[var(--paper-yellow-border)]", // post-it yellow
            "bg-[var(--paper-card)] text-[var(--pencil-text)] border-[var(--pencil-lead)]",                  // crisp sketchbook paper
          ];
          const tilts = [
            "-rotate-2 hover:rotate-0",
            "rotate-2 hover:rotate-0",
            "-rotate-1 hover:rotate-0",
            "rotate-3 hover:rotate-0",
          ];
          const pinColors: ('red' | 'blue' | 'yellow')[] = ['red', 'blue', 'yellow', 'red'];

          return (
            <div
              key={stat.label}
              className={`
                relative p-3.5 sm:p-6 pt-5 sm:pt-7
                ${bgColors[idx % bgColors.length]}
                border-2 border-wobbly-md
                shadow-sketch transition-transform duration-150 ease-out
                ${tilts[idx % tilts.length]} hover:scale-105
                flex flex-col items-center text-center justify-center
                cursor-default select-none
              `}
            >
              {/* Studio Pin */}
              <Thumbtack color={pinColors[idx % pinColors.length]} />

              {/* Stat number in Kalam cursive */}
              <div className="flex items-center gap-1 mt-1">
                <span className="text-base sm:text-xl" role="img" aria-hidden="true">{stat.doodle}</span>
                <span className="font-heading font-bold text-2xl sm:text-4xl text-inherit tracking-tight">
                  {stat.number}
                </span>
              </div>

              {/* Label */}
              <span className="font-heading font-bold text-xs sm:text-xl text-[var(--accent-blue)] mt-0.5 sm:mt-1">
                {stat.label}
              </span>

              {/* Playful pencil note */}
              <span className="font-body text-[11px] sm:text-base opacity-80 mt-0.5 leading-tight">
                {stat.note}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
