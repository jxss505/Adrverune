# ==============================================================================
# ADVERUNE Production Container Image (Google Cloud Run / Kubernetes / Docker)
# Multi-stage build: Fast caching, lean footprint (<150MB), non-root execution
# ==============================================================================

# STAGE 1: Build & Assets Compilation
FROM node:22-alpine AS builder

WORKDIR /app

# Cache package dependencies
COPY package.json ./
RUN npm install

# Copy complete project source
COPY . .

# Compile client-side Vite distribution assets into /app/dist
RUN npm run build

# STAGE 2: Hardened Production Runtime
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install only production runtime dependencies
COPY package.json ./
RUN npm install --omit=dev

# Copy compiled frontend distribution from builder stage
COPY --from=builder /app/dist ./dist

# Copy server application and metadata assets
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/src ./src
COPY --from=builder /app/index.html ./index.html

# Security hardening: Execute as unprivileged built-in node user
USER node

# Cloud Run defaults to 3000/8080 via PORT environment variable
EXPOSE 3000

# Launch server
CMD ["node", "server.ts"]
