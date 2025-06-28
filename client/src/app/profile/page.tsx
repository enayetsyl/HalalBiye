"use client";

import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";

import { useProfile } from "@/hooks/useProfile";
import { PageLoader } from "@/components/profile/PageLoader";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileField } from "@/components/profile/ProfileField";
import { useEffect } from "react";

export default function ProfilePage() {
  const { profile, loading, error } = useProfile();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (loading) return <PageLoader />;
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
      <div className="relative z-10 w-full max-w-2xl my-10 mx-5">
        <Card className="bg-white/95 rounded-2xl shadow-2xl border-0 p-8 backdrop-blur-sm">
          {profile && <ProfileHeader profile={profile} />}

          <CardContent className="p-0 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 font-sans text-base">
              {profile?.age && <ProfileField label="Age" value={profile.age} />}
              {profile?.gender && (
                <ProfileField label="Gender" value={profile.gender} />
              )}
              {profile?.religion && (
                <ProfileField label="Religion" value={profile.religion} />
              )}
              {profile?.location && (
                <ProfileField label="Location" value={profile.location} />
              )}
              {profile?.height && (
                <ProfileField label="Height" value={`${profile.height} cm`} />
              )}
              {profile?.education && (
                <ProfileField label="Education" value={profile.education} />
              )}
              {profile?.occupation && (
                <ProfileField label="Occupation" value={profile.occupation} />
              )}
            </div>

            {!(
              profile?.age ||
              profile?.gender ||
              profile?.religion ||
              profile?.location ||
              profile?.height ||
              profile?.education ||
              profile?.occupation
            ) && (
              <div className="text-center text-gray-400 font-sans mt-8">
                No additional information provided yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
