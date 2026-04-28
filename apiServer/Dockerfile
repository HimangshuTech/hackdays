# syntax=docker/dockerfile:1.7

FROM node:22-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

FROM deps AS dev
ENV NODE_ENV=development \
    PORT=4000
COPY . .
RUN mkdir -p public/temp
EXPOSE 4000
CMD ["sh", "-c", "npx prisma generate && npm run dev"]

FROM deps AS build
ARG DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
ENV DATABASE_URL=$DATABASE_URL
COPY prisma ./prisma
COPY prisma.config.ts tsconfig.json ./
RUN npx prisma generate
COPY . .
RUN mkdir -p public/temp && npm run build
RUN npm prune --omit=dev

FROM node:22-slim AS production
WORKDIR /app
ENV NODE_ENV=production \
    PORT=4000

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
RUN mkdir -p public/temp

EXPOSE 4000
CMD ["node", "dist/src/index.js"]
