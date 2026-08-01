export type UserRole = "public" | "registered" | "client" | "coach";

export type BottomNavTab =
  "home" | "search" | "packages" | "schedule" | "profile";

export type Language = "id" | "en";

export type Theme = "dark" | "light";

export type PaymentMethod = "qris" | "bank" | "ewallet";

export interface TrainingPackage {
  id: string;
  name: string;
  sessions: number;
  price: number;
  renewalDiscountPercent?: number; // e.g. 15 for 15% discount on renewal
  renewalPrice?: number; // Discounted price for session renewal
  description: string;
  popular?: boolean;
  features: string[];
}

export interface Testimonial {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface Coach {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  gymLocation: string;
  bio: string;
  avatar: string;
  certifications: string[];
  packages: TrainingPackage[];
  testimonials?: Testimonial[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  targetWeight: string;
  completedSets: boolean[];
}

export interface Meal {
  id: string;
  time: string;
  name: string;
  calories: number;
  protein: number;
  completed: boolean;
}

export interface ClientRecord {
  id: string;
  name: string;
  avatar: string;
  packageName: string;
  totalSessions: number;
  remainingSessions: number;
  nextSessionTime: string;
  status: "active" | "expiring" | "completed";
  lastAttendance: string;
}

export interface ScheduleSession {
  id: string;
  clientName: string;
  clientAvatar: string;
  time: string;
  dateStr: string; // e.g. '2026-07-31'
  dayLabel: string; // e.g. 'Hari Ini', 'Besok', 'Jumat'
  timeframe: "daily" | "weekly" | "monthly"; // Used for filtering
  program: string;
  location: string;
  status: "upcoming" | "completed" | "pending_approval";
}

export type TodaySession = ScheduleSession;

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "session" | "package" | "system";
  unread: boolean;
}

export interface TransactionItem {
  id: string;
  date: string;
  coachName: string;
  packageName: string;
  amount: number;
  status: "success" | "pending";
  isRenewal: boolean;
}
