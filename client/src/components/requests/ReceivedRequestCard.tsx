// components/requests/ReceivedRequestCard.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReceivedRequestCardProps } from "@/types";
import { extractUser } from "@/utils/extractUser";
import UserInfo from "./UserInfo";

/**
 * ReceivedRequestCard
 *
 * Renders a card displaying an incoming connection request, including the sender's
 * information and action buttons to accept or decline the request.
 *
 * @param {ReceivedRequestCardProps} props
 * @param {import("@/types").Request} props.request - The request object containing details about the incoming request.
 * @param {string|null} props.actionLoading - ID of the request currently performing an action ("accept" or "decline"), concatenated with the action.
 * @param {(id: string, action: "accept" | "decline") => void} props.onRespond - Callback invoked when the user accepts or declines the request.
 * @returns {JSX.Element}
 */
export default function ReceivedRequestCard({
  request,
  actionLoading,
  onRespond,
}: ReceivedRequestCardProps) {
  // Extract the sender's user summary from the request
  const user = extractUser(request.fromUser);

  // Determine loading states for accept and decline actions
  const isAccepting = actionLoading === request._id + "accept";
  const isDeclining = actionLoading === request._id + "decline";

  return (
    <Card className="rounded-2xl shadow border-0 bg-white/95">
      <CardContent className="flex flex-col sm:flex-row justify-between items-center p-4 gap-6">
        {/** Display user information for the sender */}
        <UserInfo user={user} />

        {/** Action buttons and status badge */}
        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-2">
            {/* Accept button */}
            <Button
              variant="default"
              className="bg-green-600 text-white font-semibold px-4"
              disabled={isAccepting}
              onClick={() => onRespond(request._id, "accept")}
            >
              {isAccepting ? "Accepting..." : "Accept"}
            </Button>

            {/* Decline button */}
            <Button
              variant="secondary"
              className="bg-red-100 text-red-600 border border-red-200 font-semibold px-4"
              disabled={isDeclining}
              onClick={() => onRespond(request._id, "decline")}
            >
              {isDeclining ? "Rejecting..." : "Reject"}
            </Button>
          </div>

          {/* Status badge: shown once the request is no longer pending */}
          {request.status !== "pending" && (
            <span
              className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
                request.status === "accepted"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {request.status === "accepted" ? "Accepted" : "Rejected"}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
