# Nginx only — static files come from the host at runtime (see docker-compose volume).
# Before `docker compose up`, run: `cd site && npm ci && npm run build`
# (GitHub Actions deploy does this on the server after `git pull`.)

FROM nginx:1.27-alpine
RUN apk add --no-cache curl
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -fsS http://127.0.0.1/health >/dev/null || exit 1
CMD ["nginx", "-g", "daemon off;"]
