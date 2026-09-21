import React, { useEffect, useState } from 'react';

interface TabItem {
  id: string;
  label: string;
  icon: string;
  bgClass: string;
  textClass: string;
  activeClass: string;
}

export const NotebookTabs: React.FC = () => {
  const [activeId, setActiveId] = useState('hero');

  const tabs: TabItem[] = [
    { 
      id: 'hero', 
      label: 'Intro', 
      icon: '✏️', 
      bgClass: 'bg-[#fff9c4] dark:bg-[#352d1b]', 
      textClass: 'text-[#2d2d2d] dark:text-[#fef08a]', 
      activeClass: 'bg-[#ffeb3b] dark:bg-[#ca8a04] text-[#2d2d2d] dark:text-[#1c1917] font-extrabold shadow-sketch' 
    },
    { 
      id: 'projects', 
      label: 'Works', 
      icon: '🚀', 
      bgClass: 'bg-[#ffe4e6] dark:bg-[#3d1a24]', 
      textClass: 'text-[#881337] dark:text-[#fecdd3]', 
      activeClass: 'bg-[#ff4d4d] text-white font-extrabold shadow-sketch' 
    },
    { 
      id: 'skills', 
      label: 'Skills', 
      icon: '🛠️', 
      bgClass: 'bg-[#e0f2fe] dark:bg-[#162a45]', 
      textClass: 'text-[#0369a1] dark:text-[#bae6fd]', 
      activeClass: 'bg-[#2d5da1] text-white font-extrabold shadow-sketch' 
    },
    { 
      id: 'testimonials', 
      label: 'Quotes', 
      icon: '💬', 
      bgClass: 'bg-[#f3e8ff] dark:bg-[#2f1b40]', 
      textClass: 'text-[#6b21a8] dark:text-[#e9d5ff]', 
      activeClass: 'bg-[#9333ea] text-white font-extrabold shadow-sketch' 
    },
    { 
      id: 'contact', 
      label: 'Memo', 
      icon: '📮', 
      bgClass: 'bg-[#ffedd5] dark:bg-[#3a2215]', 
      textClass: 'text-[#9a3412] dark:text-[#fed7aa]', 
      activeClass: 'bg-[#ea580c] text-white font-extrabold shadow-sketch' 
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = tabs.map((t) => document.getElementById(t.id));
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveId(tabs[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="Notebook Section Tabs"
      className="hidden lg:flex flex-col gap-2.5 fixed right-0 top-1/3 z-30 select-none"
    >
      <div className="text-[10px] font-heading font-bold text-[var(--pencil-faint)] -rotate-90 origin-right translate-x-3 mb-4 tracking-wider">
        INDEX TABS 📑
      </div>

      {tabs.map((tab) => {
        const isActive = activeId === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => scrollTo(tab.id)}
            className={`
              group relative flex items-center gap-2 pl-4 pr-3 py-2
              border-2 border-r-0 border-[var(--pencil-lead)]
              shadow-sketchSubtle transition-all duration-150 ease-out
              ${isActive ? `${tab.activeClass} -translate-x-4 scale-105` : `${tab.bgClass} ${tab.textClass} translate-x-2 hover:-translate-x-2`}
            `}
            style={{
              borderRadius: '16px 0 0 16px / 12px 0 0 12px',
            }}
            title={`Jump to ${tab.label}`}
          >
            {/* Small simulated tape strip */}
            <span className="text-sm shrink-0" role="img" aria-hidden="true">{tab.icon}</span>
            <span className="font-heading text-sm sm:text-base tracking-wide whitespace-nowrap">
              {tab.label}
            </span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)] animate-ping ml-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
