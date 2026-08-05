import { useQuery } from '@tanstack/react-query';
import { fetchTrainers } from '../api/trainersApi';

export const useTrainers = () => {
  return useQuery({
    queryKey: ['trainers'],
    queryFn: fetchTrainers,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
