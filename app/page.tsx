import { Suspense } from 'react';
import { connection } from 'next/server';
import { pool } from '@/lib/db';
import CrudView from '@/component/CrudView';

async function DaftarProduk() {
  await connection(); 

  const [rows]: any = await pool.query('SELECT * FROM products ORDER BY id DESC');
  return <CrudView products={rows} />;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Data Produk</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola semua data produkmu di sini.</p>
        </div>
        
        <Suspense fallback={<p className="text-blue-500">Memuat data...</p>}>
          <DaftarProduk />
        </Suspense>
      </div>
    </main>
  );
}