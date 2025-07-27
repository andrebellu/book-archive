// routes/authors.js
import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Recupera tutti gli autori
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM authors');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero degli autori' });
  }
});

// Recupera un singolo autore
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM authors WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Autore non trovato' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero dell\'autore' });
  }
});

export default router;
