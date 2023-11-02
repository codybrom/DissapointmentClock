import {viteStaticCopy} from 'vite-plugin-static-copy';

export default {
  plugins: [
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
  base: './', // This is required to ensure that assets are loaded correctly when running as a Chrome extension.
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: '', // Ensure static assets are on the root of dist.
    rollupOptions: {
      input: {
        // popup: 'path/to/popup.html',
        options: 'options.html',
        // Add more entry points if you have other HTML files
      },
    },
  },
  css: {
    postcss: './postcss.config.js', // point to your PostCSS config if it's not automatically detected
  },
};
