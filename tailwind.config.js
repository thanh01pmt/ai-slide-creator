/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#818CF8",
        cta: "#22C55E",
        background: "#EEF2FF",
        text: "#312E81",
        accent: "#EB8FD8", // Keeping the slide pink for variety
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Montserrat", "sans-serif"],
        "slide-heading": ["var(--s-font-heading)", "sans-serif"],
        "slide-body": ["var(--s-font-body)", "sans-serif"],
        "slide-mono": ["var(--s-font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
}
