import { pool } from '$lib/server/db';

export async function load() {
    try {
        // Fetch books stats
        const [bookCountResult] = await pool.query('SELECT COUNT(*) as count FROM books');
        const [lastBookResult] = await pool.query('SELECT * FROM books ORDER BY id DESC LIMIT 1');

        // Fetch series stats
        const [serieCountResult] = await pool.query('SELECT COUNT(*) as count FROM serie_tv');
        const [lastSerieResult] = await pool.query('SELECT * FROM serie_tv ORDER BY id DESC LIMIT 1');

        return {
            bookStats: {
                count: bookCountResult[0].count,
                lastAdded: lastBookResult[0] || null
            },
            serieStats: {
                count: serieCountResult[0].count,
                lastAdded: lastSerieResult[0] || null
            }
        };
    } catch (err) {
        console.error('Error loading home stats:', err);
        return {
            bookStats: { count: 0, lastAdded: null },
            serieStats: { count: 0, lastAdded: null }
        };
    }
}
