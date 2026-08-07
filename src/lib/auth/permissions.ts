import type { Role, CategoryCode } from '@/types';

export function isSuperAdmin(role: Role): boolean {
  return role === 'SUPER_ADMIN';
}

export function isAdminKampus(role: Role): boolean {
  return role === 'ADMIN_KAMPUS';
}

export function isOperator(role: Role): boolean {
  return role.startsWith('OPERATOR_');
}

export function canAccessCategory(role: Role, categoryCode: CategoryCode): boolean {
  if (isSuperAdmin(role) || isAdminKampus(role)) return true;
  return role === `OPERATOR_${categoryCode.toUpperCase()}`;
}

export function canManageUsers(role: Role): boolean {
  return isSuperAdmin(role) || isAdminKampus(role);
}

export function canManageCampuses(role: Role): boolean {
  return isSuperAdmin(role);
}

export function canSubmitAssessment(role: Role): boolean {
  return isAdminKampus(role);
}

export function canEditAssessment(role: Role, categoryCode: CategoryCode): boolean {
  if (isAdminKampus(role)) return true;
  return role === `OPERATOR_${categoryCode.toUpperCase()}`;
}
