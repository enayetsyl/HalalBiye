// utils/extractUser.ts

/**
 * Utility to normalize different user representations into a consistent summary shape.
 *
 * @module utils/extractUser
 */

import { TUserSummary } from "@/types";

/**
 * Normalize a user reference into a `TUserSummary` object.
 *
 * This function handles three possible inputs:
 * 1. `undefined` or `null` — returns a summary with an empty `_id`.
 * 2. A plain `string` — treated as the user’s ID and returned as `{ _id: user }`.
 * 3. An existing `TUserSummary` — returned unchanged.
 *
 * @param user - The user identifier or summary. Can be:
 *   - `string` representing the user’s `_id`,
 *   - `TUserSummary` object,
 *   - or `undefined`.
 * @returns A `TUserSummary` object with at least the `_id` property.
 */
export function extractUser(
  user: string | TUserSummary | undefined
): TUserSummary {
  if (!user) {
    // If no user provided, return a placeholder summary
    return { _id: "" };
  }

  if (typeof user === "string") {
    // If user is a string ID, wrap it in a summary object
    return { _id: user };
  }

  // If already a TUserSummary, return as-is
  return user;
}
