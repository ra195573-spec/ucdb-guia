import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/ucdb-guia/',
  server: {
    port: 8100,
  },
});
