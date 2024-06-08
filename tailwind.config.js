/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./src/**/*.{js,jsx,}",
  ],
  presets: [nextui()],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '5xl': ['56px', '68px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        forum: ['Forum', 'serif'],
      },
      colors: {
        'primary': "#ECEEFF",
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)"
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        'hero': "url('assets/images/collection-background.svg')",
        'card': "url('assets/images/thumbnail-background.svg')",
        'bg2' : "url('./assets/background2.png')",
        'custom-gradient': "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        'beams': "url('assets/images/beams.jpg')",
        'bg2':"url('assets/background2.jpg')",
      },
      screens: {
        "wide": "1440px"
      },
      transitionDelay: {
        '0': '0ms',
        '1': '100ms',
        '2': '200ms',
        '3': '300ms',
        '4': '400ms',
        '5': '500ms',
        '6': '600ms',
        '7': '700ms',
        '8': '800ms',
        '9': '900ms',
      },
      animation: {
        blob: "blob 7s ease-in-out infinite",
        gradient: "gradient 15s infinite",
        "fade-in": "fade-in 0.5s ease-out",
        fade: 'fadeIn .5s ease-in-out',
        'spin-slow': 'spin 1s ease',
      },
      keyframes: {
        gradientA: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        "fade-in": {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
      },
  },
  plugins: [],
  darkMode: '',
  plugins: [
    nextui()
  ],
  }
}