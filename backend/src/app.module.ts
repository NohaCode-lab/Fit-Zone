import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    ConfigModule.forRoot({ isGlobal: true }),
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
  providers: [LoggerService],
  exports: [LoggerService],
})
export class AppModule {}
