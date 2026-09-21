import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { PROJECTS_DATA, SKILLS_DATA, SOCIAL_LINKS, STATS_DATA, TESTIMONIALS_DATA } from './data/portfolioData';
import type { Project } from './types';
import { Experience } from './components/Experience';

const PersistentScene = lazy(() => import('./components/PersistentScene').then(module => ({ default: module.PersistentScene })));

const clean = (text: string) => text.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '').trim();
const names = ['AtosFit', 'Quadpod', 'Autonomous firefighter', 'PaperFlow', 'Inkwell', 'RetroNotes', 'SketchGraph'];
const awards = PROJECTS_DATA[0].awards ?? [];

function ProjectDialog({ project, initialImage, onClose }: { project: Project; initialImage?: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const media = [
    ...(project.screenshot ? [{ url: project.screenshot, caption: project.title }] : []),
    ...(project.schematicImage ? [{ url: project.schematicImage, caption: 'Wiring schematic' }] : []),
    ...(project.mobileScreenshot ? [{ url: project.mobileScreenshot, caption: 'Mobile interface' }] : []),
    ...(project.awards?.flatMap(award => award.gallery) ?? []),
  ];
  const [imageIndex, setImageIndex] = useState(Math.max(0, media.findIndex(image => image.url === initialImage)));

  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    ref.current?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; previous?.focus(); };
  }, []);

  return <dialog ref={ref} className="project-dialog" aria-labelledby="project-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <article className="dialog-content">
      <button className="close-dialog icon-button" onClick={onClose} aria-label="Close project"><X /></button>
      <p className="eyebrow">{project.category}</p>
      <h2 id="project-title">{project.title}</h2>
      <p>{project.description}</p>
      {media.length > 0 && <div className="project-gallery">
        <figure><img key={imageIndex} src={media[imageIndex].url} alt={clean(media[imageIndex].caption)} /><figcaption>{clean(media[imageIndex].caption)}</figcaption></figure>
        <div className="gallery-tabs" aria-label="Project images">{media.map((item, index) => <button key={item.url} aria-label={clean(item.caption)} aria-pressed={index === imageIndex} onClick={() => setImageIndex(index)}><img src={item.url} alt="" loading="lazy" /></button>)}</div>
      </div>}
      <p className="eyebrow">Architecture & highlights</p>
      <ul className="detail-list">{project.detailedNotes.map(note => <li key={note}>{clean(note)}</li>)}</ul>
      <p className="technology-list">{project.tags.map(clean).join(' / ')}</p>
      {project.demoUrl !== 'https://github.com' && <a className="pill" href={project.demoUrl} target="_blank" rel="noreferrer">Explore live project <ArrowUpRight size={16} /></a>}
    </article>
  </dialog>;
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<{ project: Project; image?: string } | null>(null);
  const [quote, setQuote] = useState(0);
  const [emailStatus, setEmailStatus] = useState('');
  const categories = ['All', 'University Projects', 'Web Apps', 'Design Systems', 'Experiments'];
  const openProject = (project: Project, image?: string) => setSelected({ project, image });

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); } });
    }, { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add('will-reveal');
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [filter]);

  return <>
    <Suspense fallback={<div className="persistent-scene scene-loading" aria-hidden="true" />}><PersistentScene /></Suspense>
    <a className="skip-link" href="#projects">Skip to projects</a>
    <header className="site-header container">
      <a href="#home" className="brand" aria-label="Mahmoud Ayman home"><svg viewBox="0 0 32 36" aria-hidden="true"><defs><linearGradient id="brand-gradient" x2="1" y2="1"><stop stopColor="#8052ff" /><stop offset="1" stopColor="#15846e" /></linearGradient></defs><path d="M2 30 15 3 30 30 16 22Z" fill="url(#brand-gradient)" /></svg><span>mahmoud<span className="violet">.</span></span></a>
      <button className="menu-toggle icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav id="navigation" className={menuOpen ? 'navigation open' : 'navigation'} aria-label="Main navigation">
        <a href="#projects" onClick={() => setMenuOpen(false)}>Work</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#recognition" onClick={() => setMenuOpen(false)}>Recognition</a>
        <a className="pill" href="#contact" onClick={() => setMenuOpen(false)}>Let's talk <ArrowUpRight size={15} /></a>
      </nav>
    </header>
    <main id="main">
      <Experience />
      <section className="recognition container reveal" aria-label="Achievements" data-scene="0.45">{STATS_DATA.slice(0, 3).map(stat => <div key={stat.label}><span className="stat-number">{stat.number}</span><span className="stat-label">{stat.label}</span><span className="stat-note">{stat.note}</span></div>)}</section>
      <section className="morph-chapter container" data-scene="1" aria-label="Ideas become intelligent systems">
        <div className="morph-copy reveal"><p className="eyebrow amber">01 / A spark becomes a system</p><h2>Ideas should<br/>light something<br/>up<span className="violet">.</span></h2><p>Scroll slowly. Thousands of fragments leave the shared brain, follow a turbulent current, and assemble into a new idea.</p></div>
        <div className="morph-label" aria-hidden="true"><span>8,200 fragments</span><span>One continuous thought</span></div>
      </section>
      <section id="about" className="about-section container" data-scene="1.18">
        <div className="section-heading reveal"><div><p className="eyebrow">01 / The person behind the work</p><h2>Curiosity.<br/>With a human face.</h2></div><p>Engineer by training.<br/>Explorer by nature.</p></div>
        <div className="about-grid">
          <figure className="portrait-frame reveal"><span className="portrait-orbit orbit-one" aria-hidden="true"/><span className="portrait-orbit orbit-two" aria-hidden="true"/><img src="/mahmoud-neon-portrait.png" alt="Mahmoud Ayman Waheed, AI engineer" loading="lazy" width="600" height="600"/><figcaption><span>Mahmoud Ayman Waheed</span><span>Based in Egypt · Building for the world</span></figcaption></figure>
          <div className="section-copy reveal"><p className="eyebrow amber">From possibility to purpose</p><h3 className="about-name">Hi, I'm Mahmoud.</h3><p>An AI engineer and Bioinformatics & AI graduate from Delta University. My work lives where machine intelligence meets the physical world.</p><p>From a camera that understands how you move to a robot that responds to its surroundings, I build systems that see, learn, and act. Thoughtful engineering. Tangible impact.</p><a className="text-link" href="/Mahmoud_Ayman_Waheed_CV.pdf" download>Download my CV <ArrowUpRight size={17}/></a><div className="about-socials"><a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={SOCIAL_LINKS.x} target="_blank" rel="noreferrer">X ↗</a></div></div>
        </div>
      </section>
      <section id="projects" className="work-section container">
        <div className="section-heading reveal"><div><p className="eyebrow">02 / Selected work</p><h2>Not just ideas.<br/>Things I've built.</h2></div><p>Real prototypes. Real interfaces.<br/>From intelligent movement to autonomous machines.</p></div>
        <div className="filters" aria-label="Filter projects">{categories.map(category => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category === 'University Projects' ? 'AI & Robotics' : category}</button>)}</div>
        <div className="project-list">{PROJECTS_DATA.filter(project => filter === 'All' || project.category === filter).map(project => {
          const index = PROJECTS_DATA.indexOf(project);
          return project.screenshot ? <article className={`feature-project reveal ${index % 2 ? 'reversed' : ''}`} key={project.id} data-scene={index === 0 ? 1.45 : index === 1 ? 2 : 3}>
            <button className={`project-visual ${index === 0 ? 'product-visual' : 'robot-visual'}`} aria-label={`View ${names[index]} images and details`} onClick={() => openProject(project)}>
              <span className="visual-halo" aria-hidden="true"/>
              <img className="primary-project-image" src={project.screenshot} alt={project.title} loading="lazy"/>
              {index === 0 && <img className="floating-phone" src={project.mobileScreenshot} alt="AtosFit live pose tracking on a phone" loading="lazy"/>}
              <span className="image-action"><ArrowUpRight size={20}/></span>
              <span className="visual-caption">{index === 0 ? 'Computer vision, in motion' : index === 1 ? 'Autonomous perception' : 'Sense. Navigate. Respond.'}</span>
            </button>
            <div className="feature-copy"><p className="eyebrow"><span className="violet">0{index + 1}</span> / AI & Robotics</p><button className="project-name" onClick={() => openProject(project)}>{names[index]} <ArrowUpRight/></button><p>{index === 0 ? 'Your movement, understood. An on-device computer vision coach that analyzes exercise form and responds in real time.' : clean(project.tagline)}</p><p className="project-metric">{index === 0 ? 'Huawei 2nd Prize · WCHL Global Top 30' : index === 1 ? 'YOLOv9 · ESP32-CAM · Multi-axis locomotion' : 'Arduino · Dual flame sensing · Autonomous navigation'}</p><button className="text-link" onClick={() => openProject(project)}>Explore the project <ArrowUpRight size={16}/></button>
              {project.schematicImage && <button className="schematic-preview" onClick={() => openProject(project, project.schematicImage)}><img src={project.schematicImage} alt="Firefighter robot wiring schematic" loading="lazy"/><span>Inside the engineering ↗</span></button>}
            </div>
          </article> : <article className="project-row reveal" key={project.id}><span className="project-number">{String(index + 1).padStart(2, '0')}</span><div><p className="eyebrow">{project.category}</p><button className="project-name" onClick={() => openProject(project)}>{names[index]} <ArrowUpRight/></button></div><div className="project-summary"><p>{clean(project.tagline)}</p><button className="text-link" onClick={() => openProject(project)}>Explore project <ArrowUpRight size={15}/></button></div></article>;
        })}</div>
      </section>
      <section id="recognition" className="awards-section container" data-scene="3.55">
        <div className="section-heading reveal"><div><p className="eyebrow amber">03 / Beyond the workspace</p><h2>Built here.<br/>Recognized worldwide.</h2></div><p>The people, the stages,<br/>and the moments behind the milestones.</p></div>
        {awards.map((award, index) => <article className="award-story reveal" key={award.id}>
          <button className="award-main" onClick={() => openProject(PROJECTS_DATA[0], award.mainImage)} aria-label={`View ${award.title} photos`}><img src={award.mainImage} alt={award.gallery[0].caption} loading="lazy"/><span className="image-action"><ArrowUpRight size={20}/></span></button>
          <div className="award-heading"><div><p className="eyebrow amber">{award.region} · {award.year}</p><h3>{index === 0 ? 'Huawei Developer Competition' : 'World Computer Hacker League'}</h3></div><p>{index === 0 ? '2nd Prize / $3,000' : 'Global Top 30 / 12,000+ projects'}</p></div>
          <div className="award-photo-strip" aria-label={`${award.title} gallery`}>{award.gallery.slice(1).map(photo => <button key={photo.url} onClick={() => openProject(PROJECTS_DATA[0], photo.url)}><img src={photo.url} alt={photo.caption} loading="lazy"/><span>{clean(photo.tag)} <ArrowUpRight size={12}/></span></button>)}</div>
        </article>)}
      </section>
      <section id="expertise" className="split-section container expertise-section" data-scene="3.8"><div className="reveal"><p className="eyebrow">04 / The toolkit</p><h2>Many tools.<br/>One curious<br/>mind.</h2><p className="expertise-intro">Connecting research, code, and hardware<br/>to make the ambitious possible.</p></div><div className="skills-list reveal">{SKILLS_DATA.map((skill, index) => <div className="skill" key={skill.name}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{skill.name}</h3><p>{skill.category} <span>·</span> {skill.experience}</p></div></div>)}</div></section>
      <section className="testimonial-section container reveal" aria-label="Testimonials"><p className="eyebrow">In good company</p><div key={quote} className="quote-content" aria-live="polite"><blockquote>“{TESTIMONIALS_DATA[quote].quote}”</blockquote><p className="quote-author">{TESTIMONIALS_DATA[quote].author}<span>{TESTIMONIALS_DATA[quote].company}</span></p></div><div className="quote-dots">{TESTIMONIALS_DATA.map((item, index) => <button key={item.id} aria-label={`Show testimonial ${index + 1}`} aria-pressed={quote === index} onClick={() => setQuote(index)}/>)}</div></section>
      <section id="contact" className="contact-section container reveal" data-scene="4"><p className="eyebrow amber">05 / What's next?</p><div className="split-section"><h2>Let's build<br/>something<br/>that matters<span className="violet">.</span></h2><div className="section-copy"><p>Have an idea, a challenge, or a different way of looking at things? I’d love to hear it.</p><a className="pill" href={SOCIAL_LINKS.email}>Start a conversation <ArrowUpRight size={16}/></a><a className="email-link" href={SOCIAL_LINKS.email}>ma8819496@gmail.com</a><button className="text-link copy-email" onClick={async () => { try { await navigator.clipboard.writeText('ma8819496@gmail.com'); setEmailStatus('Email address copied.'); } catch { setEmailStatus('Please copy the email address above.'); } }}>Copy email address</button><span className="copy-status" role="status">{emailStatus}</span></div></div></section>
    </main>
    <footer className="site-footer container"><a className="footer-name" href="#home">mahmoud.</a><span>© {new Date().getFullYear()} Mahmoud Ayman Waheed</span><div><a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13}/></a><a href={SOCIAL_LINKS.x} target="_blank" rel="noreferrer">X <ArrowUpRight size={13}/></a><a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer">Facebook <ArrowUpRight size={13}/></a></div><a href="#home" className="back-top">Back to top ↑</a></footer>
    {selected && <ProjectDialog project={selected.project} initialImage={selected.image} onClose={() => setSelected(null)}/>}
  </>;
}
export default App;

