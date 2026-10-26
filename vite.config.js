import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sceneTts } from './scripts/tts-plugin.mjs';

export default defineConfig({
  plugins: [react(), sceneTts()],
});
