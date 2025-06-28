// components/login/TextInputField.tsx
"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TextInputFieldProps } from "@/types";

/**
 * A reusable text input component consisting of a label and an input field.
 *
 * @param {TextInputFieldProps} props - Props for configuring the text input.
 * @param {string} props.id - Unique identifier for the input element; also used as the label's htmlFor.
 * @param {string} props.name - Name attribute for the input, used in form submissions.
 * @param {string} props.label - Text to display inside the label above the input.
 * @param {string} [props.type="text"] - HTML input type (e.g., "text", "email", "password").
 * @param {string | number} props.value - Current value of the input field.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - Handler called when the input value changes.
 * @param {boolean} [props.required=false] - Whether the input is required; appends an asterisk (*) to the label if true.
 * @param {string} [props.autoComplete] - Optional autocomplete attribute for the input (e.g., "email", "name").
 *
 * @returns {JSX.Element} A labeled input element with styling and required indicator.
 */
export const TextInputField: React.FC<TextInputFieldProps> = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  autoComplete,
}) => (
  <div>
    <Label htmlFor={id} className="mb-2 block font-medium">
      {label}
      {required && "*"}
    </Label>
    <Input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required={required}
      value={value}
      onChange={onChange}
      className="font-sans"
    />
  </div>
);
