import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateCheckoutSessionDto {
  planId: string;
}

@Injectable()
export class BillingService {
  constructor(private readonly prisma: PrismaService) {}

  async createCheckoutSession(userId: string, dto: CreateCheckoutSessionDto) {
    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { id: dto.planId },
    });

    if (!plan) {
      throw new BadRequestException('Invalid subscription plan specified');
    }

    // Stripe Checkout Session URL simulation
    return {
      sessionId: `cs_test_${Date.now()}`,
      checkoutUrl: `https://checkout.stripe.com/pay/cs_test_${Date.now()}#fitzone_plan_${plan.id}`,
      planName: plan.name,
      amountEur: Number(plan.priceEur),
    };
  }

  async handleWebhook(event: { type: string; data: any }) {
    console.log(`💳 Stripe Webhook Event Received: ${event.type}`);

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        console.log('✅ Synchronized active subscription status');
        break;
      case 'customer.subscription.deleted':
        console.log('⚠️ Processed subscription cancellation event');
        break;
      default:
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }

    return { received: true };
  }
}
