# Security Audit Report (Quick)

Date: 2026-01-26  
Project: `oss-vision-app` (Next.js App Router)

## Scope
- API routes: `src/app/api/applications/route.ts`, `src/app/api/partners/route.ts`
- Client forms: `src/components/forms/JoinForm.tsx`, `src/components/forms/PartnerForm.tsx`
- Validation + config: `src/lib/validations.ts`, `next.config.ts`
- Environment templates: `.env.local.example`

## High-Risk Finding
- **Secrets exposure**: Real MongoDB credentials were present in `oss-vision-app/.env.local.example` (now removed).
  - Action required: **rotate MongoDB user/password and any leaked keys**, and if this repo was pushed publicly/shared, **purge git history** of the leaked secret.

## Security Improvements Implemented
1) **API hardening**
   - Added timing-safe API key comparison for protected `GET` endpoints (reduces side-channel risk).
   - Added `Cache-Control: no-store` to API responses (reduces sensitive data caching).
   - Improved rate-limit responses with `Retry-After` + rate-limit headers.
   - Forced dynamic behavior for API handlers to avoid unexpected caching.
   - Files:
     - `src/app/api/applications/route.ts`
     - `src/app/api/partners/route.ts`

2) **Safer input validation**
   - URL fields now enforce `http://` or `https://` only and auto-prefix `https://` when missing.
   - `resumeUrl` is restricted to Firebase Storage hostnames to reduce SSRF/phishing link injection in stored records.
   - File: `src/lib/validations.ts`

3) **Safer resume uploads**
   - Removed email + original filename from Firebase Storage object key (reduces PII leakage and path abuse).
   - Enforced PDF `contentType` on upload.
   - File: `src/components/forms/JoinForm.tsx`

4) **Security headers**
   - Added a Content Security Policy (CSP) and extra hardening headers.
   - Disabled `X-Powered-By`.
   - File: `next.config.ts`

## Verification
- `npm run lint` (warnings only)
- `npm run build` (successful)

## Recommended Next Steps (Important)
- **Rotate secrets now**: MongoDB credentials + `API_SECRET_KEY`.
- **Firebase Storage Rules**: ensure uploads are restricted (size/type/path), and ideally require auth or App Check.
- Consider a shared rate-limit store (Redis/Upstash) for production (in-memory Map won’t work across instances).

