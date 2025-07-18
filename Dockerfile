# ---------- STAGE 1: Base with pnpm ----------
FROM node:lts-alpine AS base
WORKDIR /app

# Cài pnpm để quản lý package hiệu quả hơn npm
RUN npm install -g pnpm@latest

# ---------- STAGE 2: Development ----------
FROM base AS dev
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .

CMD ["pnpm", "dev"]

# ---------- STAGE 3: Build ----------
FROM base AS build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build

# ---------- STAGE 4: Production Dependencies ----------
FROM base AS prod_deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

# ---------- STAGE 5: Production Runtime ----------
FROM node:lts-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy từ các stage trước
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=prod_deps /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Expose cổng cho Next.js (mặc định là 3000)
EXPOSE 3000

CMD ["pnpm", "start"]
