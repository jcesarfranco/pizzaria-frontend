'use server';

import { revalidatePath } from 'next/cache';
import { apiClient } from '@/lib/api';
import { getAuthToken } from '@/lib/auth';

export async function finishOrderAction(orderId: string) {
  if (!orderId) {
    return { success: false, error: 'Falha ao finalizar o pedido' };
  }

  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, error: 'Falha ao finalizar o pedido' };
    }

    const data = {
      order_id: orderId,
    };

    await apiClient('/order/finish', {
      method: 'PUT',
      body: JSON.stringify(data),
      token: token,
    });

    revalidatePath('/dashboard');

    return { success: true, error: '' };
  } catch (err) {
    console.log(err);
    return { success: false, error: 'Falha ao finalizar o pedido' };
  }
}
