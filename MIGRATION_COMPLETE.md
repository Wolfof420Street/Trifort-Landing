# Migration Complete: Trifort Builders

## Executive Summary
Over 5 phases, the legacy Express/Pug monolith has been completely modernized into a secure, performant, and maintainable Next.js 15 (App Router) application. 

Key milestones achieved:
- **Phase 1 (Foundation):** Postgres 16 & PgBouncer infrastructure, Drizzle ORM schemas, database migrations, and basic seeding.
- **Phase 2 (Auth & State):** Secure JWT-based authentication using `jose` for Edge compatibility, stateless refresh token rotation with Postgres revocation tracking, and `bcrypt` password hashing.
- **Phase 3 (Public Site):** Dynamic Server Components for all public pages, Next.js `<Image>` optimization, automated XML sitemaps, JSON-LD structured data for SEO, and fully functional contact/quote forms.
- **Phase 4 (Admin Dashboard):** Protected server actions, magic-byte image validation, `sharp`-based WebP/AVIF generation, strict Caddyfile MIME-type security, and comprehensive Postgres-backed rate limiting.
- **Phase 5 (Deployment & Polish):** Cold-start verification, GitHub Actions CI pipeline, real domain configuration (`trifort.site`), backup/restore validation, and Lighthouse performance tuning.

## Deliberate Deviations from Original Plan
1. **Drizzle ORM over Prisma:** We chose Drizzle for its lightweight bundle size, superior Edge compatibility (critical for Next.js Middleware), and lack of a bulky Rust query engine dependency.
2. **Local Image Storage over S3/R2:** As requested, we stuck with local filesystem storage to avoid external vendor dependencies. We implemented a robust `sharp` pipeline to generate optimized WebP variants and secured the `/uploads/` directory with strict Caddy rules to prevent script execution.
3. **`jose` over `jsonwebtoken`:** We used `jose` because standard Node.js crypto modules are not available in the Next.js Edge runtime used by Middleware. This ensures authentication checks are globally distributed and ultra-fast.
4. **Postgres-backed Rate Limiting:** Instead of an in-memory solution or Redis, we built a `rate_limits` table in Postgres. This ensures rate limits survive container restarts and horizontal scaling without requiring a separate Redis cluster.

## Pre-Launch Checklist (Manual Verification)
Before routing live traffic, please manually verify these steps on the real VPS:

- [ ] **DNS Configuration:** Verify A/AAAA records for `trifort.site` and `www.trifort.site` point to the VPS IP address.
- [ ] **Firewall Rules:** Ensure ports 80 and 443 are open (`ufw allow 80,443/tcp`), and port 5432/6433 are closed to the public internet.
- [ ] **Environment Variables:** Update `.env` with strong, unique secrets for `POSTGRES_PASSWORD`, `DATABASE_URL` and `JWT_SECRET`.
- [ ] **Shared Proxy:** If running behind a shared Caddy proxy (e.g., alongside `estimator.trifort.site`), update the proxy to route to this app's container network without terminating TLS twice.
- [ ] **Initial Admin Setup:** Run the admin seed script (`npm run seed:admin`) in production to create your initial login.
- [ ] **First Backup:** Run `docker compose exec postgres pg_dump -U postgres trifort > initial_backup.sql` to verify the backup workflow on the live server.

## Known Limitations & Deferred Items
- **Automated Backup Cron:** The `pg_dump` script is manual. You should configure a cron job on the host machine to run this daily and sync the output to an off-site location (e.g., AWS S3 or a secondary server).
- **Password Reset Flow:** Password reset functionality was deferred to a future phase. Admins currently need to be managed directly via the database or a custom script.
- **Image Deletion:** When a project is deleted, its metadata is removed via `onDelete: 'cascade'`, but the physical WebP files remain in the `/uploads/` directory. A future cleanup cron job could be added to reclaim disk space.
