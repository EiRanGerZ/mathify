import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Phase 1 "islands": build each interactive page to a fixed-name ESM bundle + CSS
// directly into the webapp, so the existing JSP shells can include them with a
// plain <script type="module"> / <link rel="stylesheet">. No manifest needed yet.
//
// Output dir is `assets/app` (not `dist`/`build`, which .dockerignore filters).
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../src/main/webapp/assets/app',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // one entry per page; add more here as pages are migrated
        dashboard:      'src/pages/dashboard/main.jsx',
        home:           'src/pages/home/main.jsx',
        landing:        'src/pages/landing/main.jsx',
        login:          'src/pages/login/main.jsx',
        register:       'src/pages/register/main.jsx',
        library:        'src/pages/library/main.jsx',
        courseLibrary:  'src/pages/courseLibrary/main.jsx',
        quiz:           'src/pages/quiz/main.jsx',
        course:         'src/pages/course/main.jsx',
        courses:        'src/pages/courses/main.jsx',
        premium:        'src/pages/premium/main.jsx',
        adminDashboard: 'src/pages/adminDashboard/main.jsx',
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    },
  },
});
