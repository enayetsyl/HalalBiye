// components/UserInfo.tsx
import React from "react";
import { TUserSummary } from "@/types";

interface UserInfoProps {
  user: TUserSummary;
}

export default function UserInfo({ user }: UserInfoProps) {
  // First, show the name specially:
  // Then build an array of the other fields:
  const fields: { label: string; value: string | number | undefined }[] = [
    { label: "Email",    value: user.email },
    { label: "Gender",   value: user.gender },
    { label: "Religion", value: user.religion },
    { label: "Age",      value: user.age },
    { label: "Location", value: user.location },
    // append “cm” if height exists
    { label: "Height",   value: user.height !== undefined ? `${user.height} cm` : undefined },
    { label: "Education",value: user.education },
    { label: "Occupation",value: user.occupation },
  ];

  return (
    <div className="flex flex-col gap-1 text-[15px] font-sans text-gray-800">
      {/* Name always first, bolded */}
      <div>
        <span className="font-semibold text-primary">{user.name || "—"}</span>
      </div>

      {/* Loop over every other field */}
      {fields.map(({ label, value }) => (
        <div key={label}>
          <span className="font-medium text-gray-500">{label}:</span>{" "}
          {value ?? "—"}
        </div>
      ))}
    </div>
  );
}
