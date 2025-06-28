// utils/extractUser.ts
import { TUserSummary } from "@/types";

export function extractUser(user: string | TUserSummary | undefined): TUserSummary {
  if (!user) return { _id: "" };
  if (typeof user === "string") return { _id: user };
  return user;
}
