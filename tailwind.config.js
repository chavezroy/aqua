/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-ocean': '#0F172A',
        'reef-teal': '#14B8A6',
        'mist': '#F8FAFC',
        'algae-green': '#22C55E',
        'ammonia-yellow': '#F59E0B',
        'coral-red': '#EF4444',
      },
    },
  },
  plugins: [],
}

