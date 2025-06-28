"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

type UserSummary = {
  _id: string;
  name?: string;
  email?: string;
  gender?: string;
  religion?: string;
  age?: number;
  location?: string;
  height?: number;
  education?: string;
  occupation?: string;
};

type Request = {
  _id: string;
  fromUser: string | UserSummary;
  toUser: string | UserSummary;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
};

function extractUser(user: string | UserSummary | undefined): UserSummary {
  if (!user) return { _id: "" };
  if (typeof user === "string") return { _id: user };
  return user;
}

export default function Requests() {
  const [incoming, setIncoming] = useState<Request[]>([]);
  const [outgoing, setOutgoing] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchAllRequests();
    // eslint-disable-next-line
  }, []);

  async function fetchAllRequests() {
    setLoading(true);
    try {
      const [inRes, outRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/requests/incoming`, {
          credentials: "include",
        }),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/requests/outgoing`, {
          credentials: "include",
        }),
      ]);
      const inData = await inRes.json();
      const outData = await outRes.json();
      setIncoming(inData.data || []);
      setOutgoing(outData.data || []);
    } catch {
      toast.error("Failed to load requests.");
    } finally {
      setLoading(false);
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
  ].filter(
    (req, idx, arr) => arr.findIndex((r) => r._id === req._id) === idx
  );

  function UserInfo({ user }: { user: UserSummary }) {
    return (
      <div className="flex flex-col gap-1 text-[15px] font-sans text-gray-800">
        <div>
          <span className="font-semibold text-primary">{user.name || "—"}</span>
        </div>
        <div>
          <span className="font-medium text-gray-500">Email:</span> {user.email || "—"}
        </div>
        <div>
          <span className="font-medium text-gray-500">Gender:</span> {user.gender || "—"}
        </div>
        <div>
          <span className="font-medium text-gray-500">Religion:</span> {user.religion || "—"}
        </div>
        <div>
          <span className="font-medium text-gray-500">Age:</span> {user.age !== undefined ? user.age : "—"}
        </div>
        <div>
          <span className="font-medium text-gray-500">Location:</span> {user.location || "—"}
        </div>
        <div>
          <span className="font-medium text-gray-500">Height:</span> {user.height !== undefined ? user.height + " cm" : "—"}
        </div>
        <div>
          <span className="font-medium text-gray-500">Education:</span> {user.education || "—"}
        </div>
        <div>
          <span className="font-medium text-gray-500">Occupation:</span> {user.occupation || "—"}
        </div>
      </div>
    );
  }

  // Accept or Decline a received request
  async function handleRespond(requestId: string, action: "accept" | "decline") {
    setActionLoading(requestId + action);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/requests/${action}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: requestId }),
        }
      );
      if (!res.ok) {
        let data;
        try {
          data = await res.json();
        } catch {
          data = { message: await res.text() };
        }
        toast.error(data.message || `Failed to ${action} request.`);
      } else {
        toast.success(`Request ${action === "accept" ? "accepted" : "declined"}!`);
        // Update the request in state
        setIncoming((prev) =>
          prev.map((req) =>
            req._id === requestId ? { ...req, status: action === "accept" ? "accepted" : "rejected" } : req
          )
        );
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setActionLoading(null);
    }
  }

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
        <h1 className="text-2xl font-serif font-bold text-primary mb-8">Your Requests</h1>
        {loading ? (
          <div className="text-center text-primary font-bold py-8">Loading...</div>
        ) : (
          <>
            {/* Sent (pending) */}
            <section className="mb-8">
              <h2 className="text-lg font-bold font-serif mb-2">Sent Requests (Pending)</h2>
              {sentPending.length === 0 ? (
                <div className="text-gray-400">No pending sent requests.</div>
              ) : (
                <div className="space-y-4">
                  {sentPending.map((req) => (
                    <Card key={req._id} className="rounded-2xl shadow border-0 bg-white/95">
                      <CardContent className="flex flex-col sm:flex-row justify-between items-center p-4 gap-6">
                        <UserInfo user={extractUser(req.toUser)} />
                        <span className="px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full font-semibold">
                          Pending
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            {/* Received (pending) */}
            <section className="mb-8">
              <h2 className="text-lg font-bold font-serif mb-2">Received Requests</h2>
              {receivedPending.length === 0 ? (
                <div className="text-gray-400">No pending received requests.</div>
              ) : (
                <div className="space-y-4">
                  {receivedPending.map((req) => (
                    <Card key={req._id} className="rounded-2xl shadow border-0 bg-white/95">
                      <CardContent className="flex flex-col sm:flex-row justify-between items-center p-4 gap-6">
                        <UserInfo user={extractUser(req.fromUser)} />
                        <div className="flex flex-col gap-2 items-center">
                          <div className="flex gap-2">
                            <Button
                              variant="default"
                              className="bg-green-600 text-white font-semibold px-4"
                              disabled={actionLoading === req._id + "accept"}
                              onClick={() => handleRespond(req._id, "accept")}
                            >
                              {actionLoading === req._id + "accept" ? "Accepting..." : "Accept"}
                            </Button>
                            <Button
                              variant="secondary"
                              className="bg-red-100 text-red-600 border border-red-200 font-semibold px-4"
                              disabled={actionLoading === req._id + "decline"}
                              onClick={() => handleRespond(req._id, "decline")}
                            >
                              {actionLoading === req._id + "decline" ? "Rejecting..." : "Reject"}
                            </Button>
                          </div>
                          {req.status !== "pending" && (
                            <span
                              className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
                                req.status === "accepted"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {req.status === "accepted" ? "Accepted" : "Rejected"}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            {/* Accepted */}
            <section className="mb-8">
              <h2 className="text-lg font-bold font-serif mb-2">Accepted Connections</h2>
              {accepted.length === 0 ? (
                <div className="text-gray-400">No accepted requests yet.</div>
              ) : (
                <div className="space-y-4">
                  {accepted.map((req) => {
                    // Show the populated user object, fallback to string _id if needed
                    const userA = extractUser(req.fromUser);
                    const userB = extractUser(req.toUser);
                    // Just pick the one that has a name (so always shows the "other" user)
                    const showUser = userA.name ? userA : userB;
                    return (
                      <Card key={req._id} className="rounded-2xl shadow border-0 bg-white/95">
                        <CardContent className="flex flex-col sm:flex-row justify-between items-center p-4 gap-6">
                          <UserInfo user={showUser} />
                          <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                            Connected
                          </span>
                        </CardContent>
                      </Card>
                    );
                  })}
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
