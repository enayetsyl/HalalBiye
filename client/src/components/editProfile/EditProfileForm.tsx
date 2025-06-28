// components/profile/EditProfileForm.tsx
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
      {fieldConfigs.map((field) => (
        <div key={field.name}>
          <Label htmlFor={field.name} className="mb-2 block font-medium">
            {field.label}
          </Label>

          {field.type === "select" ? (
            /* 3a) Render <Select> when type is "select" */
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
            /* 3b) Otherwise render a normal <Input> */
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

      {/* 4) Submit button */}
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
