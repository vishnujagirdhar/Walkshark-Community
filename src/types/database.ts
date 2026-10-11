export type UserRole = "member" | "admin";

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface ActivityType {
  id: string;
  slug: string;
  name: string;
  points: number;
  reward_inr: number;
  description: string;
  icon: string;
  is_active: boolean;
}

export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface Submission {
  id: string;
  user_id: string;
  user_name?: string;
  user_email?: string;
  activity_type_id: string;
  activity_name?: string;
  points_assigned: number;
  reward_inr: number;
  instagram_url: string;
  proof_url?: string;
  caption?: string;
  status: SubmissionStatus;
  rejection_reason?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
}

export type LedgerEntryType = "earned" | "redeemed" | "adjustment";

export interface PointsLedgerEntry {
  id: string;
  user_id: string;
  submission_id?: string;
  points: number;
  reward_inr: number;
  type: LedgerEntryType;
  description: string;
  status?: SubmissionStatus; // for display in history
  created_at: string;
}

export interface Milestone {
  id: string;
  points_threshold: number;
  reward_inr: number;
  title: string;
  celebration_message: string;
  sort_order: number;
}

export type RedemptionStatus = "pending" | "fulfilled" | "rejected";

export interface Redemption {
  id: string;
  user_id: string;
  user_name?: string;
  user_email?: string;
  points_redeemed: number;
  amount_inr: number;
  status: RedemptionStatus;
  notes?: string;
  payment_details?: string;
  created_at: string;
  updated_at?: string;
}

export interface PlatformSettings {
  points_conversion_rate: number; // 2.5
  redemption_policy: string;
  monthly_cap_enabled: boolean;
  monthly_cap_points: number;
  points_validity_enabled: boolean;
  points_validity_days: number;
  min_redemption_points: number;
}
