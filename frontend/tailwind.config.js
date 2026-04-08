/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0052cc',
        'primary-light': '#4d94ff',
        'primary-dark': '#003d99',
        accent: '#00d9ff',
        'accent-2': '#7c3aed',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        slideUp: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        slideDown: 'slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(15px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          'from': { opacity: '0', transform: 'translateY(-20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 82, 204, 0.3), 0 0 40px rgba(0, 168, 232, 0.1)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(0, 82, 204, 0.5), 0 0 60px rgba(0, 168, 232, 0.2)' 
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropFilter: {
        'blur-xl': 'blur(25px)',
      },
    },
  },
  plugins: [],
}
