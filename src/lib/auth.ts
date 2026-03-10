import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { apiClient } from '@/lib/api';
import type { User } from '@/lib/types';

const COOKIE_NAME = 'authToken';

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function setAuthToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 dia
    path: '/',
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getUser(): Promise<User | null> {
  try {
    const token = await getAuthToken();
    if (!token) {
      return null;
    }

    const user = await apiClient<User>('/me', { token: token });
    return user;
  } catch (error) {
    //console.error('Erro ao verificar autenticação:', error);
    return null;
  }
}

export async function isAdmin(): Promise<User | null> {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  if (user?.role !== 'ADMIN') {
    redirect('/access-denied');
  }

  return user;
}
