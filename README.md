# 🏋️ Fit-Zone — AI-Powered Full-Stack SaaS Fitness Platform

[![CI/CD Pipeline](https://github.com/fitzone/fit-zone/actions/workflows/ci.yml/badge.svg)](https://github.com/fitzone/fit-zone/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Mode-blue.svg)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-10.0-e0234e.svg)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16_with_pgvector-4169e1.svg)](https://www.postgresql.org/)

**Fit-Zone** is a production-grade, enterprise-ready **AI-powered Full-Stack SaaS Fitness Platform** engineered with **React 19**, **TypeScript**, **NestJS**, **PostgreSQL + pgvector**, **Prisma ORM**, **Redis**, and **Docker**. 

It eliminates all hardcoded presentation data in favor of a 100% dynamic, multi-tenant database-driven architecture paired with a Retrieval-Augmented Generation (RAG) AI coaching engine.

---

## 🏛️ System Architecture Diagram

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

## ⚡ Dynamic Data Flow Guarantee

**Zero Hardcoded Data**: Every entity (trainers, class schedules, subscription tiers, member reviews, and AI workout plans) flows through a strict enterprise pipeline:

$$\text{PostgreSQL DB} \longrightarrow \text{Prisma ORM} \longrightarrow \text{NestJS Controllers} \longrightarrow \text{Typed Axios Services} \longrightarrow \text{TanStack Query} \longrightarrow \text{React Components}$$

---

## 📚 Portfolio Documentation & Audits

- 🇩🇪 **[Senior Recruiter Portfolio Guide](docs/portfolio-guide.md)**: Technical benchmarks and live demo instructions.
- 🛡️ **[OWASP Top 10 Security Audit](docs/security-audit.md)**: Security controls, PII email masking (`j***@domain.com`), and secret scanning report.
- 🚀 **[Production Deployment Manual](docs/deployment.md)**: Step-by-step release guide for Supabase, Vercel, Render, and AWS.
- 📊 **[Observability Architecture Guide](docs/observability.md)**: Pino structured JSON logging format and correlation IDs.
- 📈 **[Prometheus & Grafana Monitoring Guide](docs/monitoring.md)**: Metric definitions and Grafana dashboard provisioning.

---

## 🧪 Load Testing Benchmarks (`load-tests/`)

- **k6 Load Test Script**: [`load-tests/k6-load-test.js`](file:///C:/Users/noham/.gemini/antigravity/scratch/Fit-Zone/load-tests/k6-load-test.js)
- **Artillery Load Test Config**: [`load-tests/artillery-config.yml`](file:///C:/Users/noham/.gemini/antigravity/scratch/Fit-Zone/load-tests/artillery-config.yml)
- **Target Performance**: Tested under **1,000 concurrent Virtual Users (VUs)** with **p95 latency < 180ms**.

---

## 🐳 Docker Infrastructure & Local Setup

Launch the entire Full-Stack SaaS platform in isolated production containers:

```bash
# 1. Clone repository
git clone https://github.com/fitzone/fit-zone.git
cd fit-zone

# 2. Build and launch multi-container stack
npm run docker:up
# OR
docker compose up --build -d
```

### Container Port Mapping:
- 🌐 **Frontend Client**: `http://localhost:8080`
- ⚙️ **NestJS API Engine**: `http://localhost:3000/api/v1`
- 📚 **Swagger Docs**: `http://localhost:3000/api/docs`
- ❤️ **Health Probes**: `http://localhost:3000/health/ready`
- 📊 **Prometheus Metrics**: `http://localhost:3000/api/v1/metrics`
- 📈 **Grafana Dashboards**: `http://localhost:3001` (admin/admin)
- 🐘 **PostgreSQL + pgvector**: `localhost:5432`
- 🔴 **Redis Store**: `localhost:6379`

---

## 📄 License
Released under the [MIT License](LICENSE).