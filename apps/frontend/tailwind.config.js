/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lane: {
          bg: '#09051c',
          card: '#171138',
          accent: '#22d3ee',
          neon: '#9f6cff'
        }
      },
      boxShadow: {
        neon: '0 0 14px rgba(159, 108, 255, 0.5)'
      }
    }
  },
  plugins: []
};
