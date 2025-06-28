"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { TUser } from "@/types";

/**
 * Props for the ProfileHeader component.
 *
 * @property {TUser} profile - The user object containing display information.
 */
interface ProfileHeaderProps {
  profile: TUser;
}

/**
 * Renders the header section for a user’s profile page, displaying their
 * avatar/logo, name, email, and an Edit button.
 *
 * @param {ProfileHeaderProps} props
 * @param {TUser} props.profile - The currently viewed user’s profile data.
 * @returns {JSX.Element} A flex container with the user’s name, email, and edit action.
 */
export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const router = useRouter();

  /**
   * Navigate to the edit page for the current profile.
   */
  const handleEditClick = () => {
    router.push(`/profile/${profile._id}/edit`);
  };

  return (
    <div className="flex items-center justify-between mb-2">
      {/* Logo or user avatar */}
      <div className="flex items-center gap-4">
        <Image
          src="/logo.png"
          alt="HalalBiye Logo"
          width={44}
          height={44}
          className="rounded-2xl"
        />
        <div>
          {/* User’s full name */}
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-1">
            {profile.name}
          </h2>
          {/* User’s email address */}
          <div className="font-sans text-gray-600 text-sm">
            {profile.email}
          </div>
        </div>
      </div>

      {/* Edit profile button */}
      <Button
        variant="outline"
        className="flex items-center gap-2 hover:bg-primary hover:text-white"
        onClick={handleEditClick}
      >
        <Pencil className="w-4 h-4" /> Edit
      </Button>
    </div>
  );
}
