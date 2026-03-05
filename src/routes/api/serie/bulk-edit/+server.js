import { json } from '@sveltejs/kit';
import { pool } from '$lib/server/db.js';

export async function POST({ request }) {
    try {
        const { ids, updates } = await request.json();

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return json({ error: 'Missing or empty ids array' }, { status: 400 });
        }

        if (!updates || Object.keys(updates).length === 0) {
            return json({ error: 'Missing updates object' }, { status: 400 });
        }

        // Build the query
        let setClause = [];
        let params = [];

        if (updates.stato !== undefined) {
            setClause.push('stato = ?');
            params.push(updates.stato);
        }
        // Add other bulk-updatable fields here if needed (e.g., delete)

        if (setClause.length === 0) {
            return json({ error: 'No valid fields to update' }, { status: 400 });
        }

        // Append the IDs for the IN clause
        const placeholders = ids.map(() => '?').join(',');
        const sql = `UPDATE serie_tv SET ${setClause.join(', ')} WHERE id IN (${placeholders})`;

        params.push(...ids);

        await pool.query(sql, params);

        return json({ success: true, count: ids.length });

    } catch (err) {
        console.error('[API] Bulk update error:', err);
        return json({ error: 'Internal server error', details: err.message }, { status: 500 });
    }
}
