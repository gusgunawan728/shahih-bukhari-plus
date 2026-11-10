import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on 0.0.0.0 (localhost, 127.0.0.1)
    port: 3000,
    open: false,
    fs: {
      allow: [
        'C:/Users/User2/Downloads/GURU_SMART_ACADEMIC',
        'C:/Users/User2/Downloads/PROJECT ANTIGRAVITY'
      ]
    },
    watch: {
      ignored: ['**/*.docx', '**/*.xlsx', '**/*.pdf', '**/~*']
    }
  }
});
