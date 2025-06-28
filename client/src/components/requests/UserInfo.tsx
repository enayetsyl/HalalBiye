// components/UserInfo.tsx
import React from "react";
import { TUserSummary } from "@/types";

 /**
  * Props for the UserInfo component.
  *
  * @property user - A summary of user data to display (name, email, demographics, etc.).
  */
interface UserInfoProps {
  user: TUserSummary;
}

/**
 * Renders a user’s profile summary in a vertical list.
 *
 * Displays the user’s name prominently at the top, followed by
 * labeled fields for email, gender, religion, age, location, height,
 * education, and occupation. Fields with missing or undefined values
 * show a dash ("—").
 *
 * Uses font and color classes from the design system to ensure
 * visual consistency.
 *
 * @param {UserInfoProps} props
 * @param {TUserSummary} props.user - The user summary object to display.
 * @returns {JSX.Element} A styled block of user information.
 */
export default function UserInfo({ user }: UserInfoProps) {
  // Build an array of the secondary fields (label + value), formatting height if present
  const fields: { label: string; value: string | number | undefined }[] = [
    { label: "Email",      value: user.email },
    { label: "Gender",     value: user.gender },
    { label: "Religion",   value: user.religion },
    { label: "Age",        value: user.age },
    { label: "Location",   value: user.location },
    { 
      label: "Height",     
      value: user.height !== undefined 
        ? `${user.height} cm` 
        : undefined 
    },
    { label: "Education",  value: user.education },
    { label: "Occupation", value: user.occupation },
  ];

  return (
    <div className="flex flex-col gap-1 text-[15px] font-sans text-gray-800">
      {/* Name always first, bolded and highlighted */}
      <div>
        <span className="font-semibold text-primary">
          {user.name || "—"}
        </span>
      </div>

      {/* Render each additional field; show "—" if value is missing */}
      {fields.map(({ label, value }) => (
        <div key={label}>
          <span className="font-medium text-gray-500">
            {label}:
          </span>{" "}
          {value ?? "—"}
        </div>
      ))}
    </div>
  );
}
