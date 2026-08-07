export type Role =
  | 'SUPER_ADMIN'
  | 'ADMIN_KAMPUS'
  | 'OPERATOR_SI'
  | 'OPERATOR_EC'
  | 'OPERATOR_WS'
  | 'OPERATOR_WR'
  | 'OPERATOR_TR'
  | 'OPERATOR_ED'
  | 'OPERATOR_GD';

export type CategoryCode = 'SI' | 'EC' | 'WS' | 'WR' | 'TR' | 'ED' | 'GD';

export type AssessmentStatus = 'DRAFT' | 'SUBMITTED' | 'VERIFIED';

export interface Campus {
  id: number;
  code: string;
  name: string;
  institution_type: string;
  climate: string;
  setting: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: number;
  campus_id: number;
  name: string;
  email: string;
  role: Role;
  campus?: Campus;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number;
  code: CategoryCode;
  name: string;
  max_points: number;
  weight_percentage: number;
}

export interface IndicatorTier {
  id: number;
  indicator_id: number;
  option_label: string;
  min_value: number | null;
  max_value: number | null;
  operator: '<=' | '>' | '>=' | 'BETWEEN' | 'CHOICE';
  point_multiplier: number;
}

export interface Evidence {
  id: number;
  assessment_answer_id: number;
  document_name: string;
  description: string;
  file_url: string;
  created_at?: string;
}

export interface AssessmentAnswer {
  id: number;
  campus_assessment_id: number;
  indicator_id: number;
  raw_input_data: Record<string, unknown>;
  calculated_value: number | null;
  selected_tier_id: number | null;
  earned_points: number;
  evidences?: Evidence[];
  updated_at?: string;
}

export interface Field {
  id: number;
  indicator_id: number;
  key: string;
  label: string;
  type: 'int' | 'float' | 'date' | 'varchar' | 'choice';
  required: boolean;
  unit?: string;
}

export interface Indicator {
  id: number;
  category_id: number;
  code: string;
  title: string;
  input_type: 'NUMERIC_FORMULA' | 'SINGLE_CHOICE';
  max_points: number;
  tiers?: IndicatorTier[];
  answer?: AssessmentAnswer | null;
  fields?: Field[];
}

export interface CampusAssessment {
  id: number;
  campus_id: number;
  assessment_year: number;
  overall_score: number;
  status: AssessmentStatus;
  created_at?: string;
  updated_at?: string;
}

export interface DashboardCategoryBreakdown {
  category_code: CategoryCode;
  category_name: string;
  earned_points: number;
  max_points: number;
  weight_percentage: number;
}

export interface DashboardTrendHistory {
  year: number;
  score: number;
}

export interface DashboardStats {
  campus_name: string;
  current_year: number;
  assessment_status: AssessmentStatus;
  overall_score: number;
  max_overall_score: number;
  estimated_rank: number;
  category_breakdown: DashboardCategoryBreakdown[];
  trend_history: DashboardTrendHistory[];
}

export interface ApiResponse<T> {
  status: 'success';
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  status: 'error';
  code: number;
  message: string;
  errors?: Record<string, string[] | string>;
}
