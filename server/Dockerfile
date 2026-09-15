# ------------------------------------------------------------------------------------
# Stage 1
# ------------------------------------------------------------------------------------
ARG NODE_VERSION=sha256:aadf416b2cdce311a8811ba3f0608a61b77dbf997500e2eafe781b51f6a0b019
FROM node@${NODE_VERSION} AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build

# ------------------------------------------------------------------------------------
# Stage 2
# ------------------------------------------------------------------------------------
FROM node@${NODE_VERSION} AS runner

WORKDIR /app
COPY --link --from=builder /app/dist ./dist

COPY package*.json ./
RUN npm ci --only=production

RUN chown -R node:node /app

USER node
EXPOSE ${PORT}
CMD ["node", "dist/server.js"]