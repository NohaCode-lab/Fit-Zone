# Fit-Zone Production Prometheus & Grafana Monitoring Guide

## 1. Prometheus Scraping Target
Prometheus scrapes the NestJS metrics endpoint every 15s at:
`http://backend:3000/api/v1/metrics`

## 2. Core Metrics Exposed
- `http_requests_total`: Total HTTP requests grouped by method and route handler.
- `http_request_duration_seconds`: Request latency summary distribution.
- `ai_requests_total` & `ai_tokens_used_total`: AI Coach query counters and token consumption.
- `login_success_total` & `login_failure_total`: Authentication success/failure tracking.
- `db_query_duration_seconds`: PostgreSQL query latency gauge.

## 3. Grafana Dashboards
- **API Performance**: RPM, p95 latency, 4xx/5xx error rates.
- **AI RAG Monitoring**: Token usage, cost estimation, Gemini response times.
- **Database Health**: Active connection pool status and slow queries.
