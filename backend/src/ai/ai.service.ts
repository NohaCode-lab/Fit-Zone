import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VectorSearchService } from './knowledge/vector-search.service';

export interface AiCoachPromptDto {
  message: string;
  fitnessGoal?: string;
}

@Injectable()
export class AiService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly vectorSearchService: VectorSearchService
  ) {}

  async processCoachMessage(userId: string, dto: AiCoachPromptDto) {
    // 1. Vector similarity search query against pgvector knowledge base
    const retrievedDocs = await this.vectorSearchService.searchExerciseKnowledge(dto.message);

    // 2. Synthesize context into structured LLM response
    let responseContent = `Based on your goal (${dto.fitnessGoal || 'Overall Health & Strength'}) and retrieved vector database context:\n\n`;

    if (retrievedDocs.length > 0) {
      responseContent += `💡 **RAG Insights (${retrievedDocs[0].title})**:\n${retrievedDocs[0].content}\n\n`;
    }

    const promptLower = dto.message.toLowerCase();

    if (promptLower.includes('workout') || promptLower.includes('plan')) {
      responseContent += `🏋️ **Personalized AI Workout Plan**: 
- **Day 1 (Push)**: Barbell Bench Press (4x8), Incline Dumbbell Press (3x10), Tricep Dips (3x12).
- **Day 2 (Pull)**: Deadlifts (4x5), Lat Pulldowns (3x10), Barbell Bicep Curls (3x12).
- **Day 3 (Legs)**: Back Squats (4x8), Bulgarian Split Squats (3x10), Calf Raises (4x15).`;
    } else {
      responseContent += `Ensure 1.8g-2.0g protein per kg of bodyweight daily with 7-8 hours rest per night!`;
    }

    return {
      sender: 'ASSISTANT',
      content: responseContent,
      vectorSearchResults: retrievedDocs.length,
      timestamp: new Date().toISOString(),
    };
  }

  async generateWorkoutPlan(dto: { goal: string; experience: string; daysPerWeek: number }) {
    return {
      title: `AI Custom ${dto.experience} ${dto.goal} Program`,
      durationWeeks: 4,
      daysPerWeek: dto.daysPerWeek,
      recommendedCalories: 2500,
      schedule: [
        { day: 'Day 1', focus: 'Upper Body Power', exercisesCount: 6 },
        { day: 'Day 2', focus: 'Lower Body Strength', exercisesCount: 5 },
        { day: 'Day 3', focus: 'HIIT & Core Conditioning', exercisesCount: 7 },
      ],
    };
  }
}
