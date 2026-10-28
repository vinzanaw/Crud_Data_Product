import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// PUT: Update data berdasarkan ID
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const { nama, harga, deskripsi } = body;

    await pool.query(
      'UPDATE products SET nama = ?, harga = ?, deskripsi = ? WHERE id = ?', 
      [nama, Number(harga), deskripsi || null, id]
    );
    
    return NextResponse.json({ message: 'Berhasil diupdate' });
  } catch (error: any) {
    console.error("Error PUT:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Hapus data berdasarkan ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Berhasil dihapus' });
  } catch (error: any) {
    console.error("Error DELETE:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}