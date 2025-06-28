"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchMyProfile, updateMyProfile } from "@/lib/api";
import { TUpdatableProfileFields } from "@/types";
import { ApiError } from "@/types/api";

export function useProfileEdit() {
  const router = useRouter();

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // load existing data
  useEffect(() => {
    async function load() {
      try {
        const user = await fetchMyProfile();
        setForm({
          name: user.name ?? "",
          age: user.age,
          gender: user.gender ?? "",
          religion: user.religion ?? "",
          location: user.location ?? "",
          height: user.height,
          education: user.education ?? "",
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

  function handleSelectChange(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

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
