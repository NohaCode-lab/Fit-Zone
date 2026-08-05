import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService, AiCoachPromptDto } from './ai.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('coach')
  @ApiOperation({ summary: 'Send message to AI Personal Fitness Coach RAG Engine' })
  async askCoach(@Body() dto: AiCoachPromptDto) {
    return this.aiService.processCoachMessage('user-1', dto);
  }

  @Post('generate-workout')
  @ApiOperation({ summary: 'Generate custom dynamic workout plan via AI' })
  async generateWorkout(@Body() dto: { goal: string; experience: string; daysPerWeek: number }) {
    return this.aiService.generateWorkoutPlan(dto);
  }
}
