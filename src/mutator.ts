import Axios from "axios";
import type { AxiosRequestConfig } from "axios";

export const axiosInstance = Axios.create({
  baseURL: "https://api.supabase.com",
});

/**
 * Custom axios instance used by all generated API functions.
 * Configure authentication and other defaults via `axiosInstance`:
 *
 * @example
 * import { axiosInstance } from 'supabase-management-js';
 * axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
 */
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = axiosInstance({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);
  // @ts-ignore
  promise.cancel = () => source.cancel("Request cancelled");
  return promise as Promise<T>;
};
