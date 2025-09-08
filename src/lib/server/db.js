import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function createPool() {
    const localConfig = {
        host: process.env.DB_HOST_LOCAL,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: 'utf8mb4'
    };

    console.log('[DB] Config:', localConfig);

    try {
        console.log('[DB] Tentativo connessione a', localConfig.host, localConfig.database, localConfig.user);
        const pool = mysql.createPool(localConfig);
        await pool.query('SELECT 1'); // Test connection
        console.log('[DB] Connesso con successo');
        return pool;
    } catch (err) {
        console.error('[DB] Connessione fallita:', err);
        throw err;
    }
}

export const pool = await createPool();