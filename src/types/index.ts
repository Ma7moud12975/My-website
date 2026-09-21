export type ProjectCategory = 'All' | 'University Projects' | 'Web Apps' | 'Design Systems' | 'Experiments';

export interface Project {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  tagline: string;
  description: string;
  detailedNotes: string[];
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  decoration: 'tape' | 'tack';
  tilt: 'left' | 'right';
  bgTone: 'white' | 'yellow';
  sketchedDiagram: string;
  impactMetric: string;
  screenshot?: string;
  mobileScreenshot?: string;
  schematicImage?: string;
  academicContext?: string;
  customCtaLabel?: string;
  award?: ProjectAward;
  awards?: ProjectAward[];
}

export interface AwardGalleryItem {
  url: string;
  caption: string;
  tag: string;
}

export interface ProjectAward {
  id?: string;
  title: string;
  rank: string;
  prize: string;
  competition: string;
  region: string;
  year: string;
  badge?: string;
  mainImage: string;
  gallery: AwardGalleryItem[];
}

export interface SkillPostIt {
  name: string;
  experience: string;
  color: 'yellow' | 'paper' | 'red-tint' | 'blue-tint';
  rotation: string;
  category: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  detail: string;
  checked: boolean;
}

export interface StatItem {
  number: string;
  label: string;
  doodle: string;
  note: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  pinnedWith: 'tack' | 'tape';
  rotation: string;
  bgColor: 'yellow' | 'white';
}
