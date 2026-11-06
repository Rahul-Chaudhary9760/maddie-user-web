import { ApiResponse } from '@/types/auth';

const DEFAULT_API_URL = 'https://maddie-sv65.onrender.com/api/v1';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;

const ACCESS_TOKEN_KEY = 'maddie_access_token';
const REFRESH_TOKEN_KEY = 'maddie_refresh_token';

// Safe cookie helpers for browser
function setCookie(name: string, val: string, days = 7) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(val)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

// ─── Token Storage ─────────────────────────────────────────────────────────────
export const tokenStorage = {
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  setAccessToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    setCookie(ACCESS_TOKEN_KEY, token, 1);
  },
  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
    setCookie(REFRESH_TOKEN_KEY, token, 14);
  },
  clearTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    deleteCookie(ACCESS_TOKEN_KEY);
    deleteCookie(REFRESH_TOKEN_KEY);
  },
};

// ─── Api Error Class ──────────────────────────────────────────────────────────
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ─── Request Options ──────────────────────────────────────────────────────────
export type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  skipAuth?: boolean;
};

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

async function refreshAccessToken(): Promise<string> {
  const refreshToken = tokenStorage.getRefreshToken();
  if (!refreshToken) {
    tokenStorage.clearTokens();
    throw new ApiError(401, 'Session expired. Please sign in again.');
  }

  const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  const data = (await response.json().catch(() => ({}))) as ApiResponse<{
    accessToken?: string;
  }>;

  if (!response.ok) {
    tokenStorage.clearTokens();
    throw new ApiError(401, 'Session expired. Please sign in again.');
  }

  const newToken =
    data.data?.accessToken ||
    (data as unknown as { accessToken?: string }).accessToken;

  if (!newToken) {
    tokenStorage.clearTokens();
    throw new ApiError(401, 'Invalid token received.');
  }

  tokenStorage.setAccessToken(newToken);
  return newToken;
}

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, skipAuth = false, headers = {}, ...rest } = options;

  const buildHeaders = (token?: string | null): Record<string, string> => {
    const h: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(headers as Record<string, string>),
    };
    const activeToken = token !== undefined ? token : tokenStorage.getAccessToken();
    if (!skipAuth && activeToken) {
      h['Authorization'] = `Bearer ${activeToken}`;
    }
    return h;
  };

  const execute = async (token?: string): Promise<Response> => {
    const h = buildHeaders(token);
    return fetch(`${API_BASE_URL}${endpoint}`, {
      ...rest,
      headers: h,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  };

  let response: Response;
  try {
    response = await execute();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Network error';
    throw new ApiError(0, `Unable to connect to server: ${msg}`);
  }

  // Token expired — attempt silent refresh
  if (response.status === 401 && !skipAuth) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newToken = await refreshAccessToken();
        isRefreshing = false;
        onRefreshed(newToken);
        response = await execute(newToken);
      } catch (err) {
        isRefreshing = false;
        throw err;
      }
    } else {
      await new Promise<void>((resolve) => {
        refreshSubscribers.push(async (token) => {
          response = await execute(token);
          resolve();
        });
      });
    }
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      (data as { message?: string })?.message ||
      'An unexpected error occurred';
    throw new ApiError(
      response.status,
      message,
      (data as { errors?: unknown })?.errors
    );
  }

  return data as T;
}

// ─── API Helper Methods ───────────────────────────────────────────────────────
export const api = {
  get: <T>(endpoint: string, opts?: RequestOptions) =>
    apiRequest<T>(endpoint, { method: 'GET', ...opts }),
  post: <T>(endpoint: string, body: unknown, opts?: RequestOptions) =>
    apiRequest<T>(endpoint, { method: 'POST', body, ...opts }),
  patch: <T>(endpoint: string, body: unknown, opts?: RequestOptions) =>
    apiRequest<T>(endpoint, { method: 'PATCH', body, ...opts }),
  put: <T>(endpoint: string, body: unknown, opts?: RequestOptions) =>
    apiRequest<T>(endpoint, { method: 'PUT', body, ...opts }),
  delete: <T>(endpoint: string, opts?: RequestOptions) =>
    apiRequest<T>(endpoint, { method: 'DELETE', ...opts }),
};
