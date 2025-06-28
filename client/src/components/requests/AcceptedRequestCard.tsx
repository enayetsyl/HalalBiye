// components/requests/AcceptedRequestCard.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TUserRequest } from "@/types";
import { extractUser } from "@/utils/extractUser";
import UserInfo from "./UserInfo";

/**
 * Props for AcceptedRequestCard.
 *
 * @interface AcceptedRequestCardProps
 * @property {TUserRequest} request - The connection request object containing fromUser and toUser.
 */

/**
 * AcceptedRequestCard
 *
 * Renders a card representing an accepted connection request. It determines which user
 * in the request is the “other” person (i.e. not the current user) and displays their
 * information along with a “Connected” badge.
 *
 * @param {AcceptedRequestCardProps} props
 * @returns {JSX.Element}
 */
export default function AcceptedRequestCard({
  request,
}: {
  request: TUserRequest;
}) {
  // Normalize the `fromUser` and `toUser` fields into user summary objects
  const userA = extractUser(request.fromUser);
  const userB = extractUser(request.toUser);

  // Show the user summary that has a name (i.e. the “other” user)
  const showUser = userA.name ? userA : userB;

  return (
    <Card className="rounded-2xl shadow border-0 bg-white/95">
      <CardContent className="flex flex-col sm:flex-row justify-between items-center p-4 gap-6">
        {/* Display the selected user’s details */}
        <UserInfo user={showUser} />
        {/* Badge indicating accepted/connected status */}
        <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
          Connected
        </span>
      </CardContent>
    </Card>
  );
}
