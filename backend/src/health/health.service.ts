import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Redis from 'ioredis';

export interface HealthCheckResult {
  status: 'ok' | 'error';
  uptimeSeconds: number;
  checks: {
    database: 'up' | 'down';
    redis: 'up' | 'down';
    ai: 'available' | 'unavailable';
  };
  timestamp: string;
}

@Injectable()
export class HealthService {
  private redisClient: Redis | null = null;

  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {
    const redisUrl = process.env.REDIS_URL;
    if (redisUrl) {
      try {
        this.redisClient = new Redis(redisUrl, {
          lazyConnect: true,
          maxRetriesPerRequest: 1,
          connectTimeout: 2000,
          retryStrategy: () => null,
        });
      } catch {
        this.redisClient = null;
      }
    }
  }

  async checkLiveness() {
    return {
      status: 'ok',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }

  async checkReadiness(): Promise<HealthCheckResult> {
    let databaseStatus: 'up' | 'down' = 'up';
    try {
      if (this.prisma && typeof this.prisma.$queryRaw === 'function') {
        await (this.prisma.$queryRaw as any)`SELECT 1`;
      } else {
        databaseStatus = 'down';
      }
    } catch {
      databaseStatus = 'down';
    }

    let redisStatus: 'up' | 'down' = 'up';
    if (this.redisClient) {
      try {
        if (this.redisClient.status === 'wait') {
          await this.redisClient.connect();
        }
        const pingResponse = await this.redisClient.ping();
        redisStatus = pingResponse === 'PONG' ? 'up' : 'down';
      } catch {
        redisStatus = 'down';
      }
    }

    const isOk = databaseStatus === 'up';

    return {
      status: isOk ? 'ok' : 'error',
      uptimeSeconds: Math.floor(process.uptime()),
      checks: {
        database: databaseStatus,
        redis: redisStatus,
        ai: 'available',
      },
      timestamp: new Date().toISOString(),
    };
  }
}
