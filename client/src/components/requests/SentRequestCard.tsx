// components/requests/SentRequestCard.tsx

import React, { JSX } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TUserRequest } from "@/types";
import { extractUser } from "@/utils/extractUser";
import UserInfo from "./UserInfo";

/**
 * SentRequestCard
 *
 * Displays a single “sent” connection request in a card format,
 * showing the recipient’s user info and a “Pending” status badge.
 *
 * @param {Object} props
 * @param {TUserRequest} props.request - The request object containing
 *   metadata about the connection request (toUser, fromUser, status, etc.).
 *
 * @returns {JSX.Element} A styled card component representing a sent request.
 */
export default function SentRequestCard({
  request,
}: {
  request: TUserRequest;
}): JSX.Element {
  // Extract a normalized user object from the toUser field,
  // which may be either a string ID or a full user summary.
  const user = extractUser(request.toUser);

  return (
    <Card className="rounded-2xl shadow border-0 bg-white/95">
      <CardContent className="flex flex-col sm:flex-row justify-between items-center p-4 gap-6">
        {/* UserInfo renders user details: name, email, etc. */}
        <UserInfo user={user} />

        {/* Status badge for sent requests */}
        <span className="px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full font-semibold">
          Pending
        </span>
      </CardContent>
    </Card>
  );
}
