import { apiClient } from '../../../services/api/client';
import { Trainer } from '../../../types';

export const fetchTrainers = async (): Promise<Trainer[]> => {
  try {
    const response = await apiClient.get<Trainer[]>('/trainers');
    return response.data;
  } catch {
    // Graceful fallback data while backend is starting up
    return [
      {
        id: '1',
        name: 'Alex Morgan',
        role: 'HIIT & Strength Coach',
        bio: 'Former athlete with 8+ years of experience in functional training.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
        rating: 4.9,
        specialties: ['HIIT', 'Strength', 'CrossFit'],
        hourlyRateEur: 75,
      },
      {
        id: '2',
        name: 'Sarah Lee',
        role: 'Yoga & Mindfulness Expert',
        bio: 'Certified yoga instructor specializing in Vinyasa and meditation.',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
        rating: 4.8,
        specialties: ['Yoga', 'Pilates', 'Meditation'],
        hourlyRateEur: 65,
      },
      {
        id: '3',
        name: 'Mike Ross',
        role: 'Bodybuilding Coach',
        bio: 'Professional bodybuilder helping clients achieve massive transformations.',
        image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80',
        rating: 5.0,
        specialties: ['Bodybuilding', 'Hypertrophy', 'Nutrition'],
        hourlyRateEur: 85,
      },
      {
        id: '4',
        name: 'Jessica Diaz',
        role: 'Dance & Cardio Instructor',
        bio: 'Energetic Zumba & Dance fitness coach, making workouts fun.',
        image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80',
        rating: 4.7,
        specialties: ['Dance', 'Zumba', 'Cardio'],
        hourlyRateEur: 60,
      },
    ];
  }
};
