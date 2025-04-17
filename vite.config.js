import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Get all HTML files in the root directory (excluding index.html)
const htmlFiles = fs.readdirSync('./')
  .filter(file => file.endsWith('.html') && file !== 'index.html');

// Create input object for all HTML files
const input = {
  main: resolve(__dirname, 'index.html'),
};

// Add other HTML files to input object
htmlFiles.forEach(file => {
  const name = file.replace('.html', '');
  input[name] = resolve(__dirname, file);
});

// Export configuration
export default defineConfig({
  build: {
    rollupOptions: {
      input,
    },
  },
});
