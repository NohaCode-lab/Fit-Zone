import { apiClient } from '../../../services/api/client';

export interface ClassItem {
  time: string;
  class: string;
  trainer: string;
  duration: string;
}

export type DayTab = 'Monday' | 'Wednesday' | 'Friday' | 'Weekend';

export const fetchSchedule = async (): Promise<Record<DayTab, ClassItem[]>> => {
  try {
    const response = await apiClient.get<Record<DayTab, ClassItem[]>>('/schedule');
    return response.data;
  } catch {
    return {
      Monday: [
        { time: '6:00 AM', class: 'HIIT Burn', trainer: 'Alex Morgan', duration: '45 min' },
        { time: '9:00 AM', class: 'Yoga Flow', trainer: 'Sarah Lee', duration: '60 min' },
        { time: '5:30 PM', class: 'Strength Training', trainer: 'Mike Ross', duration: '50 min' },
        { time: '7:00 PM', class: 'Zumba Dance', trainer: 'Jessica Diaz', duration: '55 min' },
      ],
      Wednesday: [
        { time: '7:00 AM', class: 'Cardio Kickbox', trainer: 'Chris Evans', duration: '50 min' },
        { time: '10:00 AM', class: 'Pilates', trainer: 'Emma Watson', duration: '45 min' },
        { time: '4:00 PM', class: 'CrossFit', trainer: 'David Lee', duration: '60 min' },
        { time: '6:30 PM', class: 'Meditation & Breath', trainer: 'Sophia Kim', duration: '40 min' },
      ],
      Friday: [
        { time: '6:30 AM', class: 'Bootcamp', trainer: 'Alex Morgan', duration: '60 min' },
        { time: '12:00 PM', class: 'Power Yoga', trainer: 'Sarah Lee', duration: '50 min' },
        { time: '5:00 PM', class: 'Functional Training', trainer: 'Mike Ross', duration: '55 min' },
        { time: '7:30 PM', class: 'Dance Fitness', trainer: 'Jessica Diaz', duration: '45 min' },
      ],
      Weekend: [
        { time: '8:00 AM', class: 'Outdoor Run Club', trainer: 'Chris Evans', duration: '60 min' },
        { time: '10:00 AM', class: 'Family Yoga', trainer: 'Emma Watson', duration: '50 min' },
        { time: '11:30 AM', class: 'Strength & Conditioning', trainer: 'David Lee', duration: '70 min' },
      ],
    };
  }
};
