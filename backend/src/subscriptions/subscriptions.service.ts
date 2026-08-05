import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPlans() {
    const plans = await this.prisma.subscriptionPlan.findMany();
    return plans.map((p) => ({
      id: p.id,
      name: p.name,
      price: `€${p.priceEur}`,
      period: p.billingPeriod,
      features: p.features,
      isPopular: p.isPopular,
      tier: p.tier,
    }));
  }
}
