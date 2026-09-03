/**
 * Registration switches. Both are read from .env, so the button can be turned
 * on and pointed at a new form without touching the code.
 *
 * NEXT_PUBLIC_REGISTRATION_ENABLED
 *   "true"  -> the "انضم إلينا" button is shown on the home page.
 *   anything else (the default) -> the button is hidden, /join redirects to
 *   the home page, and /api/applications answers 503 without opening a
 *   database connection. Nothing is deleted; it all comes back when this
 *   flips.
 *
 * NEXT_PUBLIC_REGISTER_URL
 *   A Google Form (or any external) URL to send applicants to. When set, the
 *   button opens it in a new tab and /join redirects there too, so old links
 *   still land on the form. When empty, the button uses the built-in /join
 *   page instead, which needs MONGODB_URI to accept submissions.
 */
export const REGISTRATION_ENABLED =
  process.env.NEXT_PUBLIC_REGISTRATION_ENABLED === "true";

export const REGISTER_URL = process.env.NEXT_PUBLIC_REGISTER_URL?.trim() || "";

/** True when applicants go to an external form rather than the built-in page. */
export const USES_EXTERNAL_REGISTER_FORM = REGISTER_URL.length > 0;

/** Where the register button points: the external form, else the built-in page. */
export const REGISTER_HREF = USES_EXTERNAL_REGISTER_FORM ? REGISTER_URL : "/join";
