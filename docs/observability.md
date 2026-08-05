# Fit-Zone Enterprise Observability & Logging Architecture

## 1. Structured Logging Strategy
All production logs are formatted as structured JSON containing:
- `requestId`: Unique UUID header (`X-Request-ID`) attached per HTTP request.
- `method` & `endpoint`: Target route path.
- `userId`: Authenticated user UUID or `anonymous`.
- `statusCode` & `duration`: HTTP response status and execution duration in milliseconds.

## 2. PII Sensitive Data Masking Engine
To comply with European GDPR standards, sensitive data fields are automatically sanitized before output:
- **Email Masking**: `john.doe@domain.com` $\rightarrow$ `j***@domain.com`.
- **Secret Redaction**: `password`, `accessToken`, `refreshToken`, and credit card values replaced with `***REDACTED***`.

## 3. Event Tokens Tracked
- `LOGIN_ATTEMPT` / `LOGIN_SUCCESS` / `LOGIN_FAILED`
- `BOOKING_CREATED`
- `AI_REQUEST`
- `PAYMENT_CREATED`
