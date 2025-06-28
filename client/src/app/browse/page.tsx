"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { TUserProfile } from "@/types";
import { ApiError } from "@/types/api";
import { fetchUsers, sendConnectionRequest } from "@/lib/api";
import FilterBar from "@/components/browse/filter-bar";
import ProfileCard from "@/components/browse/profile-card";



export default function BrowsePage() {
  const [profiles, setProfiles] = useState<TUserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ gender: "", religion: "" });
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  // Fetch filtered users
  useEffect(() => {
    async function load() {
    setLoading(true);
    try {
      console.log("Fetching users with filters:", filters);
      const users = await fetchUsers(filters);
      console.log("→ fetchUsers returned:", users);
      setProfiles(users.map(u => ({ ...u})));
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      toast.error(apiErr.message);
      apiErr.errorSources?.forEach(src => toast.error(src.message));
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  }
  load();
}, [filters]);

  // Handle filter changes
  function handleFilterChange(name: string, value: string) {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  // Handle send request
  async function handleSendRequest(userId: string) {
    setLoadingUserId(userId);
    try {
    await sendConnectionRequest(userId);
    toast.success("Request sent!");
    setProfiles(prev =>
      prev.map(p =>
        p._id === userId ? { ...p, connectionStatus: "pending" } : p
      )
    );
  } catch (err: unknown) {
    const apiErr = err as ApiError;
    toast.error(apiErr.message);
    apiErr.errorSources?.forEach(src => toast.error(src.message));
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
          {/* Header + Filters */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-primary">
              Browse Profiles
            </h1>
            <p className="text-gray-500 font-sans text-base">
              Find profiles and connect!
            </p>
          </div>
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
          />
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
                <ProfileCard
                key={user._id}
                user={user}
                loadingUserId={loadingUserId}
                onSendRequest={handleSendRequest}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
