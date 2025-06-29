/**
 * Base URL used by lib/api.ts.
 *
 * • In local / preview you can point straight to the backend
 *   by setting  NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
 *   (or your Render URL).
 * • In production we leave it empty ("") so every request
 *   is made to the current origin (halal-biye.vercel.app).
 *   That lets the /api rewrite in next.config.ts kick in.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") || "";
