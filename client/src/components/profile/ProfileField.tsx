import { ProfileFieldProps } from "@/types";


export function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-gray-800 text-base font-medium">{value}</span>
    </div>
  );
}
