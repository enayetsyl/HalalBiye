// components/login/TextInputField.tsx
"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TextInputFieldProps } from "@/types";



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
