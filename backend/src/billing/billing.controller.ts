import { Controller, Post, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BillingService, CreateCheckoutSessionDto } from './billing.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('billing')
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('create-checkout-session')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Stripe Checkout Session for subscription purchase' })
  async createCheckoutSession(@Request() req: any, @Body() dto: CreateCheckoutSessionDto) {
    return this.billingService.createCheckoutSession(req.user.id, dto);
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Stripe webhook listener endpoint' })
  async handleWebhook(@Body() body: any) {
    return this.billingService.handleWebhook(body);
  }
}
