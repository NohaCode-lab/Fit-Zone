import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        subscriptions: {
          include: { plan: true },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User profile not found');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.profile?.firstName || 'Valued',
      lastName: user.profile?.lastName || 'Member',
      avatarUrl: user.profile?.avatarUrl,
      fitnessGoal: user.profile?.fitnessGoal || 'Build Strength & Improve Endurance',
      activeSubscription: user.subscriptions[0]?.plan?.name || 'Pro Athlete Pass',
    };
  }
}
