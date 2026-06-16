/** @type {import('tailwindcss').Config} */
export default {
  // Scan the bundle source AND the JSP shells, since both still use Tailwind
  // utility classes (the JSPs until they're migrated in later phases).
  content: [
    './src/**/*.{js,jsx}',
    '../src/main/webapp/**/*.jsp',
  ],
  theme: { extend: {} },
  plugins: [],
};
