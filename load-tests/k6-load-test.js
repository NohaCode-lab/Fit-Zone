import http from 'k6/http';
import { check, sleep } from 'k6';

// k6 Load Test Configuration: 1000 Virtual Users (VUs) Stress Test
export const options = {
  stages: [
    { duration: '30s', target: 200 },  // Ramp up to 200 users
    { duration: '1m', target: 500 },   // Ramp up to 500 users (500 bookings/min target)
    { duration: '1m', target: 1000 },  // Peak load: 1000 virtual users
    { duration: '30s', target: 0 },    // Ramp down to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<300'], // 95% of requests must complete under 300ms
    http_req_failed: ['rate<0.01'],   // Error rate must be under 1%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000/api/v1';

export default function () {
  // 1. Fetch Active Trainers List
  const trainersRes = http.get(`${BASE_URL}/trainers`);
  check(trainersRes, {
    'trainers status is 200': (r) => r.status === 200,
  });

  // 2. Fetch Weekly Class Schedule
  const scheduleRes = http.get(`${BASE_URL}/schedule`);
  check(scheduleRes, {
    'schedule status is 200': (r) => r.status === 200,
  });

  // 3. Query AI Personal Fitness Coach RAG Engine
  const aiPayload = JSON.stringify({
    message: 'Generate a 4-day progressive hypertrophy workout plan for strength',
    fitnessGoal: 'Muscle Hypertrophy',
  });
  const aiHeaders = { 'Content-Type': 'application/json' };
  const aiRes = http.post(`${BASE_URL}/ai/coach`, aiPayload, { headers: aiHeaders });
  check(aiRes, {
    'AI coach status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
