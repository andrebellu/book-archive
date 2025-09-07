import { json } from '@sveltejs/kit';
import { pool } from '$lib/server/db.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    const [rows] = await pool.query('SELECT * FROM books');
    return json(rows);
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        let { title, cover, short_description, reading_status, author_id, genre, shelf, is_borrowed } = await request.json();

        if (cover === 'NULL' || cover === '' || cover === undefined) cover = null;
        if (author_id === 'NULL' || author_id === '' || author_id === undefined) author_id = null;
        if (reading_status === 'NULL' || reading_status === '' || reading_status === undefined) reading_status = null;

        if (!title || !author_id) {
            return json({ error: 'Missing title or author_id' }, { status: 400 });
        }

        console.log('[API] Inserimento libro:', { title, cover, short_description, reading_status, author_id, genre, shelf, is_borrowed });

        const [result] = await pool.query(
            `INSERT INTO books (title, cover, short_description, reading_status, author_id, genre, shelf, is_borrowed)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, cover, short_description, reading_status, author_id, genre, shelf, is_borrowed]
        );
        console.log('[API] Book added with ID:', result.insertId);

        return json({
            id: result.insertId,
            title,
            cover,
            short_description,
            reading_status,
            author_id,
            genre,
            shelf,
            is_borrowed
        }, { status: 201 });

    } catch (err) {
        console.error('[API] Errore inserimento libro:', err);
        return json({ error: 'Errore interno', details: err.message, stack: err.stack }, { status: 500 });
    }
}