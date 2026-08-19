export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://apigm.satcloud.tech';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';

export function formatFileUrl(url?: string | null): string {
  if (!url) return '#';

  // Handle localhost URLs that might be sent from backend DB / local environment
  const localhostRegex = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/.*)?$/;
  const match = url.match(localhostRegex);
  if (match) {
    const path = match[3] || '';
    return `${BACKEND_URL}${path.startsWith('/') ? path : `/${path}`}`;
  }

  // Handle fully qualified external/backend URLs
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Handle relative paths
  if (url.startsWith('/')) {
    return `${BACKEND_URL}${url}`;
  }

  return `${BACKEND_URL}/${url}`;
}

export const TOKEN_KEY = 'greenmetric_token';
export const USER_KEY = 'greenmetric_user';

export const CATEGORY_CODES = ['SI', 'EC', 'WS', 'WR', 'TR', 'ED', 'GD'] as const;

export const CATEGORY_NAMES: Record<string, string> = {
  SI: 'Setting and Infrastructure',
  EC: 'Energy and Climate Change',
  WS: 'Waste',
  WR: 'Water',
  TR: 'Transportation',
  ED: 'Education and Research',
  GD: 'Governance and Digitalization',
};

export const CATEGORY_MAX_POINTS: Record<string, number> = {
  SI: 1100,
  EC: 2000,
  WS: 1700,
  WR: 1100,
  TR: 1700,
  ED: 1300,
  GD: 1100,
};

export const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
export const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png'];
