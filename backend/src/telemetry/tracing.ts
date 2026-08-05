import { Injectable } from '@nestjs/common';

@Injectable()
export class TracingService {
  startSpan(name: string, attributes?: Record<string, any>) {
    const spanId = `span_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const startTime = Date.now();

    return {
      spanId,
      name,
      attributes: attributes || {},
      end: () => {
        const durationMs = Date.now() - startTime;
        console.log(
          JSON.stringify({
            telemetry: 'OpenTelemetryTrace',
            spanId,
            name,
            durationMs,
            attributes,
            timestamp: new Date().toISOString(),
          })
        );
      },
    };
  }
}
