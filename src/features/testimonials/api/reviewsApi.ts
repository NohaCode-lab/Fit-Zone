import { apiClient } from '../../../services/api/client';
import { Testimonial } from '../../../types';

export const fetchReviews = async (): Promise<Testimonial[]> => {
  try {
    const response = await apiClient.get<Testimonial[]>('/reviews');
    return response.data;
  } catch {
    return [
      {
        id: '1',
        name: 'Emily Rodriguez',
        role: 'Member since 2023',
        quote: "FitZone completely transformed my fitness journey. The trainers are incredibly supportive and the community is motivating. I've never felt stronger!",
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        rating: 5,
      },
      {
        id: '2',
        name: 'James Carter',
        role: 'Premium Member',
        quote: 'The best gym experience I’ve ever had. From HIIT to yoga, every class is top-tier. The facilities are clean and the energy is unmatched.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        rating: 5,
      },
      {
        id: '3',
        name: 'Sophia Kim',
        role: 'Elite Member',
        quote: 'Personalized coaching and nutrition advice helped me lose 20 lbs and gain confidence. The staff truly cares about your progress.',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
        rating: 5,
      },
    ];
  }
};
