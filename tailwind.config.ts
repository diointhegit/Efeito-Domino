import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/atoms/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/molecules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003BA8",
        secondary: "#A63446",
        accent: "#A3B9C9",
        "dark-text": "#0D0E21",
        "dark-bg": "#0A0C1B",
        "light-text": "#DFE0F3",
        "light-bg": "#eef4fc",
        bg: "var(--foreground-rgb)",
      },
      keyframes: {
        "slide-left": {
          "0%": {
            transform: "translate3d(0, 0, 0)",
          },
          "100%": {
            transform: "translate3d(-100%, 0, 0)",
          },
        },
      },
      "fade-in": {
        "0%": {
          opacity: 0,
        },
        "100%": {
          opacity: 1,
        },
      },
      "slide-in-right": {
        "0%": {
          visibility: "visible",
          transform: "translate3d(100%, 0, 0)",
        },
        "100%": {
          transform: "translate3d(0, 0, 0)",
        },
      },
      animation: {
        slideinleft: "slide-in-left 1s ease-in-out 0.25s 1 ",
        fadein: "fade-in 1s ease-in-out 0.25s 1",
        slideinright: "slide-in-right 1s ease-in-out 0.25s 1",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["Raleway"],
      },
    },
    transitionProperty: {
      width: "width",
      height: "height",
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
