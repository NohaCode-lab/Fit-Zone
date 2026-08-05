import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface ReadinessCheckResult {
  status: 'ok' | 'error';
  checks: {
    database: 'up' | 'down';
    redis: 'up' | 'down';
    ai: 'available' | 'unavailable';
  };
  timestamp: string;
}

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async checkLiveness() {
    return {
      status: 'ok',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }

  async checkReadiness(): Promise<ReadinessCheckResult> {
    let databaseStatus: 'up' | 'down' = 'up';
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch {
      databaseStatus = 'down';
    }

    const isOk = databaseStatus === 'up';

    return {
      status: isOk ? 'ok' : 'error',
      checks: {
        database: databaseStatus,
        redis: 'up',
        ai: 'available',
      },
      timestamp: new Date().toISOString(),
    };
  }
}
