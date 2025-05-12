# ---------- Base image ----------
FROM node:lts-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@latest
RUN npm install -g husky@latest

# ---------- Development ----------
FROM base AS development
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
CMD ["pnpm", "dev"]

# ---------- Production Build ----------
FROM base AS builder
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# ---------- Production Runtime ----------
FROM base AS production
ENV NODE_ENV=production

# Copy only necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile --prod

EXPOSE 3000
CMD ["pnpm", "start"]
