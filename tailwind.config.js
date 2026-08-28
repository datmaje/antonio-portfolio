/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ocean': {
          50: '#f0f8ff',
          100: '#e0f1ff',
          200: '#c1e4ff',
          300: '#a2d5ff',
          400: '#6db8ff',
          500: '#2ba8d9',
          600: '#0F3A5F',
          700: '#0A1929',
          800: '#051421',
          900: '#030b14',
        },
        'teal': {
          50: '#f0feff',
          400: '#06b6d4',
          500: '#0891b2',
          600: '#0e7490',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'Sora', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'ripple': 'ripple 1s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        }
      },
    },
  },
  plugins: [],
}
