import { useQuery } from '@tanstack/react-query';
import { fetchPricingPlans } from '../api/pricingApi';

export const usePricing = () => {
  return useQuery({
    queryKey: ['pricing-plans'],
    queryFn: fetchPricingPlans,
    staleTime: 1000 * 60 * 15,
  });
};
