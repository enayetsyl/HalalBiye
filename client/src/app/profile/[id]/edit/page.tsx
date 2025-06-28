"use client";

import Image from "next/image";
import { LoadingScreen } from "@/components/editProfile/LoadingScreent";
import { useProfileEdit } from "@/hooks/useProfileEdit";
import { EditProfileHeader } from "@/components/editProfile/EditProfileHeader";
import { EditProfileForm } from "@/components/editProfile/EditProfileForm";



export default function EditProfilePage() {
   const {
    form,
    loading,
    saving,
    handleChange,
    handleSelectChange,
    handleSubmit,
  } = useProfileEdit();

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-secondary/30 via-neutral/60 to-accent/60 relative overflow-hidden">
      <Image
        src="/profile.png"
        alt=""
        fill
        className="object-cover opacity-30 pointer-events-none select-none"
        priority
      />
    <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="bg-white/95 rounded-2xl shadow-2xl border-0 p-8 backdrop-blur-sm">
          <EditProfileHeader />
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
