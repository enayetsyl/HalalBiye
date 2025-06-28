/**
 * @fileoverview
 * A custom React hook for fetching and managing the authenticated user's profile.
 * Handles loading and error states internally.
 */

"use client";

import { useState, useEffect } from "react";
import { fetchMyProfile } from "@/lib/api";
import { TUser } from "@/types";
import { ApiError } from "@/types/api";

/**
 * Custom hook to retrieve the current user's profile.
 *
 * On mount, triggers a request to the API to fetch the user's data.
 * Exposes the profile object, a loading flag, and any error message.
 *
 * @returns {{
 *   profile: TUser | null,
 *   loading: boolean,
 *   error: string | null
 * }} An object containing:
 *   - profile: the fetched user data or `null` if not loaded or on error.
 *   - loading: `true` while the request is in progress.
 *   - error: an error message if the request fails, otherwise `null`.
 *
 * @example
 * const { profile, loading, error } = useProfile();
 * if (loading) return <Spinner />;
 * if (error) return <ErrorBanner message={error} />;
 * return <ProfileDetails user={profile} />;
 */
export function useProfile() {
  const [profile, setProfile] = useState<TUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Load the authenticated user's profile from the API.
     *
     * - Sets `loading` to true before starting.
     * - On success, updates `profile` state.
     * - On failure, captures the error message into `error` state.
     * - Finally, sets `loading` to false.
     *
     * @returns {Promise<void>}
     */
    async function load(): Promise<void> {
      setLoading(true);
      try {
        const data = await fetchMyProfile();
        setProfile(data);
      } catch (err: unknown) {
        const apiErr = err as ApiError;
        setError(apiErr.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { profile, loading, error };
}
