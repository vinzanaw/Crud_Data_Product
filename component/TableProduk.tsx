'use client';
import { useState } from 'react';
import { Trash2, Pencil } from 'lucide-react';

export default function TableProduk({ products = [], onEdit, onRefresh }: any) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: number) => {
    if (confirm('Yakin hapus data ini?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      onRefresh();
    }
  };

  const handleDeleteAll = async () => {
    if (confirm('⚠️ Yakin ingin menghapus SEMUA data?')) {
      setIsDeleting(true);
      // PASTIKAN PAKAI PRODUCTS
      await fetch('/api/products', { method: 'DELETE' });
      setIsDeleting(false);
      onRefresh();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Daftar Produk</h2>
        <button 
          onClick={handleDeleteAll} 
          disabled={isDeleting || products.length === 0} 
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition flex items-center gap-2 disabled:opacity-50"
        >
          <Trash2 size={18} /> Hapus Semua
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-100 text-gray-600 text-sm">
              <th className="p-4 font-semibold">Nama Produk</th>
              <th className="p-4 font-semibold">Harga</th>
              <th className="p-4 font-semibold text-center w-32">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center p-8 text-gray-500">
                  Belum ada data produk.
                </td>
              </tr>
            ) : (
              products.map((p: any) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="p-4 font-semibold text-gray-800">{p.nama}</td>
                  <td className="p-4 text-gray-600">Rp {p.harga.toLocaleString('id-ID')}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button onClick={() => onEdit(p)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}