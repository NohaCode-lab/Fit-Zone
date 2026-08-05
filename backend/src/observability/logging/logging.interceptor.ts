import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../../common/logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const startTime = Date.now();

    let eventToken = 'API_REQUEST';
    const url = req.originalUrl || '';

    if (url.includes('/auth/login')) eventToken = 'LOGIN_ATTEMPT';
    if (url.includes('/bookings')) eventToken = 'BOOKING_CREATED';
    if (url.includes('/ai/coach')) eventToken = 'AI_REQUEST';

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = `${Date.now() - startTime}ms`;
          this.logger.log(`[${eventToken}] Event executed successfully (${duration})`, {
            event: eventToken,
            endpoint: url,
            duration,
          });
        },
        error: (err) => {
          this.logger.error(`[${eventToken}_FAILED] ${err.message}`, err.stack, {
            event: `${eventToken}_FAILED`,
            endpoint: url,
          });
        },
      })
    );
  }
}
