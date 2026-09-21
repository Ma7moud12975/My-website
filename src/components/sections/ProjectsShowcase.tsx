import React, { useState } from 'react';
import { ExternalLink, Eye, Sparkles, FolderGit2, Bot, GraduationCap, Flame, Trophy, Globe } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { Project, ProjectCategory } from '../../types';
import { WobblyCard } from '../ui/WobblyCard';
import { ProjectDetailModal } from '../modals/ProjectDetailModal';
import { SketchedGithub } from '../ui/SketchDoodles';

// Sketched mockup preview thumbnails for each project
interface SketchedThumbnailProps {
  type: string;
  bgTone: 'white' | 'yellow';
  screenshot?: string;
  mobileScreenshot?: string;
  schematicImage?: string;
  awardImage?: string;
  wchlImage?: string;
}

const SketchedThumbnail: React.FC<SketchedThumbnailProps> = ({ 
  type, 
  bgTone, 
  screenshot, 
  mobileScreenshot,
  schematicImage,
  awardImage,
  wchlImage
}) => {
  const [thumbMode, setThumbMode] = useState<'award' | 'wchl' | 'photo' | 'sketch'>(
    type === 'atosfit-vision' ? 'award' : 'photo'
  );

  return (
    <div className="w-full h-52 bg-[var(--paper-bg)] border-2 border-dashed border-[var(--pencil-lead)]/60 border-wobbly p-3.5 relative overflow-hidden flex flex-col justify-between select-none">
      {/* Mockup browser/canvas header */}
      <div className="flex items-center justify-between border-b border-[var(--pencil-lead)]/30 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border border-[var(--pencil-lead)] bg-[var(--accent-red)]" />
          <span className="w-2.5 h-2.5 rounded-full border border-[var(--pencil-lead)] bg-[var(--paper-yellow)]" />
          <span className="w-2.5 h-2.5 rounded-full border border-[var(--pencil-lead)] bg-[var(--accent-blue)]" />
        </div>

        {type === 'atosfit-vision' ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setThumbMode('award');
              }}
              className={`px-1.5 py-0.5 border border-[var(--pencil-lead)] border-wobbly text-[10px] sm:text-[11px] font-heading font-bold transition-all ${
                thumbMode === 'award'
                  ? 'bg-amber-400 text-black shadow-sketchSubtle -rotate-1 scale-105'
                  : 'bg-[var(--paper-card)] text-[var(--pencil-text)] hover:bg-amber-100'
              }`}
              title="View Huawei Developer Competition 2025 Award Photo"
            >
              🏆 Huawei
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setThumbMode('wchl');
              }}
              className={`px-1.5 py-0.5 border border-[var(--pencil-lead)] border-wobbly text-[10px] sm:text-[11px] font-heading font-bold transition-all ${
                thumbMode === 'wchl'
                  ? 'bg-cyan-400 text-black shadow-sketchSubtle rotate-1 scale-105'
                  : 'bg-[var(--paper-card)] text-[var(--pencil-text)] hover:bg-cyan-100'
              }`}
              title="View World Computer Hacker League Top 30 Global"
            >
              🌐 WCHL
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setThumbMode('photo');
              }}
              className={`px-1.5 py-0.5 border border-[var(--pencil-lead)] border-wobbly text-[10px] sm:text-[11px] font-heading font-bold transition-all ${
                thumbMode === 'photo'
                  ? 'bg-[#ea580c] text-white shadow-sketchSubtle -rotate-1 scale-105'
                  : 'bg-[var(--paper-card)] text-[var(--pencil-text)] hover:bg-orange-100'
              }`}
              title="View Live App Screens"
            >
              📸 Screens
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setThumbMode('sketch');
              }}
              className={`px-1.5 py-0.5 border border-[var(--pencil-lead)] border-wobbly text-[10px] sm:text-[11px] font-heading font-bold transition-all ${
                thumbMode === 'sketch'
                  ? 'bg-[var(--accent-blue)] text-white shadow-sketchSubtle scale-105'
                  : 'bg-[var(--paper-card)] text-[var(--pencil-text)] hover:bg-blue-100'
              }`}
              title="View Pose Kinematics Sketch"
            >
              ✏️ Pose
            </button>
          </div>
        ) : (type === 'quadpod-robot' || type === 'firefighter-robot') && screenshot ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setThumbMode(thumbMode === 'photo' ? 'sketch' : 'photo');
            }}
            className="px-2.5 py-0.5 bg-[var(--paper-yellow)] border border-[var(--pencil-lead)] border-wobbly text-xs font-heading font-bold text-[var(--paper-yellow-text)] hover:bg-[#ea580c] hover:text-white transition-colors flex items-center gap-1 shadow-sketchSubtle"
            title="Toggle between Live Photo and Hand-drawn Sketch"
          >
            {thumbMode === 'photo' ? (
              <>
                <span>✏️</span>
                <span>
                  {type === 'firefighter-robot'
                    ? 'Wiring Schematic'
                    : type === 'quadpod-robot'
                    ? 'Kinematics Sketch'
                    : 'Pose Sketch'}
                </span>
              </>
            ) : (
              <>
                <span>📸</span>
                <span>Robot Photo</span>
              </>
            )}
          </button>
        ) : (
          <div className="px-2 py-0.5 bg-[var(--paper-card)] border border-[var(--pencil-lead)]/40 rounded text-xs font-mono text-[var(--pencil-faint)]">
            sketch://{type}.spec
          </div>
        )}
      </div>

      {/* Sketched UI wireframe contents based on type */}
      {type === 'atosfit-vision' && thumbMode === 'award' && (
        <div className="relative my-auto h-32 flex items-center justify-between gap-2 overflow-hidden py-1 px-1 bg-[var(--paper-bg)]/40 rounded border border-dashed border-amber-400/60 group/award cursor-pointer">
          {/* Left: Main Stage Winning Photograph with hover animation */}
          <div className="relative w-[60%] h-full flex items-center justify-center bg-black rounded border-2 border-[var(--pencil-lead)] shadow-sketchSubtle overflow-hidden">
            {/* Washi Tape Badge */}
            <div className="absolute top-1 left-1.5 z-10 text-[8px] font-heading font-black bg-amber-400 text-black px-1.5 py-0.5 rounded shadow-xs -rotate-2">
              🏆 2nd Prize ($3,000)
            </div>
            <img 
              src={awardImage || "/huawei-winner-main.jpg"} 
              alt="AtosFit Huawei Developer Competition 2025 2nd Place Winners" 
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/award:scale-108"
            />
            {/* Golden Shimmer on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-transparent opacity-0 group-hover/award:opacity-100 transition-opacity pointer-events-none" />
          </div>

          {/* Right: Competition Badges & Metrics */}
          <div className="relative w-[40%] h-full flex flex-col justify-between py-0.5 px-1">
            <div className="space-y-0.5">
              <span className="px-1.5 py-0.5 bg-amber-400 text-black font-heading font-black text-[9px] border border-[var(--pencil-lead)] border-wobbly shadow-xs inline-flex items-center gap-1">
                <span>🏆</span>
                <span>HUAWEI 2025</span>
              </span>
              <div className="text-[10px] font-heading font-bold text-[var(--pencil-text)] leading-tight pt-1">
                Northern Africa Finals
              </div>
            </div>

            <div className="space-y-0.5 text-[10px] font-heading">
              <div className="text-[var(--accent-red)] font-bold">USD $3,000 Prize</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">Trophy & Cert.</div>
            </div>

            <div className="text-[9px] font-body text-[var(--pencil-faint)] border-t border-dashed border-[var(--pencil-lead)]/30 pt-0.5 truncate">
              Delta Univ. Team
            </div>
          </div>
        </div>
      )}
      {type === 'atosfit-vision' && thumbMode === 'wchl' && (
        <div className="relative my-auto h-32 flex items-center justify-between gap-2 overflow-hidden py-1 px-1 bg-[var(--paper-bg)]/40 rounded border border-dashed border-cyan-500/60 group/wchl cursor-pointer">
          {/* Left: Presentation Pitch photograph with hover animation */}
          <div className="relative w-[58%] h-full flex items-center justify-center bg-black rounded border-2 border-[var(--pencil-lead)] shadow-sketchSubtle overflow-hidden">
            {/* Washi Tape Badge */}
            <div className="absolute top-1 left-1.5 z-10 text-[8px] font-heading font-black bg-cyan-400 text-black px-1.5 py-0.5 rounded shadow-xs -rotate-2">
              🌐 Top 30 Global
            </div>
            <img 
              src={wchlImage || "/wchl-presentation.jpg"} 
              alt="AtosFit World Computer Hacker League Top 30 Global" 
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/wchl:scale-108"
            />
            {/* Cyan Shimmer on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-transparent opacity-0 group-hover/wchl:opacity-100 transition-opacity pointer-events-none" />
          </div>

          {/* Right: Scale & Milestone Badges */}
          <div className="relative w-[42%] h-full flex flex-col justify-between py-0.5 px-1">
            <div className="space-y-0.5">
              <span className="px-1.5 py-0.5 bg-cyan-400 text-black font-heading font-black text-[9px] border border-[var(--pencil-lead)] border-wobbly shadow-xs inline-flex items-center gap-1">
                <span>🌐</span>
                <span>WCHL 2025</span>
              </span>
              <div className="text-[10px] font-heading font-bold text-[var(--pencil-text)] leading-tight pt-1">
                Top 30 Global Rank
              </div>
            </div>

            <div className="space-y-0.5 text-[10px] font-heading">
              <div className="text-[var(--accent-red)] font-bold">12,000+ Projects</div>
              <div className="text-cyan-700 dark:text-cyan-400 font-bold truncate">ICP Network</div>
            </div>

            <div className="text-[9px] font-body text-[var(--pencil-faint)] border-t border-dashed border-[var(--pencil-lead)]/30 pt-0.5 truncate">
              Global Finale
            </div>
          </div>
        </div>
      )}
      {type === 'atosfit-vision' && thumbMode === 'photo' && screenshot && (
        <div className="relative my-auto h-32 flex items-center gap-2 overflow-hidden py-1">
          {/* Desktop Preview Card (Left 62%) */}
          <div className="relative w-[62%] h-full rounded border-2 border-[var(--pencil-lead)] overflow-hidden shadow-sketchSubtle bg-black group/desk">
            <div className="bg-[#1f1f1f] border-b border-zinc-700 px-2 py-0.5 flex items-center justify-between">
              <span className="text-[9px] font-mono text-zinc-300">atosfit.com</span>
              <span className="text-[8px] text-emerald-400 font-bold flex items-center gap-0.5">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping inline-block" />
                LIVE
              </span>
            </div>
            <img 
              src={screenshot} 
              alt="AtosFit Desktop Landing" 
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/desk:scale-105"
            />
          </div>

          {/* Mobile Preview Phone (Right 38%) overlapping with tilt */}
          <div className="relative w-[38%] h-full flex flex-col items-center justify-center">
            {/* Washi tape snippet */}
            <div className="absolute -top-1.5 right-2 z-10 px-2 py-0.5 bg-[var(--paper-yellow)] border border-[var(--pencil-lead)]/50 text-[8px] font-heading font-bold text-[var(--paper-yellow-text)] -rotate-6 shadow-xs select-none">
              Mobile CV
            </div>
            <div className="relative w-full max-w-[90px] h-[92%] bg-black border-2 border-[var(--pencil-lead)] rounded-[14px] p-1 shadow-sketchSubtle rotate-3 hover:rotate-0 transition-transform">
              <div className="w-6 h-0.5 bg-zinc-700 rounded-full mx-auto mb-0.5" />
              <div className="relative rounded-[9px] overflow-hidden bg-black h-[88%]">
                <img 
                  src={mobileScreenshot || screenshot} 
                  alt="AtosFit Mobile App" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {type === 'atosfit-vision' && (thumbMode === 'sketch' || !screenshot) && (
        <div className="relative my-auto h-28 flex items-center justify-between gap-3 px-1 overflow-hidden">
          {/* Left: Pose Kinematics SVG & Status */}
          <div className="relative flex-1 h-full flex flex-col justify-between py-0.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-[#ea580c] text-white font-heading font-bold text-[10px] border border-[var(--pencil-lead)] border-wobbly shadow-xs flex items-center gap-1">
                <span>💪</span>
                <span>ATOS fit</span>
              </span>
              <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                Real-Time CV
              </span>
            </div>

            {/* Pose skeleton illustration */}
            <div className="flex items-center gap-2">
              <svg className="w-20 h-16 shrink-0" viewBox="0 0 60 50" fill="none">
                {/* Skeleton Head */}
                <circle cx="30" cy="8" r="4" fill="var(--paper-yellow)" stroke="var(--pencil-lead)" strokeWidth="1.5" />
                {/* Spine */}
                <line x1="30" y1="12" x2="30" y2="28" stroke="var(--pencil-lead)" strokeWidth="2" />
                {/* Arms & Angle */}
                <line x1="30" y1="16" x2="16" y2="22" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
                <line x1="16" y1="22" x2="12" y2="34" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
                <line x1="30" y1="16" x2="44" y2="22" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
                <line x1="44" y1="22" x2="48" y2="34" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
                {/* Joint Nodes */}
                <circle cx="16" cy="22" r="2.5" fill="#2d5da1" />
                <circle cx="44" cy="22" r="2.5" fill="#2d5da1" />
                <circle cx="30" cy="28" r="2.5" fill="#ff4d4d" />
                {/* Legs & Knee Angle */}
                <line x1="30" y1="28" x2="20" y2="46" stroke="var(--pencil-lead)" strokeWidth="2" />
                <line x1="30" y1="28" x2="40" y2="46" stroke="var(--pencil-lead)" strokeWidth="2" />
                <circle cx="20" cy="46" r="2" fill="var(--accent-red)" />
                <circle cx="40" cy="46" r="2" fill="var(--accent-red)" />
              </svg>

              {/* Metrics */}
              <div className="space-y-1 text-[11px] font-heading">
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--pencil-faint)]">Form:</span>
                  <span className="text-[#ea580c] font-bold">98.4% Perfect ✅</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--pencil-faint)]">Posture:</span>
                  <span className="text-[var(--accent-blue)] font-bold">Full ROM Tracked</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-body text-[var(--pencil-faint)] border-t border-dashed border-[var(--pencil-lead)]/30 pt-0.5">
              <span>🔒 100% On-Device Privacy</span>
              <span className="text-[var(--accent-red)] font-bold">Delta University AI</span>
            </div>
          </div>

          {/* Right: Phone Rep Counter Card */}
          <div className="w-20 shrink-0 h-full bg-[var(--paper-card)] border-2 border-[var(--pencil-lead)] border-wobbly p-1.5 flex flex-col items-center justify-between text-center shadow-sketchSubtle">
            <span className="text-[9px] font-heading font-bold text-[var(--pencil-faint)] uppercase tracking-tight">Reps</span>
            <span className="font-heading font-black text-2xl text-[#ea580c] leading-none">12</span>
            <span className="text-[8px] font-mono px-1 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded font-bold">
              PERFECT
            </span>
          </div>
        </div>
      )}

      {type === 'quadpod-robot' && thumbMode === 'photo' && screenshot && (
        <div className="relative my-auto h-32 flex items-center justify-between gap-2 overflow-hidden py-1 px-1 bg-[var(--paper-bg)]/40 rounded border border-dashed border-[var(--pencil-lead)]/30">
          {/* Left: Real Robot Image with Scanning HUD */}
          <div className="relative w-[48%] h-full flex items-center justify-center bg-[var(--paper-card)] rounded border-2 border-[var(--pencil-lead)] shadow-sketchSubtle p-1 overflow-hidden group/bot">
            <div className="absolute top-1 left-1.5 z-10 text-[8px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              ESP32 CAM
            </div>
            <img 
              src={screenshot} 
              alt="Quadpod Security Robot" 
              className="h-full w-auto object-contain transition-transform duration-300 group-hover/bot:scale-110 drop-shadow-md"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none animate-pulse" />
          </div>

          {/* Right: YOLOv9 Detection HUD & Threat Status */}
          <div className="relative w-[52%] h-full flex flex-col justify-between py-1 px-1">
            <div className="flex items-center justify-between">
              <span className="px-1.5 py-0.5 bg-[#2563eb] text-white font-heading font-bold text-[10px] border border-[var(--pencil-lead)] border-wobbly shadow-xs flex items-center gap-1">
                <span>🤖</span>
                <span>YOLOv9 API</span>
              </span>
              <span className="font-mono text-[9px] text-[var(--accent-red)] font-bold">
                Threat Radar 🔴
              </span>
            </div>

            <div className="space-y-1 text-[11px] font-heading">
              <div className="flex items-center justify-between">
                <span className="text-[var(--pencil-faint)]">Target:</span>
                <span className="text-[var(--accent-red)] font-bold">Weapons / Blades</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--pencil-faint)]">Accuracy:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">96.8% (Sub-40ms)</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-body text-[var(--pencil-faint)] border-t border-dashed border-[var(--pencil-lead)]/30 pt-0.5">
              <span>Quadpod Kinematics</span>
              <span className="text-[#2563eb] font-bold">Delta University</span>
            </div>
          </div>
        </div>
      )}

      {type === 'quadpod-robot' && (thumbMode === 'sketch' || !screenshot) && (
        <div className="relative my-auto h-28 flex items-center justify-between gap-3 px-1 overflow-hidden">
          {/* Left: Hand-Drawn Robot Kinematics SVG Wireframe */}
          <div className="relative flex-1 h-full flex flex-col justify-between py-0.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-[#2563eb] text-white font-heading font-bold text-[10px] border border-[var(--pencil-lead)] border-wobbly shadow-xs flex items-center gap-1">
                <span>🦾</span>
                <span>4-Leg Kinematics</span>
              </span>
              <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                YOLOv9 Active
              </span>
            </div>

            {/* Sketched 4-legged Quadpod SVG */}
            <div className="flex items-center gap-2">
              <svg className="w-24 h-16 shrink-0" viewBox="0 0 80 50" fill="none">
                {/* Detection Vision Cone */}
                <polygon points="40,16 10,2 10,30" fill="var(--accent-red)" opacity="0.15" />
                <line x1="40" y1="16" x2="10" y2="2" stroke="var(--accent-red)" strokeWidth="1" strokeDasharray="3 2" />
                <line x1="40" y1="16" x2="10" y2="30" stroke="var(--accent-red)" strokeWidth="1" strokeDasharray="3 2" />
                <text x="12" y="18" fill="var(--accent-red)" fontSize="6" fontFamily="Patrick Hand" fontWeight="bold">SCAN CONE</text>

                {/* Central Body Chassis */}
                <rect x="32" y="16" width="28" height="14" rx="2" fill="var(--paper-yellow)" stroke="var(--pencil-lead)" strokeWidth="1.5" />
                {/* ESP32-CAM optical eye */}
                <circle cx="32" cy="22" r="3.5" fill="var(--accent-blue)" stroke="var(--pencil-lead)" strokeWidth="1.2" />
                <circle cx="32" cy="22" r="1.5" fill="white" />
                {/* Microcontroller lines */}
                <line x1="38" y1="20" x2="52" y2="20" stroke="var(--pencil-lead)" strokeWidth="1" />
                <line x1="38" y1="24" x2="48" y2="24" stroke="var(--pencil-lead)" strokeWidth="1" />

                {/* Front Left Leg */}
                <line x1="36" y1="28" x2="24" y2="38" stroke="var(--pencil-lead)" strokeWidth="2" strokeLinecap="round" />
                <line x1="24" y1="38" x2="20" y2="48" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                <circle cx="24" cy="38" r="2" fill="#2563eb" />
                <circle cx="20" cy="48" r="1.5" fill="var(--pencil-lead)" />

                {/* Front Right Leg */}
                <line x1="42" y1="28" x2="40" y2="40" stroke="var(--pencil-lead)" strokeWidth="2" strokeLinecap="round" />
                <line x1="40" y1="40" x2="44" y2="48" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                <circle cx="40" cy="40" r="2" fill="#2563eb" />
                <circle cx="44" cy="48" r="1.5" fill="var(--pencil-lead)" />

                {/* Rear Left Leg */}
                <line x1="52" y1="28" x2="56" y2="38" stroke="var(--pencil-lead)" strokeWidth="2" strokeLinecap="round" />
                <line x1="56" y1="38" x2="52" y2="48" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                <circle cx="56" cy="38" r="2" fill="#2563eb" />
                <circle cx="52" cy="48" r="1.5" fill="var(--pencil-lead)" />

                {/* Rear Right Leg */}
                <line x1="58" y1="28" x2="68" y2="38" stroke="var(--pencil-lead)" strokeWidth="2" strokeLinecap="round" />
                <line x1="68" y1="38" x2="72" y2="48" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                <circle cx="68" cy="38" r="2" fill="#2563eb" />
                <circle cx="72" cy="48" r="1.5" fill="var(--pencil-lead)" />
              </svg>

              {/* Metrics */}
              <div className="space-y-1 text-[11px] font-heading">
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--pencil-faint)]">Model:</span>
                  <span className="text-[#2563eb] font-bold">YOLOv9 Custom</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--pencil-faint)]">Sensors:</span>
                  <span className="text-[var(--accent-red)] font-bold">ESP32-CAM WiFi</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-body text-[var(--pencil-faint)] border-t border-dashed border-[var(--pencil-lead)]/30 pt-0.5">
              <span>🎯 Real-Time Threat Classification</span>
              <span className="text-[var(--accent-red)] font-bold">Delta University</span>
            </div>
          </div>

          {/* Right: Security Threat Badge */}
          <div className="w-20 shrink-0 h-full bg-[var(--paper-card)] border-2 border-[var(--pencil-lead)] border-wobbly p-1.5 flex flex-col items-center justify-between text-center shadow-sketchSubtle">
            <span className="text-[9px] font-heading font-bold text-[var(--pencil-faint)] uppercase tracking-tight">Latency</span>
            <span className="font-heading font-black text-2xl text-[#2563eb] leading-none">38ms</span>
            <span className="text-[8px] font-mono px-1 bg-blue-500/15 text-blue-600 dark:text-blue-400 rounded font-bold">
              EDGE API
            </span>
          </div>
        </div>
      )}

      {type === 'firefighter-robot' && thumbMode === 'photo' && screenshot && (
        <div className="relative my-auto h-32 flex items-center justify-between gap-2 overflow-hidden py-1 px-1 bg-[var(--paper-bg)]/40 rounded border border-dashed border-[var(--pencil-lead)]/30">
          {/* Left: Real Firefighter Robot Photo with Telemetry HUD */}
          <div className="relative w-[48%] h-full flex items-center justify-center bg-[var(--paper-card)] rounded border-2 border-[var(--pencil-lead)] shadow-sketchSubtle p-1 overflow-hidden group/bot">
            <div className="absolute top-1 left-1.5 z-10 text-[8px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              HC-05 BT
            </div>
            <img 
              src={screenshot} 
              alt="Autonomous Firefighter Robot" 
              className="h-full w-auto object-contain transition-transform duration-300 group-hover/bot:scale-110 drop-shadow-md"
            />
            {/* Heat aura overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent pointer-events-none animate-pulse" />
          </div>

          {/* Right: Flame Sensing & Actuation Status HUD */}
          <div className="relative w-[52%] h-full flex flex-col justify-between py-1 px-1">
            <div className="flex items-center justify-between">
              <span className="px-1.5 py-0.5 bg-[#dc2626] text-white font-heading font-bold text-[10px] border border-[var(--pencil-lead)] border-wobbly shadow-xs flex items-center gap-1">
                <span>🔥</span>
                <span>Flame Sense</span>
              </span>
              <span className="font-mono text-[9px] text-[#ea580c] font-bold">
                Sonar: 42cm Safe
              </span>
            </div>

            <div className="space-y-1 text-[11px] font-heading">
              <div className="flex items-center justify-between">
                <span className="text-[var(--pencil-faint)]">Pump Relay:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">ARMED 💧</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--pencil-faint)]">Drive:</span>
                <span className="text-[#2563eb] font-bold">4WD L298N (3S)</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-body text-[var(--pencil-faint)] border-t border-dashed border-[var(--pencil-lead)]/30 pt-0.5">
              <span>Auto Extinguisher</span>
              <span className="text-[#dc2626] font-bold">Delta University</span>
            </div>
          </div>
        </div>
      )}

      {type === 'firefighter-robot' && (thumbMode === 'sketch' || !screenshot) && (
        <div className="relative my-auto h-32 flex items-center justify-between gap-2 overflow-hidden py-1 px-1 bg-[var(--paper-bg)]/50 rounded border border-dashed border-[var(--pencil-lead)]/30">
          {/* Left: Schematic Fritzing Circuit Diagram Frame */}
          <div className="relative w-[55%] h-full flex items-center justify-center bg-white rounded border-2 border-[var(--pencil-lead)] shadow-sketchSubtle p-1 overflow-hidden group/schem">
            <div className="absolute top-1 left-1.5 z-10 text-[8px] font-mono text-[#2563eb] font-bold bg-white/90 px-1 rounded border border-[var(--pencil-lead)]/30">
              ⚡ Fritzing Circuit
            </div>
            <img 
              src={schematicImage || '/firefighter-schematic.png'} 
              alt="Firefighter Robot Circuit Schematic" 
              className="w-full h-full object-contain transition-transform duration-300 group-hover/schem:scale-125"
            />
          </div>

          {/* Right: Embedded Pinout Specs */}
          <div className="relative w-[45%] h-full flex flex-col justify-between py-1 px-1">
            <div className="flex items-center justify-between">
              <span className="px-1.5 py-0.5 bg-[#2563eb] text-white font-heading font-bold text-[10px] border border-[var(--pencil-lead)] border-wobbly shadow-xs flex items-center gap-1">
                <span>⚡</span>
                <span>Arduino</span>
              </span>
              <span className="font-mono text-[9px] text-[#dc2626] font-bold">
                5V Relay
              </span>
            </div>

            <div className="space-y-0.5 text-[10px] font-heading text-[var(--pencil-faint)]">
              <div>• 2x Flame IR Sensors</div>
              <div>• HC-SR04 Sonar</div>
              <div>• L298N 4-Motor Drive</div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-body text-[var(--pencil-faint)] border-t border-dashed border-[var(--pencil-lead)]/30 pt-0.5">
              <span>Hover to Zoom</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Complete Pinout</span>
            </div>
          </div>
        </div>
      )}

      {type === 'ui-system' && (
        <div className="my-auto space-y-2 px-1">
          {/* Row 1: Interactive Switch & Tactile Button */}
          <div className="flex items-center justify-between gap-2">
            {/* Hand-drawn toggle switch */}
            <div className="flex items-center gap-1.5">
              <div className="w-9 h-5 bg-[var(--paper-yellow)] border-2 border-[var(--pencil-lead)] rounded-full relative flex items-center px-0.5 shadow-sketchSubtle">
                <div className="w-3.5 h-3.5 rounded-full bg-[var(--accent-red)] border border-[var(--pencil-lead)] ml-auto" />
              </div>
              <span className="text-xs font-heading font-bold text-[var(--pencil-text)]">ON</span>
            </div>

            {/* Sketched action button */}
            <div className="px-2.5 py-1 bg-[var(--accent-blue)] text-white border-2 border-[var(--pencil-lead)] border-wobbly text-xs font-heading font-bold shadow-sketchSubtle flex items-center gap-1">
              <span>Publish</span>
              <span className="text-[10px]">✨</span>
            </div>

            {/* Micro badge */}
            <div className="px-2 py-0.5 bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] border border-[var(--pencil-lead)] border-wobbly text-[10px] font-bold">
              v2.4
            </div>
          </div>

          {/* Row 2: Organic Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-heading text-[var(--pencil-faint)]">
              <span>TACTILE SENSITIVITY</span>
              <span className="text-[var(--accent-blue)] font-bold">78%</span>
            </div>
            <div className="relative h-3 flex items-center">
              <div className="w-full h-1.5 bg-[var(--paper-card)] border border-[var(--pencil-lead)] rounded-full overflow-hidden">
                <div className="h-full w-[78%] bg-[var(--accent-red)]" />
              </div>
              <div className="absolute left-[76%] -top-0.5 w-3.5 h-3.5 bg-[var(--paper-yellow)] border-2 border-[var(--pencil-lead)] rounded-full shadow-sketchSubtle" />
            </div>
          </div>

          {/* Row 3: Color Swatches & Organic Radii Note */}
          <div className="flex items-center justify-between pt-1 border-t border-dashed border-[var(--pencil-lead)]/30 text-[11px] font-body text-[var(--pencil-faint)]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff4d4d] border border-[var(--pencil-lead)] shadow-xs" title="Carmine Lead" />
              <span className="w-3 h-3 rounded-full bg-[#2d5da1] border border-[var(--pencil-lead)] shadow-xs" title="Ballpoint Blue" />
              <span className="w-3 h-3 rounded-full bg-[#eab308] border border-[var(--pencil-lead)] shadow-xs" title="Highlighter Yellow" />
            </div>
            <span className="italic font-mono text-[10px]">255px 15px radii</span>
          </div>
        </div>
      )}

      {type === 'canvas-flow' && (
        <div className="relative my-auto h-28 flex flex-col justify-between overflow-hidden">
          {/* Spatial Canvas Grid with Vector Nodes */}
          <div className="relative flex-1">
            <svg className="w-full h-full" viewBox="0 0 240 75" fill="none">
              {/* Curved spline connector arrow */}
              <path 
                d="M 68 30 C 110 5, 140 65, 175 32" 
                stroke="var(--accent-blue)" 
                strokeWidth="2.5" 
                strokeDasharray="4 2" 
              />
              <polygon points="178,28 170,36 177,39" fill="var(--accent-blue)" />

              {/* Node 1: Yellow Wireframe Note */}
              <g transform="translate(8, 12)">
                <rect width="64" height="34" rx="3" fill="var(--paper-yellow)" stroke="var(--pencil-lead)" strokeWidth="1.5" />
                <text x="6" y="15" fill="var(--paper-yellow-text)" fontSize="8" fontFamily="Kalam" fontWeight="bold">Wireframe ✏️</text>
                <line x1="6" y1="22" x2="55" y2="22" stroke="var(--pencil-lead)" strokeWidth="1" strokeDasharray="2 1" />
                <line x1="6" y1="26" x2="42" y2="26" stroke="var(--pencil-lead)" strokeWidth="1" strokeDasharray="2 1" />
              </g>

              {/* Node 2: Blue Blueprint Note */}
              <g transform="translate(170, 15)">
                <rect width="62" height="34" rx="3" fill="var(--paper-card)" stroke="var(--pencil-lead)" strokeWidth="1.5" />
                <text x="6" y="15" fill="var(--pencil-text)" fontSize="8" fontFamily="Kalam" fontWeight="bold">Deploy API 🚀</text>
                <circle cx="12" cy="24" r="3" fill="var(--accent-red)" />
                <circle cx="22" cy="24" r="3" fill="var(--accent-blue)" />
                <circle cx="32" cy="24" r="3" fill="var(--paper-yellow)" />
              </g>

              {/* Cursor 1: Mahmoud */}
              <g transform="translate(68, 38)">
                <path d="M0 0 L3 9 L5 5 L9 3 Z" fill="var(--accent-red)" stroke="var(--pencil-lead)" strokeWidth="1" />
                <rect x="6" y="2" width="50" height="12" rx="2" fill="var(--accent-red)" />
                <text x="8" y="11" fill="white" fontSize="7" fontFamily="Patrick Hand" fontWeight="bold">Mahmoud ✏️</text>
              </g>

              {/* Cursor 2: Sarah */}
              <g transform="translate(145, 10)">
                <path d="M0 0 L3 9 L5 5 L9 3 Z" fill="var(--accent-blue)" stroke="var(--pencil-lead)" strokeWidth="1" />
                <rect x="6" y="2" width="40" height="12" rx="2" fill="var(--accent-blue)" />
                <text x="8" y="11" fill="white" fontSize="7" fontFamily="Patrick Hand" fontWeight="bold">Sarah 🎨</text>
              </g>
            </svg>
          </div>

          {/* Bottom Live Sync & Palette Strip */}
          <div className="flex items-center justify-between pt-1 border-t border-dashed border-[var(--pencil-lead)]/30 text-[10px] font-heading font-bold">
            <span className="flex items-center gap-1 text-[var(--accent-blue)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              12ms WebSocket Sync
            </span>
            <div className="flex items-center gap-1 text-[var(--pencil-faint)] bg-[var(--paper-card)] px-1.5 py-0.5 border border-[var(--pencil-lead)]/40 rounded">
              <span>✏️</span>
              <span>📐</span>
              <span>🏷️</span>
            </div>
          </div>
        </div>
      )}

      {type === 'notebook-reader' && (
        <div className="my-auto space-y-2 px-1">
          {/* Notebook ruled page simulation with drop cap */}
          <div className="flex items-start gap-3">
            {/* Kalam Drop Cap */}
            <div className="w-9 h-9 shrink-0 bg-[var(--paper-yellow)] border-2 border-[var(--pencil-lead)] border-wobbly flex items-center justify-center font-heading font-bold text-2xl text-[var(--paper-yellow-text)] shadow-sketchSubtle -rotate-2">
              A
            </div>
            {/* Lined sentences */}
            <div className="flex-1 space-y-2 pt-0.5">
              <div className="h-2 w-full bg-[var(--pencil-lead)]/25 rounded" />
              <div className="h-2 w-4/5 bg-[var(--pencil-lead)]/20 rounded" />
              <div className="h-2 w-11/12 bg-[var(--pencil-lead)]/15 rounded" />
            </div>
          </div>

          {/* Hand-drawn margin callout sticker */}
          <div className="flex items-center justify-between pt-1 border-t border-dashed border-[var(--pencil-lead)]/30 text-xs">
            <span className="px-2 py-0.5 bg-[var(--paper-card)] border border-[var(--pencil-lead)]/40 text-[var(--accent-blue)] font-mono text-[11px] font-bold">
              WCAG AAA 11.4:1
            </span>
            <span className="text-[var(--accent-red)] font-heading font-bold flex items-center gap-1 text-[11px]">
              <span>Bionic Mode</span>
              <span className="px-1 bg-[var(--paper-yellow)] border border-[var(--pencil-lead)]/40 rounded text-[9px] text-[var(--paper-yellow-text)]">ON</span>
            </span>
          </div>
        </div>
      )}

      {type === 'chart-sketch' && (
        <div className="relative my-auto h-28 flex flex-col justify-between">
          {/* Hand-drawn SVG Spline Wave Chart */}
          <div className="relative flex-1">
            <svg className="w-full h-full" viewBox="0 0 240 75" fill="none">
              {/* Coordinate grid lines */}
              <line x1="25" y1="10" x2="25" y2="65" stroke="var(--pencil-lead)" strokeWidth="1.5" />
              <line x1="25" y1="65" x2="230" y2="65" stroke="var(--pencil-lead)" strokeWidth="1.5" />
              
              {/* Tick marks */}
              <line x1="20" y1="20" x2="25" y2="20" stroke="var(--pencil-lead)" strokeWidth="1" />
              <line x1="20" y1="42" x2="25" y2="42" stroke="var(--pencil-lead)" strokeWidth="1" />
              <line x1="75" y1="65" x2="75" y2="70" stroke="var(--pencil-lead)" strokeWidth="1" />
              <line x1="130" y1="65" x2="130" y2="70" stroke="var(--pencil-lead)" strokeWidth="1" />
              <line x1="185" y1="65" x2="185" y2="70" stroke="var(--pencil-lead)" strokeWidth="1" />

              {/* Area under curve */}
              <path 
                d="M 25 55 Q 60 48, 85 40 T 145 28 T 205 14 L 205 65 L 25 65 Z" 
                fill="var(--accent-red)" 
                opacity="0.12" 
              />

              {/* Procedural wave line */}
              <path 
                d="M 25 55 Q 60 48, 85 40 T 145 28 T 205 14" 
                stroke="var(--accent-red)" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />

              {/* Benchmark dashed target line */}
              <path 
                d="M 25 50 Q 80 42, 135 34 T 225 22" 
                stroke="var(--accent-blue)" 
                strokeWidth="1.5" 
                strokeDasharray="4 2" 
              />

              {/* High peak point with pulse */}
              <circle cx="205" cy="14" r="4" fill="var(--accent-red)" stroke="var(--pencil-lead)" strokeWidth="1.5" />

              {/* Speech bubble peak annotation */}
              <g transform="translate(125, 0)">
                <rect width="75" height="18" rx="3" fill="var(--paper-yellow)" stroke="var(--pencil-lead)" strokeWidth="1.2" />
                <text x="6" y="12" fill="var(--paper-yellow-text)" fontSize="8.5" fontFamily="Kalam" fontWeight="bold">+142% Peak 🚀</text>
              </g>
            </svg>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center justify-between pt-1 border-t border-dashed border-[var(--pencil-lead)]/30 text-[10px] font-heading">
            <span className="flex items-center gap-1 text-[var(--accent-red)] font-bold">
              <span className="w-2.5 h-0.5 bg-[var(--accent-red)] inline-block" />
              Organic Curves
            </span>
            <span className="flex items-center gap-1 text-[var(--accent-blue)] font-bold">
              <span className="w-2.5 h-0.5 border-b border-dashed border-[var(--accent-blue)] inline-block" />
              Procedural Jitter
            </span>
            <span className="text-[var(--pencil-faint)] italic">4K Vector</span>
          </div>
        </div>
      )}

      {/* Hand-drawn corner note */}
      <div className="text-right text-[11px] font-body text-[var(--pencil-faint)] italic">
        * hand-crafted code & vector physics
      </div>
    </div>
  );
};

export const ProjectsShowcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [initialAwardId, setInitialAwardId] = useState<string | undefined>(undefined);

  const categories: ProjectCategory[] = ['All', 'University Projects', 'Web Apps', 'Design Systems', 'Experiments'];

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-14 md:py-20" aria-label="Selected Projects Showcase">
      
      {/* Section Title & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--paper-yellow)] border border-[var(--paper-yellow-border)] border-wobbly font-heading font-bold text-sm text-[var(--paper-yellow-text)] -rotate-1 mb-3">
            <FolderGit2 size={16} strokeWidth={2.5} className="text-[var(--accent-blue)]" />
            <span>Featured Portfolio Works</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[var(--pencil-text)]">
            Selected Projects & Sketches
          </h2>
          <p className="font-body text-xl sm:text-2xl text-[var(--pencil-text)]/80 mt-2 max-w-2xl">
            Real-world AI systems, sub-30ms computer vision kinematics, award-winning hackathon platforms, and autonomous robotics.
          </p>
        </div>

        {/* Filter Tags Styled as Paper Sticky Tabs */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter projects by category">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(cat)}
                className={`
                  font-heading font-bold text-sm sm:text-base md:text-lg px-3 sm:px-4 py-1 sm:py-1.5
                  border-2 border-[var(--pencil-lead)] border-wobbly
                  transition-all duration-100 ease-out flex items-center gap-1.5
                  focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]
                  active:translate-x-[2px] active:translate-y-[2px]
                  ${
                    isActive
                      ? 'bg-[var(--accent-red)] text-white shadow-sketch -rotate-2 scale-105'
                      : 'bg-[var(--paper-card)] text-[var(--pencil-text)] shadow-sketchSubtle hover:bg-[var(--paper-yellow)] hover:text-[var(--paper-yellow-text)] hover:border-[var(--paper-yellow-border)] hover:rotate-1'
                  }
                `}
              >
                {cat === 'University Projects' && <GraduationCap size={16} strokeWidth={2.5} className="text-amber-300" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column or Staggered Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        {filteredProjects.map((project, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <WobblyCard
              key={project.id}
              bg={project.bgTone}
              decoration={project.decoration}
              tilt={project.tilt}
              shadow="normal"
              className="p-4 sm:p-6 flex flex-col justify-between"
            >
              {/* Top metadata */}
              <div>
                {/* Thumbnail sketch preview container */}
                <div className="mt-2 mb-5">
                  <SketchedThumbnail 
                    type={project.sketchedDiagram} 
                    bgTone={project.bgTone} 
                    screenshot={project.screenshot}
                    mobileScreenshot={project.mobileScreenshot}
                    schematicImage={project.schematicImage}
                    awardImage={project.award?.mainImage}
                    wchlImage={project.awards?.find(a => a.id === 'wchl-2025')?.mainImage}
                  />
                </div>

                {/* Celebratory Award Ribbons for Award-Winning Projects */}
                {project.awards && project.awards.length > 0 ? (
                  <div className="flex flex-col gap-2 mb-3">
                    {/* Ribbon 1: Huawei */}
                    <button
                      type="button"
                      onClick={() => {
                        setInitialAwardId('huawei-2025');
                        setSelectedProject(project);
                      }}
                      className="w-full p-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-black border-2 border-[var(--pencil-lead)] border-wobbly shadow-sketch flex items-center justify-between gap-2 -rotate-1 hover:rotate-0 hover:scale-[1.01] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer group/ribbon text-left"
                      title="Click to view Huawei Developer Competition 2025 award photos & certificate"
                    >
                      <div className="flex items-center gap-2 font-heading font-black text-xs sm:text-sm">
                        <span className="text-base group-hover/ribbon:rotate-12 transition-transform">🏆</span>
                        <span>2nd Place · Huawei Developer Competition 2025</span>
                      </div>
                      <span className="text-[11px] font-mono font-black bg-black text-amber-300 px-2 py-0.5 rounded shadow-xs shrink-0">
                        $3,000 USD
                      </span>
                    </button>

                    {/* Ribbon 2: WCHL Global Top 30 */}
                    <button
                      type="button"
                      onClick={() => {
                        setInitialAwardId('wchl-2025');
                        setSelectedProject(project);
                      }}
                      className="w-full p-2 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 text-black border-2 border-[var(--pencil-lead)] border-wobbly shadow-sketch flex items-center justify-between gap-2 rotate-1 hover:rotate-0 hover:scale-[1.01] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer group/ribbon2 text-left"
                      title="Click to view World Computer Hacker League Top 30 Global gallery"
                    >
                      <div className="flex items-center gap-2 font-heading font-black text-xs sm:text-sm">
                        <span className="text-base group-hover/ribbon2:rotate-12 transition-transform">🌐</span>
                        <span>Top 30 Globally · World Computer Hacker League</span>
                      </div>
                      <span className="text-[11px] font-mono font-black bg-black text-cyan-300 px-2 py-0.5 rounded shadow-xs shrink-0">
                        12,000+ Projects
                      </span>
                    </button>
                  </div>
                ) : project.award ? (
                  <button
                    type="button"
                    onClick={() => {
                      setInitialAwardId(project.award?.id);
                      setSelectedProject(project);
                    }}
                    className="w-full mb-3 p-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-black border-2 border-[var(--pencil-lead)] border-wobbly shadow-sketch flex items-center justify-between gap-2 -rotate-1 hover:rotate-0 hover:scale-[1.01] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer group/ribbon text-left"
                    title={`Click to view ${project.award.title} award`}
                  >
                    <div className="flex items-center gap-2 font-heading font-black text-xs sm:text-sm">
                      <span className="text-base group-hover/ribbon:rotate-12 transition-transform">🏆</span>
                      <span>{project.award.rank} · {project.award.title}</span>
                    </div>
                    <span className="text-[11px] font-mono font-black bg-black text-amber-300 px-2 py-0.5 rounded shadow-xs shrink-0">
                      {project.award.prize}
                    </span>
                  </button>
                ) : null}

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-heading font-bold text-xs uppercase tracking-wider px-2.5 py-0.5 bg-[var(--paper-bg)] border border-[var(--pencil-lead)] border-wobbly text-[var(--accent-blue)]">
                    {project.category}
                  </span>
                  <span className="font-body text-sm font-semibold text-[var(--accent-red)] flex items-center gap-1">
                    <Sparkles size={14} strokeWidth={2.5} />
                    {project.impactMetric}
                  </span>
                </div>

                {/* Title in Kalam */}
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-inherit mb-2 leading-snug">
                  {project.title}
                </h3>

                {/* Description in Patrick Hand */}
                <p className="font-body text-xl text-inherit opacity-85 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Tags Enclosed in Dashed Rough Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-sm font-body text-inherit bg-[var(--paper-bg)]/80 border border-dashed border-[var(--pencil-lead)] border-wobbly"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Live Demo & Source Code */}
              <div className="pt-4 border-t-2 border-dashed border-[var(--pencil-lead)]/30 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center flex-wrap gap-2 flex-1 min-w-0">
                  {/* Live Demo / Website Link */}
                  {project.id === 'atosfit-ai' ? (
                    <>
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex items-center gap-1.5 px-3 py-1.5
                          bg-[#ea580c] hover:bg-[#c2410c] text-white font-heading font-bold text-sm sm:text-base
                          border-2 border-[var(--pencil-lead)] border-wobbly
                          shadow-sketch hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                          transition-all group relative
                        "
                        aria-label="Visit live website at atosfit.com"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping shrink-0" />
                        <span>atosfit.com</span>
                        <ExternalLink size={15} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setInitialAwardId('huawei-2025');
                          setSelectedProject(project);
                        }}
                        className="
                          inline-flex items-center gap-1.5 px-2.5 py-1.5
                          bg-amber-400 hover:bg-amber-300 text-black font-heading font-black text-xs sm:text-sm
                          border-2 border-[var(--pencil-lead)] border-wobbly
                          shadow-sketchSubtle hover:scale-105 active:translate-x-[2px] active:translate-y-[2px]
                          transition-all group
                        "
                        title="View Huawei Developer Competition Award & Ceremony Photos"
                      >
                        <Trophy size={15} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform text-black" />
                        <span>🏆 Huawei ($3K)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setInitialAwardId('wchl-2025');
                          setSelectedProject(project);
                        }}
                        className="
                          inline-flex items-center gap-1.5 px-2.5 py-1.5
                          bg-cyan-400 hover:bg-cyan-300 text-black font-heading font-black text-xs sm:text-sm
                          border-2 border-[var(--pencil-lead)] border-wobbly
                          shadow-sketchSubtle hover:scale-105 active:translate-x-[2px] active:translate-y-[2px]
                          transition-all group
                        "
                        title="View World Computer Hacker League Top 30 Global Gallery"
                      >
                        <Globe size={15} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform text-black" />
                        <span>🌐 WCHL Top 30</span>
                      </button>
                    </>
                  ) : project.id === 'quadpod-security-robot' ? (
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="
                        inline-flex items-center gap-2 px-4 py-1.5
                        bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-heading font-bold text-base sm:text-lg
                        border-2 border-[var(--pencil-lead)] border-wobbly
                        shadow-sketch hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                        transition-all group relative
                      "
                      aria-label="View Quadpod Robot Specs & YOLOv9 Architecture"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping shrink-0" />
                      <span>Robot Specs & AI</span>
                      <Bot size={18} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
                    </button>
                  ) : project.id === 'autonomous-firefighter-robot' ? (
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="
                        inline-flex items-center gap-2 px-4 py-1.5
                        bg-[#dc2626] hover:bg-[#b91c1c] text-white font-heading font-bold text-base sm:text-lg
                        border-2 border-[var(--pencil-lead)] border-wobbly
                        shadow-sketch hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                        transition-all group relative
                      "
                      aria-label="View Firefighter Robot Specs & Circuit Schematic"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping shrink-0" />
                      <span>Robot & Schematics</span>
                      <Flame size={18} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform text-amber-300" />
                    </button>
                  ) : (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center gap-1.5 px-4 py-1.5
                        bg-[var(--accent-blue)] text-white font-body text-lg
                        border-2 border-[var(--pencil-lead)] border-wobbly
                        shadow-sketchSubtle hover:opacity-90
                        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                        transition-colors
                      "
                      aria-label={`Open live demo of ${project.title}`}
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={16} strokeWidth={2.5} />
                    </a>
                  )}

                  {/* Source Code Link */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-1.5 px-3 py-1.5
                      bg-[var(--paper-card)] text-[var(--pencil-text)] font-body text-lg
                      border-2 border-[var(--pencil-lead)] border-wobbly
                      shadow-sketchSubtle hover:bg-[var(--paper-muted)]
                      active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                      transition-colors
                    "
                    aria-label={`View source code of ${project.title}`}
                  >
                    <SketchedGithub size={16} />
                    <span>Code</span>
                  </a>
                </div>

                {/* Inspect Details Button */}
                <button
                  type="button"
                  onClick={() => {
                    setInitialAwardId(undefined);
                    setSelectedProject(project);
                  }}
                  className="
                    inline-flex items-center gap-1 text-[var(--pencil-text)] font-heading font-bold text-xs sm:text-sm
                    hover:text-[var(--accent-red)] transition-colors p-1 shrink-0 focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] rounded
                  "
                >
                  <Eye size={16} strokeWidth={2.5} />
                  <span>Specs</span>
                </button>
              </div>

            </WobblyCard>
          );
        })}
      </div>

      {/* Modal View for detailed specs */}
      <ProjectDetailModal
        project={selectedProject}
        initialAwardId={initialAwardId}
        onClose={() => {
          setSelectedProject(null);
          setInitialAwardId(undefined);
        }}
      />
    </section>
  );
};
