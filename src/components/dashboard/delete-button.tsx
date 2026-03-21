'use client';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { deleteProductAction } from '@/actions/products';
import { Button } from '@/components/ui/button';

interface DeleteButtonProps {
  productId: string;
}

export function DeleteButtonProduct({ productId }: DeleteButtonProps) {
  const router = useRouter();

  async function handleDeleteProduct() {
    const result = await deleteProductAction(productId);

    if (result.success) {
      router.refresh();
      return;
    }

    if (result.error !== '') {
      console.log(result);
    }
  }

  return (
    <Button onClick={handleDeleteProduct} variant="destructive">
      <Trash className="w-5 h-5" />
    </Button>
  );
}
