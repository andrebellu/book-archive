
import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM books');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

router.post('/', async (req, res) => {
  const { title, author_id } = req.body;
  if (!title || !author_id) {
    return res.status(400).json({ error: 'Missing title or author_id' });
  }
  const [result] = await pool.query(
    'INSERT INTO books (title, author_id) VALUES (?, ?)',
    [title, author_id]
  );
  res.status(201).json({ id: result.insertId, title, author_id });
});

export default router;
