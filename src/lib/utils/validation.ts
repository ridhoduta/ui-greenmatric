import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from './constants';

export interface ValidationError {
  field: string;
  message: string;
}

export function validateEmail(email: string): string | null {
  if (!email) return 'Email wajib diisi';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Format email tidak valid';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password wajib diisi';
  if (password.length < 6) return 'Password minimal 6 karakter';
  return null;
}

export function validateRequired(value: unknown, fieldName: string): string | null {
  if (value === null || value === undefined || value === '') {
    return `${fieldName} wajib diisi`;
  }
  return null;
}

export function validateNumber(value: unknown, fieldName: string): string | null {
  const required = validateRequired(value, fieldName);
  if (required) return required;
  
  const num = Number(value);
  if (isNaN(num)) return `${fieldName} harus berupa angka`;
  if (num < 0) return `${fieldName} tidak boleh negatif`;
  
  return null;
}

export function validateFile(file: File | null): string | null {
  if (!file) return 'File wajib dipilih';
  
  if (file.size > MAX_FILE_SIZE) {
    return `Ukuran file tidak boleh lebih dari ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
  }
  
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return 'Format file harus PDF, JPG, atau PNG';
  }
  
  return null;
}

export function validatePositiveNumber(value: unknown, fieldName: string): string | null {
  const numError = validateNumber(value, fieldName);
  if (numError) return numError;
  
  const num = Number(value);
  if (num <= 0) return `${fieldName} harus lebih dari 0`;
  
  return null;
}

export function validatePercentage(value: unknown, fieldName: string): string | null {
  const numError = validateNumber(value, fieldName);
  if (numError) return numError;
  
  const num = Number(value);
  if (num < 0 || num > 100) return `${fieldName} harus antara 0-100`;
  
  return null;
}
