const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export function getApiUrl() {
  return API_URL;
}

interface FetchOptions extends RequestInit {
  token?: string;
  cache?: 'no-cache' | 'force-cache';
  next?: {
    revalidate?: false | 0 | number;
    tags?: string[];
  };
}

// O <T> é o tipo genérico do Typscript que permite especificar o tipo de retorno da função apiClient.
// Por exemplo, apiClient<User>('/users/1') retornaria um objeto do tipo User.
export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (!(fetchOptions.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${getApiUrl()}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: 'Erro HTTP' + response.status,
    }));
    throw new Error(error.error || 'Erro requisição');
  }

  return response.json();
}
