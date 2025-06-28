"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchMyProfile, updateMyProfile } from "@/lib/api";
import { TUpdatableProfileFields } from "@/types";
import { ApiError } from "@/types/api";

/**
 * Custom hook for editing the current user's profile.
 *
 * - Loads the existing profile on mount.
 * - Manages form state, loading & saving indicators.
 * - Provides handlers for input/select changes and form submission.
 *
 * @returns {{
 *   form: TUpdatableProfileFields;
 *   loading: boolean;
 *   saving: boolean;
 *   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 *   handleSelectChange: (name: keyof TUpdatableProfileFields, value: string) => void;
 *   handleSubmit: (e: React.FormEvent) => Promise<void>;
 * }}
 */
export function useProfileEdit() {
  const router = useRouter();

  // Form state for updatable profile fields
  const [form, setForm] = useState<TUpdatableProfileFields>({
    name: "",
    age: undefined,
    gender: "",
    religion: "",
    location: "",
    height: undefined,
    education: "",
    occupation: "",
  });

  // Indicates whether the initial profile fetch is in progress
  const [loading, setLoading] = useState(true);

  // Indicates whether the update request is in progress
  const [saving, setSaving] = useState(false);

  // Load existing profile data on component mount
  useEffect(() => {
    async function load() {
      try {
        const user = await fetchMyProfile();
        setForm({
          name:       user.name ?? "",
          age:        user.age,
          gender:     user.gender ?? "",
          religion:   user.religion ?? "",
          location:   user.location ?? "",
          height:     user.height,
          education:  user.education ?? "",
          occupation: user.occupation ?? "",
        });
      } catch (err: unknown) {
        const apiErr = err as ApiError;
        toast.error(apiErr.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /**
   * Handle changes for text and number inputs.
   * Converts age/height to number when appropriate.
   *
   * @param e - Change event from an input element
   */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        (name === "age" || name === "height") && value !== ""
          ? Number(value)
          : value,
    }));
  }

  /**
   * Handle changes for custom select components.
   *
   * @param name - The key of the profile field being updated
   * @param value - The new value from the select
   */
  function handleSelectChange(name: keyof TUpdatableProfileFields, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  /**
   * Submit the updated profile to the server.
   * Shows toast notifications on success/failure and redirects on success.
   *
   * @param e - Form submission event
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      await updateMyProfile(form);
      toast.success("Profile updated!");
      router.push("/profile");
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      toast.error(apiErr.message || "Update failed.");
      apiErr.errorSources?.forEach((src) =>
        toast.error(src.path ? `${src.path}: ${src.message}` : src.message)
      );
    } finally {
      setSaving(false);
    }
  }

  return {
    form,
    loading,
    saving,
    handleChange,
    handleSelectChange,
    handleSubmit,
  };
}
