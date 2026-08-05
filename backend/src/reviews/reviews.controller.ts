import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve approved client testimonials/reviews' })
  @ApiResponse({ status: 200, description: 'Approved reviews retrieved successfully.' })
  async getReviews() {
    return this.reviewsService.findAllApproved();
  }
}
