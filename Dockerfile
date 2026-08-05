# =========================================================
# Stage 1: Build Frontend Assets
# =========================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies (clean install)
RUN npm ci

# Copy source code
COPY . .

# Build production distribution bundle
RUN npm run build

# =========================================================
# Stage 2: Serve Web Application via Nginx
# =========================================================
FROM nginx:alpine AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
