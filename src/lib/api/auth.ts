import { apiClient, ApiError } from './client';
import { TOKEN_KEY, USER_KEY } from '@/lib/utils/constants';
import type { User, Campus } from '@/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginData {
  token: string;
  user: User & { campus: Campus };
}

export interface LogoutData {
  message: string;
}

export async function login(payload: LoginPayload): Promise<LoginData> {
  return apiClient<LoginData>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function logout(): Promise<void> {
  try {
    await apiClient<LogoutData>('/auth/logout', {
      method: 'POST',
    });
  } catch (error) {
    // Ignore 401 errors during logout - if token is already invalid/expired,
    // we're already in the desired state (not authenticated)
    if (error instanceof ApiError && error.status === 401) {
      // Silently continue to clear local session
    } else {
      // Re-throw other errors as they might indicate real problems
      throw error;
    }
  }

  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}
