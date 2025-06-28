// components/register/RegisterForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { registerUser } from "@/lib/api";
import { ApiError } from "@/types/api";
import { RegisterFormField } from "./RegisterFormField";
import { RegisterSelectField } from "./RegisterSelectField";
import { RegisterFormValues } from "@/types";
import { registerFields } from "@/constant";

/**
 * Renders the registration form for new users.
 * Dynamically generates inputs and selects based on `registerFields`,
 * handles form state, validation, submission, and error reporting.
 *
 * @returns JSX.Element representing the registration form.
 */
export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterFormValues>({
    email: "",
    password: "",
    name: "",
    age: "",
    height: "",
    gender: "",
    religion: "",
    location: "",
    education: "",
    occupation: "",
  });
  const [loading, setLoading] = useState(false);

  /**
   * Update the form state when a text input changes.
   *
   * @param e - The change event from an HTML input element.
   */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  /**
   * Update the form state when a select field changes.
   *
   * @param key - The key of the field in the form state to update.
   * @param value - The new value selected by the user.
   */
  function handleSelectChange(
    key: keyof RegisterFormValues,
    value: string
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  /**
   * Handle form submission: validates required fields,
   * calls the registration API, shows success or error toasts,
   * and redirects to the login page on success.
   *
   * @param e - The form submission event.
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Basic client-side validation
    if (!form.email || !form.password || !form.name) {
      toast.error("Email, Password, and Name are required.");
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        email:     form.email,
        password:  form.password,
        name:      form.name,
        age:       form.age    ? Number(form.age)    : undefined,
        height:    form.height ? Number(form.height) : undefined,
        gender:    form.gender,
        religion:  form.religion,
        location:  form.location,
        education: form.education,
        occupation:form.occupation,
      });

      toast.success("Registration successful! Please log in.");
      router.push("/login");
    } catch (err: unknown) {
      // Assume API error shape
      const apiErr = err as ApiError;
      toast.error(apiErr.message);
      apiErr.errorSources?.forEach((src) =>
        toast.error(src.path ? `${src.path}: ${src.message}` : src.message)
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
      onSubmit={handleSubmit}
    >
      {registerFields.map(({ id, label, type, required, placeholder, options }) =>
        type === "select" && options ? (
          <RegisterSelectField
            key={id}
            id={id}
            label={label}
            value={form[id] as string}
            options={options}
            onChange={(v) => handleSelectChange(id, v)}
          />
        ) : (
          <RegisterFormField
            key={id}
            id={id}
            name={id}
            label={label}
            type={type === "text" ? "text" : type}
            value={form[id] as string}
            required={required}
            placeholder={placeholder}
            onChange={handleChange}
          />
        )
      )}

      <div className="col-span-1 md:col-span-2">
        <Button
          type="submit"
          className="w-full bg-primary text-white font-semibold mt-2"
          disabled={loading}
        >
          {loading ? "Registering…" : "Register"}
        </Button>
      </div>
    </form>
  );
}
