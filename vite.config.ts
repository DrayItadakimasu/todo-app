import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, "src")
    }
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
});
