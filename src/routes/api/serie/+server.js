import { json } from '@sveltejs/kit';
import { pool } from '$lib/server/db.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM serie_tv ORDER BY titolo ASC');
        return json(rows);
    } catch (err) {
        console.error('[API] Errore recupero serie:', err);
        return json({ error: 'Errore interno', details: err.message }, { status: 500 });
    }
}
