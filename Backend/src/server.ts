import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import shortid from 'shortid';

const app = express();
app.use(express.json());

// In-memory database to store the URLs
const urlDatabase: { [key: string]: string } = {};

// Enable CORS to allow cross-origin requests
app.use((req: Request, res: Response, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Route to create a short URL
app.post(
  '/api/shorten',
  [
    body('url').isURL().withMessage('Invalid URL'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const longUrl = req.body.url;
    const shortUrl = shortid.generate();

    urlDatabase[shortUrl] = longUrl;

    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortUrl}` });
  }
);

// Route to redirect to the original URL
app.get('/:shortUrl', (req: Request, res: Response) => {
  const shortUrl = req.params.shortUrl;
  const longUrl = urlDatabase[shortUrl];

  if (!longUrl) {
    return res.status(404).json({ message: 'URL not found' });
  }

  res.redirect(longUrl);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
