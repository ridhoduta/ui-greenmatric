import { API_BASE_URL, TOKEN_KEY } from '@/lib/utils/constants';
import type { ApiResponse, ApiErrorResponse } from '@/types';

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: number,
    message: string,
    public errors?: Record<string, string[] | string>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const fullUrl = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(fullUrl, config);

    let rawData: any = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      rawData = await response.json().catch(() => null);
    } else {
      rawData = await response.text().catch(() => null);
    }

    if (!response.ok) {
      // If 401 on regular routes (not login), session expired
      if (response.status === 401 && endpoint !== '/auth/login') {
        throw new ApiError(401, 401, 'Sesi telah berakhir. Silakan login kembali.');
      }

      const message = rawData?.message || (typeof rawData === 'string' ? rawData : `Request failed with status ${response.status}`);
      const errors = rawData?.errors;
      const code = rawData?.code || response.status;
      throw new ApiError(response.status, code, message, errors);
    }

    // Support both { data: ... } wrapped response and direct JSON response
    if (rawData && typeof rawData === 'object' && 'data' in rawData && rawData.data !== undefined) {
      return rawData.data as T;
    }

    return rawData as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, 500, (error as Error)?.message || 'Network error or server unavailable');
  }
}

export async function apiClientMultipart<T>(
  endpoint: string,
  formData: FormData,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    method: 'POST',
    headers,
    body: formData,
  };

  const fullUrl = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(fullUrl, config);

    let rawData: any = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      rawData = await response.json().catch(() => null);
    }

    if (!response.ok) {
      if (response.status === 401) {
        throw new ApiError(401, 401, 'Sesi telah berakhir. Silakan login kembali.');
      }

      const message = rawData?.message || `Request failed with status ${response.status}`;
      const errors = rawData?.errors;
      const code = rawData?.code || response.status;
      throw new ApiError(response.status, code, message, errors);
    }

    if (rawData && typeof rawData === 'object' && 'data' in rawData && rawData.data !== undefined) {
      return rawData.data as T;
    }

    return rawData as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, 500, (error as Error)?.message || 'Network error or server unavailable');
  }
}
