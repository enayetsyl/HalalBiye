// components/register/RegisterSelectField.tsx
"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RegisterSelectFieldProps } from "@/types";
import { JSX } from "react";

/**
 * A reusable select field component for registration forms.
 *
 * Renders a label and a dropdown built on top of the Shadcn UI Select
 * component, mapping each option to a SelectItem.
 *
 * @param {string} id - The HTML id for the select trigger (and its label htmlFor).
 * @param {string} label - The text to display above the select dropdown.
 * @param {string} value - The currently selected value.
 * @param {{ value: string; label: string }[]} options - Array of option objects.
 * @param {string} [placeholder="Select…"] - Placeholder text when no value is selected.
 * @param {(newValue: string) => void} onChange - Callback invoked with the new value.
 *
 * @returns {JSX.Element} The rendered select field.
 */
export function RegisterSelectField({
  id,
  label,
  value,
  options,
  placeholder = "Select…",
  onChange,
}: RegisterSelectFieldProps): JSX.Element {
  return (
    <div className="col-span-1">
      <Label htmlFor={id} className="mb-2 block font-medium">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className="w-full border-primary focus-visible:border-primary focus-visible:ring-primary/50"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="border-primary bg-primary">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
