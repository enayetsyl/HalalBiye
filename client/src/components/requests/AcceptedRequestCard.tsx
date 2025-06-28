// components/requests/AcceptedRequestCard.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TUserRequest } from "@/types";
import { extractUser } from "@/utils/extractUser";
import UserInfo from "./UserInfo";



export default function AcceptedRequestCard({ request }: {request: TUserRequest}) {
  const userA = extractUser(request.fromUser);
  const userB = extractUser(request.toUser);
  const showUser = userA.name ? userA : userB;

  return (
    <Card className="rounded-2xl shadow border-0 bg-white/95">
      <CardContent className="flex flex-col sm:flex-row justify-between items-center p-4 gap-6">
        <UserInfo user={showUser} />
        <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
          Connected
        </span>
      </CardContent>
    </Card>
  );
}
