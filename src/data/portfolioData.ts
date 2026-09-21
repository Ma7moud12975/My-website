import { Project, SkillPostIt, ChecklistItem, StatItem, Testimonial } from '../types';

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/mahmoud-ayman-041462361/",
  x: "https://x.com/MahmoudAymam4",
  facebook: "https://www.facebook.com/mahmoud.ayman.826998",
  website: "https://atosfit.com",
  email: "mailto:ma8819496@gmail.com",
  phone: "tel:+201092967520"
};

export const STATS_DATA: StatItem[] = [
  {
    number: "2nd Prize",
    label: "Huawei 2025 Winner",
    doodle: "🏆",
    note: "Northern Africa Finals · USD $3,000"
  },
  {
    number: "Top 30",
    label: "WCHL Global Rank",
    doodle: "🌐",
    note: "Among 12,000+ Worldwide Projects (ICP)"
  },
  {
    number: "<30ms",
    label: "Edge AI Kinematics",
    doodle: "⚡",
    note: "Sub-30ms pose inference in AtosFit"
  },
  {
    number: "3.0 GPA",
    label: "1st Class Honors",
    doodle: "🎓",
    note: "Delta Univ. Faculty of AI (Bioinformatics)"
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "atosfit-ai",
    title: "AtosFit — AI Vision Coach",
    category: "University Projects",
    tagline: "🏆 2nd Place at Huawei Developer Competition 2025 ($3,000 Award) · 🌐 Ranked Top 30 Globally among 12,000+ projects in World Computer Hacker League (WCHL 2025).",
    description: "An international award-winning computer vision fitness platform awarded 2nd Prize ($3,000 USD) at Huawei Developer Competition 2025 (Northern Africa Finals) and ranked Top 30 Globally among 12,000+ projects in the World Computer Hacker League (WCHL 2025). Built as a Graduation Project at Delta University for Science and Technology, AtosFit harnesses on-device Computer Vision and kinematic pose estimation to analyze exercise form in real time, accurately count repetitions, and provide instant corrective voice & visual cues, paired with an AI nutrition generator and 24/7 conversational fitness coach.",
    detailedNotes: [
      "🏆 International Distinction: 2nd Prize Winner at Huawei Developer Competition 2025 Northern Africa Finals (USD $3,000 Award + Official Trophy)",
      "🌐 Global Elite Milestone: Ranked Top 30 Globally among 12,000+ projects worldwide in the World Computer Hacker League (WCHL 2025 · Internet Computer / ICP Hubs Network)",
      "Live Stage Presentation: Demonstrated real-time on-device computer vision form tracking in front of Huawei and international tech judges",
      "Academic Engineering Project: Faculty of Computers & IT / AI at Delta University for Science and Technology",
      "Real-Time Biomechanical Pose Estimation: Sub-30ms joint angle kinematics tracking through standard camera streams",
      "Automated Repetition State Machine: Kinematic phase analysis ensuring full range of motion (ROM) before counting reps",
      "Instantaneous Corrective Feedback: Live audio-visual guidance preventing training injuries and accelerating results",
      "100% Privacy-First Edge Processing: Video streams are processed strictly on-device and never transmitted to external servers"
    ],
    tags: ["Huawei 2025 2nd Place 🏆", "WCHL Top 30 Global 🌐", "12,000+ Projects", "USD $3,000 Award", "Computer Vision", "Pose Estimation", "React", "AI Chat", "Privacy-First", "Delta University"],
    demoUrl: "https://atosfit.com",
    githubUrl: "https://github.com",
    decoration: "tape",
    tilt: "left",
    bgTone: "white",
    sketchedDiagram: "atosfit-vision",
    impactMetric: "🏆 Huawei 2nd ($3K) · 🌐 WCHL Top 30 Global (12K+)",
    screenshot: "/atosfit-desktop.png",
    mobileScreenshot: "/atosfit-mobile.png",
    academicContext: "Delta University for Science and Technology — Graduation Project & Global Competition Winner",
    customCtaLabel: "Launch atosfit.com 🚀",
    award: {
      id: "huawei-2025",
      title: "Huawei Developer Competition 2025",
      rank: "2nd Prize Winner (Second Place)",
      prize: "USD $3,000 + Trophy & Certificate",
      competition: "Huawei Developer Competition 2025",
      region: "Northern Africa Finals",
      year: "2025",
      badge: "🏆 2nd Place ($3,000 Prize)",
      mainImage: "/huawei-winner-main.jpg",
      gallery: [
        {
          url: "/huawei-winner-main.jpg",
          caption: "Team AtosFit holding the USD $3,000 Second Prize ceremonial check, trophy & certificate on stage with Huawei executives",
          tag: "🏆 Award Ceremony"
        },
        {
          url: "/huawei-stage-presentation.jpg",
          caption: "Pitching AtosFit live on stage: demonstrating real-time computer vision workout form correction on the big screen",
          tag: "🎤 Live Presentation"
        },
        {
          url: "/huawei-certificate.jpg",
          caption: "Official Certificate of Achievement awarded to ATOSfit at Huawei Developer Competition 2025 Northern Africa",
          tag: "📜 Official Certificate"
        },
        {
          url: "/huawei-team-hall.jpg",
          caption: "Team Spark Infinity in custom matching sweaters walking into the competition auditorium",
          tag: "🚶 Team Spark Infinity"
        },
        {
          url: "/huawei-wristbands.jpg",
          caption: "Official Huawei Developer Competition Northern Africa access lanyards and wristbands",
          tag: "🎟️ Event Passes"
        }
      ]
    },
    awards: [
      {
        id: "huawei-2025",
        title: "Huawei Developer Competition 2025",
        rank: "2nd Prize Winner (Second Place)",
        prize: "USD $3,000 + Trophy & Certificate",
        competition: "Huawei Developer Competition 2025",
        region: "Northern Africa Finals",
        year: "2025",
        badge: "🏆 2nd Place ($3,000)",
        mainImage: "/huawei-winner-main.jpg",
        gallery: [
          {
            url: "/huawei-winner-main.jpg",
            caption: "Team AtosFit holding the USD $3,000 Second Prize ceremonial check, trophy & certificate on stage with Huawei executives",
            tag: "🏆 Award Ceremony"
          },
          {
            url: "/huawei-stage-presentation.jpg",
            caption: "Pitching AtosFit live on stage: demonstrating real-time computer vision workout form correction on the big screen",
            tag: "🎤 Live Presentation"
          },
          {
            url: "/huawei-certificate.jpg",
            caption: "Official Certificate of Achievement awarded to ATOSfit at Huawei Developer Competition 2025 Northern Africa",
            tag: "📜 Official Certificate"
          },
          {
            url: "/huawei-team-hall.jpg",
            caption: "Team Spark Infinity in custom matching sweaters walking into the competition auditorium",
            tag: "🚶 Team Spark Infinity"
          },
          {
            url: "/huawei-wristbands.jpg",
            caption: "Official Huawei Developer Competition Northern Africa access lanyards and wristbands",
            tag: "🎟️ Event Passes"
          }
        ]
      },
      {
        id: "wchl-2025",
        title: "World Computer Hacker League (WCHL 2025)",
        rank: "Ranked Top 30 Globally among 12,000+ Projects",
        prize: "Global Top 30 Rank among 12,000+ Worldwide Projects",
        competition: "World Computer Hacker League (WCHL)",
        region: "Global Finale · Internet Computer (ICP Hubs Network)",
        year: "2025",
        badge: "🌐 Top 30 Global (12K+ Teams)",
        mainImage: "/wchl-presentation.jpg",
        gallery: [
          {
            url: "/wchl-presentation.jpg",
            caption: "Team AtosFit pitching live on stage at the World Computer Hacker League with real-time pose analysis demonstration",
            tag: "🎤 Live Pitch"
          },
          {
            url: "/wchl-banner.png",
            caption: "Official World Computer Hacker League competition banner (July - October 2025, powered by Internet Computer / ICP Hubs Network)",
            tag: "🌐 Official Banner"
          },
          {
            url: "/wchl-group-stage.jpg",
            caption: "Group stage gathering and delegation at the Financial Regulatory Authority (FRA) for the World Computer Hacker League",
            tag: "👥 FRA Delegation"
          },
          {
            url: "/wchl-jury.jpg",
            caption: "Global Finale Townhall Jury Announcement featuring DFINITY and international tech executives evaluating finalist teams",
            tag: "⚖️ Global Jury"
          }
        ]
      }
    ]
  },
  {
    id: "quadpod-security-robot",
    title: "Quadpod Security Robot — YOLOv9 & ESP32",
    category: "University Projects",
    tagline: "Autonomous 4-legged robot powered by YOLOv9 & ESP32-CAM for real-time weapon & firearm detection.",
    description: "An autonomous quadrupedal security robotics platform engineered at Delta University for Science and Technology. Equipped with an ESP32-CAM optical sensor and an edge-deployed YOLOv9 deep learning model API, the robot traverses dynamic environments to detect, identify, and alert on concealed firearms and bladed weapons in real time under fluctuating lighting and partial occlusions.",
    detailedNotes: [
      "Academic Robotics Research: Faculty of Computers & IT / AI, Delta University for Science and Technology",
      "YOLOv9 Real-Time Weapon Inference: High-speed deep learning API detecting firearms and bladed weapons in crowded spaces",
      "ESP32-CAM Edge Vision Architecture: Compact wireless camera module executing low-latency video capture and transmission",
      "4-Legged Multi-Axis Locomotion: Custom 3D-printed quadrupedal chassis driven by high-torque multi-servo kinematics",
      "Proactive Public Safety Alerting: Automated threat classification pipeline designed for airports, transit hubs, and schools",
      "Adaptive Continual Learning: Self-updating ML feedback loop resilient against emerging weapon concealment tactics"
    ],
    tags: ["Robotics", "YOLOv9", "ESP32-CAM", "Computer Vision", "Object Detection", "Quadruped", "Delta University", "Public Safety"],
    demoUrl: "https://github.com",
    githubUrl: "https://github.com",
    decoration: "tack",
    tilt: "right",
    bgTone: "yellow",
    sketchedDiagram: "quadpod-robot",
    impactMetric: "Delta Univ. AI & Robotics · YOLOv9 Weapon Detection",
    screenshot: "/quadpod-neon.png",
    academicContext: "Delta University for Science and Technology — Robotics & AI Project",
    customCtaLabel: "View Robot Specs 🤖"
  },
  {
    id: "autonomous-firefighter-robot",
    title: "Autonomous Firefighter Robot — Arduino & Flame Sensing",
    category: "University Projects",
    tagline: "Autonomous emergency response vehicle with dual flame IR detection, ultrasonic navigation & Bluetooth telemetry.",
    description: "An embedded robotics emergency response system built at Delta University for Science and Technology. Engineered with an Arduino Uno microcontroller core, L298N quad-motor H-bridge drive, dual infrared flame detection sensors, an HC-SR04 ultrasonic collision-avoidance radar, and a high-pressure automated water pump actuated via a relay circuit. Features dual modes: autonomous search-and-extinguish patrolling and manual override via a custom Bluetooth mobile telemetry application.",
    detailedNotes: [
      "Academic Embedded Systems Project: Faculty of Computers & IT / Engineering, Delta University for Science and Technology",
      "Dual Infrared Flame Detection: Dual-channel IR phototransistor sensors triangulating open flame sources within 760nm–1100nm spectrum",
      "Ultrasonic Collision Avoidance: HC-SR04 sonar module providing continuous obstacle scanning through low-visibility smoky corridors",
      "Relay-Actuated Extinguisher Pump: Isolated 5V relay circuit driving a high-pressure DC water pump and directional extinguishment nozzle",
      "4WD High-Torque Locomotion: L298N dual H-bridge motor driver powering 4 independent geared DC motors with 3S 18650 Li-ion battery bank",
      "Custom Bluetooth Telemetry App: Real-time smartphone remote control with directional steering buttons, rotation controls, and water pump activation"
    ],
    tags: ["Robotics", "Arduino Uno", "Embedded Systems", "Flame Detection", "Ultrasonic HC-SR04", "Bluetooth HC-05", "L298N", "Delta University"],
    demoUrl: "https://github.com",
    githubUrl: "https://github.com",
    decoration: "tape",
    tilt: "left",
    bgTone: "white",
    sketchedDiagram: "firefighter-robot",
    impactMetric: "Delta Univ. Robotics · Dual Flame Sensing & Extinguisher",
    screenshot: "/firefighter-neon.png",
    schematicImage: "/firefighter-schematic.png",
    mobileScreenshot: "/firefighter-app.jpg",
    academicContext: "Delta University for Science and Technology — Embedded Systems Project",
    customCtaLabel: "View Robot & Schematics 🚒"
  },
  {
    id: "paperflow-ui",
    title: "PaperFlow Design System",
    category: "Design Systems",
    tagline: "An organic UI component library built for tactile web interfaces.",
    description: "A comprehensive component library featuring irregular SVG masks, hand-drawn vector tokens, CSS variable themes, and WCAG AAA compliant color contrasts.",
    detailedNotes: [
      "Over 35 accessible accessible components with dynamic organic border-radii",
      "Sub-10kb runtime footprint with pure CSS border-radius calculations",
      "Interactive theme switcher: Ballpoint Blue, Pencil Lead, Highlighter Orange",
      "Comprehensive keyboard navigation and screen-reader announcements"
    ],
    tags: ["React 19", "Tailwind CSS", "Design Tokens", "Radix UI", "a11y"],
    demoUrl: "https://github.com",
    githubUrl: "https://github.com",
    decoration: "tape",
    tilt: "left",
    bgTone: "white",
    sketchedDiagram: "ui-system",
    impactMetric: "Tactile Design Token Prototype"
  },
  {
    id: "inkwell-editor",
    title: "Inkwell Collaborative Canvas",
    category: "Web Apps",
    tagline: "Real-time brainstorming board mimicking physical moleskine notebooks.",
    description: "A multi-user spatial canvas where remote teams sketch sticky notes, annotate wireframes with faux-ballpoint strokes, and organize thoughts without rigid grids.",
    detailedNotes: [
      "Multi-cursor WebSocket sync with low-latency pencil interpolation",
      "Custom vector smoothing algorithm for authentic freehand ink fidelity",
      "Exports high-resolution PDF memo bundles and SVG sticker sheets",
      "Offline-first IndexedDB persistence with conflict resolution"
    ],
    tags: ["Next.js App Router", "WebSockets", "HTML5 Canvas", "TypeScript"],
    demoUrl: "https://github.com",
    githubUrl: "https://github.com",
    decoration: "tack",
    tilt: "right",
    bgTone: "yellow",
    sketchedDiagram: "canvas-flow",
    impactMetric: "Spatial Vector Canvas Experiment"
  },
  {
    id: "retronotes-a11y",
    title: "RetroNotes Accessible Reader",
    category: "Web Apps",
    tagline: "Distraction-free markdown workspace with customizable lined stationery.",
    description: "A reading and writing tool designed for neurodivergent developers. Features textured serif fonts, high-contrast margins, bionic reading mode, and tactile key sounds.",
    detailedNotes: [
      "Built according to WCAG 2.2 AAA guidelines with automated axe-core pipelines",
      "Customizable paper warmth, ruled grid spacings, and line heights",
      "Audio tactile feedback generated via lightweight Web Audio API synthesis",
      "Zero telemetry, 100% local client-side encrypted storage"
    ],
    tags: ["TypeScript", "Web Audio API", "Tailwind CSS", "IndexedDB", "WCAG AAA"],
    demoUrl: "https://github.com",
    githubUrl: "https://github.com",
    decoration: "tape",
    tilt: "right",
    bgTone: "white",
    sketchedDiagram: "notebook-reader",
    impactMetric: "100% WCAG AAA Reader Prototype"
  },
  {
    id: "sketchgraph-engine",
    title: "SketchGraph Procedural Charts",
    category: "Experiments",
    tagline: "Lightweight chart library rendering sketchy hand-drawn graphs.",
    description: "An experimental visualization engine that converts dry JSON metrics into charming hand-drawn line charts, wobbly bar graphs, and organic pie charts.",
    detailedNotes: [
      "Calculates organic spline curves with pseudo-random jitter offsets",
      "SVG stroke-dasharray animations mimicking a pen drawing live on paper",
      "Responsive container queries with zero raster blur on 4K displays",
      "Plugin architecture compatible with React, Svelte, and vanilla HTML"
    ],
    tags: ["SVG Paths", "Canvas API", "Math & Trigonometry", "React"],
    demoUrl: "https://github.com",
    githubUrl: "https://github.com",
    decoration: "tack",
    tilt: "left",
    bgTone: "yellow",
    sketchedDiagram: "chart-sketch",
    impactMetric: "Procedural SVG Graphing Engine"
  }
];

export const SKILLS_DATA: SkillPostIt[] = [
  { name: "Computer Vision & OpenCV", experience: "Core AI", color: "yellow", rotation: "-rotate-2", category: "Vision & AI" },
  { name: "YOLOv9 Object Detection", experience: "Sub-40ms", color: "paper", rotation: "rotate-1", category: "Edge Detection" },
  { name: "Kinematic Pose Tracking", experience: "Sub-30ms ROM", color: "yellow", rotation: "-rotate-1", category: "Biomechanics" },
  { name: "Deep Learning & PyTorch", experience: "Neural Nets", color: "red-tint", rotation: "rotate-2", category: "Machine Learning" },
  { name: "Embedded Systems", experience: "ESP32 & Arduino", color: "blue-tint", rotation: "-rotate-3", category: "Robotics Hardware" },
  { name: "Robotics Kinematics & GAIT", experience: "Multi-Axis", color: "yellow", rotation: "rotate-2", category: "Autonomous Systems" },
  { name: "Python & C++ Programming", experience: "Core Stack", color: "paper", rotation: "-rotate-2", category: "Programming" },
  { name: "FastAPI & RESTful APIs", experience: "High-Perf", color: "yellow", rotation: "rotate-1", category: "AI Deployment" },
  { name: "React.js & TypeScript", experience: "atosfit.com", color: "blue-tint", rotation: "-rotate-1", category: "Full-Stack AI" },
  { name: "Sensor Fusion & Telemetry", experience: "IR & Sonar", color: "red-tint", rotation: "rotate-2", category: "Embedded Systems" },
  { name: "AI Agent & LLM Integration", experience: "Conversational", color: "yellow", rotation: "-rotate-2", category: "Intelligent Systems" },
  { name: "Technical Stage Pitching", experience: "Huawei & WCHL", color: "paper", rotation: "rotate-1", category: "Public Speaking" },
];

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "1",
    label: "Sub-30ms On-Device Edge Processing",
    detail: "Real-time kinematic joint tracking executing on client hardware without cloud server latency.",
    checked: true
  },
  {
    id: "2",
    label: "100% User Privacy Edge Processing",
    detail: "Video camera streams never leave the client device or get transmitted to external databases.",
    checked: true
  },
  {
    id: "3",
    label: "Relay-Isolated Hardware Safety",
    detail: "Optocoupler-isolated relay switches protecting microcontrollers from high-current inductive DC pump surges.",
    checked: true
  },
  {
    id: "4",
    label: "Multi-Sensor Telemetry & Redundancy",
    detail: "Sensor fusion combining dual-channel IR flame phototransistors with ultrasonic radar navigation.",
    checked: true
  },
  {
    id: "5",
    label: "Production-Grade RESTful Inference APIs",
    detail: "Low-latency asynchronous FastAPI pipelines serving quantized deep learning models with high throughput.",
    checked: true
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    quote: "AtosFit's sub-30ms kinematic pose estimation running entirely on-device without cloud latency is a masterclass in edge AI engineering. Team Spark Infinity demonstrated outstanding technical execution on stage.",
    author: "Competition Tech Jury",
    role: "Technical Evaluation Committee",
    company: "Huawei Developer Competition 2025",
    pinnedWith: "tack",
    rotation: "-rotate-2",
    bgColor: "yellow"
  },
  {
    id: "test-2",
    quote: "Mahmoud combines deep mathematical rigor in pose estimation with extraordinary hands-on prototyping. From 3D printed quadruped robotics with ESP32 to production computer vision, his engineering depth is exceptional.",
    author: "Faculty Review Board",
    role: "AI & Robotics Project Committee",
    company: "Delta University for Science and Technology",
    pinnedWith: "tape",
    rotation: "rotate-1",
    bgColor: "white"
  },
  {
    id: "test-3",
    quote: "Engineering AtosFit alongside Mahmoud was an inspiring journey. He architected the entire sub-30ms pose estimation pipeline, the repetition state machine, and pitched live in front of international tech judges.",
    author: "Spark Infinity Team",
    role: "Co-Founding Engineers",
    company: "AtosFit (atosfit.com)",
    pinnedWith: "tack",
    rotation: "-rotate-1",
    bgColor: "yellow"
  }
];

