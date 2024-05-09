import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import commonjs from 'vite-plugin-commonjs';
import checker from 'vite-plugin-checker';
import generouted from '@generouted/react-router/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: (path) => path.split('/').reverse()[path.split('/').reverse().indexOf('node_modules') - 1],
      },
    },
  },
  server: { port: 3000, open: true },
  plugins: [
    commonjs(),
    tsconfigPaths(),
    react(),
    generouted(),
    svgr(),
    checker({
      typescript: true,
      enableBuild: true,
      eslint: {
        dev: {
          logLevel: ['error'],
        },
        lintCommand: 'eslint "./src/**/*.{ts,tsx}" --cache',
      },
    }),
  ],
});
