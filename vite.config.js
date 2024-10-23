import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets:[ {
        src: "sw.js",
        dest: ""
      },
      {
        src: "js/app.js",
        dest: "js"
      },
      {
        src: "img",
        dest: "assets" 
      },
      {
        src: "public",
        dest: "" 
      },
      {
        src: "manifest.json",
        dest: ""
      }]
    }),
    react()
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/index-001.js",
      },
    },
  },
});
