import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET: Ambil semua data
export async function GET() {
  try {
    const [rows]: any = await pool.query('SELECT * FROM products ORDER BY id DESC');
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("Error GET:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Tambah data baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, harga } = body;

    if (!nama || harga === undefined) {
      return NextResponse.json({ error: 'Nama dan harga wajib diisi' }, { status: 400 });
    }

    const [result]: any = await pool.query(
      'INSERT INTO products (nama, harga) VALUES (?, ?)', 
      [nama, Number(harga)]
    );
    return NextResponse.json({ message: 'Berhasil', id: result.insertId }, { status: 201 });
  } catch (error: any) {
    console.error("Error POST:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Hapus semua data
export async function DELETE() {
  try {
    await pool.query('DELETE FROM products');
    return NextResponse.json({ message: 'Semua data dihapus' });
  } catch (error: any) {
    console.error("Error DELETE ALL:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}