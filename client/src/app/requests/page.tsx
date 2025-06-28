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

export default function Requests() {
  const [incoming, setIncoming] = useState<TUserRequest[]>([]);
  const [outgoing, setOutgoing] = useState<TUserRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchAllRequests();
    // eslint-disable-next-line
  }, []);

  async function fetchAllRequests() {
    setLoading(true);
    try {
      const [inData, outData] = await Promise.all([
        fetchIncomingRequests(), // returns IRequest[]
        fetchOutgoingRequests(), // returns IRequest[]
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

  // Sent pending (requests you sent)
  const sentPending = outgoing.filter((req) => req.status === "pending");

  // Received pending (requests you received)
  const receivedPending = incoming.filter((req) => req.status === "pending");

  // Accepted connections (deduped, always show user summary if possible)
  const accepted = [
    ...incoming.filter((req) => req.status === "accepted"),
    ...outgoing.filter((req) => req.status === "accepted"),
  ].filter((req, idx, arr) => arr.findIndex((r) => r._id === req._id) === idx);

  return (
    <div className="relative min-h-screen ">
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
            <div className="text-center text-primary font-bold py-8">
              Loading...
            </div>
          ) : (
            <>
              {/* Sent (pending) */}
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

              {/* Received (pending) */}
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

              {/* Accepted */}
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
