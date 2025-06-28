"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiError, registerUser } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    gender: "",
    religion: "",
    location: "",
    height: "",
    education: "",
    occupation: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.email || !form.password || !form.name) {
      toast.error("Email, Password, and Name are required.");
      return;
    }

    setLoading(true);
    try {
    await registerUser({
      email:    form.email,
      password: form.password,
      name:     form.name,
      age:      form.age ? Number(form.age) : undefined,
      height:   form.height ? Number(form.height) : undefined,
      gender:   form.gender,
      religion: form.religion,
      location: form.location,
      education: form.education,
      occupation: form.occupation,
    });

    toast.success("Registration successful! Please log in.");
    router.push("/login");
  } catch (err: unknown) {
    // err is your ApiError from lib/api
    const apiErr = err as ApiError;
    toast.error(apiErr.message);

    // show any field-level errors
    apiErr.errorSources?.forEach((src) =>
      toast.error(src.path ? `${src.path}: ${src.message}` : src.message)
    );
  } finally {
    setLoading(false);
  }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-secondary/30 via-neutral/60 to-accent/60 relative overflow-hidden">
      {/* Subtle background image, can use unsplash, svg, or your own illustration */}
       <Image
    src="/register.png"
    alt=""
    fill
    className="object-cover opacity-30 pointer-events-none select-none"
    priority
  />
  <div className="">
      <div  className="relative z-10 w-full mx-auto min-w-[90vw] lg:min-w-3xl bg-white/95 rounded-2xl shadow-lg p-8 backdrop-blur-sm my-12 md:my-20">
        <div className="flex flex-col items-center mb-4">
          <Image
            src="/logo.png"
            alt="HalalBiye logo"
            width={60}
            height={60}
            className="rounded-2xl mb-2"
            priority
          />
          <h1 className="text-2xl font-serif font-bold text-primary mb-1">Create Your Account</h1>
          <p className="text-base text-gray-500 mb-2 font-sans">Start your halal journey today!</p>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5" onSubmit={handleSubmit}>
  {/* Email */}
  <div className="col-span-1">
    <Label htmlFor="email" className="mb-2 block font-medium">Email*</Label>
    <Input
      id="email"
      name="email"
      type="email"
      autoComplete="email"
      required
      value={form.email}
      onChange={handleChange}
      className="font-sans"
    />
  </div>
  {/* Password */}
  <div className="col-span-1">
    <Label htmlFor="password" className="mb-2 block font-medium">Password*</Label>
    <Input
      id="password"
      name="password"
      type="password"
      autoComplete="new-password"
      required
      value={form.password}
      onChange={handleChange}
      className="font-sans"
    />
  </div>
  {/* Name */}
  <div className="col-span-1">
    <Label htmlFor="name" className="mb-2 block font-medium">Name*</Label>
    <Input
      id="name"
      name="name"
      required
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
      value={form.age}
      onChange={handleChange}
      className="font-sans"
    />
  </div>
  {/* Gender */}
  <div className="col-span-1">
  <Label htmlFor="gender" className="mb-2 block font-medium">Gender</Label>
  <Select
    value={form.gender}
    onValueChange={(value) =>
      handleChange({
        target: { name: "gender", value },
      } as React.ChangeEvent<HTMLInputElement>)
    }
  >
    <SelectTrigger className="w-full border-primary focus-visible:border-primary focus-visible:ring-primary/50" >
      <SelectValue placeholder="Select..." />
    </SelectTrigger>
    <SelectContent className="border-primary bg-primary"
    >
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
      value={form.height}
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
      disabled={loading}
    >
      {loading ? "Registering..." : "Register"}
    </Button>
  </div>
</form>

        <div className="mt-6 text-center font-sans text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-primary underline">Login</a>
        </div>
      </div>
      </div>
    </div>
  );
}
