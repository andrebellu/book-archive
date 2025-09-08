import { json } from '@sveltejs/kit';
import { pool } from '$lib/server/db.js';


export async function POST({ request }) {
	try {
		const {
			id,
			title,
			cover,
			publisher,
			genre,
			shelf,
			short_description,
			reading_status,
			is_borrowed
		} = await request.json();
		if (!id) return json({ error: 'Missing id' }, { status: 400 });

		let updates = [];
		let params = [];
		if (title !== undefined) {
			updates.push('title = ?');
			params.push(title);
		}
		if (cover !== undefined) {
			updates.push('cover = ?');
			params.push(cover);
		}
		if (publisher !== undefined) {
			updates.push('publisher = ?');
			params.push(publisher);
		}
		if (genre !== undefined) {
			updates.push('genre = ?');
			params.push(genre);
		}
		if (shelf !== undefined) {
			updates.push('shelf = ?');
			params.push(shelf);
		}
		if (short_description !== undefined) {
			updates.push('short_description = ?');
			params.push(short_description);
		}
		if (reading_status !== undefined) {
			updates.push('reading_status = ?');
			params.push(reading_status);
		}
		if (is_borrowed !== undefined) {
			updates.push('is_borrowed = ?');
			params.push(is_borrowed);
		}
		if (updates.length === 0) return json({ error: 'No fields to update' }, { status: 400 });

		params.push(id);
		const sql = `UPDATE books SET ${updates.join(', ')} WHERE id = ?`;
		await pool.query(sql, params);
		return json({ success: true });
	} catch (err) {
		return json({ error: 'Errore update', details: err.message }, { status: 500 });
	}
}
