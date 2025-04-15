import {viteStaticCopy} from 'vite-plugin-static-copy';
import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {src: 'background.js', dest: ''},
        {src: 'content.js', dest: ''},
        {src: 'manifest.json', dest: ''},
        {src: 'style.css', dest: ''},
        {src: 'icons/*', dest: 'icons'},
        // Add any other files or directories you want to copy to 'dist' here
      ],
      overwrite: true,
    }),
  ],
  base: './', // Required for Chrome extension asset loading
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: '', // Ensure static assets are on the root of dist
    rollupOptions: {
      input: {
        options: 'options.html',
        // Add more entry points if you have other HTML files
      },
    },
    target: 'esnext',
    minify: false,
  },
});
