import { SUPABASE_API_BASE_URL } from "./consts";

const getBody = <T>(res: Response): Promise<T> => {
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }

  return res.text() as Promise<T>;
};

const getUrl = (path: string, baseUrl?: string): string => {
  const resolvedBase = baseUrl ?? process.env.SUPABASE_API_BASE_URL ?? SUPABASE_API_BASE_URL;

  const requestUrl = new URL(`${resolvedBase}${path}`);

  return requestUrl.toString();
};

export const customFetch = async <T>(
  path: string,
  options?: RequestInit & { baseUrl?: string },
): Promise<T> => {
  const { baseUrl, ...fetchOptions } = options ?? {};
  const resolvedUrl = getUrl(path, baseUrl);

  const res = await fetch(resolvedUrl, fetchOptions);

  const data = await getBody<T>(res);

  return { data, status: res.status, headers: res.headers } as T;
};
