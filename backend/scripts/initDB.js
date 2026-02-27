import pg from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const initializeDB = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL database');

        const schemaSql = fs.readFileSync(path.join(__dirname, '../models/schema.sql'), 'utf8');

        await client.query(schemaSql);
        console.log('Database initialized successfully with events and registrations tables.');

        client.release();
    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        pool.end();
    }
};

initializeDB();
