# 🏛️ Fit-Zone Full-Stack System Architecture

This document details the architectural layout, component boundaries, and database design of **Fit-Zone**.

---

## 1. High-Level System Architecture

```
+-----------------------------------------------------------------------------------+
|                              REACT 19 + TYPESCRIPT CLIENT                         |
|                             (TanStack Query v5 / Zustand)                         |
+-----------------------------------------+-----------------------------------------+
                                          |
                                    HTTPS / REST API
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                 NGINX REVERSE PROXY                               |
|                         (OWASP HSTS / CSP Security Headers)                       |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                NESTJS BACKEND ENGINE                              |
|                                                                                   |
|  +--------------------+   +-----------------------+   +------------------------+  |
|  |  AuthModule        |   |  TrainersModule       |   |  SubscriptionsModule   |  |
|  |  (Argon2id / JWT)  |   |  (Prisma Queries)     |   |  (Stripe Billing)      |  |
|  +--------------------+   +-----------------------+   +------------------------+  |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  |                             AI RAG SERVICE MODULE                           |  |
|  |                (Google Gemini 1.5 Pro / LangChain / pgvector)               |  |
|  +-----------------------------------------------------------------------------+  |
+-------------------+---------------------+--------------------+--------------------+
                    |                     |                    |
                    v                     v                    v
+-------------------+-----+     +---------+---------+     +----+----------------+
|    POSTGRESQL +         |     |   REDIS IN-MEMORY   |     |   PROMETHEUS +      |
|    PGVECTOR DATABASE    |     |   CACHE & QUEUES    |     |   GRAFANA MESH      |
+-------------------------+     +---------------------+     +---------------------+
```

---

## 2. Frontend Modular Design (`src/`)

- **Primitives Layer (`src/components/ui/`)**: Pure, reusable presentation components (buttons, fallback skeletons).
- **Feature Modules (`src/features/`)**: Self-contained domain features (`auth`, `trainers`, `workouts`, `pricing`, `testimonials`, `dashboard`, `ai-coach`).
- **State Separation**: Client UI and authentication state managed via **Zustand** (`useAuth.ts`); server data fetching, caching, and background refetching managed via **TanStack Query v5**.

---

## 3. NestJS Backend Modularity (`backend/src/`)

- **Domain Modules**: Isolated modules (`AuthModule`, `UsersModule`, `TrainersModule`, `WorkoutsModule`, `SubscriptionsModule`, `BookingsModule`, `AiModule`, `BillingModule`, `HealthModule`, `TelemetryModule`).
- **Security & RBAC**: Authentication handled via Argon2id password verification and dual-JWT token issuing. Authorization governed by `@Roles()` metadata decorator and `RolesGuard`.
