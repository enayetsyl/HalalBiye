"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";

type UserProfile = {
  _id: string;
  name: string;
  email: string;
  gender?: string;
  religion?: string;
  connectionStatus?: "none" | "pending" | "accepted" | "rejected";
};

export default function BrowsePage() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ gender: "", religion: "" });
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  // Fetch filtered users
  useEffect(() => {
    async function fetchProfiles() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.gender) params.append("gender", filters.gender);
        if (filters.religion) params.append("religion", filters.religion);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users?${params.toString()}`,
          { credentials: "include", cache: "no-store" }
        );
        if (!res.ok) {
          let data;
          try {
            data = await res.json();
          } catch {
            data = { message: await res.text() };
          }
          toast.error(data.message || "Failed to load profiles.");
          setProfiles([]);
        } else {
          const data = await res.json();
          setProfiles(data.data || data);
        }
      } catch {
        toast.error("An unexpected error occurred.");
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProfiles();
  }, [filters]);

  // Handle filter changes
  function handleFilterChange(name: string, value: string) {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  // Handle send request
  async function handleSendRequest(userId: string) {
    setLoadingUserId(userId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/requests`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ toUser: userId }),
        }
      );
      if (!res.ok) {
        let data;
        try {
          data = await res.json();
        } catch {
          data = { message: await res.text() };
        }
        toast.error(data.message || "Failed to send request.");
      } else {
        toast.success("Request sent!");
        setProfiles((prev) =>
          prev.map((profile) =>
            profile._id === userId
              ? { ...profile, connectionStatus: "pending" }
              : profile
          )
        );
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoadingUserId(null);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-secondary/30 via-neutral/60 to-accent/60 relative py-12">
      <Image
        src="/browse.png"
        alt=""
        fill
        className="object-cover opacity-20 pointer-events-none select-none"
        priority
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-primary">Browse Profiles</h1>
            <p className="text-gray-500 font-sans text-base">Find profiles and connect!</p>
          </div>
          {/* Filters */}
          <div className="flex gap-4">
            <div>
              <Label htmlFor="filter-gender" className="block mb-1 text-sm font-medium">Gender</Label>
              <Select
                value={filters.gender || "all"}
                onValueChange={(v) => handleFilterChange("gender", v === "all" ? "" : v)}
              >
                <SelectTrigger id="filter-gender" className="w-32  border-primary focus-visible:border-primary focus-visible:ring-primary/50">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="border-primary bg-primary">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filter-religion" className="block mb-1 text-sm font-medium">Religion</Label>
              <Select
                value={filters.religion || "all"}
                onValueChange={(v) => handleFilterChange("religion", v === "all" ? "" : v)}
              >
                <SelectTrigger id="filter-religion" className="w-32  border-primary focus-visible:border-primary focus-visible:ring-primary/50">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="border-primary bg-primary">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Islam">Islam</SelectItem>
                  <SelectItem value="Christianity">Christianity</SelectItem>
                  <SelectItem value="Hinduism">Hinduism</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {/* Profiles grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <span className="text-primary animate-pulse font-bold text-lg">Loading...</span>
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center text-gray-400 font-sans py-16">
            No profiles found for the selected filters.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-5">
            {profiles.map((user) => (
              <Card key={user._id} className="rounded-2xl shadow border-0 bg-white/95 transition hover:scale-[1.02]">
                <CardContent className="p-6 flex flex-col gap-2">
                  <div className="mb-2">
                    <span className="font-serif text-xl font-bold text-primary">{user.name}</span>
                  </div>
                  <div className="font-sans text-gray-700 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Email:</span> {user.email}
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Gender:</span> {user.gender || "—"}
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Religion:</span> {user.religion || "—"}
                    </div>
                  </div>
                  {/* Button/badge logic */}
                  {user.connectionStatus === "accepted" ? (
                    <div className="mt-3">
                      <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-2xl font-semibold text-sm">
                        Connected
                      </span>
                    </div>
                  ) : user.connectionStatus === "pending" ? (
                    <Button
                      className="mt-3 w-full bg-primary text-white font-semibold"
                      disabled
                    >
                      Request Pending
                    </Button>
                  ) : (
                    <Button
                      className="mt-3 w-full bg-primary text-white font-semibold"
                      disabled={loadingUserId === user._id}
                      onClick={() => handleSendRequest(user._id)}
                    >
                      {loadingUserId === user._id ? "Sending..." : "Send Request"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
