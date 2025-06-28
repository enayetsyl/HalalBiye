// components/editProfile/EditProfileForm.tsx

/**
 * Form for editing a user’s profile.
 *
 * Renders a dynamic grid of inputs and selects based on `fieldConfigs`,
 * and displays a submit button. Handles change and submit events via props.
 */

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { ProfileFormProps } from "@/types";
import { fieldConfigs } from "@/constant";

/**
 * EditProfileForm
 *
 * @param {ProfileFormProps} props
 * @param {Record<string, string | number>} props.form
 *   Current values for each profile field, keyed by field name.
 * @param {boolean} props.saving
 *   Whether the form submission is in progress (disables inputs).
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange
 *   Handler for updating text/number inputs when their value changes.
 * @param {(field: string, value: string) => void} props.onSelect
 *   Handler for updating select inputs when a new option is chosen.
 * @param {(e: React.FormEvent<HTMLFormElement>) => void} props.onSubmit
 *   Handler for form submission.
 *
 * @returns {JSX.Element}
 *   A form element containing dynamically generated fields and a submit button.
 */
export function EditProfileForm({
  form,
  saving,
  onChange,
  onSelect,
  onSubmit,
}: ProfileFormProps) {
  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
      onSubmit={onSubmit}
    >
      {/**
        * Loop through each field definition and render the appropriate control.
        * - If `type === "select"`, render a <Select> with configured options.
        * - Otherwise, render a standard <Input> with min/max for numeric types.
        */}
      {fieldConfigs.map((field) => (
        <div key={field.name}>
          <Label htmlFor={field.name} className="mb-2 block font-medium">
            {field.label}
          </Label>

          {field.type === "select" ? (
            /* Render a dropdown for select fields */
            <Select
              value={(form[field.name] as string) ?? ""}
              onValueChange={(v) => onSelect(field.name, v)}
            >
              <SelectTrigger className="w-full border-primary focus-visible:border-primary focus-visible:ring-primary/50">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent className="border-primary bg-primary">
                {field.options.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            /* Render a text or number input for other field types */
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              min={field.type === "number" ? field.min : undefined}
              max={field.type === "number" ? field.max : undefined}
              value={
                field.type === "number"
                  ? (form[field.name] as number) ?? ""
                  : (form[field.name] as string)
              }
              onChange={onChange}
              className="font-sans"
            />
          )}
        </div>
      ))}

      {/**
        * Submit button spans both columns on medium+ screens.
        * Disabled when `saving` is true to prevent duplicate submissions.
        */}
      <div className="md:col-span-2">
        <Button
          type="submit"
          className="w-full bg-primary text-white font-semibold mt-2"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
