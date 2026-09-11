# ------------------------------------------------------------------------------------
# Stage 1
# ------------------------------------------------------------------------------------
ARG NODE_VERSION=sha256:aadf416b2cdce311a8811ba3f0608a61b77dbf997500e2eafe781b51f6a0b019
FROM node@${NODE_VERSION} AS builder

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

# Set env variables
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

ARG VITE_SERVER_API_KEY
ENV VITE_SERVER_API_KEY=${VITE_SERVER_API_KEY}

ARG VITE_GOOGLE_CAPTCHA_SITE_KEY
ENV VITE_GOOGLE_CAPTCHA_SITE_KEY=${VITE_GOOGLE_CAPTCHA_SITE_KEY}

ARG VITE_GOOGLE_CAPTCHA_SECRET_KEY
ENV VITE_GOOGLE_CAPTCHA_SECRET_KEY=${VITE_GOOGLE_CAPTCHA_SECRET_KEY}

#  Build
RUN npm run build

# ------------------------------------------------------------------------------------
# Stage 2
# ------------------------------------------------------------------------------------
FROM node@${NODE_VERSION} AS runner
  
WORKDIR /app

# Get files to serve
COPY --link --from=builder /app/dist ./dist

# Install serve package locally
RUN --mount=type=cache,target=/root/.npm npm install serve@^14.2.6 --omit=dev
USER node

# Set env vars
ARG PORT
ENV PORT=${PORT}

# Expose and run
EXPOSE ${PORT}
CMD ["sh", "-c", "npx serve -s dist -l $PORT"]
