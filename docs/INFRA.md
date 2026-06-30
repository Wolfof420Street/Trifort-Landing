# Infrastructure Guide

This document outlines the infrastructure setup for the TRIFORT BUILDERS application.

## Architecture Overview
The application is deployed using Docker Compose with the following services:
1. **Caddy (`caddy`)**: Reverse proxy, SSL termination (Let's Encrypt), and static file server for uploads.
2. **Next.js App (`app`)**: The main frontend and backend application.
3. **PostgreSQL (`postgres`)**: The primary relational database.
4. **PgBouncer (`pgbouncer`)**: Connection pooler for Postgres, running in `transaction` mode to support serverless-style ORM connections.

## How to Bring the Stack Up
1. Clone the repository to the host server.
2. Copy `.env.example` to `.env` and fill in the required secure values.
3. Start the stack:
   ```bash
   docker compose up -d --build
   ```
4. To view logs:
   ```bash
   docker compose logs -f
   ```

## Deploying Updates
When you push new code to the main branch and pull it onto the server, run:
```bash
docker compose build app
docker compose up -d app
```
This rebuilding process incurs zero-downtime up to the point of container switchover.

## Backup Strategy
Postgres data is stored in a Docker named volume (`postgres_data`). 

To backup the database without stopping the application, run a `pg_dump` via the container:
```bash
docker compose exec postgres pg_dump -U postgres -F c trifort > /path/to/host/backups/trifort_$(date +%Y%m%d).dump
```
It is highly recommended to set this as a daily cron job and sync the output directory to an external storage service (e.g., AWS S3).

## Restoring from Backup
```bash
docker compose exec -T postgres pg_restore -U postgres -d trifort < /path/to/host/backups/trifort_YYYYMMDD.dump
```

## Rotating Secrets
1. Update the `.env` file with the new secret (e.g., `JWT_SECRET` or `POSTGRES_PASSWORD`).
2. If rotating the Postgres password, you must also update it inside the Postgres instance manually via `psql` since the initialization script only runs once on empty volumes:
   ```sql
   ALTER USER postgres WITH PASSWORD 'new_password';
   ```
3. Restart the stack:
   ```bash
   docker compose up -d
   ```

## Security & Upload Directory Hardening
The `/uploads` directory is specifically hardened to prevent remote code execution in case an attacker bypasses the magic-byte image validation. 

### Caddy Configuration (Current Setup)
Caddy serves the `public/uploads` directory but restricts it to static files and completely prevents execution of scripts (like PHP). Since Caddy does not execute CGI/PHP by default unless explicitly configured via `php_fastcgi`, the default configuration acts as a secure boundary.

### Nginx Configuration (If switching proxy)
If you switch to Nginx, ensure the following is added to your server block:
```nginx
location ^~ /uploads/ {
    root /path/to/public;
    # Disable script execution
    location ~ \.(php|phtml|sh|cgi|py|pl)$ {
        deny all;
    }
    # Force application/octet-stream for non-image files
    types {
        image/jpeg  jpg jpeg;
        image/png   png;
        image/webp  webp;
        image/avif  avif;
    }
    default_type application/octet-stream;
}
```

### Apache Configuration
A `.htaccess` file is already included in `public/uploads/.htaccess` which denies execution of scripts and forces download behavior for unknown mimes using `ForceType`.
