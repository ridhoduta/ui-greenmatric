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
  console.log('Retrieving token from localStorage:', localStorage.getItem(TOKEN_KEY));
  return localStorage.getItem(TOKEN_KEY);
}

// function handleUnauthorized(): void {
//   if (typeof window === 'undefined') return;
//   // Clear any existing token and user data
//   localStorage.removeItem(TOKEN_KEY);
//   localStorage.removeItem('greenmetric_user');
//   // Clear cookies
//   document.cookie = 'greenmetric_token=; path=/; max-age=0';
//   document.cookie = 'greenmetric_user_role=; path=/; max-age=0';
//   // Redirect to login
//   window.location.href = '/login';
// }

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

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      // Handle 401 Unauthorized - token expired or invalid
      if (response.status === 401) {
        // handleUnauthorized();
        throw new ApiError(401, 401, 'Sesi telah berakhir. Silakan login kembali.');
      }

      const errorData: ApiErrorResponse = await response.json();
      throw new ApiError(
        response.status,
        errorData.code,
        errorData.message,
        errorData.errors
      );
    }

    const data: ApiResponse<T> = await response.json();
    return data.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, 500, 'Network error or server unavailable');
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

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      // Handle 401 Unauthorized - token expired or invalid
      if (response.status === 401) {
        // handleUnauthorized();
        throw new ApiError(401, 401, 'Sesi telah berakhir. Silakan login kembali.');
      }

      const errorData: ApiErrorResponse = await response.json();
      throw new ApiError(
        response.status,
        errorData.code,
        errorData.message,
        errorData.errors
      );
    }

    const data: ApiResponse<T> = await response.json();
    return data.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, 500, 'Network error or server unavailable');
  }
}
