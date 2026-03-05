import { json } from '@sveltejs/kit';
import { pool } from '$lib/server/db.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    try {
        const search = url.searchParams.get('search') || '';
        const sort = url.searchParams.get('sort') || 'title_asc';
        const status = url.searchParams.get('status') || '';

        let query = 'SELECT * FROM books WHERE 1=1';
        const params = [];

        if (search) {
            query += ' AND (title LIKE ? OR short_description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        if (status) {
            query += ' AND reading_status = ?';
            params.push(status);
        }

        const genre = url.searchParams.get('genre');
        if (genre) {
            query += ' AND genre LIKE ?';
            params.push(`%${genre}%`);
        }

        const publisher = url.searchParams.get('publisher');
        if (publisher) {
            query += ' AND publisher LIKE ?';
            params.push(`%${publisher}%`);
        }

        // Sorting logic
        switch (sort) {
            case 'newest':
                query += ' ORDER BY id DESC';
                break;
            case 'oldest':
                query += ' ORDER BY id ASC';
                break;
            case 'status':
                // Sort by reading status priority (Read > Reading > Unread) - simplified
                query += ' ORDER BY reading_status DESC';
                break;
            case 'title_desc':
                query += ' ORDER BY title DESC';
                break;
            case 'title_asc':
            default:
                query += ' ORDER BY title ASC';
                break;
        }

        const [rows] = await pool.query(query, params);
        return json(rows);
    } catch (err) {
        console.error('[API] Error fetching books:', err);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
