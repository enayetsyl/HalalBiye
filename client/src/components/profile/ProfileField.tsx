import React, { JSX } from "react";
import { ProfileFieldProps } from "@/types";

/**
 * ProfileField
 *
 * A simple presentational component that renders a label/value pair
 * in a vertical layout. Used throughout the profile pages to display
 * individual pieces of user information (e.g. Age, Gender, Location).
 *
 * @param {ProfileFieldProps} props
 * @param {string} props.label - The descriptor for the field (e.g. "Age").
 * @param {string | number} props.value - The value associated with the label.
 * @returns {JSX.Element} A styled container with the label and value.
 */
export function ProfileField({ label, value }: ProfileFieldProps): JSX.Element {
  return (
    <div className="flex flex-col">
      {/* Field label */}
      <span className="text-gray-500 text-sm">
        {label}
      </span>

      {/* Field value */}
      <span className="text-gray-800 text-base font-medium">
        {value}
      </span>
    </div>
  );
}
