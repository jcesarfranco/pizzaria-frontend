'use server';

import { revalidatePath } from 'next/cache';
import { apiClient } from '@/lib/api';
import { getAuthToken } from '@/lib/auth';
import type { Category } from '@/lib/types';

export async function createCategoryAction(formData: FormData) {
  try {
    const token = await getAuthToken();
    const name = formData.get('name');

    if (!token) {
      return { success: false, error: 'Erro ao criar categoria' };
    }

    const data = {
      name: name,
    };

    await apiClient<Category>('/category', {
      method: 'POST',
      body: JSON.stringify(data),
      token: token,
    });

    revalidatePath('/dashboard/categories');

    return { success: true, error: '' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: 'Erro ao criar categoria' };
  }
}
