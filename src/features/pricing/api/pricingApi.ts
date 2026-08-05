import { apiClient } from '../../../services/api/client';
import { PricingPlan, SubscriptionTier } from '../../../types';

export const fetchPricingPlans = async (): Promise<PricingPlan[]> => {
  try {
    const response = await apiClient.get<PricingPlan[]>('/subscriptions/plans');
    return response.data;
  } catch {
    return [
      {
        id: 'basic-plan',
        name: 'Basic Access',
        price: '€29',
        period: '/month',
        features: [
          'Access to Gym Floor & Equipment',
          'Locker Room & Shower Access',
          'Free Fitness Orientation Session',
          'Fit-Zone Mobile App Access',
        ],
        tier: SubscriptionTier.BASIC,
      },
      {
        id: 'pro-plan',
        name: 'Pro Athlete',
        price: '€59',
        period: '/month',
        features: [
          'Everything in Basic Plan',
          'Unlimited Group Workout Classes',
          'Personalized AI Fitness Coach',
          '1 Weekly Trainer One-on-One',
          'Sauna & Recovery Lounge Access',
        ],
        isPopular: true,
        tier: SubscriptionTier.PRO,
      },
      {
        id: 'elite-plan',
        name: 'Elite VIP Pass',
        price: '€99',
        period: '/month',
        features: [
          'Everything in Pro Plan',
          'Unlimited Personal Trainer Sessions',
          'Custom AI Nutrition & Macro Planning',
          '24/7 Priority VIP Club Access',
          'Free Supplement Starter Package',
        ],
        tier: SubscriptionTier.ENTERPRISE,
      },
    ];
  }
};
