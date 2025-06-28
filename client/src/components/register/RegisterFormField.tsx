// components/register/RegisterFormField.tsx

"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RegisterFormFieldProps } from "@/types";
import { JSX } from "react";

/**
 * A single form field for the registration form, consisting of a label and an input.
 *
 * This component renders a shadcn-ui `<Label>` paired with a `<Input>`,
 * handling common props like `id`, `name`, `type`, and `required`.
 *
 * @param {RegisterFormFieldProps} props
 * @param {string} props.id - The unique identifier for the input (also used as htmlFor on the label).
 * @param {string} props.name - The name attribute for the input element.
 * @param {string} props.label - The text to display inside the label.
 * @param {string} [props.type="text"] - The HTML input type (e.g., "text", "email", "password").
 * @param {string | number} props.value - The current value of the input.
 * @param {boolean} [props.required=false] - Whether the input is required.
 * @param {string} [props.placeholder] - Placeholder text displayed when the input is empty.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - Change event handler for the input.
 * @returns {JSX.Element} The rendered label and input wrapped in a grid column.
 */
export function RegisterFormField({
  id,
  name,
  label,
  type = "text",
  value,
  required = false,
  placeholder,
  onChange,
}: RegisterFormFieldProps): JSX.Element {
  return (
    <div className="col-span-1">
      <Label htmlFor={id} className="mb-2 block font-medium">
        {label}
        {required && "*"}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="font-sans"
      />
    </div>
  );
}
