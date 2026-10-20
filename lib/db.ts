import mysql from 'mysql2/promise';

const globalForDb = globalThis as unknown as { pool?: mysql.Pool };

export const pool =
  globalForDb.pool ??
  mysql.createPool({
    uri: process.env.DATABASE_URL,
    connectionLimit: 10,
  });

if (process.env.NODE_ENV !== 'production') globalForDb.pool = pool;