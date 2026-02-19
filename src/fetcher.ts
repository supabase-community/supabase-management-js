export const SUPABASE_API_BASE_URL = "https://api.supabase.com";

const getBody = <T>(res: Response): Promise<T> => {
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }

  return res.text() as Promise<T>;
};

const getUrl = (contextUrl: string): string => {
  const url = new URL(contextUrl);
  const pathname = url.pathname;
  const search = url.search;
  const baseUrl = process.env.SUPABASE_API_BASE_URL ?? SUPABASE_API_BASE_URL;

  const requestUrl = new URL(`${baseUrl}${pathname}${search}`);

  return requestUrl.toString();
};

export const customFetch = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const resolvedUrl = getUrl(url);

  const res = await fetch(resolvedUrl, options);

  const data = await getBody<T>(res);

  return { data, status: res.status, headers: res.headers } as T;
};
