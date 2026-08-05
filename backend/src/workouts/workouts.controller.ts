import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WorkoutsService } from './workouts.service';

@ApiTags('schedule')
@Controller('schedule')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve weekly class schedule' })
  @ApiResponse({ status: 200, description: 'Weekly schedule retrieved successfully.' })
  async getSchedule() {
    return this.workoutsService.getSchedule();
  }
}
