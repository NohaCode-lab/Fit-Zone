import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateBookingDto {
  trainerId: string;
  scheduledAt: string;
}

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserBookings(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        trainer: true,
      },
      orderBy: { scheduledAt: 'asc' },
    });
  }

  async createBooking(userId: string, dto: CreateBookingDto) {
    const trainer = await this.prisma.trainer.findUnique({
      where: { id: dto.trainerId },
    });

    if (!trainer) {
      throw new NotFoundException('Selected trainer not found');
    }

    return this.prisma.booking.create({
      data: {
        userId,
        trainerId: dto.trainerId,
        scheduledAt: new Date(dto.scheduledAt),
        status: 'CONFIRMED',
      },
      include: { trainer: true },
    });
  }
}
