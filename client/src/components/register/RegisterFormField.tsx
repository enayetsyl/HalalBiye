// components/register/RegisterFormField.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RegisterFormFieldProps } from "@/types";



export function RegisterFormField({
  id,
  name,
  label,
  type = "text",
  value,
  required = false,
  placeholder,
  onChange,
}: RegisterFormFieldProps) {
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
