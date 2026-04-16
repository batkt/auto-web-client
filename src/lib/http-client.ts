import { ResponseType } from "./types/http.types";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(
  /\/+$/,
  ""
);
const SERVER_BACKEND_URL = (process.env.SERVER_BACKEND_URL || "").replace(
  /\/+$/,
  ""
);
type ApiEnvelope<T> = {
  code: number;
  data: T;
  message?: string;
};

const buildApiUrl = (url: string) => {
  const path = `/api${url}`;
  if (typeof window === "undefined" && SERVER_BACKEND_URL) {
    return `${SERVER_BACKEND_URL}${path}`;
  }
  return BACKEND_URL ? `${BACKEND_URL}${path}` : path;
};

async function safeParseJSON(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}

const createHeaders = (
  token?: string,
  customHeaders?: HeadersInit
): HeadersInit => {
  return {
    ...(customHeaders || {}),
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async <T>(response: Response): Promise<ResponseType<T>> => {
  const payload = await safeParseJSON(response);

  if (!response.ok) {
    const errorMessage =
      payload?.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  if (payload === null) {
    throw new Error("Expected JSON response but received non-JSON content.");
  }

  // Backend may return HTTP 200 with an application-level error code.
  const apiPayload = payload as Partial<ApiEnvelope<T>>;
  if (typeof apiPayload?.code === "number" && apiPayload.code >= 400) {
    throw new Error(apiPayload?.message || `API Error ${apiPayload.code}`);
  }

  return apiPayload as ResponseType<T>;
};

const getRequest = async <T>(
  url: string,
  token?: string,
  options?: RequestInit
): Promise<ResponseType<T>> => {
  const { headers, ...otherOptions } = options || {};

  const response = await fetch(buildApiUrl(url), {
    ...otherOptions,
    headers: createHeaders(token, headers),
    method: "GET",
    next: {
      revalidate: 60, // эсвэл 'force-cache', 'no-store'
    },
  });

  return handleResponse<T>(response);
};

const postRequest = async <T>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  token?: string,
  options?: RequestInit
): Promise<ResponseType<T>> => {
  const { headers, ...otherOptions } = options || {};

  const response = await fetch(buildApiUrl(url), {
    ...otherOptions,
    headers: createHeaders(token, {
      ...headers,
      "Content-Type": "application/json",
    }),
    method: "POST",
    body: JSON.stringify(data),
  });

  return handleResponse<T>(response);
};

export { getRequest, postRequest };
