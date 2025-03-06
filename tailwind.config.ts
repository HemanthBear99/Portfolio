import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1200px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '2rem',
      },
    },
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
      },
      animation: {
        'ping-large': 'ping-large 1s ease-in-out infinite',
        'move-left': 'move-left 1s linear infinite',
        'move-right': 'move-right 1s linear infinite',
        'bounce-color': 'bounce-color 1.5s infinite',
        'pulse-scale': 'pulse-scale 1.5s infinite',
        'wave-hand': 'wave-hand 2s infinite',
      },
      keyframes: {
        'ping-large': {
          '75%,100%': {
            transform: 'scale(3)',
            opacity: '0',
          },
        },
        'move-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'move-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'bounce-color': {
          // ⬅️ Added this
          '0%, 100%': {
            transform: 'translateY(0)',
            color: '#d8b4fe', // Normal color
          },
          '50%': {
            transform: 'translateY(-8px)',
            color: '#38bdf8', // Splash color (sky-400)
          },
        },
        'pulse-scale': {
          // ⬅️ Added pulse keyframe
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1.2)',
            opacity: '0.8',
          },
        },
        'wave-hand': {
          '0%': { transform: 'rotate(0deg) scale(1.2)' },
          '15%': { transform: 'rotate(14deg) scale(1.6)' },
          '30%': { transform: 'rotate(-8deg) scale(1.4)' },
          '40%': { transform: 'rotate(14deg) scale(1.6)' },
          '50%': { transform: 'rotate(-4deg) scale(1.4)' },
          '60%': { transform: 'rotate(10deg) scale(1.5)' },
          '70%': { transform: 'rotate(0deg) scale(1.3)' },
          '100%': { transform: 'rotate(0deg) scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
