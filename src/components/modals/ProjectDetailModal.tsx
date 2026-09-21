import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Sparkles, Layers, GraduationCap, Bot, Flame, Trophy, Award, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../../types';
import { Button } from '../ui/Button';
import { WashiTape } from '../ui/WashiTape';
import { SketchedGithub } from '../ui/SketchDoodles';

interface ProjectDetailModalProps {
  project: Project | null;
  initialAwardId?: string;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  initialAwardId,
  onClose,
}) => {
  const [activeMediaView, setActiveMediaView] = React.useState<'both' | 'desktop' | 'mobile'>('both');
  const [firefighterView, setFirefighterView] = React.useState<'hardware' | 'schematic' | 'app'>('hardware');
  const [atosfitTab, setAtosfitTab] = React.useState<'award' | 'screens'>('award');
  const [activeAwardIndex, setActiveAwardIndex] = React.useState<number>(0);
  const [selectedAwardPhoto, setSelectedAwardPhoto] = React.useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setSelectedAwardPhoto((prev) => {
          const count = currentAward?.gallery?.length || 0;
          return count > 0 ? (prev < count - 1 ? prev + 1 : 0) : prev;
        });
      } else if (e.key === 'ArrowLeft') {
        setSelectedAwardPhoto((prev) => {
          const count = currentAward?.gallery?.length || 0;
          return count > 0 ? (prev > 0 ? prev - 1 : count - 1) : prev;
        });
      }
    };
    if (project) {
      const awards = project.awards && project.awards.length > 0
        ? project.awards
        : project.award
        ? [project.award]
        : [];

      if (awards.length > 0) {
        setAtosfitTab('award');
        let targetIndex = 0;
        if (initialAwardId) {
          const idx = awards.findIndex(
            (a) => a.id === initialAwardId || a.title.toLowerCase().includes(initialAwardId.toLowerCase())
          );
          if (idx !== -1) {
            targetIndex = idx;
          }
        }
        setActiveAwardIndex(targetIndex);
        setSelectedAwardPhoto(0);
      }
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, initialAwardId, onClose]);

  if (!project) return null;

  const awardsList = project.awards && project.awards.length > 0
    ? project.awards
    : project.award
    ? [project.award]
    : [];
  const currentAward = awardsList[activeAwardIndex] || awardsList[0];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="
          relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8
          bg-[var(--paper-card)] border-3 border-[var(--pencil-lead)] border-wobbly-md
          shadow-sketchDeep text-[var(--pencil-text)] cursor-default
        "
      >
        {/* Washi tape on top */}
        <WashiTape width="w-36" label="Project Spec" color="yellow" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute top-4 right-4 p-2
            bg-[var(--paper-bg)] border-2 border-[var(--pencil-lead)] border-wobbly
            shadow-sketchSubtle text-[var(--pencil-text)]
            hover:bg-[var(--accent-red)] hover:text-white
            active:translate-x-[2px] active:translate-y-[2px]
            focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]
            transition-colors duration-100
          "
          aria-label="Close project modal"
        >
          <X size={22} strokeWidth={2.5} />
        </button>

        {/* Header */}
        <div className="pt-4 border-b-2 border-dashed border-[var(--pencil-lead)]/30 pb-4">
          <div className="inline-block px-3 py-1 bg-[var(--paper-yellow)] border border-[var(--paper-yellow-border)] border-wobbly text-sm font-heading font-bold text-[var(--paper-yellow-text)] mb-2">
            {project.category}
          </div>
          <h2 id="modal-project-title" className="font-heading text-3xl md:text-4xl font-bold text-[var(--pencil-text)]">
            {project.title}
          </h2>
          <p className="font-body text-xl text-[var(--accent-blue)] mt-1">
            {project.tagline}
          </p>
        </div>

        {/* Academic Affiliation / Graduation Project Badge */}
        {project.academicContext && (
          <div className="mt-4 p-3 bg-[var(--paper-bg)] border-2 border-dashed border-[var(--pencil-lead)]/50 border-wobbly flex items-center gap-2.5 text-base font-heading font-bold text-[var(--pencil-text)]">
            <GraduationCap size={22} strokeWidth={2.5} className="text-[#ea580c] shrink-0" />
            <span>{project.academicContext}</span>
          </div>
        )}

        {/* Autonomous Firefighter Robot Hardware, Circuit & Telemetry Showcase */}
        {project.id === 'autonomous-firefighter-robot' && (
          <div className="my-6 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-heading font-bold text-lg text-[var(--pencil-text)] flex items-center gap-2">
                <span>🚒</span>
                <span>Robotics & Circuit Telemetry Lab</span>
                <span className="text-xs px-2 py-0.5 bg-[#dc2626] text-white border border-[var(--pencil-lead)] border-wobbly font-bold">
                  Arduino + Flame IR + Pump
                </span>
              </span>

              {/* View Selector Tabs */}
              <div className="flex items-center gap-1 bg-[var(--paper-bg)] p-1 border border-[var(--pencil-lead)]/40 border-wobbly text-xs font-heading">
                <button
                  type="button"
                  onClick={() => setFirefighterView('hardware')}
                  className={`px-2.5 py-1 rounded transition-all font-bold ${
                    firefighterView === 'hardware'
                      ? 'bg-[#dc2626] text-white shadow-sketchSubtle'
                      : 'text-[var(--pencil-text)] hover:bg-[var(--paper-card)]'
                  }`}
                >
                  📸 Robot Prototype
                </button>
                <button
                  type="button"
                  onClick={() => setFirefighterView('schematic')}
                  className={`px-2.5 py-1 rounded transition-all font-bold ${
                    firefighterView === 'schematic'
                      ? 'bg-[#dc2626] text-white shadow-sketchSubtle'
                      : 'text-[var(--pencil-text)] hover:bg-[var(--paper-card)]'
                  }`}
                >
                  ⚡ Wiring Diagram
                </button>
                <button
                  type="button"
                  onClick={() => setFirefighterView('app')}
                  className={`px-2.5 py-1 rounded transition-all font-bold ${
                    firefighterView === 'app'
                      ? 'bg-[#dc2626] text-white shadow-sketchSubtle'
                      : 'text-[var(--pencil-text)] hover:bg-[var(--paper-card)]'
                  }`}
                >
                  📱 Bluetooth App
                </button>
              </div>
            </div>

            {/* Content for each tab */}
            {firefighterView === 'hardware' && (
              <div className="relative p-4 sm:p-6 bg-[var(--paper-bg)] border-3 border-[var(--pencil-lead)] border-wobbly-md overflow-hidden shadow-sketchDeep">
                {/* Blueprint grid background */}
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(var(--pencil-lead) 1px, transparent 1px)',
                    backgroundSize: '16px 16px'
                  }}
                />

                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className="relative max-w-[340px] sm:max-w-[420px] w-full flex items-center justify-center py-2 group">
                    <img
                      src={project.screenshot}
                      alt="Autonomous Firefighter Robot Prototype"
                      className="w-full h-auto max-h-[320px] object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-24 bg-orange-400/10 rounded-full blur-xl pointer-events-none animate-pulse" />
                  </div>

                  {/* 4 Hardware Callouts */}
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 pt-4 border-t-2 border-dashed border-[var(--pencil-lead)]/40">
                    <div className="p-2.5 bg-[var(--paper-card)] border-2 border-[var(--pencil-lead)] border-wobbly shadow-sketchSubtle flex items-start gap-2">
                      <span className="text-base">🔥</span>
                      <div>
                        <div className="text-xs font-heading font-bold text-[#dc2626]">
                          Dual Infrared Flame Sensors
                        </div>
                        <div className="text-[11px] font-body text-[var(--pencil-faint)]">
                          Wide-angle IR phototransistors triangulating open flame sources (760–1100nm)
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 bg-[var(--paper-card)] border-2 border-[var(--pencil-lead)] border-wobbly shadow-sketchSubtle flex items-start gap-2">
                      <span className="text-base">💧</span>
                      <div>
                        <div className="text-xs font-heading font-bold text-[var(--accent-blue)]">
                          Relay Extinguisher Pump
                        </div>
                        <div className="text-[11px] font-body text-[var(--pencil-faint)]">
                          Submersible DC pump actuated via 5V isolated relay with forward spray nozzle
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 bg-[var(--paper-card)] border-2 border-[var(--pencil-lead)] border-wobbly shadow-sketchSubtle flex items-start gap-2">
                      <span className="text-base">🦇</span>
                      <div>
                        <div className="text-xs font-heading font-bold text-[var(--pencil-text)]">
                          HC-SR04 Sonar Radar
                        </div>
                        <div className="text-[11px] font-body text-[var(--pencil-faint)]">
                          Autonomous obstacle detection navigating debris & low-visibility smoke
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 bg-[var(--paper-card)] border-2 border-[var(--pencil-lead)] border-wobbly shadow-sketchSubtle flex items-start gap-2">
                      <span className="text-base">📶</span>
                      <div>
                        <div className="text-xs font-heading font-bold text-emerald-600 dark:text-emerald-400">
                          HC-05 Bluetooth Telemetry
                        </div>
                        <div className="text-[11px] font-body text-[var(--pencil-faint)]">
                          Full duplex serial link transmitting real-time sensor status & remote commands
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {firefighterView === 'schematic' && (
              <div className="relative p-4 bg-white border-3 border-[var(--pencil-lead)] border-wobbly-md overflow-hidden shadow-sketchDeep">
                <div className="bg-zinc-100 border-b border-zinc-300 -mx-4 -mt-4 px-4 py-2 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-700">Fritzing Breadboard Architecture Diagram</span>
                  <span className="text-xs font-heading font-bold text-[#dc2626]">Complete Wiring Pinout</span>
                </div>
                <div className="relative my-3 flex items-center justify-center bg-white rounded overflow-hidden">
                  <img
                    src={project.schematicImage || '/firefighter-schematic.png'}
                    alt="Firefighter Robot Fritzing Wiring Schematic"
                    className="w-full h-auto max-h-[380px] object-contain cursor-zoom-in hover:scale-105 transition-transform"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-heading font-bold pt-3 border-t border-dashed border-zinc-300">
                  <div className="p-1.5 bg-zinc-50 rounded border border-zinc-200">
                    <span className="text-[#2563eb] block">Arduino Uno R3</span>
                    <span className="text-[10px] text-zinc-500 font-normal">Core Controller</span>
                  </div>
                  <div className="p-1.5 bg-zinc-50 rounded border border-zinc-200">
                    <span className="text-[#dc2626] block">L298N Dual H-Bridge</span>
                    <span className="text-[10px] text-zinc-500 font-normal">4-Motor Driver</span>
                  </div>
                  <div className="p-1.5 bg-zinc-50 rounded border border-zinc-200">
                    <span className="text-amber-600 block">3S 18650 Li-ion</span>
                    <span className="text-[10px] text-zinc-500 font-normal">Chassis Power</span>
                  </div>
                  <div className="p-1.5 bg-zinc-50 rounded border border-zinc-200">
                    <span className="text-emerald-600 block">5V Isolated Relay</span>
                    <span className="text-[10px] text-zinc-500 font-normal">Water Pump Switch</span>
                  </div>
                </div>
              </div>
            )}

            {firefighterView === 'app' && (
              <div className="relative p-4 bg-[var(--paper-bg)] border-3 border-[var(--pencil-lead)] border-wobbly-md overflow-hidden shadow-sketchDeep flex flex-col items-center">
                <div className="w-full bg-[#1e1e1e] text-white px-3 py-1.5 rounded-t-md border-2 border-[var(--pencil-lead)] border-b-0 flex items-center justify-between max-w-[480px]">
                  <span className="text-xs font-mono text-zinc-300">Bluetooth Telemetry Remote</span>
                  <span className="text-[10px] text-amber-400 font-bold">HC-05 Wireless Interface</span>
                </div>
                <div className="relative max-w-[480px] w-full border-2 border-[var(--pencil-lead)] border-t-0 rounded-b-md overflow-hidden shadow-sketch">
                  <img
                    src={project.mobileScreenshot || '/firefighter-app.jpg'}
                    alt="Bluetooth Remote App Interface"
                    className="w-full h-auto max-h-[300px] object-contain bg-black"
                  />
                </div>
                <div className="mt-3 text-center space-y-1">
                  <p className="text-sm font-heading font-bold text-[var(--pencil-text)]">
                    Direct Directional & Actuator Tele-Operation
                  </p>
                  <p className="text-xs font-body text-[var(--pencil-faint)]">
                    Features 6-way steering (Forward, Reverse, Left, Right, Rotations) and remote relay-trigger for the water extinguisher pump.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quadpod Robot Hardware & AI Architecture Showcase */}
        {project.id === 'quadpod-security-robot' && project.screenshot ? (
          <div className="my-6 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-heading font-bold text-lg text-[var(--pencil-text)] flex items-center gap-2">
                <span>🤖</span>
                <span>Hardware Prototype & Sensor Blueprint</span>
                <span className="text-xs px-2 py-0.5 bg-[#2563eb] text-white border border-[var(--pencil-lead)] border-wobbly font-bold">
                  YOLOv9 + ESP32-CAM
                </span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                Live Sensor Stream (45 FPS)
              </span>
            </div>

            {/* Tactile Hardware Workbench Container */}
            <div className="relative p-4 sm:p-6 bg-[var(--paper-bg)] border-3 border-[var(--pencil-lead)] border-wobbly-md overflow-hidden shadow-sketchDeep">
              {/* Background Grid Lines (Blueprint engineering paper feel) */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(var(--pencil-lead) 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }}
              />

              {/* Central Robot Photo with hand-drawn annotations */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="relative max-w-[340px] sm:max-w-[400px] w-full flex items-center justify-center py-2 group">
                  <img
                    src={project.screenshot}
                    alt="Autonomous Quadpod Robot Prototype"
                    className="w-full h-auto max-h-[320px] object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Pulsing optical scan beam */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-48 h-24 bg-cyan-400/10 rounded-full blur-xl pointer-events-none animate-pulse" />
                </div>

                {/* Hand-Drawn Engineering Annotation Tags Grid */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 pt-4 border-t-2 border-dashed border-[var(--pencil-lead)]/40">
                  {/* Annotation 1 */}
                  <div className="p-2.5 bg-[var(--paper-card)] border-2 border-[var(--pencil-lead)] border-wobbly shadow-sketchSubtle flex items-start gap-2">
                    <span className="text-base">📷</span>
                    <div>
                      <div className="text-xs font-heading font-bold text-[var(--pencil-text)]">
                        ESP32-CAM Optical Sensor
                      </div>
                      <div className="text-[11px] font-body text-[var(--pencil-faint)]">
                        Real-time video acquisition with low-latency WiFi streaming pipeline
                      </div>
                    </div>
                  </div>

                  {/* Annotation 2 */}
                  <div className="p-2.5 bg-[var(--paper-card)] border-2 border-[var(--pencil-lead)] border-wobbly shadow-sketchSubtle flex items-start gap-2">
                    <span className="text-base">🎯</span>
                    <div>
                      <div className="text-xs font-heading font-bold text-[var(--accent-red)]">
                        YOLOv9 Deep Threat API
                      </div>
                      <div className="text-[11px] font-body text-[var(--pencil-faint)]">
                        Sub-40ms neural detection of concealed firearms and bladed weapons
                      </div>
                    </div>
                  </div>

                  {/* Annotation 3 */}
                  <div className="p-2.5 bg-[var(--paper-card)] border-2 border-[var(--pencil-lead)] border-wobbly shadow-sketchSubtle flex items-start gap-2">
                    <span className="text-base">🦾</span>
                    <div>
                      <div className="text-xs font-heading font-bold text-[var(--accent-blue)]">
                        4-Legged Kinematics
                      </div>
                      <div className="text-[11px] font-body text-[var(--pencil-faint)]">
                        Multi-servo articulated gait designed for dynamic indoor/outdoor patrol
                      </div>
                    </div>
                  </div>

                  {/* Annotation 4 */}
                  <div className="p-2.5 bg-[var(--paper-card)] border-2 border-[var(--pencil-lead)] border-wobbly shadow-sketchSubtle flex items-start gap-2">
                    <span className="text-base">🏫</span>
                    <div>
                      <div className="text-xs font-heading font-bold text-[#ea580c]">
                        Delta University Research
                      </div>
                      <div className="text-[11px] font-body text-[var(--pencil-faint)]">
                        Faculty of Computers & AI engineering research & autonomous systems
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : project.screenshot ? (
          <div className="my-6 space-y-3">
            {/* If project has an award (e.g. AtosFit), provide top-level switcher */}
            {awardsList.length > 0 ? (
              <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b-2 border-dashed border-[var(--pencil-lead)]/30">
                <div className="flex items-center flex-wrap gap-1.5 bg-[var(--paper-bg)] p-1 border-2 border-[var(--pencil-lead)] border-wobbly">
                  {awardsList.map((aw, awIdx) => {
                    const isSelected = atosfitTab === 'award' && activeAwardIndex === awIdx;
                    const isHuaweiAward = aw.id === 'huawei-2025' || aw.title.toLowerCase().includes('huawei');
                    return (
                      <button
                        key={aw.id || aw.title}
                        type="button"
                        onClick={() => {
                          setAtosfitTab('award');
                          setActiveAwardIndex(awIdx);
                          setSelectedAwardPhoto(0);
                        }}
                        className={`px-3 py-1.5 rounded font-heading font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all ${
                          isSelected
                            ? isHuaweiAward
                              ? 'bg-amber-400 text-black shadow-sketchSubtle -rotate-1 scale-105'
                              : 'bg-cyan-400 text-black shadow-sketchSubtle rotate-1 scale-105'
                            : 'text-[var(--pencil-text)] hover:bg-[var(--paper-card)]'
                        }`}
                      >
                        {isHuaweiAward ? (
                          <Trophy size={16} strokeWidth={2.5} className="text-black" />
                        ) : (
                          <Globe size={16} strokeWidth={2.5} className="text-black" />
                        )}
                        <span>{aw.badge || aw.title}</span>
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => setAtosfitTab('screens')}
                    className={`px-3 py-1.5 rounded font-heading font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all ${
                      atosfitTab === 'screens'
                        ? 'bg-[#ea580c] text-white shadow-sketchSubtle rotate-1 scale-105'
                        : 'text-[var(--pencil-text)] hover:bg-orange-100'
                    }`}
                  >
                    <span>📸 Live App Screens</span>
                  </button>
                </div>

                <span className={`text-xs font-heading font-bold px-2.5 py-1 rounded border ${
                  atosfitTab === 'award'
                    ? (currentAward?.id === 'wchl-2025'
                        ? 'text-cyan-800 dark:text-cyan-200 bg-cyan-100 dark:bg-zinc-800 border-cyan-400'
                        : 'text-[#ea580c] bg-amber-100 dark:bg-zinc-800 border-amber-300')
                    : 'text-[#ea580c] bg-orange-100 dark:bg-zinc-800 border-orange-300'
                }`}>
                  {atosfitTab === 'award'
                    ? (currentAward?.id === 'wchl-2025' ? 'Top 30 Global Finalist (12K+)' : 'Northern Africa Finals Winner')
                    : 'On-Device Computer Vision'}
                </span>
              </div>
            ) : null}

            {/* When Award tab is active */}
            {awardsList.length > 0 && atosfitTab === 'award' && currentAward ? (
              <div className="space-y-4">
                {/* Competition Headline Banner */}
                {currentAward.id === 'wchl-2025' ? (
                  <div className="p-3 bg-gradient-to-r from-cyan-500/15 via-sky-500/25 to-cyan-500/15 border-2 border-[var(--pencil-lead)] border-wobbly flex items-center justify-between flex-wrap gap-2 shadow-sketchSubtle">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-cyan-400 border-2 border-[var(--pencil-lead)] flex items-center justify-center text-xl shadow-xs shrink-0">
                        🌐
                      </div>
                      <div>
                        <div className="font-heading font-black text-lg sm:text-xl text-[var(--pencil-text)]">
                          Ranked Top 30 Globally — World Computer Hacker League (WCHL 2025)
                        </div>
                        <div className="font-body text-sm text-[var(--accent-red)] font-bold">
                          Global Finale among 12,000+ Projects · Powered by Internet Computer (ICP Hubs Network)
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-black text-cyan-300 font-mono font-black text-xs rounded border border-cyan-400 shadow-xs">
                        12,000+ Projects
                      </span>
                      <span className="px-2.5 py-1 bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] border border-[var(--pencil-lead)] font-heading font-bold text-xs border-wobbly -rotate-1 shadow-xs">
                        Delta University Team
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-gradient-to-r from-amber-500/15 via-yellow-500/25 to-amber-500/15 border-2 border-[var(--pencil-lead)] border-wobbly flex items-center justify-between flex-wrap gap-2 shadow-sketchSubtle">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-amber-400 border-2 border-[var(--pencil-lead)] flex items-center justify-center text-xl shadow-xs shrink-0">
                        🏆
                      </div>
                      <div>
                        <div className="font-heading font-black text-lg sm:text-xl text-[var(--pencil-text)]">
                          2nd Prize Winner — Huawei Developer Competition 2025
                        </div>
                        <div className="font-body text-sm text-[var(--accent-red)] font-bold">
                          Northern Africa Finals · Awarded USD $3,000 & Official Trophy to Team AtosFit
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-black text-amber-300 font-mono font-black text-xs rounded border border-amber-400 shadow-xs">
                        $3,000 USD
                      </span>
                      <span className="px-2.5 py-1 bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] border border-[var(--pencil-lead)] font-heading font-bold text-xs border-wobbly -rotate-1 shadow-xs">
                        Delta University Team
                      </span>
                    </div>
                  </div>
                )}

                {/* Primary Hero Stage Photograph Frame (Focus on the Main Stage Photo) */}
                <div className="relative p-3 sm:p-5 bg-[var(--paper-bg)] border-3 border-[var(--pencil-lead)] border-wobbly-md overflow-hidden shadow-sketchDeep">
                  {/* Decorative Washi Tape & Stamp */}
                  <div className={`absolute top-2 left-4 z-20 px-3 py-0.5 text-black border border-[var(--pencil-lead)] font-heading font-bold text-xs -rotate-2 shadow-xs ${
                    currentAward.id === 'wchl-2025' ? 'bg-cyan-400' : 'bg-[#ea580c] text-white'
                  }`}>
                    {currentAward.gallery[selectedAwardPhoto]?.tag || 'Competition Moment'}
                  </div>
                  <div className="absolute top-2 right-4 z-20 px-3 py-0.5 bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] border border-[var(--pencil-lead)] font-heading font-bold text-xs rotate-1 shadow-xs">
                    Photo {selectedAwardPhoto + 1} of {currentAward.gallery.length}
                  </div>

                  {/* Hero Image Container with Creative Smooth Hover Animations */}
                  <div className={`relative mt-6 group overflow-hidden rounded-md border-2 border-[var(--pencil-lead)] bg-black/5 shadow-sketch transition-all duration-500 ease-out hover:-translate-y-1 hover:rotate-[-0.4deg] ${
                    currentAward.id === 'wchl-2025'
                      ? 'hover:shadow-[0_16px_36px_rgba(6,182,212,0.35)]'
                      : 'hover:shadow-[0_16px_36px_rgba(245,158,11,0.35)]'
                  }`}>
                    <img
                      src={currentAward.gallery[selectedAwardPhoto]?.url}
                      alt={currentAward.gallery[selectedAwardPhoto]?.caption}
                      className="w-full h-auto max-h-[380px] sm:max-h-[440px] object-contain mx-auto transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />

                    {/* Subtle shimmer overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-tr from-transparent ${
                      currentAward.id === 'wchl-2025' ? 'via-cyan-400/20' : 'via-amber-300/20'
                    } to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none`} />
                    
                    {/* Floating star doodle celebration badge on hover */}
                    <div className="absolute top-3 right-3 text-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gentle-bounce">
                      {currentAward.id === 'wchl-2025' ? '✨ 🌐 🚀' : '✨ 🏆 ✨'}
                    </div>

                    {/* Left / Right Carousel Navigation Controls */}
                    {currentAward.gallery.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAwardPhoto((prev) => (prev > 0 ? prev - 1 : currentAward.gallery.length - 1));
                          }}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-2 bg-[var(--paper-card)]/90 backdrop-blur-xs border-2 border-[var(--pencil-lead)] border-wobbly text-[var(--pencil-text)] hover:bg-[var(--paper-yellow)] hover:scale-110 active:scale-95 shadow-sketchSubtle transition-all cursor-pointer"
                          aria-label="Previous photo"
                          title="Previous photo (Left Arrow key)"
                        >
                          <ChevronLeft size={20} strokeWidth={2.5} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAwardPhoto((prev) => (prev < currentAward.gallery.length - 1 ? prev + 1 : 0));
                          }}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-2 bg-[var(--paper-card)]/90 backdrop-blur-xs border-2 border-[var(--pencil-lead)] border-wobbly text-[var(--pencil-text)] hover:bg-[var(--paper-yellow)] hover:scale-110 active:scale-95 shadow-sketchSubtle transition-all cursor-pointer"
                          aria-label="Next photo"
                          title="Next photo (Right Arrow key)"
                        >
                          <ChevronRight size={20} strokeWidth={2.5} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Caption in Kalam font */}
                  <div className="mt-3.5 p-2.5 bg-[var(--paper-card)] border-2 border-dashed border-[var(--pencil-lead)]/50 border-wobbly text-center">
                    <p className="font-heading font-bold text-base sm:text-lg text-[var(--pencil-text)]">
                      {currentAward.gallery[selectedAwardPhoto]?.caption}
                    </p>
                  </div>
                </div>

                {/* Interactive Milestone Polaroid Thumbnails with Creative Hover Animations */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-heading font-bold text-[var(--pencil-faint)] uppercase tracking-wider flex items-center gap-1.5">
                      <span>✨</span>
                      <span>Click to explore {currentAward.id === 'wchl-2025' ? 'WCHL 2025 moments' : 'Huawei 2025 moments'}:</span>
                    </span>
                    <span className={`text-[11px] font-body font-bold ${
                      currentAward.id === 'wchl-2025' ? 'text-cyan-600 dark:text-cyan-400' : 'text-[#ea580c]'
                    }`}>
                      * Hover for tactile tilt effect
                    </span>
                  </div>

                  <div className={`grid gap-2.5 ${
                    currentAward.gallery.length <= 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-5'
                  }`}>
                    {currentAward.gallery.map((item, idx) => {
                      const isSelected = selectedAwardPhoto === idx;
                      const tilts = ['rotate-[-1.5deg]', 'rotate-[1.5deg]', 'rotate-[-2deg]', 'rotate-[1deg]', 'rotate-[-1deg]'];
                      return (
                        <button
                          key={item.url}
                          type="button"
                          onClick={() => setSelectedAwardPhoto(idx)}
                          className={`
                            relative p-1.5 bg-[var(--paper-card)] border-2 border-[var(--pencil-lead)] border-wobbly text-left
                            transition-all duration-300 cursor-pointer group
                            ${tilts[idx % tilts.length]}
                            hover:rotate-0 hover:scale-108 hover:-translate-y-2 hover:z-20 hover:shadow-sketchDeep
                            ${currentAward.id === 'wchl-2025' ? 'hover:border-cyan-400' : 'hover:border-amber-400'}
                            ${
                              isSelected
                                ? currentAward.id === 'wchl-2025'
                                  ? 'ring-3 ring-cyan-500 shadow-sketch bg-cyan-50 dark:bg-zinc-800 scale-105 z-10'
                                  : 'ring-3 ring-[#ea580c] shadow-sketch bg-amber-50 dark:bg-zinc-800 scale-105 z-10'
                                : 'shadow-sketchSubtle opacity-85 hover:opacity-100'
                            }
                          `}
                        >
                          {/* Thumbnail image with smooth zoom */}
                          <div className="relative aspect-[4/3] overflow-hidden rounded border border-[var(--pencil-lead)]/40 bg-black/5">
                            <img
                              src={item.url}
                              alt={item.tag}
                              className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-300"
                            />
                            {idx === 0 && (
                              <span className={`absolute top-1 left-1 px-1.5 py-0.2 text-black font-heading font-black text-[9px] rounded shadow-xs ${
                                currentAward.id === 'wchl-2025' ? 'bg-cyan-400' : 'bg-amber-400'
                              }`}>
                                {currentAward.id === 'wchl-2025' ? 'STAGE 🎤' : 'MAIN 🏆'}
                              </span>
                            )}
                          </div>
                          <div className="mt-1 font-heading font-bold text-[11px] text-[var(--pencil-text)] truncate text-center">
                            {item.tag}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* When Screens tab is active */
              <>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-heading font-bold text-lg text-[var(--pencil-text)] flex items-center gap-2">
                    <span>📸</span>
                    <span>Live Interface Showcase</span>
                    {project.mobileScreenshot && (
                      <span className="text-xs px-2 py-0.5 bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] border border-[var(--pencil-lead)] border-wobbly font-bold">
                        Desktop & Mobile
                      </span>
                    )}
                  </span>

                  {/* View Switcher if mobileScreenshot exists */}
                  {project.mobileScreenshot && (
                    <div className="flex items-center gap-1 bg-[var(--paper-bg)] p-1 border border-[var(--pencil-lead)]/40 border-wobbly text-xs font-heading">
                      <button
                        type="button"
                        onClick={() => setActiveMediaView('both')}
                        className={`px-2.5 py-1 rounded transition-all font-bold ${
                          activeMediaView === 'both'
                            ? 'bg-[#ea580c] text-white shadow-sketchSubtle'
                            : 'text-[var(--pencil-text)] hover:bg-[var(--paper-card)]'
                        }`}
                      >
                        🔀 Studio Desk (Both)
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveMediaView('desktop')}
                        className={`px-2.5 py-1 rounded transition-all font-bold ${
                          activeMediaView === 'desktop'
                            ? 'bg-[#ea580c] text-white shadow-sketchSubtle'
                            : 'text-[var(--pencil-text)] hover:bg-[var(--paper-card)]'
                        }`}
                      >
                        💻 Desktop
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveMediaView('mobile')}
                        className={`px-2.5 py-1 rounded transition-all font-bold ${
                          activeMediaView === 'mobile'
                            ? 'bg-[#ea580c] text-white shadow-sketchSubtle'
                            : 'text-[var(--pencil-text)] hover:bg-[var(--paper-card)]'
                        }`}
                      >
                        📱 Mobile
                      </button>
                    </div>
                  )}
                </div>

            {/* Gallery Display Area */}
            {activeMediaView === 'both' && project.mobileScreenshot ? (
              /* Overlapping Studio Composition */
              <div className="relative p-3 sm:p-4 bg-[var(--paper-bg)]/80 border-2 border-dashed border-[var(--pencil-lead)]/40 border-wobbly-md overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Desktop Screen Frame (7 cols on sm) */}
                  <div className="sm:col-span-7 relative">
                    {/* Sketched Browser Bar */}
                    <div className="bg-[#1e1e1e] border-2 border-[var(--pencil-lead)] border-b-0 rounded-t-md px-3 py-1 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded border border-zinc-700">
                        {project.demoUrl.replace('https://', '')}
                      </span>
                    </div>
                    {/* Desktop Screenshot */}
                    <div className="relative border-2 border-[var(--pencil-lead)] border-t-0 rounded-b-md overflow-hidden shadow-sketch bg-black">
                      <img
                        src={project.screenshot}
                        alt={`${project.title} Desktop View`}
                        className="w-full h-auto max-h-[250px] sm:max-h-[280px] object-cover object-top"
                      />
                    </div>
                    <span className="inline-block mt-1 text-xs font-body text-[var(--pencil-faint)] italic">
                      🖥️ Desktop Web Experience
                    </span>
                  </div>

                  {/* Mobile Phone Mockup (5 cols on sm) */}
                  <div className="sm:col-span-5 relative flex flex-col items-center">
                    {/* Washi Tape on Phone */}
                    <div className="px-3 py-0.5 bg-[var(--paper-yellow)] border border-[var(--pencil-lead)]/50 font-heading text-[10px] font-bold text-[var(--paper-yellow-text)] shadow-xs -rotate-2 select-none mb-1">
                      On-Device Camera
                    </div>
                    {/* Phone Chassis */}
                    <div className="relative w-full max-w-[160px] bg-black border-3 border-[var(--pencil-lead)] rounded-[22px] p-1.5 shadow-sketchDeep rotate-1 hover:rotate-0 transition-transform">
                      {/* Speaker Notch */}
                      <div className="w-10 h-1 bg-zinc-700 rounded-full mx-auto mb-1" />
                      {/* Mobile Screenshot */}
                      <div className="relative rounded-[14px] overflow-hidden bg-black aspect-[9/16] max-h-[260px]">
                        <img
                          src={project.mobileScreenshot}
                          alt={`${project.title} Mobile View`}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                    <span className="inline-block mt-1 text-xs font-body text-[var(--pencil-faint)] italic">
                      📱 Real-Time Pose Tracking
                    </span>
                  </div>
                </div>
              </div>
            ) : activeMediaView === 'mobile' && project.mobileScreenshot ? (
              /* Centered Mobile Phone View */
              <div className="relative flex flex-col items-center py-2 bg-[var(--paper-bg)]/40 border-2 border-dashed border-[var(--pencil-lead)]/30 border-wobbly-md">
                <div className="relative w-full max-w-[240px] bg-black border-3 border-[var(--pencil-lead)] rounded-[32px] p-2 shadow-sketchDeep">
                  <div className="w-16 h-1.5 bg-zinc-700 rounded-full mx-auto mb-1.5" />
                  <div className="relative rounded-[22px] overflow-hidden bg-black aspect-[9/16] max-h-[420px]">
                    <img
                      src={project.mobileScreenshot}
                      alt={`${project.title} Mobile View`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <span className="inline-block mt-2 text-sm font-heading font-bold text-[var(--accent-blue)]">
                  Mobile Camera Pose Estimation View
                </span>
              </div>
            ) : (
              /* Full Desktop View */
              <div className="relative border-3 border-[var(--pencil-lead)] border-wobbly-md overflow-hidden shadow-sketch bg-black group">
                <div className="bg-[#1e1e1e] border-b-2 border-[var(--pencil-lead)] px-3 py-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-xs font-mono text-zinc-300 bg-zinc-800 px-4 py-0.5 rounded border border-zinc-700">
                    {project.demoUrl}
                  </span>
                </div>
                <img
                  src={project.screenshot}
                  alt={`${project.title} Desktop View`}
                  className="w-full h-auto max-h-[380px] object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            </>
          )}
          </div>
        ) : null}

        {/* Impact metric callout */}
        <div className="my-5 p-3.5 bg-[var(--paper-yellow)] border-2 border-[var(--paper-yellow-border)] border-wobbly flex items-center gap-3">
          <Sparkles size={22} strokeWidth={2.5} className="text-[var(--accent-red)] shrink-0" />
          <span className="font-heading font-bold text-lg text-[var(--paper-yellow-text)]">
            Key Metric: {project.impactMetric}
          </span>
        </div>

        {/* Description */}
        <div className="space-y-4 my-5 text-xl font-body text-[var(--pencil-text)]/90 leading-relaxed">
          <p>{project.description}</p>

          <h3 className="font-heading font-bold text-2xl text-[var(--pencil-text)] pt-2 flex items-center gap-2">
            <Layers size={22} strokeWidth={2.5} className="text-[var(--accent-blue)]" />
            Architecture & Highlights
          </h3>

          <ul className="space-y-2.5">
            {project.detailedNotes.map((note, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 size={20} strokeWidth={2.5} className="text-[var(--accent-red)] shrink-0 mt-1" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Pills */}
        <div className="pt-4 border-t-2 border-dashed border-[var(--pencil-lead)]/30">
          <span className="font-heading font-bold text-base text-[var(--pencil-text)] block mb-2">
            Technologies & Tools:
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[var(--paper-bg)] border-2 border-dashed border-[var(--pencil-lead)] border-wobbly text-base font-body text-[var(--pencil-text)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-[var(--pencil-lead)]">
          <div className="flex items-center flex-wrap gap-3 sm:gap-4">
            {project.id === 'atosfit-ai' ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-[#ea580c] hover:bg-[#c2410c] text-white font-heading font-bold text-lg sm:text-xl border-2 border-[var(--pencil-lead)] border-wobbly shadow-sketch hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all group relative"
                aria-label="Launch AtosFit Live Website"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping shrink-0" />
                <span>Launch atosfit.com 🚀</span>
                <ExternalLink size={20} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ) : project.id === 'quadpod-security-robot' ? (
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('modal-project-title');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-heading font-bold text-lg sm:text-xl border-2 border-[var(--pencil-lead)] border-wobbly shadow-sketch hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all group cursor-pointer"
                aria-label="Scroll to Quadpod Robot Specifications"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping shrink-0" />
                <span>YOLOv9 Robot Specs 🤖</span>
                <Bot size={20} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
              </button>
            ) : project.id === 'autonomous-firefighter-robot' ? (
              <button
                type="button"
                onClick={() => {
                  setFirefighterView((v) => (v === 'hardware' ? 'schematic' : v === 'schematic' ? 'app' : 'hardware'));
                }}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-heading font-bold text-lg sm:text-xl border-2 border-[var(--pencil-lead)] border-wobbly shadow-sketch hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all group cursor-pointer"
                aria-label="Cycle between robot hardware, wiring schematic, and mobile app"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping shrink-0" />
                <span>View: {firefighterView === 'hardware' ? 'Wiring Schematic' : firefighterView === 'schematic' ? 'Remote App' : 'Hardware Prototype'} 🚒</span>
                <Flame size={20} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform text-amber-300" />
              </button>
            ) : (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-[var(--accent-red)] hover:opacity-90 text-white font-heading font-bold text-lg sm:text-xl border-2 border-[var(--pencil-lead)] border-wobbly shadow-sketch hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all group"
              >
                <span>{project.customCtaLabel || "Launch Demo"}</span>
                <ExternalLink size={20} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}

            {project.id === 'atosfit-ai' && (
              <span className="hidden sm:inline-block font-heading font-bold text-sm text-[#ea580c] -rotate-2 animate-gentle-bounce">
                👈 Experience real-time CV at atosfit.com!
              </span>
            )}

            {project.id === 'quadpod-security-robot' && (
              <span className="hidden sm:inline-block font-heading font-bold text-sm text-[#2563eb] -rotate-2 animate-gentle-bounce">
                👈 Autonomous YOLOv9 Threat Detection Prototype!
              </span>
            )}

            {project.id === 'autonomous-firefighter-robot' && (
              <span className="hidden sm:inline-block font-heading font-bold text-sm text-[#dc2626] -rotate-2 animate-gentle-bounce">
                👈 Autonomous Flame Detection & Water Pump Extinguisher!
              </span>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--paper-card)] text-[var(--pencil-text)] font-body text-lg border-2 border-[var(--pencil-lead)] border-wobbly shadow-sketch hover:bg-[var(--paper-muted)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <SketchedGithub size={18} />
              <span>Source</span>
            </a>
          </div>

          <Button variant="paper" size="sm" onClick={onClose}>
            Done Reading
          </Button>
        </div>

      </div>
    </div>
  );
};
