# --- build: Vite static site ---
FROM node:20-alpine AS build
WORKDIR /app

# Optional: override at build time (`docker compose build --build-arg ...` or CI).
# Falls back to defaults in `site/src/config/site.js` / Vite `loadEnv`.
ARG VITE_SITE_ORIGIN
ARG VITE_GOOGLE_SITE_VERIFICATION
ENV VITE_SITE_ORIGIN=${VITE_SITE_ORIGIN}
ENV VITE_GOOGLE_SITE_VERIFICATION=${VITE_GOOGLE_SITE_VERIFICATION}

COPY site/package*.json ./
RUN npm ci

# Full site tree (same as repo `site/`). Build step must stay in sync with local: `cd site && npm run build`.
COPY site/ ./
ENV NODE_ENV=production
# Changes every deploy commit so `npm run build` is not skipped by stale layer cache.
ARG CACHEBUST=local
# Explicit: runs package.json "build" (generate-icons, sitemap, vite build).
RUN echo "CACHEBUST=${CACHEBUST}" && npm run build

# --- run: static files only ---
FROM nginx:1.27-alpine AS runtime
RUN apk add --no-cache curl
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -fsS http://127.0.0.1/health >/dev/null || exit 1
CMD ["nginx", "-g", "daemon off;"]
