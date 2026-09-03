/**
 * Registration is switched off for now. While this is false:
 *   - the "انضم إلينا" button is hidden from the home page navbar,
 *   - /join redirects to the home page, so the form cannot be reached,
 *   - /api/applications answers 503 without opening a database connection.
 *
 * Nothing is deleted — the page, the form and the endpoint are all still
 * here. Set NEXT_PUBLIC_REGISTRATION_ENABLED=true in the environment (or
 * change the fallback below) to bring registration back exactly as it was.
 */
export const REGISTRATION_ENABLED =
  process.env.NEXT_PUBLIC_REGISTRATION_ENABLED === "true";
