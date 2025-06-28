"use client";

import { JSX, useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { TUserProfile } from "@/types";
import { ApiError } from "@/types/api";
import { fetchUsers, sendConnectionRequest } from "@/lib/api";
import FilterBar from "@/components/browse/filter-bar";
import ProfileCard from "@/components/browse/profile-card";

/**
 * BrowsePage component renders a list of user profiles with filtering options
 * and the ability to send connection requests.
 *
 * @component
 * @returns {JSX.Element} The rendered browse page.
 */
export default function BrowsePage(): JSX.Element {
  // List of user profiles fetched from the server
  const [profiles, setProfiles] = useState<TUserProfile[]>([]);
  // Whether the page is currently loading profile data
  const [loading, setLoading] = useState<boolean>(true);
  // Current filter criteria for gender and religion
  const [filters, setFilters] = useState<{ gender: string; religion: string }>({
    gender: "",
    religion: "",
  });
  // ID of the user for whom a connection request is being sent
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  /**
   * Fetches profiles matching the current filters whenever filters change.
   * Uses the fetchUsers API helper and handles API errors via toast notifications.
   */
  useEffect(() => {
    async function load(): Promise<void> {
      setLoading(true);
      try {
        console.log("Fetching users with filters:", filters);
        const users = await fetchUsers(filters);
        console.log("→ fetchUsers returned:", users);
        setProfiles(users.map((u) => ({ ...u })));
      } catch (err: unknown) {
        const apiErr = err as ApiError;
        toast.error(apiErr.message);
        apiErr.errorSources?.forEach((src) => toast.error(src.message));
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [filters]);

  /**
   * Updates a single filter value.
   *
   * @param name - The name of the filter to update ('gender' or 'religion').
   * @param value - The new value for the filter.
   */
  function handleFilterChange(name: string, value: string): void {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  /**
   * Sends a connection request to the specified user and updates UI state.
   *
   * @param userId - The ID of the user to send a connection request to.
   */
  async function handleSendRequest(userId: string): Promise<void> {
    setLoadingUserId(userId);
    try {
      await sendConnectionRequest(userId);
      toast.success("Request sent!");
      setProfiles((prev) =>
        prev.map((p) =>
          p._id === userId ? { ...p, connectionStatus: "pending" } : p
        )
      );
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      toast.error(apiErr.message);
      apiErr.errorSources?.forEach((src) => toast.error(src.message));
    } finally {
      setLoadingUserId(null);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-secondary/30 via-neutral/60 to-accent/60 relative py-12">
      {/* Subtle background image */}
      <Image
        src="/browse.png"
        alt="Background illustration"
        fill
        className="object-cover opacity-20 pointer-events-none select-none"
        priority
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header and filter bar */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-primary">
              Browse Profiles
            </h1>
            <p className="text-gray-500 font-sans text-base">
              Find profiles and connect!
            </p>
          </div>

          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Profiles grid or loading/empty states */}
        {loading ? (
          <div className="flex justify-center py-12">
            <span className="text-primary animate-pulse font-bold text-lg">
              Loading...
            </span>
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
