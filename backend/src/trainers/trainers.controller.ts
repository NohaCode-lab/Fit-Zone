import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TrainersService } from './trainers.service';

@ApiTags('trainers')
@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve list of all active fitness trainers' })
  @ApiResponse({ status: 200, description: 'Trainers list retrieved successfully.' })
  async getTrainers() {
    return this.trainersService.findAll();
  }
}
