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



export function RegisterSelectField({
  id,
  label,
  value,
  options,
  placeholder = "Select…",
  onChange,
}: RegisterSelectFieldProps) {
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
