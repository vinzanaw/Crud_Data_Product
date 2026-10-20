'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormProduk from './FormProduk';
import TableProduk from './TableProduk';

export default function CrudView({ products }: { products: any[] }) {
  const [editingData, setEditingData] = useState<any>(null);
  const router = useRouter();

  const refreshData = () => {
    router.refresh(); 
  };

  return (
    <>
      <FormProduk 
        editingData={editingData} 
        onCancel={() => setEditingData(null)} 
        onSuccess={refreshData} 
      />
      <TableProduk 
        products={products || []} 
        onEdit={(p: any) => setEditingData(p)} 
        onRefresh={refreshData}
      />
    </>
  );
}