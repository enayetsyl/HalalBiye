"use client";

import Image from "next/image";

import { useProfileEdit } from "@/hooks/useProfileEdit";
import { EditProfileHeader } from "@/components/editProfile/EditProfileHeader";
import { EditProfileForm } from "@/components/editProfile/EditProfileForm";
import { LoadingScreen } from "@/components/editProfile/LoadingScreent";
import { useRequireAuth } from "@/hooks/useRequireAuth";

/**
 * @file EditProfilePage.tsx
 * @description
 * Client-side page component for editing a user’s profile.  
 * It leverages the `useProfileEdit` hook to manage form state, loading and saving statuses,
 * and event handlers. While data is loading, it shows a full-screen loader; once ready,
 * it renders the header and form within a styled container.
 */

/**
 * EditProfilePage
 *
 * Renders the profile editing interface. Displays a loading screen while
 * profile data is being fetched, then shows the header and form components.
 *
 * @component
 * @returns {JSX.Element} The Edit Profile page layout, including image background,
 *                        header, and form for updating profile fields.
 */
export default function EditProfilePage() {
  useRequireAuth();
  // Destructure state and handlers from our custom profile-edit hook
  const {
    form,
    loading,
    saving,
    handleChange,
    handleSelectChange,
    handleSubmit,
  } = useProfileEdit();

  // If the profile data is still loading, show a full-screen loader
  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-secondary/30 via-neutral/60 to-accent/60 relative overflow-hidden">
      {/* Subtle background image */}
      <Image
        src="/profile.png"
        alt=""
        fill
        className="object-cover opacity-30 pointer-events-none select-none"
        priority
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="bg-white/95 rounded-2xl shadow-2xl border-0 p-8 backdrop-blur-sm">
          {/* Page header with title and description */}
          <EditProfileHeader />

          {/*
            Profile edit form:
            - form: current form state
            - saving: boolean flag for submit in progress
            - onChange: text input change handler
            - onSelect: select input change handler
            - onSubmit: form submit handler
          */}
          <EditProfileForm
            form={form}
            saving={saving}
            onChange={handleChange}
            onSelect={handleSelectChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
