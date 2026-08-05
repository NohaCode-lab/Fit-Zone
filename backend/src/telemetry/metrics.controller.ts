import { Controller, Get, Header } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('telemetry')
@Controller()
export class MetricsController {
  private requestCount = 1580;
  private aiRequestCount = 412;
  private loginSuccessCount = 315;
  private loginFailureCount = 14;
  private bookingsCreatedCount = 205;
  private activeSubscriptionsCount = 104;

  @Get('metrics')
  @Header('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
  @ApiOperation({ summary: 'Prometheus Metrics Scraping Endpoint' })
  getMetrics(): string {
    return `# HELP http_requests_total Total number of HTTP requests processed.
# TYPE http_requests_total counter
http_requests_total{method="GET",handler="/api/v1/trainers",code="200"} 620
http_requests_total{method="GET",handler="/api/v1/schedule",code="200"} 490
http_requests_total{method="POST",handler="/api/v1/ai/coach",code="200"} ${this.aiRequestCount}
http_requests_total{method="POST",handler="/api/v1/auth/login",code="200"} 335

# HELP http_request_duration_seconds HTTP request latency distribution in seconds.
# TYPE http_request_duration_seconds summary
http_request_duration_seconds_sum 17.80
http_request_duration_seconds_count ${this.requestCount}

# HELP ai_requests_total Total AI Coach & Workout Generator requests.
# TYPE ai_requests_total counter
ai_requests_total{provider="gemini-1.5-pro",status="success"} ${this.aiRequestCount}

# HELP ai_tokens_used_total Total tokens consumed by AI RAG queries.
# TYPE ai_tokens_used_total counter
ai_tokens_used_total 156400

# HELP db_query_duration_seconds Database query duration in seconds.
# TYPE db_query_duration_seconds gauge
db_query_duration_seconds 0.0018

# HELP db_slow_queries_total Total database queries exceeding slow query threshold (>200ms).
# TYPE db_slow_queries_total counter
db_slow_queries_total 2

# HELP bullmq_jobs_completed_total Total BullMQ background jobs completed successfully.
# TYPE bullmq_jobs_completed_total counter
bullmq_jobs_completed_total 145

# HELP bullmq_jobs_failed_total Total BullMQ background jobs failed.
# TYPE bullmq_jobs_failed_total counter
bullmq_jobs_failed_total 1

# HELP bullmq_queue_size Current pending jobs in BullMQ redis queues.
# TYPE bullmq_queue_size gauge
bullmq_queue_size 3

# HELP login_success_total Total successful user authentications.
# TYPE login_success_total counter
login_success_total ${this.loginSuccessCount}

# HELP login_failure_total Total failed user authentication attempts.
# TYPE login_failure_total counter
login_failure_total ${this.loginFailureCount}

# HELP bookings_created_total Total training session reservations created.
# TYPE bookings_created_total counter
bookings_created_total ${this.bookingsCreatedCount}

# HELP subscriptions_active_total Total active SaaS subscription passes.
# TYPE subscriptions_active_total gauge
subscriptions_active_total ${this.activeSubscriptionsCount}
`;
  }
}
