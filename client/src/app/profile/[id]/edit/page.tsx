"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";
import {  fetchMyProfile, updateMyProfile } from "@/lib/api";
import { TUpdatableProfileFields } from "@/types";
import { ApiError } from "@/types/api";



export default function EditProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState<TUpdatableProfileFields>({
    name: "",
    age: undefined,
    gender: "",
    religion: "",
    location: "",
    height: undefined,
    education: "",
    occupation: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch current profile info to pre-fill the form
  useEffect(() => {
    async function load() {
      try {
        const user = await fetchMyProfile();
        // fill form with returned IUser
        setForm({
          name: user.name ?? "",
          age: user.age,
          gender: user.gender ?? "",
          religion: user.religion ?? "",
          location: user.location ?? "",
          height: user.height,
          education: user.education ?? "",
          occupation: user.occupation ?? "",
        });
      } catch (err: unknown) {
        const apiErr = err as ApiError;
        toast.error(apiErr.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: (name === "age" || name === "height") && value !== "" ? Number(value) : value,
    }));
  }

  function handleSelectChange(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      await updateMyProfile(form);
      toast.success("Profile updated!");
      router.push("/profile");
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      toast.error(apiErr.message || "Update failed.");
      apiErr.errorSources?.forEach(src =>
        toast.error(src.path ? `${src.path}: ${src.message}` : src.message)
      );
    } finally {
      setSaving(false);
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-secondary/30 via-neutral/60 to-accent/60 relative">
        <span className="text-primary font-bold text-xl animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-secondary/30 via-neutral/60 to-accent/60 relative overflow-hidden">
      <Image
        src="/profile.png"
        alt=""
        fill
        className="object-cover opacity-30 pointer-events-none select-none"
        priority
      />
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="bg-white/95 rounded-2xl shadow-2xl border-0 p-8 backdrop-blur-sm">
          <div className="flex flex-col items-center mb-4">
            <Image
              src="/logo.png"
              alt="HalalBiye logo"
              width={50}
              height={50}
              className="rounded-2xl mb-2"
              priority
            />
            <h1 className="text-2xl font-serif font-bold text-primary mb-1">Edit Profile</h1>
            <p className="text-base text-gray-500 mb-2 font-sans">Keep your info updated!</p>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="col-span-1">
              <Label htmlFor="name" className="mb-2 block font-medium">Name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="font-sans"
              />
            </div>
            {/* Age */}
            <div className="col-span-1">
              <Label htmlFor="age" className="mb-2 block font-medium">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min={18}
                value={form.age ?? ""}
                onChange={handleChange}
                className="font-sans"
              />
            </div>
            {/* Gender */}
            <div className="col-span-1">
              <Label htmlFor="gender" className="mb-2 block font-medium">Gender</Label>
              <Select
                value={form.gender ?? ""}
                onValueChange={(value) => handleSelectChange("gender", value)}
              >
                <SelectTrigger className="w-full border-primary focus-visible:border-primary focus-visible:ring-primary/50" >
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent className="border-primary bg-primary">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Religion */}
            <div className="col-span-1">
              <Label htmlFor="religion" className="mb-2 block font-medium">Religion</Label>
              <Input
                id="religion"
                name="religion"
                value={form.religion}
                onChange={handleChange}
                className="font-sans"
              />
            </div>
            {/* Location */}
            <div className="col-span-1">
              <Label htmlFor="location" className="mb-2 block font-medium">Location</Label>
              <Input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="font-sans"
              />
            </div>
            {/* Height */}
            <div className="col-span-1">
              <Label htmlFor="height" className="mb-2 block font-medium">Height (cm)</Label>
              <Input
                id="height"
                name="height"
                type="number"
                min={100}
                max={250}
                value={form.height ?? ""}
                onChange={handleChange}
                className="font-sans"
              />
            </div>
            {/* Education */}
            <div className="col-span-1">
              <Label htmlFor="education" className="mb-2 block font-medium">Education</Label>
              <Input
                id="education"
                name="education"
                value={form.education}
                onChange={handleChange}
                className="font-sans"
              />
            </div>
            {/* Occupation */}
            <div className="col-span-1">
              <Label htmlFor="occupation" className="mb-2 block font-medium">Occupation</Label>
              <Input
                id="occupation"
                name="occupation"
                value={form.occupation}
                onChange={handleChange}
                className="font-sans"
              />
            </div>
            {/* Button: spans both columns on desktop */}
            <div className="col-span-1 md:col-span-2">
              <Button
                type="submit"
                className="w-full bg-primary text-white font-semibold mt-2"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
