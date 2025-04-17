import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// serve built files
app.use(express.static(path.join(__dirname, 'dist')));

// clean URLs: try folder index, then .html, else 404
app.get('*', (req, res) => {
  const reqPath = req.path.endsWith('/') ? req.path.slice(0, -1) : req.path;
  const indexFile = path.join(__dirname, 'dist', reqPath, 'index.html');
  res.sendFile(indexFile, err => {
    if (err) {
      const htmlFile = path.join(__dirname, 'dist', reqPath + '.html');
      res.sendFile(htmlFile, err2 => {
        if (err2) {
          res.status(404).send('Page not found');
        }
      });
    }
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
