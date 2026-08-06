import { Test, TestingModule } from '@nestjs/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { HealthService } from './health.service';
import { PrismaService } from '../prisma/prisma.service';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: PrismaService,
          useValue: {
            $queryRaw: vi.fn().mockImplementation(async () => [{ '?column?': 1 }]),
          },
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return liveness status ok with uptime', async () => {
    const result = await service.checkLiveness();
    expect(result.status).toBe('ok');
    expect(typeof result.uptimeSeconds).toBe('number');
  });

  it('should return readiness status ok when database is operational', async () => {
    const result = await service.checkReadiness();
    expect(result.status).toBe('ok');
    expect(result.checks.database).toBe('up');
  });
});
