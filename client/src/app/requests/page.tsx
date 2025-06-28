"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import {
  fetchIncomingRequests,
  fetchOutgoingRequests,
  respondToRequest,
} from "@/lib/api";
import { TUserRequest } from "@/types";
import SentRequestCard from "@/components/requests/SentRequestCard";
import ReceivedRequestCard from "@/components/requests/ReceivedRequestCard";
import AcceptedRequestCard from "@/components/requests/AcceptedRequestCard";

/**
 * Requests page component.
 *
 * Fetches and displays the current user’s incoming, outgoing, and accepted connection requests.
 * Allows accepting or declining incoming requests.
 */
export default function Requests() {
  /** Incoming requests received by the current user */
  const [incoming, setIncoming] = useState<TUserRequest[]>([]);

  /** Outgoing requests sent by the current user */
  const [outgoing, setOutgoing] = useState<TUserRequest[]>([]);

  /** Global loading state for fetching all requests */
  const [loading, setLoading] = useState(true);

  /**
   * Tracks which request ID + action (e.g. "123accept", "456decline") is currently being processed,
   * to disable buttons and show loading indicators on individual cards.
   */
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // On mount, load both incoming and outgoing requests
  useEffect(() => {
    fetchAllRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Fetches both incoming and outgoing requests in parallel,
   * updates state, and handles any errors with a toast notification.
   */
  async function fetchAllRequests() {
    setLoading(true);
    try {
      const [inData, outData] = await Promise.all([
        fetchIncomingRequests(), // returns TUserRequest[]
        fetchOutgoingRequests(), // returns TUserRequest[]
      ]);
      setIncoming(inData);
      setOutgoing(outData);
    } catch (err: unknown) {
      const e = err as { message?: string };
      toast.error(e.message || "Failed to load requests.");
    } finally {
      setLoading(false);
    }
  }

  /**
   * Respond to an incoming request by accepting or declining it.
   *
   * @param requestId - The unique identifier of the request to respond to
   * @param action - Either "accept" or "decline"
   */
  async function handleRespond(
    requestId: string,
    action: "accept" | "decline"
  ) {
    setActionLoading(requestId + action);
    try {
      await respondToRequest(requestId, action);
      toast.success(
        action === "accept" ? "Request accepted!" : "Request declined!"
      );

      // Update only the affected request’s status in the incoming list
      setIncoming((prev) =>
        prev.map((r) =>
          r._id === requestId
            ? { ...r, status: action === "accept" ? "accepted" : "rejected" }
            : r
        )
      );
    } catch (err: unknown) {
      const e = err as { message?: string };
      toast.error(e.message || `Failed to ${action} request.`);
    } finally {
      setActionLoading(null);
    }
  }

  // Filter for outgoing requests that are still pending
  const sentPending = outgoing.filter((req) => req.status === "pending");

  // Filter for incoming requests that are still pending
  const receivedPending = incoming.filter((req) => req.status === "pending");

  // Combine accepted incoming and outgoing requests and remove duplicates by request ID
  const accepted = [
    ...incoming.filter((req) => req.status === "accepted"),
    ...outgoing.filter((req) => req.status === "accepted"),
  ].filter((req, idx, arr) => arr.findIndex((r) => r._id === req._id) === idx);

  return (
    <div className="relative min-h-screen">
      {/* Decorative background image */}
      <Image
        src="/profile.png"
        alt=""
        fill
        className="object-cover opacity-10 pointer-events-none select-none"
        priority
      />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="relative z-10">
          <h1 className="text-2xl font-serif font-bold text-primary mb-8">
            Your Requests
          </h1>

          {loading ? (
            // Global loading indicator
            <div className="text-center text-primary font-bold py-8">
              Loading...
            </div>
          ) : (
            <>
              {/* Sent Requests (Pending) */}
              <section className="mb-8">
                <h2 className="text-lg font-bold font-serif mb-2">
                  Sent Requests (Pending)
                </h2>
                {sentPending.length === 0 ? (
                  <div className="text-gray-400">No pending sent requests.</div>
                ) : (
                  <div className="space-y-4">
                    {sentPending.map((req) => (
                      <SentRequestCard key={req._id} request={req} />
                    ))}
                  </div>
                )}
              </section>

              {/* Received Requests (Pending) */}
              <section className="mb-8">
                <h2 className="text-lg font-bold font-serif mb-2">
                  Received Requests
                </h2>
                {receivedPending.length === 0 ? (
                  <div className="text-gray-400">
                    No pending received requests.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {receivedPending.map((req) => (
                      <ReceivedRequestCard
                        key={req._id}
                        request={req}
                        actionLoading={actionLoading}
                        onRespond={handleRespond}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* Accepted Connections */}
              <section className="mb-8">
                <h2 className="text-lg font-bold font-serif mb-2">
                  Accepted Connections
                </h2>
                {accepted.length === 0 ? (
                  <div className="text-gray-400">No accepted requests yet.</div>
                ) : (
                  <div className="space-y-4">
                    {accepted.map((req) => (
                      <AcceptedRequestCard key={req._id} request={req} />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
