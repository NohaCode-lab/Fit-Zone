import { z } from 'zod';

export enum Role {
  USER = 'USER',
  TRAINER = 'TRAINER',
  ADMIN = 'ADMIN',
}

export enum SubscriptionTier {
  BASIC = 'BASIC',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatarUrl?: string;
  createdAt: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  image: string;
  specialties: string[];
  rating: number;
  bio: string;
  hourlyRateEur: number;
}

export interface ScheduleClass {
  id: string;
  time: string;
  name: string;
  trainer: string;
  category: 'Cardio' | 'Strength' | 'Yoga' | 'CrossFit' | 'Boxing';
  capacity: number;
  enrolled: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  tier: SubscriptionTier;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

// Zod Schema for Form Validation
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}
