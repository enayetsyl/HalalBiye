"use client";

import { useState, useEffect } from "react";
import { fetchMyProfile } from "@/lib/api";
import { TUser } from "@/types";
import { ApiError } from "@/types/api";

export function useProfile() {
  const [profile, setProfile] = useState<TUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
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
