import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '../api/reviewsApi';

export const useReviews = () => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
    staleTime: 1000 * 60 * 15,
  });
};
