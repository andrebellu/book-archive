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
        let { title, cover, short_description, reading_status, author_id, genre, shelf, is_borrowed, publication_date } = await request.json();

        if (cover === 'NULL' || cover === '' || cover === undefined) cover = null;
        if (author_id === 'NULL' || author_id === '' || author_id === undefined) author_id = null;
        if (publication_date === 'NULL' || publication_date === '' || publication_date === undefined) publication_date = null;
        if (reading_status === 'NULL' || reading_status === '' || reading_status === undefined) reading_status = null;

        if (!title || !author_id) {
            return json({ error: 'Missing title or author_id' }, { status: 400 });
        }

        console.log('[API] Inserimento libro:', { title, cover, short_description, reading_status, author_id, genre, shelf, is_borrowed, publication_date });

        const [result] = await pool.query(
            `INSERT INTO books (title, cover, short_description, reading_status, author_id, genre, shelf, is_borrowed, publication_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, cover, short_description, reading_status, author_id, genre, shelf, is_borrowed, publication_date]
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
            is_borrowed,
            publication_date
        }, { status: 201 });

    } catch (err) {
        console.error('[API] Errore inserimento libro:', err);
        return json({ error: 'Errore interno', details: err.message, stack: err.stack }, { status: 500 });
    }
}