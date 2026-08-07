import { apiClient } from './client';
import type { User, Role } from '@/types';

export interface CreateUserPayload {
  name: string;
  email: string;
  password?: string;
  role: Role;
  campus_id?: number;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
  campus_id?: number;
}

export async function getUsers(): Promise<User[]> {
  return apiClient<User[]>('/users');
}

export async function getUser(id: number): Promise<User> {
  return apiClient<User>(`/users/${id}`);
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  return apiClient<User>('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateUser(id: number, payload: UpdateUserPayload): Promise<User> {
  return apiClient<User>(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteUser(id: number): Promise<void> {
  await apiClient<void>(`/users/${id}`, {
    method: 'DELETE',
  });
}
