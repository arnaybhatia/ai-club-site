import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// serve built files
app.use(express.static(path.join(__dirname, 'dist')));

// For debugging - list HTML files in dist directory
console.log('Available HTML files:');
try {
  const files = fs.readdirSync(path.join(__dirname, 'dist'));
  files.forEach(file => {
    if (file.endsWith('.html')) {
      console.log(`- ${file}`);
    }
  });
} catch (err) {
  console.error('Error reading dist directory:', err);
}

// Handle special case for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Clean URLs: handle routes without file extensions
app.get('/:page', (req, res) => {
  const pageName = req.params.page;
  const htmlFile = path.join(__dirname, 'dist', `${pageName}.html`);
  
  // Log for debugging
  console.log(`Requested page: ${pageName}, checking file: ${htmlFile}`);
  
  // Check if the HTML file exists
  fs.access(htmlFile, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`File not found: ${htmlFile}`);
      // If file doesn't exist, try the next option or return 404
      return res.status(404).send('Page not found');
    }
    
    // File exists, send it
    console.log(`Serving file: ${htmlFile}`);
    res.sendFile(htmlFile);
  });
});

// Fallback for all other routes
app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
