import express from 'express';
import books from './routes/books.js';
import authors from './routes/authors.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.use('/books', books);
app.use('/authors', authors);


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Errore interno del server' });
});

app.listen(3006, '0.0.0.0', () => {
  console.log("API running on http://0.0.0.0:3006");
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Non terminare immediatamente, ma valuta se farlo
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
