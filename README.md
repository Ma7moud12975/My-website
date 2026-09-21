# Hand-Drawn & Sketched Personal Portfolio ✏️🎨

An artisanal, tactile, and highly accessible personal portfolio website built on a physical sketchbook design system. Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**.

---

## 📖 Design System Highlights

### 1. Organic Radii (No Straight Lines)
Every interactive element, card, sticky note, and badge uses irregular 8-value border-radii to simulate organic freehand pencil lines:
- **Standard Button Radius (`border-wobbly`)**:
  `border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;`
- **Container / Card Radius (`border-wobbly-md`)**:
  `border-radius: 20px 255px 20px 255px / 255px 20px 255px 20px;`
- **Blob / Badge Radius (`border-wobbly-blob`)**:
  `border-radius: 60% 40% 70% 30% / 40% 50% 60% 50%;`

### 2. Hard Offset Shadows (Zero Blur Physics)
- **Normal Card / Button**: `4px 4px 0px 0px #2d2d2d`
- **Deep / Lifted Card**: `8px 8px 0px 0px #2d2d2d`
- **Subtle Pill / Tag**: `3px 3px 0px 0px rgba(45, 45, 45, 0.15)`
- **Snappy Press Physics**: On `:active`, cards and buttons translate `+4px / +4px` (or `+1px / +1px`) and flatten shadow to zero instantaneously.

### 3. Palette Tokens
- **Background**: `#fdfbf7` (Warm Vintage Sketch Paper) with a 24px radial dot grid.
- **Foreground / Text**: `#2d2d2d` (Soft Graphite Pencil — never pure `#000000`).
- **Primary Accent**: `#ff4d4d` (Teacher Correction Marker).
- **Secondary Accent**: `#2d5da1` (Blue Ballpoint Pen & accessible focus states).
- **Highlight**: `#fff9c4` (Post-it Note Yellow).

### 4. Typography
- **Headings**: `Kalam` (wght: 700)
- **Body & Controls**: `Patrick Hand` (wght: 400)

---

## 🚀 Running the Project

```bash
# Navigate to project directory
cd "C:\Users\Mahmoud Ayman\.gemini\antigravity\scratch\hand-drawn-portfolio"

# Install dependencies (already installed)
npm install

# Start local dev server
npm run dev

# Build production bundle
npm run build
```

---

## 📂 Project Architecture

```
src/
├── types/
│   └── index.ts                 # TypeScript interfaces (Project, Skill, Testimonial, etc.)
├── data/
│   └── portfolioData.ts         # Portfolio content and metrics
├── components/
│   ├── ui/
│   │   ├── Button.tsx           # Wobbly interactive button with zero-blur shadow physics
│   │   ├── WobblyCard.tsx       # Hand-drawn card with tape/tack decorations & tilts
│   │   ├── StickyNote.tsx       # Post-it note component
│   │   ├── Badge.tsx            # Organic blob badge for stats & categories
│   │   ├── WashiTape.tsx        # Translucent torn washi tape strip
│   │   ├── Thumbtack.tsx        # Red sketched push-pin SVG
│   │   └── SketchDoodles.tsx    # Hand-drawn SVG arrows, squiggles, stars, and icons
│   ├── sections/
│   │   ├── Navbar.tsx           # Floating sticky nav with sketched monogram
│   │   ├── Hero.tsx             # 2-col hero with sketched portrait and hand-drawn arrow
│   │   ├── StatsRibbon.tsx      # 4-item organic blob stats ribbon
│   │   ├── ProjectsShowcase.tsx # Filterable projects with sketched thumbnails & tape/tack
│   │   ├── SkillsDesk.tsx       # Moodboard desk with post-its, checklist, & speech bubble
│   │   ├── TestimonialsWall.tsx # Corkboard wall of pinned quotes
│   │   ├── ContactMemo.tsx      # Memo notepad with lined textarea and interactive doodle pad
│   │   └── Footer.tsx           # Hand-drawn dashed divider, scribbled socials, & disclaimer
│   └── modals/
│       └── ProjectDetailModal.tsx # Accessible project specs dialog
├── App.tsx                      # Portfolio layout orchestrator
├── index.css                    # Tailwind setup, dot grid, lined paper, custom scrollbar
└── main.tsx                     # Application entry point
```
