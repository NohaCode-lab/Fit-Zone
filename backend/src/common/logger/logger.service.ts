import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

export interface LogContext {
  requestId?: string;
  method?: string;
  endpoint?: string;
  userId?: string;
  duration?: string;
  statusCode?: number;
  [key: string]: any;
}

@Injectable()
export class LoggerService implements NestLoggerService {
  private maskPII(data: any): any {
    if (!data) return data;
    if (typeof data === 'string') {
      // Mask email addresses: u***@domain.com
      return data.replace(/([a-zA-Z0-9._%+-]{1,2})[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '$1***@$2');
    }
    if (typeof data === 'object') {
      const sanitized: any = Array.isArray(data) ? [] : {};
      for (const key of Object.keys(data)) {
        const lowerKey = key.toLowerCase();
        if (lowerKey.includes('password') || lowerKey.includes('token') || lowerKey.includes('secret') || lowerKey.includes('card')) {
          sanitized[key] = '***REDACTED***';
        } else {
          sanitized[key] = this.maskPII(data[key]);
        }
      }
      return sanitized;
    }
    return data;
  }

  log(message: string, context?: LogContext | string) {
    console.log(
      JSON.stringify({
        level: 'info',
        timestamp: new Date().toISOString(),
        message: this.maskPII(message),
        context: this.maskPII(typeof context === 'object' ? context : { scope: context }),
      })
    );
  }

  error(message: string, trace?: string, context?: LogContext | string) {
    console.error(
      JSON.stringify({
        level: 'error',
        timestamp: new Date().toISOString(),
        message: this.maskPII(message),
        trace,
        context: this.maskPII(typeof context === 'object' ? context : { scope: context }),
      })
    );
  }

  warn(message: string, context?: LogContext | string) {
    console.warn(
      JSON.stringify({
        level: 'warn',
        timestamp: new Date().toISOString(),
        message: this.maskPII(message),
        context: this.maskPII(typeof context === 'object' ? context : { scope: context }),
      })
    );
  }

  debug(message: string, context?: LogContext | string) {
    console.debug(
      JSON.stringify({
        level: 'debug',
        timestamp: new Date().toISOString(),
        message: this.maskPII(message),
        context: this.maskPII(typeof context === 'object' ? context : { scope: context }),
      })
    );
  }
}
