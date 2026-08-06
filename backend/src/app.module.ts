import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TrainersModule } from './trainers/trainers.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { ReviewsModule } from './reviews/reviews.module';
import { BookingsModule } from './bookings/bookings.module';
import { AiModule } from './ai/ai.module';
import { BillingModule } from './billing/billing.module';
import { TelemetryModule } from './telemetry/telemetry.module';
import { HealthModule } from './health/health.module';
import { LoggerService } from './common/logger/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, any>) => {
        if (process.env.NODE_ENV !== 'test') {
          const mandatoryVars = ['JWT_SECRET', 'DATABASE_URL'];
          for (const key of mandatoryVars) {
            if (!config[key] && !process.env[key]) {
              throw new Error(`FATAL CONFIG ERROR: Missing mandatory environment variable ${key}`);
            }
          }
        }
        return config;
      },
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    PrismaModule,
    AuthModule,
    UsersModule,
    TrainersModule,
    WorkoutsModule,
    SubscriptionsModule,
    ReviewsModule,
    BookingsModule,
    AiModule,
    BillingModule,
    TelemetryModule,
    HealthModule,
  ],
  providers: [
    LoggerService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [LoggerService],
})
export class AppModule {}
