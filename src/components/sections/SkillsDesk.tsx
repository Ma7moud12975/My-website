import React, { useState } from 'react';
import { Lightbulb, Wrench, CheckCircle, HeartHandshake, Sparkles } from 'lucide-react';
import { SKILLS_DATA, CHECKLIST_ITEMS } from '../../data/portfolioData';
import { StickyNote } from '../ui/StickyNote';
import { SketchedCheckmark, SpeechBubbleTail } from '../ui/SketchDoodles';

export const SkillsDesk: React.FC = () => {
  const [checklist, setChecklist] = useState(CHECKLIST_ITEMS);

  const [pinnedSkills, setPinnedSkills] = useState<Record<string, boolean>>({});

  const toggleSkillPin = (name: string) => {
    setPinnedSkills((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <section id="skills" className="py-14 md:py-20" aria-label="Skills and Toolbox Desk">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--paper-yellow)] border border-[var(--paper-yellow-border)] border-wobbly font-heading font-bold text-sm text-[var(--paper-yellow-text)] rotate-1 mb-3">
          <Wrench size={16} strokeWidth={2.5} className="text-[var(--accent-red)]" />
          <span>The Engineer's Workbench & Toolbox</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[var(--pencil-text)]">
          AI Engineering & Robotics Toolbox
        </h2>
        <p className="font-body text-xl sm:text-2xl text-[var(--pencil-text)]/80 mt-2">
          Hand-crafted deep learning architectures, sub-30ms computer vision, and autonomous embedded robotics.
        </p>
      </div>

      {/* Moodboard Collage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Area (7 cols): Post-It Notes for Core Skills & Design Philosophy */}
        <div className="lg:col-span-7 flex flex-col space-y-8">
          
          {/* Core Skills Pinned Post-its Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-[var(--pencil-text)] flex items-center gap-2">
                <Sparkles size={20} strokeWidth={2.5} className="text-[var(--accent-blue)]" />
                <span>Core AI & Engineering Skills</span>
              </h3>
              <span className="font-body text-sm sm:text-base text-[var(--pencil-text)]/70 italic">
                (Click note to straighten/tilt)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
              {SKILLS_DATA.map((skill, index) => {
                const pinTypes: ('tack' | 'tape')[] = ['tack', 'tape', 'tack', 'tape', 'tack', 'tape'];
                const isStraightened = pinnedSkills[skill.name];
                const activeTilt = isStraightened ? 'rotate-0 scale-105 shadow-sketchDeep' : skill.rotation;

                return (
                  <StickyNote
                    key={skill.name}
                    color={skill.color}
                    tilt={activeTilt}
                    pinnedWith={pinTypes[index % pinTypes.length]}
                    onClick={() => toggleSkillPin(skill.name)}
                    className="cursor-pointer min-h-[120px] sm:min-h-[130px] p-3 sm:p-4 flex flex-col justify-between select-none"
                  >
                    <div>
                      <span className="font-heading font-bold text-[10px] sm:text-xs uppercase tracking-wider opacity-75 block mb-1">
                        {skill.category}
                      </span>
                      <h4 className="font-heading font-bold text-base sm:text-lg leading-tight text-inherit">
                        {skill.name}
                      </h4>
                    </div>
                    <div className="pt-1.5 sm:pt-2 border-t border-dashed border-[var(--pencil-lead)]/25 flex items-center justify-between text-xs sm:text-sm font-body opacity-85">
                      <span>Experience</span>
                      <span className="font-bold">{skill.experience}</span>
                    </div>
                  </StickyNote>
                );
              })}
            </div>
          </div>

          {/* Speech-Bubble Container for "My Engineering Philosophy" with border-based triangular tail */}
          <div className="relative pt-6">
            <div 
              className="
                relative p-4 sm:p-7
                bg-[var(--paper-card)] border-3 border-[var(--pencil-lead)] border-wobbly-md
                shadow-sketchDeep -rotate-1 hover:rotate-0 transition-transform
              "
            >
              <div className="flex items-center gap-2 mb-2 text-[var(--accent-blue)]">
                <Lightbulb size={24} strokeWidth={2.5} />
                <h3 className="font-heading font-bold text-2xl text-[var(--pencil-text)]">
                  My Engineering Philosophy
                </h3>
              </div>

              <blockquote className="font-body text-xl sm:text-2xl text-[var(--pencil-text)] leading-relaxed italic">
                “Artificial intelligence should not live merely in academic notebooks or isolated cloud datacenters. When we engineer on-device computer vision and autonomous robotics with precision and privacy, intelligent systems actively safeguard human health and safety in the physical world.”
              </blockquote>

              <div className="mt-4 pt-3 border-t-2 border-dashed border-[var(--pencil-lead)]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-base font-heading">
                <span className="text-[var(--accent-red)] font-bold">— Mahmoud Ayman Waheed</span>
                <span className="text-[var(--pencil-text)]/60 font-body text-base sm:text-lg">AI Engineer & AtosFit Founder</span>
              </div>

              {/* Hand-drawn speech bubble tail */}
              <SpeechBubbleTail className="-bottom-[22px] left-12" />
            </div>
          </div>

        </div>

        {/* Right Area (5 cols): Sketched Checklist */}
        <div className="lg:col-span-5">
          <div 
            className="
              relative p-4 sm:p-7
              bg-[var(--paper-card)] border-2 border-[var(--pencil-lead)] border-wobbly-md
              shadow-sketch rotate-1 hover:rotate-0 transition-transform
            "
          >
            {/* Top washi tape */}
            <div 
              className="
                absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1
                bg-[var(--washi-bg)] border border-[var(--pencil-lead)]/30
                font-heading text-xs uppercase tracking-widest font-bold text-[var(--pencil-text)]
                -rotate-1 shadow-sm select-none
              "
              style={{
                clipPath: 'polygon(0% 15%, 5% 0%, 95% 0%, 100% 15%, 98% 85%, 92% 100%, 8% 100%, 2% 85%)'
              }}
            >
              Strict Quality Checklist
            </div>

            <div className="flex items-center gap-2 mb-4 pt-2">
              <HeartHandshake size={22} strokeWidth={2.5} className="text-[var(--accent-blue)]" />
              <h3 className="font-heading font-bold text-2xl text-[var(--pencil-text)]">
                Artisanal Standards
              </h3>
            </div>

            <p className="font-body text-xl text-[var(--pencil-text)]/80 mb-5">
              Every project must pass this rigorous hand-crafted checklist before shipping to users:
            </p>

            {/* Checklist items with hand-drawn checkmarks */}
            <div className="space-y-4">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="
                    flex items-start gap-3 p-2.5 rounded
                    hover:bg-[var(--paper-yellow)]/20 cursor-pointer
                    transition-colors border border-transparent hover:border-[var(--pencil-lead)]/20
                  "
                  role="checkbox"
                  aria-checked={item.checked}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleCheck(item.id);
                    }
                  }}
                >
                  <SketchedCheckmark checked={item.checked} className="mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-lg text-[var(--pencil-text)] leading-snug">
                      {item.label}
                    </h4>
                    <p className="font-body text-base text-[var(--pencil-text)]/75">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Notebook Margin Line */}
            <div className="mt-6 pt-4 border-t-2 border-dashed border-[var(--pencil-lead)]/30 text-center font-body text-base text-[var(--pencil-text)]/70 italic">
              ✏️ 100% compliance tested with axe-core & Lighthouse
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
