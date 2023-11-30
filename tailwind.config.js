/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "chevron-down": "url('../public/chevron-down.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundPosition: {
        "right-4": "right 0.7rem center",
      },
      screens: {
        s: { raw: "(max-width: 640px)" },
        xs: { raw: "(max-width: 448px)" },
        xxs: { raw: "(max-width: 374px)" },
      },
    },
  },
  plugins: [],
};
