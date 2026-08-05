import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('plans')
  @ApiOperation({ summary: 'Retrieve available subscription membership plans' })
  @ApiResponse({ status: 200, description: 'Subscription plans retrieved successfully.' })
  async getPlans() {
    return this.subscriptionsService.getPlans();
  }
}
