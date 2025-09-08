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
        let { title, cover, short_description, reading_status, author_id, genre, shelf, is_borrowed, publisher } = await request.json();

        if (cover === 'NULL' || cover === '' || cover === undefined) cover = null;
        if (author_id === 'NULL' || author_id === '' || author_id === undefined) author_id = null;
        if (reading_status === 'NULL' || reading_status === '' || reading_status === undefined) reading_status = null;
        if (genre === 'NULL' || genre === '' || genre === undefined) genre = null;
        if (shelf === 'NULL' || shelf === '' || shelf === undefined) shelf = null;
        if (is_borrowed === 'NULL' || is_borrowed === '' || is_borrowed === undefined) is_borrowed = 0;
        if (publisher === 'NULL' || publisher === '' || publisher === undefined) publisher = null;

        if (!title || !author_id) {
            return json({ error: 'Missing title or author_id' }, { status: 400 });
        }

        console.log('[API] Inserimento libro:', { title, cover, short_description, reading_status, author_id, genre, shelf, is_borrowed, publisher });

        const [result] = await pool.query(
            `INSERT INTO books (title, cover, short_description, reading_status, author_id, genre, shelf, is_borrowed, publisher)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, cover, short_description, reading_status, author_id, genre, shelf, is_borrowed, publisher]
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
            publisher
        }, { status: 201 });

    } catch (err) {
        console.error('[API] Errore inserimento libro:', err);
        return json({ error: 'Errore interno', details: err.message, stack: err.stack }, { status: 500 });
    }
}