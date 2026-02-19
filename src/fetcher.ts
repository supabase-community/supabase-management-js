const DEFAULT_BASE_URL = 'https://api.supabase.com';

export interface FetcherOptions extends RequestInit {
  baseUrl?: string;
}

export const customFetch = async <T>(
  url: string,
  options?: FetcherOptions,
): Promise<T> => {
  const { baseUrl = DEFAULT_BASE_URL, ...init } = options ?? {};
  const resolvedUrl = baseUrl !== DEFAULT_BASE_URL
    ? url.replace(DEFAULT_BASE_URL, baseUrl)
    : url;

  const res = await fetch(resolvedUrl, init);

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data = body ? JSON.parse(body) : {};

  return { data, status: res.status, headers: res.headers } as T;
};
