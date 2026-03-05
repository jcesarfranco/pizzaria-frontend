import { cookies } from 'next/headers';

const COOKIE_NAME = 'authToken';

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies;
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
