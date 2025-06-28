"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { TUser } from "@/types";

interface ProfileHeaderProps {
  profile: TUser;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const router = useRouter();

  return (
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
            {profile.name}
          </h2>
          <div className="font-sans text-gray-600 text-sm">
            {profile.email}
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="flex items-center gap-2 hover:bg-primary hover:text-white"
        onClick={() => router.push(`/profile/${profile._id}/edit`)}
      >
        <Pencil className="w-4 h-4" /> Edit
      </Button>
    </div>
  );
}
