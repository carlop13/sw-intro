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
      }]
    }),
    react()
  ],
});
