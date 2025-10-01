// import { BACKEND_URL } from './config';
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4001';
import { ResponseType } from './types/http.types';

const createHeaders = (
  token?: string,
  customHeaders?: HeadersInit
): HeadersInit => {
  return {
    ...(customHeaders || {}),
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const error = await response.json();
    const errorMessage =
      error?.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return await response.json();
};

const getRequest = async <T>(
  url: string,
  token?: string,
  options?: RequestInit
): Promise<ResponseType<T>> => {
  const { headers, ...otherOptions } = options || {};

  const response = await fetch(`${BACKEND_URL}/api${url}`, {
    ...otherOptions,
    headers: createHeaders(token, headers),
    method: 'GET',
    next: {
      revalidate: 60, // эсвэл 'force-cache', 'no-store'
    },
  });

  return handleResponse(response);
};

const postRequest = async <T>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  token?: string,
  options?: RequestInit
): Promise<ResponseType<T>> => {
  const { headers, ...otherOptions } = options || {};

  const response = await fetch(`${BACKEND_URL}/api${url}`, {
    ...otherOptions,
    headers: createHeaders(token, {
      ...headers,
      'Content-Type': 'application/json',
    }),
    method: 'POST',
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export { getRequest, postRequest };
