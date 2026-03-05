/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0066FF',
          obsidian: '#050505',
          charcoal: '#0f0f0f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        header: ['Syncopate', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'noise': 'noise 0.2s infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        noise: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-1%, -1%)' },
          '20%': { transform: 'translate(-2%, 1%)' },
          '30%': { transform: 'translate(1%, -2%)' },
          '40%': { transform: 'translate(-1%, 3%)' },
          '50%': { transform: 'translate(-2%, 1%)' },
          '60%': { transform: 'translate(3%, 0)' },
          '70%': { transform: 'translate(0, 2%)' },
          '80%': { transform: 'translate(-3%, 0)' },
          '90%': { transform: 'translate(2%, 1%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-25%)' },
        }
      }
    },
  },
  plugins: [],
}
