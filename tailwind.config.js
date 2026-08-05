/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B00',
          hover: '#E65C00',
        },
        secondary: '#A3FF12',
        accent: '#00D9FF',
        success: '#22C55E',
        warning: '#FACC15',
        error: '#EF4444',
        dark: '#0B0F19',
        surface: '#131B2E',
        card: '#1A2338',
        border: '#293548',
        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          muted: '#94A3B8',
        },
      },
      backgroundImage: {
        'cta-gradient': 'linear-gradient(135deg, #FF6B00 0%, #FF8A00 100%)',
        'hero-gradient': 'linear-gradient(135deg, #A3FF12 0%, #00D9FF 100%)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
}