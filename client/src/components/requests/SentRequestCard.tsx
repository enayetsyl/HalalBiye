// components/requests/SentRequestCard.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TUserRequest } from "@/types";
import { extractUser } from "@/utils/extractUser";
import UserInfo from "./UserInfo";


export default function SentRequestCard({ request }: {request: TUserRequest}) {
  const user = extractUser(request.toUser);

  return (
    <Card className="rounded-2xl shadow border-0 bg-white/95">
      <CardContent className="flex flex-col sm:flex-row justify-between items-center p-4 gap-6">
        <UserInfo user={user} />
        <span className="px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full font-semibold">
          Pending
        </span>
      </CardContent>
    </Card>
  );
}
