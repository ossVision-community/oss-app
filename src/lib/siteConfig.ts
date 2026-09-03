/**
 * Site settings read from the environment: Vercel's project settings, or a
 * .env file when running locally.
 *
 * Every setting is accepted under TWO names — the plain one and the same name
 * with a NEXT_PUBLIC_ prefix — so it does not matter which one your host lets
 * you type. The plain name wins when both are set:
 *
 *   VISION_PDF_URL        (or NEXT_PUBLIC_VISION_PDF_URL)
 *   REGISTRATION_ENABLED  (or NEXT_PUBLIC_REGISTRATION_ENABLED)
 *   REGISTER_URL          (or NEXT_PUBLIC_REGISTER_URL)
 *
 * This module is read on the SERVER only. Anything the browser needs is
 * handed to client components as props (see src/app/page.tsx) — that is what
 * makes the un-prefixed names work, since Next.js only ships NEXT_PUBLIC_
 * variables into browser code.
 *
 * These values are baked in when the site is built, so after changing one in
 * Vercel you have to redeploy for it to show up.
 */

function readSetting(name: string): string {
  const value = process.env[name] ?? process.env[`NEXT_PUBLIC_${name}`];
  return value?.trim() ?? "";
}

function readFlag(name: string): boolean {
  const value = readSetting(name).toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}

/**
 * Link behind the "اكتشف رؤيتنا" button. Falls back to the file the site
 * shipped with, so the button keeps working when nothing is configured.
 */
export const VISION_PDF_URL =
  readSetting("VISION_PDF_URL") ||
  "https://firebasestorage.googleapis.com/v0/b/oss-project-2bab0.firebasestorage.app/o/ref-OSS-Vision.pdf?alt=media&token=d9d2a40b-486b-45e3-bfcb-2f68bcc142ad";

/**
 * Shows the "انضم إلينا" button. While this is off the button is hidden,
 * /join redirects to the home page and /api/applications answers 503 without
 * opening a database connection. Nothing is deleted; it all comes back when
 * this is turned on.
 */
export const REGISTRATION_ENABLED = readFlag("REGISTRATION_ENABLED");

/**
 * A Google Form (or any external) URL to send applicants to. When set, the
 * button opens it in a new tab and /join redirects there too, so older links
 * still reach the form. When empty, the site's own /join page is used, which
 * needs MONGODB_URI to accept submissions.
 */
export const REGISTER_URL = readSetting("REGISTER_URL");

/** True when applicants go to an external form rather than the built-in page. */
export const USES_EXTERNAL_REGISTER_FORM = REGISTER_URL.length > 0;

/** Where the register button points: the external form, else the built-in page. */
export const REGISTER_HREF = USES_EXTERNAL_REGISTER_FORM ? REGISTER_URL : "/join";
