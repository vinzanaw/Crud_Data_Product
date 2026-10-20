import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

const globalForDb = globalThis as unknown as { pool?: mysql.Pool };

const isProduction = process.env.NODE_ENV === 'production';

let sslConfig = undefined;
if (isProduction) {
  try {
    sslConfig = {
      ca: fs.readFileSync(path.join(process.cwd(), 'ca.pem')),
      rejectUnauthorized: true,
    };
  } catch (error) {
    console.error("Gagal membaca ca.pem:", error);
  }
}

let dbUrl = process.env.DATABASE_URL || '';
dbUrl = dbUrl.replace('?ssl-mode=REQUIRED', '').replace('&ssl-mode=REQUIRED', '');

export const pool =
  globalForDb.pool ??
  mysql.createPool({
    uri: dbUrl,
    connectionLimit: 1,
    ssl: sslConfig,
  });

if (process.env.NODE_ENV !== 'production') globalForDb.pool = pool;