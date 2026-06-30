# Migration Plan: TRIFORT BUILDERS

This document outlines the Phase 0 discovery and architectural plan for migrating the TRIFORT BUILDERS site to a production-grade, self-hosted Next.js 14+ application.

## 1. Database Schema (PostgreSQL)

The new schema introduces `slug` for SEO-friendly URLs and explicit indexes for performant querying. We are starting fresh (no legacy data migration).

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE, -- Added for SEO URLs
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  image_url TEXT, -- Path to the processed WebP image
  status TEXT DEFAULT 'ongoing',
  completion_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_slug ON projects(slug);

CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT 'No subject',
  message TEXT NOT NULL,
  phone TEXT DEFAULT '',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  project_type TEXT NOT NULL,
  details TEXT DEFAULT '',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE subcontractors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  contact TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  trade TEXT NOT NULL,
  experience TEXT DEFAULT '',
  service_area TEXT DEFAULT '',
  message TEXT DEFAULT '',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  project_type TEXT DEFAULT '',
  status TEXT DEFAULT 'pending',
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 2. Chosen ORM: Drizzle ORM
**Choice:** Drizzle ORM
**Why:** Drizzle provides a highly type-safe, lightweight abstraction over SQL without the heavy Rust query engine overhead of Prisma. It allows for exact control over SQL queries (critical for avoiding N+1 problems) and pairs excellently with Zod via `drizzle-zod`. It also supports Postgres schemas and migrations cleanly, making it perfect for our Docker/PgBouncer setup.

## 3. Next.js Route & Folder Structure
We will use the Next.js App Router, heavily leaning on Server Components for public pages to ensure perfect SEO.

```text
/src
  /app
    (public)
      /page.tsx                 # Home
      /about/page.tsx           # About Us
      /projects/page.tsx        # Projects Listing (Paginated)
      /projects/[slug]/page.tsx # Project Detail (Dynamic SEO)
      /services/page.tsx        # Services
      /contact/page.tsx         # Contact Form
      /subcontractor/page.tsx   # Subcontractor Application
      /estimator/page.tsx       # Quote Estimator
      /reviews/page.tsx         # Reviews List & Submission
    (admin)
      /admin/login/page.tsx     # Admin Login
      /admin/dashboard/layout.tsx # Admin Sidebar/Header Layout
      /admin/dashboard/page.tsx # Admin Overview Stats
      /admin/dashboard/projects/page.tsx
      /admin/dashboard/contacts/page.tsx
      /admin/dashboard/quotes/page.tsx
      /admin/dashboard/subcontractors/page.tsx
      /admin/dashboard/reviews/page.tsx
  /api
    /upload/route.ts            # Secure Image Upload API
  /components
    /ui                         # Shared UI (Buttons, Inputs)
    /layout                     # Navbar, Footer
    /forms                      # Client-side form components
  /db
    schema.ts                   # Drizzle schema
    index.ts                    # DB Connection (PgBouncer aware)
  /lib
    utils.ts
    auth.ts                     # JWT Cookie handling
    validation.ts               # Zod schemas
    email.ts                    # Nodemailer logic
```

## 4. Feature Mapping & Checklist

### Public Pages (SSR/SSG)
- [ ] `index.html` → `app/(public)/page.tsx`
- [ ] `about.html` → `app/(public)/about/page.tsx`
- [ ] `projects.html` → `app/(public)/projects/page.tsx`
- [ ] **[NEW]** Dynamic Project Page → `app/(public)/projects/[slug]/page.tsx` (Solves SEO issue)
- [ ] `services.html` → `app/(public)/services/page.tsx`
- [ ] `contact.html` → `app/(public)/contact/page.tsx`
- [ ] `subcontractor.html` → `app/(public)/subcontractor/page.tsx`
- [x] ~~`estimator.html` → `app/(public)/estimator/page.tsx`~~ (Out of scope - external product at https://estimator.trifort.site)
- [ ] `reviews.html` → `app/(public)/reviews/page.tsx`

### Admin Features
- [ ] `admin-login.html` → `app/(admin)/admin/login/page.tsx`
- [ ] `admin-dashboard.html` → Deconstructed into `/admin/dashboard/*` routes for maintainability.

### Architecture & Security Upgrades
- [ ] **Auth:** JWT stored in `localStorage` → JWT issued as `httpOnly`, `secure` cookies with refresh rotation.
- [ ] **File Uploads:** `multer` with naive validation → API route with magic-byte checking and `sharp` processing to WebP/AVIF. Raw images will never be served.
- [ ] **Rate Limiting:** Implemented via Next.js middleware / upstream Caddy.
- [ ] **Dropped Feature:** The old custom CAPTCHA middleware is being dropped. It is notoriously fragile. We will rely on strict rate limiting for Phase 1. If spam becomes an issue, we will integrate a modern, accessible provider like Cloudflare Turnstile in a later phase.
- [ ] **Dropped Feature:** `bcryptjs` is dropped in favor of native `bcrypt`.

## 5. Post-Deployment Verification (Within 24 Hours)

### Lighthouse CI / Performance Checks
Since the staging environment does not have Chrome installed to run headless Lighthouse tests, you must run the following command against the live site within 24 hours of deployment from a machine with Chrome installed:

```bash
npx --yes lighthouse https://trifort.site \
  --chrome-flags="--headless --no-sandbox" \
  --output=json \
  --output-path=./lighthouse.json \
  && jq '{performance: .categories.performance.score, accessibility: .categories.accessibility.score, best_practices: .categories["best-practices"].score, seo: .categories.seo.score}' ./lighthouse.json
```
