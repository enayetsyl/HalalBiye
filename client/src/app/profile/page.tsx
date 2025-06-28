"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, Pencil } from "lucide-react";
import {  fetchMyProfile } from "@/lib/api";
import { TUser } from "@/types";
import { ApiError } from "@/types/api";


export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
    setLoading(true);

    // 1) call the centralized API function
    const user: TUser = await fetchMyProfile();

    // 2) update state
    setProfile(user);

  } catch (err: unknown) {
    // 3) handle errors via our ApiError interface
    const apiErr = err as ApiError;
    toast.error(apiErr.message);
    apiErr.errorSources?.forEach(src => toast.error(src.message));

  } finally {
    // 4) always turn loading off
    setLoading(false);
  }
}
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-secondary/30 via-neutral/60 to-accent/60 relative">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

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
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="HalalBiye Logo"
                width={44}
                height={44}
                className="rounded-2xl"
              />
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-1">
                  {profile?.name}
                </h2>
                <div className="font-sans text-gray-600 text-sm">{profile?.email}</div>
              </div>
            </div>
            {profile?._id && (
              <Button
                variant="outline"
                className="flex items-center gap-2 hover:bg-primary hover:text-white"
                onClick={() => router.push(`/profile/${profile._id}/edit`)}
              >
                <Pencil className="w-4 h-4" /> Edit
              </Button>
            )}
          </div>
          <CardContent className="p-0 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 font-sans text-base">
              {profile?.age && (
                <ProfileField label="Age" value={profile.age} />
              )}
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
            {/* Empty state if all are missing */}
            {!profile?.age && !profile?.gender && !profile?.religion &&
              !profile?.location && !profile?.height && !profile?.education && !profile?.occupation && (
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

function ProfileField({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-gray-800 text-base font-medium">{value}</span>
    </div>
  );
}
