import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllApproved() {
    const reviews = await this.prisma.review.findMany({
      where: { isApproved: true },
    });

    return reviews.map((r) => ({
      id: r.id,
      name: r.name,
      role: r.role,
      quote: r.quote,
      image: r.avatarUrl,
      rating: r.rating,
    }));
  }
}
