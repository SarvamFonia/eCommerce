import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { viteStaticCopy } from 'vite-plugin-static-copy';
// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/_headers', // where your _headers file is
          dest: 'dist'               // copy to root of dist/
        },
        {
          src: 'public/redirects', // where your _headers file is
          dest: 'dist'               // copy to root of dist/
        }
      ]
    }),
  ],
  base: "/",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});