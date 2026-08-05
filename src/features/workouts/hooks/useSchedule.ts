import { useQuery } from '@tanstack/react-query';
import { fetchSchedule } from '../api/workoutsApi';

export const useSchedule = () => {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: fetchSchedule,
    staleTime: 1000 * 60 * 10,
  });
};
