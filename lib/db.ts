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

const dbUrlObj = new URL(dbUrl);

export const pool =
  globalForDb.pool ??
  mysql.createPool({
    host: dbUrlObj.hostname,
    user: dbUrlObj.username,
    password: dbUrlObj.password,
    database: dbUrlObj.pathname.substring(1),
    port: dbUrlObj.port ? Number(dbUrlObj.port) : 3306,
    connectionLimit: 1,
    ssl: sslConfig,
  });

if (process.env.NODE_ENV !== 'production') globalForDb.pool = pool;