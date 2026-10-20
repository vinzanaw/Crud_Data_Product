'use client';
import { useState } from 'react';

export default function FormProduk({ editingData, onCancel, onSuccess }: any) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formElement = e.currentTarget; 
    const formData = new FormData(formElement);
    const data = { nama: formData.get('nama'), harga: Number(formData.get('harga')) };

    const url = editingData ? `/api/products/${editingData.id}` : '/api/products';
    const method = editingData ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        formElement.reset(); 
        if (onCancel) onCancel();
        if (onSuccess) onSuccess();
      } else {
        alert('Gagal menyimpan data.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {editingData ? 'Edit Produk' : 'Tambah Produk Baru'}
      </h2>
      <form onSubmit={handleSubmit} className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Nama Produk</label>
          <input name="nama" defaultValue={editingData?.nama} placeholder="Misal: Nasi Goreng" className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
        </div>
        <div className="w-48">
          <label className="block text-sm text-gray-600 mb-1">Harga (Rp)</label>
          <input name="harga" type="number" defaultValue={editingData?.harga} placeholder="15000" className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" required />
        </div>
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium">
          {loading ? 'Menyimpan...' : editingData ? 'Update' : 'Simpan'}
        </button>
        {editingData && (
          <button type="button" onClick={onCancel} className="bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition">
            Batal
          </button>
        )}
      </form>
    </div>
  );
}