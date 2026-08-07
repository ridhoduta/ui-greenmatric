import type { CategoryCode } from '@/types';
import { CATEGORY_MAX_POINTS, CATEGORY_NAMES } from '@/lib/utils/constants';

export interface CategoryConfig {
  code: CategoryCode;
  name: string;
  max_points: number;
  weight_percentage: number;
  operator_role: string;
  href: string;
  description: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    code: 'SI',
    name: CATEGORY_NAMES.SI,
    max_points: CATEGORY_MAX_POINTS.SI,
    weight_percentage: 11,
    operator_role: 'OPERATOR_SI',
    href: '/categories/si',
    description: 'Evaluasi infrastruktur dan tata ruang kampus yang mendukung keberlanjutan.',
  },
  {
    code: 'EC',
    name: CATEGORY_NAMES.EC,
    max_points: CATEGORY_MAX_POINTS.EC,
    weight_percentage: 20,
    operator_role: 'OPERATOR_EC',
    href: '/categories/ec',
    description: 'Penggunaan energi terbarukan, efisiensi energi, dan pengurangan emisi karbon.',
  },
  {
    code: 'WS',
    name: CATEGORY_NAMES.WS,
    max_points: CATEGORY_MAX_POINTS.WS,
    weight_percentage: 17,
    operator_role: 'OPERATOR_WS',
    href: '/categories/ws',
    description: 'Pengelolaan sampah organik, anorganik, beracun, dan air limbah.',
  },
  {
    code: 'WR',
    name: CATEGORY_NAMES.WR,
    max_points: CATEGORY_MAX_POINTS.WR,
    weight_percentage: 11,
    operator_role: 'OPERATOR_WR',
    href: '/categories/wr',
    description: 'Konservasi air, daur ulang, dan pengendalian pencemaran air.',
  },
  {
    code: 'TR',
    name: CATEGORY_NAMES.TR,
    max_points: CATEGORY_MAX_POINTS.TR,
    weight_percentage: 17,
    operator_role: 'OPERATOR_TR',
    href: '/categories/tr',
    description: 'Transportasi ramah lingkungan dan pengurangan kendaraan berbahan bakar fosil.',
  },
  {
    code: 'ED',
    name: CATEGORY_NAMES.ED,
    max_points: CATEGORY_MAX_POINTS.ED,
    weight_percentage: 13,
    operator_role: 'OPERATOR_ED',
    href: '/categories/ed',
    description: 'Kurikulum, riset, dan kegiatan mahasiswa terkait keberlanjutan.',
  },
  {
    code: 'GD',
    name: CATEGORY_NAMES.GD,
    max_points: CATEGORY_MAX_POINTS.GD,
    weight_percentage: 11,
    operator_role: 'OPERATOR_GD',
    href: '/categories/gd',
    description: 'Tata kelola, digitalisasi, dan kebijakan keberlanjutan kampus.',
  },
];

export function getCategoryConfig(code: CategoryCode): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.code === code);
}
