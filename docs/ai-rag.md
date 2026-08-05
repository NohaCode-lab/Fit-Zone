# 🧠 Fit-Zone AI Fitness Coach & RAG Architecture

This document details the **Retrieval-Augmented Generation (RAG)** pipeline and vector search implementation in **Fit-Zone**.

---

## 1. AI RAG Request Flow

```
[USER QUERY] -> [REACT AI COACH CHAT] -> [NESTJS AI CONTROLLER]
                                                |
                                                v
[PGVECTOR SIMILARITY SEARCH] <--- [EMBEDDINGS (pgvector)] <--- [VECTOR SEARCH SERVICE]
                                                |
                                                v
                                     [GOOGLE GEMINI 1.5 PRO]
                                                |
                                                v
                                 [STRUCTURED JSON RESPONSE]
```

### Pipeline Execution Steps:
1. **User Question Submission**: The user submits a fitness prompt (e.g., *"Create a 4-week hypertrophy program"*).
2. **Context Retrieval**: `VectorSearchService` queries PostgreSQL `pgvector` knowledge tables (`ExerciseKnowledge`, `NutritionKnowledge`, `RecoveryKnowledge`) using cosine similarity search.
3. **Context Injection**: Relevant knowledge snippets are injected into Google Gemini 1.5 Pro prompt context.
4. **Structured Generation**: Gemini synthesizes personalized, medically sound workout and nutrition recommendations.

---

## 2. Vector Knowledge Base Schema

```prisma
model ExerciseKnowledge {
  id          String                  @id @default(uuid())
  title       String
  category    String
  content     String                  @db.Text
  embedding   Unsupported("vector")?
  createdAt   DateTime                @default(now())

  @@index([category])
}
```

---

## 3. Cost Optimization & Rate Limiting

- **Redis Token Rate Limiter**: Daily query counter per user (`ai_rate:userId`) prevents API abuse.
- **Prometheus LLM Metrics**: Exposes `ai_requests_total` and `ai_tokens_used_total` at `GET /api/v1/metrics`.
