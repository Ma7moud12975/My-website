/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: 'var(--paper-bg)',
          card: 'var(--paper-card)',
          muted: 'var(--paper-muted)',
          yellow: 'var(--paper-yellow)',
        },
        pencil: {
          DEFAULT: 'var(--pencil-text)',
          lead: 'var(--pencil-lead)',
          soft: 'var(--pencil-soft)',
          faint: 'var(--pencil-faint)',
        },
        marker: {
          red: 'var(--accent-red)',
          blue: 'var(--accent-blue)',
        },
      },
      fontFamily: {
        heading: ['"Kalam"', 'cursive', 'sans-serif'],
        body: ['"Patrick Hand"', 'cursive', 'sans-serif'],
      },
      borderRadius: {
        wobbly: '255px 15px 225px 15px / 15px 225px 15px 255px',
        wobblyMd: '20px 255px 20px 255px / 255px 20px 255px 20px',
        wobblyBlob: '60% 40% 70% 30% / 40% 50% 60% 50%',
        wobblyAlt: '255px 25px 225px 25px / 25px 225px 25px 255px',
        wobblyTag: '120px 10px 100px 10px / 10px 100px 10px 120px',
      },
      boxShadow: {
        sketch: '4px 4px 0px 0px var(--pencil-shadow)',
        sketchDeep: '8px 8px 0px 0px var(--pencil-shadow)',
        sketchSubtle: '3px 3px 0px 0px var(--pencil-shadow-subtle)',
        sketchRed: '4px 4px 0px 0px var(--accent-red)',
        sketchBlue: '4px 4px 0px 0px var(--accent-blue)',
      },
      animation: {
        'gentle-bounce': 'gentleBounce 3s ease-in-out infinite',
        'jiggle': 'jiggle 0.3s ease-in-out',
      },
      keyframes: {
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        jiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-2deg)' },
          '75%': { transform: 'rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
}
