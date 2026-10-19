/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: "#080A0D",
          deep: "#040507",
          subtle: "#0D1015",
        },
        graphite: {
          DEFAULT: "#15191F",
          light: "#1C222A",
          lighter: "#242C37",
          border: "#2A3340",
          card: "rgba(21, 25, 31, 0.75)",
        },
        lime: {
          DEFAULT: "#C6FF3D",
          hover: "#B6F528",
          subtle: "rgba(198, 255, 61, 0.12)",
          glow: "rgba(198, 255, 61, 0.25)",
        },
        muted: {
          DEFAULT: "#9199A5",
          dark: "#5A6270",
          light: "#B0B7C3",
        },
        white: {
          DEFAULT: "#F5F7FA",
          pure: "#FFFFFF",
          dim: "#C5CCD6",
        },
      },
      fontFamily: {
        display: ['"Outfit"', '"Syne"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'lime-glow': '0 0 35px -5px rgba(198, 255, 61, 0.35)',
        'lime-subtle': '0 0 20px -2px rgba(198, 255, 61, 0.15)',
        'glass': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'glow-car': '0 30px 100px -20px rgba(0, 0, 0, 0.9)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'carbon-mesh': 'radial-gradient(#1c222a 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
