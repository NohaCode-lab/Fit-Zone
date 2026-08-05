import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrainersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const trainers = await this.prisma.trainer.findMany({
      include: {
        specialties: true,
      },
    });

    return trainers.map((t) => ({
      id: t.id,
      name: t.name,
      role: t.roleTitle,
      bio: t.bio,
      image: t.imageUrl,
      rating: t.rating,
      specialties: t.specialties.map((s) => s.name),
      hourlyRateEur: Number(t.hourlyRateEur),
    }));
  }
}
