/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#16202B',
        paper: '#F7F9FB',
        night: '#0B1626',
        amber: '#E8A33D',
        slateblue: '#4A7FC9',
        skylight: '#8FBFE0',
        rain: '#5C7A99',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'sky-clear-day': 'linear-gradient(160deg, #4A7FC9 0%, #8FBFE0 55%, #E8A33D 130%)',
        'sky-clouds-day': 'linear-gradient(160deg, #5C7A99 0%, #8FA6BF 55%, #C7D4DE 130%)',
        'sky-rain-day': 'linear-gradient(160deg, #37485A 0%, #5C7A99 60%, #7C93A6 130%)',
        'sky-clear-night': 'linear-gradient(160deg, #0B1626 0%, #16202B 55%, #2A3B4D 130%)',
        'sky-clouds-night': 'linear-gradient(160deg, #0B1626 0%, #1E2A38 55%, #3A4A5A 130%)',
        'sky-snow-day': 'linear-gradient(160deg, #6E8BA6 0%, #B9CBDA 55%, #EDF2F5 130%)',
        'sky-storm': 'linear-gradient(160deg, #10151C 0%, #2E3A44 55%, #4A5A66 130%)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(2%) translateY(-1%)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        drift: 'drift 18s ease-in-out infinite',
        rise: 'rise 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
