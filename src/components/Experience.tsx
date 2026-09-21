import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import { useSceneStore } from './sceneStore';

const smooth = (a: number, b: number, value: number) => {
  const t = Math.max(0, Math.min(1, (value - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export function Experience() {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [chapter, setChapter] = useState(0);
  const paused = useSceneStore(state => state.paused);
  const setPaused = useSceneStore(state => state.setPaused);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = section.current;
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height - window.innerHeight)));
      progress.current = p;
      const first = 1 - smooth(.12, .29, p);
      const second = smooth(.28, .43, p) * (1 - smooth(.61, .74, p));
      const third = smooth(.76, .9, p);
      element.style.setProperty('--first', String(first));
      element.style.setProperty('--second', String(second));
      element.style.setProperty('--third', String(third));
      element.style.setProperty('--story-progress', `${p * 100}%`);
      setChapter(p < .3 ? 0 : p < .73 ? 1 : 2);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return <section id="home" ref={section} className="experience" aria-label="From imagination to intelligence">
    <span className="scene-anchor anchor-start" data-scene="0" aria-hidden="true"/>
    <span className="scene-anchor anchor-hold" data-scene="0.08" aria-hidden="true"/>
    <span className="scene-anchor anchor-travel" data-scene="0.22" aria-hidden="true"/>
    <span className="scene-anchor anchor-exit" data-scene="0.38" aria-hidden="true"/>
    <div className="experience-stage">
      <div className="experience-content container">
        <div className={`story-copy story-first ${chapter === 0 ? 'active' : ''}`} aria-hidden={chapter !== 0} inert={chapter !== 0}>
          <a href="#about" className="hero-identity"><img src="/mahmoud-neon-portrait.png" alt="" /><span>Mahmoud Ayman Waheed<br/><small>AI engineer · Creative problem solver</small></span></a>
          <h1>Intelligence.<br/>Beyond the<br/>screen<span className="violet">.</span></h1>
          <p>I turn complex ideas into intelligent systems.<br/>Computer vision. Autonomous robotics.<br/>AI that makes a real-world difference.</p>
          <a href="#projects" className="text-link">Explore my work <ArrowUpRight size={18}/></a>
        </div>
        <div className={`story-copy story-second ${chapter === 1 ? 'active' : ''}`} aria-hidden={chapter !== 1} inert={chapter !== 1}>
          <p className="eyebrow amber">See. Understand. Act.</p>
          <h2>From vision<br/>to something<br/>that matters.</h2>
          <p>A camera becomes a coach.<br/>A robot learns to respond.<br/>An idea becomes a real-world system.</p>
          <a href="#projects" className="text-link">Meet the projects <ArrowUpRight size={18}/></a>
        </div>
        <div className={`story-copy story-third ${chapter === 2 ? 'active' : ''}`} aria-hidden={chapter !== 2} inert={chapter !== 2}>
          <p className="eyebrow amber">The possibilities are connected</p>
          <h2>It starts with<br/>a little curiosity.</h2>
          <p>Research, code, and a willingness to explore.<br/>Here’s what happens when the pieces come together.</p>
          <a href="#about" className="text-link">The person behind the work <ArrowDown size={18}/></a>
        </div>
      </div>
      <div className="experience-footer container">
        <span className="scroll-hint"><ArrowDown size={14}/> Scroll to explore</span>
        <div className="story-chapters" aria-label="Animation chapter"><span className={chapter === 0 ? 'active' : ''}>01 / Imagine</span><span className={chapter === 1 ? 'active' : ''}>02 / Connect</span><span className={chapter === 2 ? 'active' : ''}>03 / Create</span></div>
        <button className="motion-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={13}/> : <Pause size={13}/>}<span>{paused ? 'Play motion' : 'Pause motion'}</span></button>
      </div>
      <div className="story-progress" aria-hidden="true"/>
    </div>
  </section>;
}
