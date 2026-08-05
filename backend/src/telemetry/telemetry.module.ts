import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { TracingService } from './tracing';

@Module({
  controllers: [MetricsController],
  providers: [TracingService],
  exports: [TracingService],
})
export class TelemetryModule {}
