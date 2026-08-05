# 🚀 Fit-Zone SaaS — Step-by-Step Production Deployment Manual

This guide outlines the production cloud release protocol to deploy **Fit-Zone** as a live SaaS application.

---

## ☁️ Target Production Cloud Stack

| Layer | Provider Option A | Provider Option B |
| :--- | :--- | :--- |
| **Frontend SPA Client** | **Vercel** / **AWS CloudFront** | **Render** / **Cloudflare Pages** |
| **NestJS API Engine** | **Render Web Service** | **AWS ECS** / **Railway** |
| **PostgreSQL + pgvector** | **Supabase Postgres 16** | **Railway Postgres** / **AWS RDS** |
| **Redis Cache & Queue** | **Upstash Redis** | **Railway Redis** / **ElastiCache** |
| **Domain & DNS / SSL** | **Cloudflare DNS** | **AWS Route 53** |

---

## 1. Managed PostgreSQL & pgvector Setup (Supabase / Railway)

1. Provision a managed PostgreSQL instance with PostgreSQL 16+.
2. Execute SQL extension initialization:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
3. Copy the production connection string into `DATABASE_URL` (ensure `?sslmode=require` is appended).
4. Run Prisma database migrations:
   ```bash
   cd backend
   npx prisma db push
   npx prisma db seed
   ```

---

## 2. Managed Redis Cache Setup (Upstash / Railway)

1. Provision a Serverless or Dedicated Redis instance.
2. Copy the TLS connection URL (`rediss://...` or `redis://...`) into `REDIS_URL`.

---

## 3. NestJS Backend Deployment (Render / Railway / AWS ECS)

1. Connect the GitHub repository to your cloud provider.
2. Select Docker runtime using [`backend/Dockerfile`](file:///C:/Users/noham/.gemini/antigravity/scratch/Fit-Zone/backend/Dockerfile).
3. Inject production environment variables:
   - `NODE_ENV=production`
   - `DATABASE_URL=...`
   - `REDIS_URL=...`
   - `JWT_SECRET=...`
   - `GEMINI_API_KEY=...`
   - `STRIPE_SECRET_KEY=...`
   - `CORS_ORIGIN=https://fitzone-saas.com`
4. Set Health Check Endpoint to **`GET /health/ready`**.

---

## 4. Frontend Client Deployment (Vercel / Cloudflare Pages)

1. Create a new Vercel / Cloudflare Pages project pointing to the root directory.
2. Set build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Environment Variables:
   - `VITE_API_BASE_URL=https://api.fitzone-saas.com/api/v1`

---

## 5. Domain DNS & HTTPS SSL Termination

1. Add custom CNAME and A records in Cloudflare DNS pointing `api.fitzone-saas.com` to the NestJS backend and `fitzone-saas.com` to the Vercel frontend.
2. Enable SSL/TLS encryption mode (**Full / Strict**).
