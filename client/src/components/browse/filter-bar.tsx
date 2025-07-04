// components/browse/filter-bar.tsx
"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { genderOptions, religionOptions } from "@/constant";
import { FilterBarProps } from "@/types";

/**
 * FilterBar
 *
 * Renders a pair of dropdowns for filtering the browse page by gender and religion.
 *
 * Uses Shadcn UI `<Select>` components for consistency with the app’s design system.
 *
 * @param {object} props
 * @param {FilterBarProps['filters']} props.filters       - Current filter values ({ gender, religion }).
 * @param {(field: keyof FilterBarProps['filters'], value: string) => void} props.onFilterChange
 *        - Callback invoked when the user selects a new filter value.
 */
export default function FilterBar({
  filters,
  onFilterChange,
}: FilterBarProps) {
  return (
    <div className="flex gap-4">
      {/* Gender filter */}
      <div>
        <Label
          htmlFor="filter-gender"
          className="block mb-1 text-sm font-medium"
        >
          Gender
        </Label>
        <Select
          value={filters.gender || "all"}
          onValueChange={(v) =>
            onFilterChange("gender", v === "all" ? "" : v)
          }
        >
          <SelectTrigger
            id="filter-gender"
            className="w-32 border-primary focus-visible:border-primary focus-visible:ring-primary/50"
          >
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className="border-primary bg-primary">
            {genderOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Religion filter */}
      <div>
        <Label
          htmlFor="filter-religion"
          className="block mb-1 text-sm font-medium"
        >
          Religion
        </Label>
        <Select
          value={filters.religion || "all"}
          onValueChange={(v) =>
            onFilterChange("religion", v === "all" ? "" : v)
          }
        >
          <SelectTrigger
            id="filter-religion"
            className="w-32 border-primary focus-visible:border-primary focus-visible:ring-primary/50"
          >
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className="border-primary bg-primary">
            {religionOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
