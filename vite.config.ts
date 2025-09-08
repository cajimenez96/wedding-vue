import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  build: {
    assetsInlineLimit: 0, // Don't inline any assets
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.mp3')) {
            // Clean filename for production
            const name = assetInfo.name.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return `assets/music/${name}[extname]`;
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
})
