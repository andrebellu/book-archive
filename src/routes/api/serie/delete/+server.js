import { json } from '@sveltejs/kit';
import { pool } from '$lib/server/db.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const { ids } = await request.json();

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return json({ error: 'Invalid or missing ids' }, { status: 400 });
        }

        // Use placeholders based on the length of the ids array
        const placeholders = ids.map(() => '?').join(',');
        const sql = `DELETE FROM serie_tv WHERE id IN (${placeholders})`;

        await pool.query(sql, ids);

        return json({ success: true, deletedCount: ids.length });

    } catch (err) {
        console.error('[API] Errore eliminazione serie:', err);
        return json({ error: 'Errore interno', details: err.message }, { status: 500 });
    }
}
