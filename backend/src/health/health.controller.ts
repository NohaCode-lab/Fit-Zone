import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'General System Health Check Endpoint' })
  async getHealth() {
    return this.healthService.checkReadiness();
  }

  @Get('live')
  @ApiOperation({ summary: 'Kubernetes / Docker Liveness Probe Endpoint' })
  async getLiveness() {
    return this.healthService.checkLiveness();
  }

  @Get('ready')
  @ApiOperation({ summary: 'Kubernetes / Docker Readiness Probe Endpoint' })
  async getReadiness() {
    return this.healthService.checkReadiness();
  }
}
