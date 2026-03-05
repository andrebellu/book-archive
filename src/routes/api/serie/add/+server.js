import { json } from '@sveltejs/kit';
import { pool } from '$lib/server/db.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    const [rows] = await pool.query('SELECT * FROM serie_tv');
    return json(rows);
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        let { titolo, cover, genere, anno_inizio, anno_fine, voto_personale, tipo, stagioni, stato, id_tmdb } = await request.json();

        if (cover === 'NULL' || cover === '' || cover === undefined) cover = null;
        if (genere === 'NULL' || genere === '' || genere === undefined) genere = null;
        if (anno_inizio === 'NULL' || anno_inizio === '' || anno_inizio === undefined) anno_inizio = null;
        if (anno_fine === 'NULL' || anno_fine === '' || anno_fine === undefined) anno_fine = null;
        if (voto_personale === 'NULL' || voto_personale === '' || voto_personale === undefined) voto_personale = null;
        if (tipo === 'NULL' || tipo === '' || tipo === undefined) tipo = 0;
        if (stagioni === 'NULL' || stagioni === '' || stagioni === undefined) stagioni = 0;
        if (stato === 'NULL' || stato === '' || stato === undefined) stato = null;
        if (id_tmdb === 'NULL' || id_tmdb === '' || id_tmdb === undefined) id_tmdb = null;

        if (!titolo) {
            return json({ error: 'Missing titolo' }, { status: 400 });
        }

        console.log('[API] Inserimento serie:', { titolo, cover, genere, anno_inizio, anno_fine, voto_personale, tipo, stagioni, stato, id_tmdb });

        const [result] = await pool.query(
            `INSERT INTO serie_tv (titolo, cover, genere, anno_inizio, anno_fine, voto_personale, tipo, stagioni, stato)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [titolo, cover, genere, anno_inizio, anno_fine, voto_personale, tipo, stagioni, stato]
        );

        return json({
            id: result.insertId,
            titolo,
            cover,
            genere,
            anno_inizio,
            anno_fine,
            voto_personale,
            tipo,
            stagioni,
            stato,
            id_tmdb
        }, { status: 201 });

    } catch (err) {
        console.error('[API] Errore inserimento serie:', err);
        return json({ error: 'Errore interno', details: err.message, stack: err.stack }, { status: 500 });
    }
}
