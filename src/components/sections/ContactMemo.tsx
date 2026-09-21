import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, RotateCcw, Pen, Eraser, Sparkles, Mail, MessageSquare, Phone, MapPin, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { HandDrawnPaperPlane, SketchedLinkedin, SketchedTwitter, SketchedFacebook } from '../ui/SketchDoodles';
import { SOCIAL_LINKS } from '../../data/portfolioData';

export const ContactMemo: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'doodle'>('text');
  
  // Doodle Canvas states
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('lead'); // 'lead' | '#ff4d4d' | '#2d5da1' | '#eab308'
  const [hasDoodle, setHasDoodle] = useState(false);

  // Helper to get active ink stroke color depending on current theme
  const getResolvedStrokeColor = () => {
    if (strokeColor === 'lead') {
      const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
      return isDark ? '#f1f5f9' : '#2d2d2d';
    }
    return strokeColor;
  };

  // Initialize canvas
  useEffect(() => {
    if (activeTab === 'doodle' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
      }
    }
  }, [activeTab]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDoodle(true);
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.strokeStyle = getResolvedStrokeColor();
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDoodle(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || (!message && !hasDoodle)) return;

    // Trigger playful hand-drawn confetti burst!
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff4d4d', '#2d5da1', '#fff9c4', '#2d2d2d'],
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    clearCanvas();
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-14 md:py-20" aria-label="Drop a Note or Sketch">
      <div className="max-w-4xl xl:max-w-5xl mx-auto">
        
        {/* Memo Pad Card */}
        <div 
          className="
            relative p-4 sm:p-8 md:p-12
            bg-[var(--paper-card)] border-3 border-[var(--pencil-lead)] border-wobbly-md
            shadow-sketch sm:shadow-sketchDeep
          "
        >
          {/* Red marker tape header: "Leave a Sketch or Message" */}
          <div 
            className="
              absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2
              bg-[var(--accent-red)] text-white
              font-heading text-base sm:text-lg font-bold tracking-wide
              border-2 border-[var(--pencil-lead)] border-wobbly
              shadow-sketch -rotate-1 select-none z-10
            "
          >
            Leave a Sketch or Message ✏️
          </div>

          {/* Top Memo Notepad spiral holes decoration */}
          <div className="flex justify-between items-center px-4 pb-6 pt-2 border-b-2 border-dashed border-[var(--pencil-lead)]/30">
            <div className="flex items-center gap-2">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-3.5 h-3.5 rounded-full bg-[var(--pencil-lead)] border border-[var(--pencil-lead)] opacity-70"
                />
              ))}
            </div>
            <span className="font-heading font-bold text-sm sm:text-base text-[var(--accent-blue)]">
              MEMO NO. 2026-A
            </span>
          </div>

          {submitted ? (
            /* Success confirmation memo receipt */
            <div className="py-12 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto bg-[var(--paper-yellow)] border-2 border-[var(--paper-yellow-border)] border-wobbly flex items-center justify-center shadow-sketch">
                <CheckCircle2 size={36} strokeWidth={2.5} className="text-[var(--accent-blue)]" />
              </div>
              <h3 className="font-heading font-bold text-3xl sm:text-4xl text-[var(--pencil-text)]">
                Note Pinned to the Sketchbook!
              </h3>
              <p className="font-body text-2xl text-[var(--pencil-text)]/85 max-w-md mx-auto">
                Thanks, <strong className="text-[var(--accent-red)]">{name}</strong>! Your note has been delivered. I will respond to <strong className="underline">{email}</strong> within 24 hours.
              </p>
              <div className="pt-4">
                <Button variant="paper" size="md" onClick={handleReset}>
                  Drop Another Note
                </Button>
              </div>
            </div>
          ) : (
            /* Interactive Contact Form */
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Real Direct Contact Badges - 2x2 grid on mobile, 4 columns on lg */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 pb-2">
                <a 
                  href="mailto:ma8819496@gmail.com"
                  className="p-2 sm:p-2.5 bg-[var(--paper-bg)] border border-[var(--pencil-lead)] border-wobbly flex items-center gap-2 hover:bg-[var(--paper-yellow)] hover:-rotate-1 transition-all text-inherit no-underline shadow-sketchSubtle min-w-0"
                >
                  <Mail size={16} className="text-[var(--accent-red)] shrink-0" />
                  <span className="font-heading font-bold text-[11px] sm:text-xs truncate">ma8819496@gmail.com</span>
                </a>
                <a 
                  href="tel:+201092967520"
                  className="p-2 sm:p-2.5 bg-[var(--paper-bg)] border border-[var(--pencil-lead)] border-wobbly flex items-center gap-2 hover:bg-[var(--paper-yellow)] hover:rotate-1 transition-all text-inherit no-underline shadow-sketchSubtle min-w-0"
                >
                  <Phone size={16} className="text-[var(--accent-blue)] shrink-0" />
                  <span className="font-heading font-bold text-[11px] sm:text-xs truncate">+20 109 296 7520</span>
                </a>
                <div 
                  className="p-2 sm:p-2.5 bg-[var(--paper-bg)] border border-[var(--pencil-lead)] border-wobbly flex items-center gap-2 shadow-sketchSubtle min-w-0"
                >
                  <MapPin size={16} className="text-[var(--accent-red)] shrink-0" />
                  <span className="font-heading font-bold text-[11px] sm:text-xs truncate">Tanta, Egypt</span>
                </div>
                <a 
                  href={SOCIAL_LINKS.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 bg-[var(--paper-bg)] border border-[var(--pencil-lead)] border-wobbly flex items-center gap-2 hover:bg-[var(--paper-yellow)] hover:-rotate-1 transition-all text-inherit no-underline shadow-sketchSubtle min-w-0"
                >
                  <Globe size={16} className="text-[var(--accent-blue)] shrink-0" />
                  <span className="font-heading font-bold text-[11px] sm:text-xs truncate">atosfit.com</span>
                </a>
              </div>

              {/* Verified Social Channels */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1 pb-2">
                <span className="font-heading font-bold text-xs text-[var(--pencil-text)]/70">Connect Directly:</span>
                <div className="grid grid-cols-3 sm:flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1 bg-[var(--paper-bg)] border border-[var(--pencil-lead)] border-wobbly text-xs font-heading font-bold hover:bg-[var(--paper-yellow)] hover:-rotate-1 transition-all text-inherit no-underline shadow-sketchSubtle"
                    title="Mahmoud Ayman on LinkedIn"
                  >
                    <SketchedLinkedin size={14} className="shrink-0" />
                    <span className="truncate">LinkedIn</span>
                  </a>
                  <a
                    href={SOCIAL_LINKS.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1 bg-[var(--paper-bg)] border border-[var(--pencil-lead)] border-wobbly text-xs font-heading font-bold hover:bg-[var(--paper-yellow)] hover:rotate-1 transition-all text-inherit no-underline shadow-sketchSubtle"
                    title="Mahmoud Ayman on X (Twitter)"
                  >
                    <SketchedTwitter size={14} className="shrink-0" />
                    <span className="truncate">X</span>
                  </a>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1 bg-[var(--paper-bg)] border border-[var(--pencil-lead)] border-wobbly text-xs font-heading font-bold hover:bg-[var(--paper-yellow)] hover:-rotate-1 transition-all text-inherit no-underline shadow-sketchSubtle"
                    title="Mahmoud Ayman on Facebook"
                  >
                    <SketchedFacebook size={14} className="shrink-0" />
                    <span className="truncate">Facebook</span>
                  </a>
                </div>
              </div>
              
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name Input */}
                <div className="space-y-1.5">
                  <label htmlFor="user-name" className="font-heading font-bold text-lg text-[var(--pencil-text)] flex items-center gap-1.5">
                    <span>Your Name</span>
                    <span className="text-[var(--accent-red)]">*</span>
                  </label>
                  <input
                    id="user-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Leonardo da Vinci"
                    className="
                      w-full px-4 py-3 bg-[var(--paper-bg)]
                      text-[var(--pencil-text)] font-body text-xl
                      border-2 border-[var(--pencil-lead)] border-wobbly
                      placeholder:text-[var(--pencil-faint)]
                      transition-colors duration-100
                      focus:border-[var(--accent-blue)] focus:ring-2 focus:ring-[var(--accent-blue)]/20 focus:outline-none
                    "
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label htmlFor="user-email" className="font-heading font-bold text-lg text-[var(--pencil-text)] flex items-center gap-1.5">
                    <span>Email Address</span>
                    <span className="text-[var(--accent-red)]">*</span>
                  </label>
                  <input
                    id="user-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="leo@florence.studio"
                    className="
                      w-full px-4 py-3 bg-[var(--paper-bg)]
                      text-[var(--pencil-text)] font-body text-xl
                      border-2 border-[var(--pencil-lead)] border-wobbly
                      placeholder:text-[var(--pencil-faint)]
                      transition-colors duration-100
                      focus:border-[var(--accent-blue)] focus:ring-2 focus:ring-[var(--accent-blue)]/20 focus:outline-none
                    "
                  />
                </div>

              </div>

              {/* Message Mode Switcher: Written Lined Paper vs Freehand Doodle */}
              <div className="flex items-center justify-between pt-2">
                <label htmlFor="memo-message" className="font-heading font-bold text-lg text-[var(--pencil-text)]">
                  Your Message or Sketch
                </label>
                <div className="flex items-center gap-1.5 bg-[var(--paper-muted)] p-1 border border-[var(--pencil-lead)] border-wobbly text-sm font-heading">
                  <button
                    type="button"
                    onClick={() => setActiveTab('text')}
                    className={`px-3 py-1 border-wobbly transition-colors ${
                      activeTab === 'text' ? 'bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] font-bold shadow-xs' : 'text-[var(--pencil-text)]/70 hover:text-[var(--pencil-text)]'
                    }`}
                  >
                    Lined Paper
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('doodle')}
                    className={`px-3 py-1 border-wobbly flex items-center gap-1 transition-colors ${
                      activeTab === 'doodle' ? 'bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] font-bold shadow-xs' : 'text-[var(--pencil-text)]/70 hover:text-[var(--pencil-text)]'
                    }`}
                  >
                    <Pen size={13} strokeWidth={2.5} />
                    <span>Doodle Pad</span>
                  </button>
                </div>
              </div>

              {/* Textarea with faint horizontal ruling lines (simulating lined notebook paper) */}
              {activeTab === 'text' ? (
                <div className="relative">
                  <textarea
                    id="memo-message"
                    rows={5}
                    required={!hasDoodle}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your note here... Let's connect about Computer Vision, autonomous robotics, AI engineering, or innovative collaborations!"
                    className="
                      w-full p-4 bg-[var(--paper-bg)] notebook-lined
                      text-[var(--pencil-text)] font-body text-xl
                      border-2 border-[var(--pencil-lead)] border-wobbly
                      placeholder:text-[var(--pencil-faint)]
                      transition-colors duration-100 resize-y
                      focus:border-[var(--accent-blue)] focus:ring-2 focus:ring-[var(--accent-blue)]/20 focus:outline-none
                    "
                  />
                  <div className="absolute bottom-3 right-3 pointer-events-none text-xs font-body text-[var(--pencil-faint)]">
                    ruled notebook stationary
                  </div>
                </div>
              ) : (
                /* Interactive HTML5 Doodle Pad */
                <div className="space-y-2">
                  <div className="relative bg-[var(--paper-bg)] border-2 border-[var(--pencil-lead)] border-wobbly overflow-hidden">
                    <canvas
                      ref={canvasRef}
                      width={680}
                      height={200}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-[200px] cursor-crosshair touch-none"
                    />
                    {!hasDoodle && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[var(--pencil-faint)] font-body text-xl">
                        ✏️ Click & drag to draw a sketch, smiley, or handwritten note!
                      </div>
                    )}
                  </div>

                  {/* Doodle Toolbar */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-xs text-[var(--pencil-text)]/70">Ink:</span>
                      <button
                        type="button"
                        onClick={() => setStrokeColor('lead')}
                        className={`w-6 h-6 rounded-full bg-[var(--pencil-lead)] border-2 ${
                          strokeColor === 'lead' ? 'border-[var(--accent-blue)] scale-110' : 'border-transparent'
                        }`}
                        title="Pencil / Chalk"
                      />
                      <button
                        type="button"
                        onClick={() => setStrokeColor('#ff4d4d')}
                        className={`w-6 h-6 rounded-full bg-[#ff4d4d] border-2 ${
                          strokeColor === '#ff4d4d' ? 'border-[var(--accent-blue)] scale-110' : 'border-transparent'
                        }`}
                        title="Red Marker"
                      />
                      <button
                        type="button"
                        onClick={() => setStrokeColor('#2d5da1')}
                        className={`w-6 h-6 rounded-full bg-[#2d5da1] border-2 ${
                          strokeColor === '#2d5da1' ? 'border-[var(--accent-red)] scale-110' : 'border-transparent'
                        }`}
                        title="Ballpoint Blue"
                      />
                      <button
                        type="button"
                        onClick={() => setStrokeColor('#eab308')}
                        className={`w-6 h-6 rounded-full bg-[#eab308] border-2 ${
                          strokeColor === '#eab308' ? 'border-[var(--accent-blue)] scale-110' : 'border-transparent'
                        }`}
                        title="Amber Chalk"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="flex items-center gap-1 font-heading text-xs text-[var(--accent-red)] hover:underline"
                    >
                      <RotateCcw size={14} />
                      <span>Erase Canvas</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button: Sketched paper-airplane icon with "Send Note" that presses flat */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 font-body text-base text-[var(--pencil-text)]/70 min-w-0">
                  <Mail size={16} strokeWidth={2.5} className="text-[var(--accent-blue)] shrink-0" />
                  <span className="truncate">Direct: <a href="mailto:ma8819496@gmail.com" className="font-bold underline hover:text-[var(--accent-red)]">ma8819496@gmail.com</a></span>
                </div>

                <button
                  type="submit"
                  className="
                    w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5
                    bg-[var(--paper-yellow)] text-[var(--paper-yellow-text)] font-heading font-bold text-xl
                    border-2 border-[var(--paper-yellow-border)] border-wobbly
                    shadow-sketch transition-all duration-100 ease-out
                    hover:bg-[var(--accent-red)] hover:text-white hover:border-[var(--pencil-lead)]
                    active:translate-x-1 active:translate-y-1 active:shadow-none
                    focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]
                  "
                >
                  <HandDrawnPaperPlane className="shrink-0" />
                  <span>Send Note</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
