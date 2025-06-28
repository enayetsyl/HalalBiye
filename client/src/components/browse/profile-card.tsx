// components/browse/profile-card.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfileCardProps } from "@/types";



export default function ProfileCard({
  user,
  loadingUserId,
  onSendRequest,
}: ProfileCardProps) {

   const infoFields = [
    { label: "Email", value: user.email },
    { label: "Gender", value: user.gender },
    { label: "Religion", value: user.religion },
  ];

  return (
    <Card className="rounded-2xl shadow border-0 bg-white/95 transition hover:scale-[1.02]">
      <CardContent className="p-6 flex flex-col gap-2">
        <h2 className="font-serif text-xl font-bold text-primary">{user.name}</h2>
        <div className="font-sans text-gray-700 text-sm space-y-1">
           {infoFields.map((field) => (
            <div key={field.label}>
              <span className="font-medium text-gray-500">
                {field.label}:
              </span>{" "}
              {field.value ?? "—"}
            </div>
          ))}
        </div>

        {/* Button / Status */}
        {user.connectionStatus === "accepted" ? (
          <span className="mt-3 inline-block px-4 py-1 bg-green-100 text-green-700 rounded-2xl font-semibold text-sm">
            Connected
          </span>
        ) : user.connectionStatus === "pending" ? (
          <Button className="mt-3 w-full bg-primary text-white font-semibold" disabled>
            Request Pending
          </Button>
        ) : (
          <Button
            className="mt-3 w-full bg-primary text-white font-semibold"
            disabled={loadingUserId === user._id}
            onClick={() => onSendRequest(user._id)}
          >
            {loadingUserId === user._id ? "Sending..." : "Send Request"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
