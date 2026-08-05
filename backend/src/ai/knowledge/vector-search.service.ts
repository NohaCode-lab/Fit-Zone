import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface SimilaritySearchResult {
  title: string;
  category: string;
  content: string;
  score: number;
}

@Injectable()
export class VectorSearchService {
  constructor(private readonly prisma: PrismaService) {}

  async searchExerciseKnowledge(queryText: string): Promise<SimilaritySearchResult[]> {
    // Vector Similarity Search simulation over pgvector extension tables
    const queryLower = queryText.toLowerCase();

    const knowledgeBase: SimilaritySearchResult[] = [
      {
        title: 'Hypertrophy & Progressive Overload Standards',
        category: 'Strength',
        content: 'To maximize muscular hypertrophy, combine 3-4 sets per exercise at 75-85% 1RM. Maintain a restSec interval of 90-120s.',
        score: 0.94,
      },
      {
        title: 'High-Intensity Interval Training (HIIT) Recovery Protocol',
        category: 'HIIT',
        content: 'HIIT sessions elevate post-exercise oxygen consumption (EPOC). Limit high-intensity intervals to 45 minutes per day with 48h rest windows.',
        score: 0.89,
      },
      {
        title: 'Macronutrient Calculation for Fat Loss & Muscle Preservation',
        category: 'Nutrition',
        content: 'During a caloric deficit, target 2.0g-2.2g of protein per kg of bodyweight to prevent lean muscle tissue catabolism.',
        score: 0.91,
      },
    ];

    return knowledgeBase.filter((k) =>
      queryLower.includes('workout') || queryLower.includes('diet') || queryLower.includes('hiit')
        ? true
        : k.score > 0.9
    );
  }
}
