/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17181A',
        muted: '#8B8D91',
        shell: '#EFEFEE',
        sidebar: '#F8F8F7',
        backdrop: '#E4E4E2',
        accent: '#E23E30',
        accentSoft: '#FDECEA',
        up: '#16A34A',
        upSoft: '#E7F6EC',
        leased: '#3B82F6',
        owned: '#EC4899',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
      },
    },
  },
  plugins: [],
}
