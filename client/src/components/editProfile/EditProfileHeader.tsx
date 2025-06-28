import Image from "next/image";

/**
 * EditProfileHeader
 *
 * Renders the header section for the "Edit Profile" page, including:
 * - The HalalBiye logo
 * - The page title ("Edit Profile")
 * - A subtitle prompting the user to keep their information up to date
 *
 * This component is purely presentational and does not accept any props.
 */
export function EditProfileHeader() {
  return (
    <div className="flex flex-col items-center mb-4">
      <Image
        src="/logo.png"
        alt="HalalBiye logo"
        width={50}
        height={50}
        className="rounded-2xl mb-2"
        priority
      />
      {/* Page title */}
      <h1 className="text-2xl font-serif font-bold text-primary mb-1">
        Edit Profile
      </h1>
      {/* Subtitle / description */}
      <p className="text-base text-gray-500 mb-2 font-sans">
        Keep your info updated!
      </p>
    </div>
  );
}
