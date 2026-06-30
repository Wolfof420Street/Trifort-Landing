# Comprehensive Audit Report: TRIFORT BUILDERS

## 1. Executive Summary
- **Overall health score:** 4/10. (Functional MVP, but suffers from critical architectural drift, severe security vulnerabilities in file uploads/auth, and zero SSR, crippling SEO).
- **Top 5 most urgent issues, ranked:**
  1. **Arbitrary File Upload / Stored XSS:** `multer` validation relies solely on client-provided mimetype, allowing malicious `.html`/`.js` payloads.
  2. **Insecure JWT Storage:** Admin tokens are stored in `localStorage`, making the admin dashboard vulnerable to complete account takeover via XSS.
  3. **Architectural Drift:** The README claims the stack is React + MongoDB. It is actually plain HTML/JS + Supabase (PostgreSQL), deceiving new developers.
  4. **SEO Blackhole:** Project data is loaded purely client-side (CSR) into static HTML files without any Server-Side Rendering (SSR). Crawlers will see empty shells.
  5. **Hardcoded API URLs:** `admin-login.html` hardcodes a production Render URL, breaking local development and staging environments.
- **Top 5 highest-leverage improvements for "world-class, fast, SEO-friendly":**
  1. Migrate the frontend to **Next.js** to achieve SSR/SSG for SEO and proper component architecture.
  2. Implement an **Image CDN pipeline** (e.g., Cloudinary or Supabase Storage with transforms) for optimized, responsive images.
  3. Switch to **HTTP-only secure cookies** for JWT authentication.
  4. Introduce **TypeScript** for end-to-end type safety.
  5. Setup a **CI/CD pipeline** with automated testing and linting.

## 2. Tech Stack Inventory
- **Actual Stack Used:**
  - **Frontend:** Vanilla HTML, CSS, JS (No framework used).
  - **Backend:** Express 4.18.2 (Node.js).
  - **Database:** Supabase / PostgreSQL (via `@supabase/supabase-js 2.104.0`).
- **Dependencies & Redundancies:**
  - `bcrypt 6.0.0` and `bcryptjs 2.4.3` are both installed. Only `bcryptjs` is used, making native `bcrypt` redundant.
  - `express-validator 7.0.0` is installed but completely unused (custom regex validation is used instead).
- **Vulnerabilities:**
  - `npm audit` reveals 10 known vulnerabilities (6 High, 4 Moderate), including a High-severity memory exhaustion DoS in `ws` (`>=8.0.0 <8.21.0`).
- **Missing Standard Tooling:**
  - **No Linter/Formatter:** ESLint and Prettier are entirely absent.
  - **No Test Runner:** No Jest/Mocha. The `test` script in `package.json` is merely an `echo` placeholder.
  - **No TypeScript.**
  - **No Bundler:** Webpack/Vite are absent, serving raw massive HTML files.
- **Documentation Mismatch:** The `README.md` explicitly claims the use of **React** and **MongoDB/Mongoose**. This is false. The code uses raw HTML and Supabase.

## 3. Architecture Review
- **Folder Structure Drift:** The `frontend/` directory only contains an `images/` subfolder. The actual frontend consists of massive (2,000+ line) HTML files dumped directly in the repository root.
- **Frontend/Backend Coupling:** The backend Express app (`server.js`) serves the root directory statically. The frontend uses `fetch` to call REST APIs, but the frontend code is not isolated from the backend structure.
- **Rendering Strategy:** **CSR-only**. The HTML files are completely static shells, and JavaScript fetches dynamic data on load. This is a critical failure for a public portfolio site needing SEO.
- **Database Schema Review:** SQL schema (`schema.sql`) defines `users`, `projects`, `contacts`, `quotes`, `subcontractors`, `reviews`. 
  - *Missing Indexes:* There are no explicit indexes on frequently queried columns like `category` or `status` in the `projects` table, though Supabase provides default primary key indexing.
  - *Validation:* Minimal database-level validation; relies entirely on the application layer.
- **Code Issues:** Massive code duplication. `index.html` is over 2,100 lines. `admin-dashboard.html` is 1,400 lines. `sanitizeString` is declared twice in `validators.js`.

## 4. Security Audit
- **Authentication:** **Found** (`backend/routes/auth.js:45`). Severity: **High**. JWTs are generated correctly, but there is no refresh flow. Furthermore, tokens are sent as JSON and stored in `localStorage` (`admin-login.html:303`), making them highly susceptible to XSS.
  - *Fix:* Issue JWTs via `httpOnly`, `secure`, `sameSite=strict` cookies.
- **Password Storage:** **Found** (`backend/init-db.js:30`). Severity: **Low**. Uses `bcryptjs.hash` with 10 salt rounds. Acceptable, but native `bcrypt` is faster and more secure.
- **Authorization:** **Found** (`backend/middleware/adminMiddleware.js`). Severity: **Low**. Properly verifies JWT and checks if `role` is `admin` or `editor`.
- **Input Validation:** **Found** (`backend/utils/validators.js`). Severity: **Medium**. Custom regex logic is used instead of the installed `express-validator`. Relies on a rudimentary `sanitizeString` function that simply strips `<` and `>`.
- **SQL Injection:** **Not Found**. The Supabase client uses PostgREST, which auto-parameterizes inputs, protecting against injection.
- **CORS Configuration:** **Found** (`backend/server.js:42`). Severity: **Low**. Correctly restricted to specific Vercel domains and localhost origins. Not wildcarded.
- **Secrets Management:** **Found** (`backend/.env.example`). Severity: **Low**. No hardcoded keys in the repository. Environment variables are checked on startup.
- **Rate Limiting:** **Found** (`backend/server.js:82`). Severity: **Low**. Applied to public form endpoints (5 requests per 15 minutes). Good practice.
- **File Upload Handling:** **Found** (`backend/routes/projects.js:24`). Severity: **Critical**. `multer` uses `file.mimetype.startsWith('image/')` to validate uploads. Attackers can easily spoof the `Content-Type` header while uploading a `.html` or `.php` file. The server saves it with `path.extname(file.originalname)`. If an uploaded `.html` file is accessed via the static server, it leads to Stored XSS.
  - *Fix:* Validate magic bytes/file signatures, strictly allowlist extensions (`.jpg`, `.png`, `.webp`), and ideally serve uploads from a separate CDN domain.
- **HTTP Headers:** **Found** (`backend/server.js:54`). Severity: **Low**. `helmet()` is used, and a CSP policy is configured.
- **Dependency Vulnerabilities:** **Found**. Severity: **High**. `npm audit` reports 10 vulnerabilities, including DoS vectors in sub-dependencies.
  - *Fix:* Run `npm audit fix` and update dependencies.
- **Error Handling:** **Found** (`backend/server.js:123`). Severity: **Medium**. The global error handler leaks internal `err.message` if `NODE_ENV !== 'production'`. Ensure `NODE_ENV` is strictly enforced.

## 5. Code Quality Review
- **Consistency:** Poor. The frontend is a monolithic set of HTML files without components. 
- **Duplication:** High. `validators.js` declares `sanitizeString` twice. Navbar and footer HTML is duplicated across all root HTML files.
- **Complexity:** Severe. Managing a 2,100+ line `index.html` file is a maintenance nightmare.
- **Testing:** **None**. Zero test files exist. `package.json` contains a placeholder.
- **Accessibility:** Lacking semantic landmark elements in HTML, and missing robust `aria-` labels for interactive elements.

## 6. Performance Audit
- **Bundle Size:** No bundler is used. The entire HTML/CSS payload is delivered at once. No code splitting.
- **Image Handling:** Unoptimized. Images uploaded via the admin panel are saved and served directly from the disk as raw uploads. No compression, resizing, or modern format (WebP/AVIF) conversion.
- **API Response Shape:** Over-fetching and missing pagination. `GET /api/projects` (`backend/routes/projects.js:34`) fetches all projects at once (`select('*')`). As the portfolio grows, this will degrade performance.
- **Database Indexing:** Missing explicit indexes on commonly filtered fields like `category` and `status`.
- **Caching:** No HTTP cache-control headers are explicitly set for static assets in Express.
- **Core Web Vitals:** High risk of poor LCP due to massive, unoptimized hero images and synchronous script/stylesheet blocking.

## 7. SEO Audit
- **Rendering:** **CSR-only**. A critical issue. Project details are fetched via JS. Search engines and social media link previews will see a blank state.
- **Meta Tags:** Static only. No dynamic Open Graph or Twitter Card tags per project.
- **Semantic HTML:** Barebones. Fails to leverage proper `<article>`, `<section>`, and hierarchical heading depth dynamically.
- **Sitemap & Robots.txt:** `robots.txt` exists and blocks admin pages. `sitemap.xml` exists but is completely hardcoded to static pages (`index.html`, `projects.html`). Dynamic project entries are not indexed.
- **URL Structure:** Uses `.html` extensions (e.g., `projects.html`). Lacks clean, descriptive slugs for specific projects.
- **Structured Data:** No JSON-LD schema.org markup exists for the local business or specific construction projects.

## 8. Gaps & Missing Production Essentials
- [x] Environment-based config (dev/staging/prod)
- [ ] Logging/monitoring (No structured logging or Sentry)
- [ ] CI/CD pipeline
- [ ] Automated tests (unit/integration/e2e)
- [ ] Backup/recovery strategy (Relies solely on Supabase PaaS defaults)
- [ ] Admin password reset / account recovery flow
- [x] Form validation feedback (Present manually)
- [x] 404 / error page handling (Basic JSON response)
- [x] Loading states / skeleton UI (Basic loader present)
- [ ] Mobile responsiveness verification (Varies heavily across monolithic HTML files)

## 9. Prioritized Roadmap

| Priority | Issue | Area | Effort | Impact | Recommended Fix |
|----------|-------|------|--------|--------|------------------|
| 1 | Multer Arbitrary File Upload (XSS) | Security | S | Critical | Validate file extensions via magic bytes; enforce strict allowlist; serve via distinct CDN domain. |
| 2 | JWT stored in localStorage | Security | M | High | Migrate Auth flow to use `httpOnly`, `secure`, `sameSite=strict` cookies. |
| 3 | CSR-only rendering / No SEO | SEO | L | High | Refactor frontend to Next.js to leverage SSR/SSG for project pages and dynamic Meta tags. |
| 4 | Hardcoded API URL in Admin Login | Frontend | S | Medium | Use relative paths or environment variables for API endpoints instead of hardcoded Render URLs. |
| 5 | Missing Pagination on Projects | Performance | S | Medium | Implement `limit` and `range` in Supabase query for `/api/projects`. |
| 6 | Unoptimized Image Delivery | Performance | M | High | Integrate Cloudinary or Supabase Storage image transformations for on-the-fly resizing/WebP. |
| 7 | Duplicate & Missing Tooling | Code Quality | S | Medium | Remove redundant `bcrypt`, add ESLint, Prettier, and set up a basic test framework (Jest). |
| 8 | Monolithic HTML Duplication | Code Quality | L | High | Adopt a component-based architecture (React) to eliminate repeated Navbar/Footer code. |

## 10. "World-Class App" Gap Analysis
To transform this functioning MVP into a fast-loading, highly-ranked, secure construction portfolio, the following architectural pivots are required:

1. **Migrate to Next.js (App Router):** This single change resolves the CSR/SEO blackhole, eliminates massive HTML file duplication via componentization, and introduces clean URL slugs without `.html` extensions.
2. **Implement an Image Optimization Pipeline:** Serving raw uploads kills performance (LCP). Utilizing Next.js `<Image />` component paired with Supabase Storage optimizations or Cloudinary will automatically serve responsive, modern formats.
3. **Adopt HTTP-Only Cookies for Sessions:** Moving JWTs out of `localStorage` shuts down the largest XSS attack vector against the admin dashboard.
4. **Introduce TypeScript:** Validating complex nested data with custom regex (as seen in `validators.js`) is error-prone. TypeScript paired with Zod will guarantee end-to-end type safety and eliminate runtime validation bugs.
5. **Dynamic Sitemap & JSON-LD:** Generating a dynamic `sitemap.xml` that includes all project slugs, combined with Schema.org JSON-LD injection on project pages, will guarantee superior local search rankings.
