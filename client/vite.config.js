import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: '',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      components: path.resolve('src/components/'),
      pages: path.resolve('src/pages/'),
      hooks: path.resolve('src/hooks/'),
      context: path.resolve('src/context/'),
      utils: path.resolve('src/utils/'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/variables.scss";`,
      },
    },
  },
});
