/**
 * The base URL for all backend API requests.
 *
 * - If `NEXT_PUBLIC_BACKEND_URL` is set, use that value with any trailing slash removed.
 * - Otherwise, when running in the browser, fall back to `window.location.origin`.
 * - When neither is available (e.g. during server-side rendering without an env var), defaults to an empty string.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  (typeof window !== "undefined" ? window.location.origin : "");
