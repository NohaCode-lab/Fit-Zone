import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { LoggerService } from './logger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const requestId = (req.headers['x-request-id'] as string) || `req_${randomUUID()}`;
    req.headers['x-request-id'] = requestId;
    res.setHeader('X-Request-ID', requestId);

    const startTime = Date.now();

    res.on('finish', () => {
      const duration = `${Date.now() - startTime}ms`;
      const user = (req as any).user;

      this.logger.log(`HTTP ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration})`, {
        requestId,
        method: req.method,
        endpoint: req.originalUrl,
        userId: user?.id || 'anonymous',
        statusCode: res.statusCode,
        duration,
        ip: req.ip,
      });
    });

    next();
  }
}
