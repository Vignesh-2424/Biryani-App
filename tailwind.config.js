/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        kaushan: ['Kaushan Script', 'cursive'],
        luckiest: ['Luckiest Guy', 'cursive'],
        kebagh: ['Montserrat', 'sans-serif'],
      },
      colors: {
        maroon: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#9f1239',
          600: '#881337',
          700: '#70102f',
          800: '#5a0e26',
          900: '#4c0d22',
          DEFAULT: '#8B0000',
        },
        amber: {
          300: '#fcd34d',
          400: '#f59e0b',
          500: '#d97706',
        },
        goldenrod: {
          100: '#F8D878',
          200: '#F1B93B',
        },
        firebrick: '#B22222',
      },
      boxShadow: {
        menu: '0px 4px 12px 3px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};