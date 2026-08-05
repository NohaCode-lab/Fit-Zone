import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSchedule() {
    const schedules = await this.prisma.classSchedule.findMany({
      include: {
        trainer: true,
      },
    });

    const groupedSchedule: Record<string, any[]> = {
      Monday: [],
      Wednesday: [],
      Friday: [],
      Weekend: [],
    };

    schedules.forEach((s) => {
      if (!groupedSchedule[s.dayOfWeek]) {
        groupedSchedule[s.dayOfWeek] = [];
      }
      groupedSchedule[s.dayOfWeek].push({
        time: s.startTime,
        class: s.className,
        trainer: s.trainer.name,
        duration: s.duration,
      });
    });

    return groupedSchedule;
  }
}
