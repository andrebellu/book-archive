import { json } from '@sveltejs/kit';
import { pool } from '$lib/server/db.js';

export async function POST({ request }) {
    try {
        const {
            id,
            titolo,
            cover,
            genere,
            anno_inizio,
            anno_fine,
            voto_personale,
            stagioni,
            stagione_corrente,
            episodio_corrente,
            totale_stagioni,
            stato,
            tipo
        } = await request.json();

        if (!id) return json({ error: 'Missing id' }, { status: 400 });

        let updates = [];
        let params = [];

        if (titolo !== undefined) {
            updates.push('titolo = ?');
            params.push(titolo);
        }
        if (cover !== undefined) {
            updates.push('cover = ?');
            params.push(cover);
        }
        if (genere !== undefined) {
            updates.push('genere = ?');
            params.push(genere);
        }
        if (anno_inizio !== undefined) {
            updates.push('anno_inizio = ?');
            params.push(anno_inizio);
        }
        if (anno_fine !== undefined) {
            updates.push('anno_fine = ?');
            params.push(anno_fine);
        }
        if (voto_personale !== undefined) {
            updates.push('voto_personale = ?');
            params.push(voto_personale);
        }
        if (stagioni !== undefined) {
            updates.push('stagioni = ?');
            params.push(stagioni);
        }
        if (stagione_corrente !== undefined) {
            updates.push('stagione_corrente = ?');
            params.push(stagione_corrente);
        }
        if (episodio_corrente !== undefined) {
            updates.push('episodio_corrente = ?');
            params.push(episodio_corrente);
        }
        if (totale_stagioni !== undefined) {
            updates.push('totale_stagioni = ?');
            params.push(totale_stagioni);
        }
        if (stato !== undefined) {
            updates.push('stato = ?');
            params.push(stato);
        }
        if (tipo !== undefined) {
            updates.push('tipo = ?');
            params.push(tipo);
        }

        if (updates.length === 0) return json({ error: 'No fields to update' }, { status: 400 });

        params.push(id);
        const sql = `UPDATE serie_tv SET ${updates.join(', ')} WHERE id = ?`;
        await pool.query(sql, params);

        return json({ success: true });

    } catch (err) {
        console.error('[API] Errore update serie:', err);
        return json({ error: 'Errore update', details: err.message }, { status: 500 });
    }
}
