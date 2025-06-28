// lib/api.ts
import { ApiError } from "@/types/api";
import { API_BASE } from "./config";
import { TRequest, TUser } from "@/types";





async function request<T>(
  path: string,
  opts: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    ...opts,
  });

  const text = await res.text();

  // raw JSON comes in as unknown
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw { message: text, status: res.status } as ApiError;
  }

  if (!res.ok) {
    // narrow down error payload
    const errPayload = data as { message?: string; errorSources?: ApiError["errorSources"] };
    throw {
      message: errPayload.message || res.statusText,
      status: res.status,
      errorSources: errPayload.errorSources,
    } as ApiError;
  }

  // pull out .data if your backend wraps it, otherwise assume it's T
  const payload = data as { data?: T };
  return (payload.data ?? (data as T));
}

export default request;

// user endpoints
export function loginUser(email: string, password: string) {
  return request<TUser>("/api/v1/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function registerUser(payload: {
  email: string;
  password: string;
  name: string;
  age?: number;
  gender?: string;
  religion?: string;
  location?: string;
  height?: number;
  education?: string;
  occupation?: string;
}) {
  return request<TUser>("/api/v1/users/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchMyProfile() {
  return request<TUser>("/api/v1/users/me", { method: "GET" });
}

export function updateMyProfile(payload: Partial<TUser>) {
  return request<TUser>("/api/v1/users/me", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function fetchUsers(filters: Record<string, string>) {
  // build only non‐empty params
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  const qs = params.toString();
  const path = qs ? `/api/v1/users?${qs}` : "/api/v1/users";

  return request<TUser[]>(path, { method: "GET" });
}

// request endpoints
export function sendConnectionRequest(toUser: string) {
  return request<TRequest>("/api/v1/requests", {
    method: "POST",
    body: JSON.stringify({ toUser }),
  });
}

export function respondToRequest(
  id: string,
  action: "accept" | "decline"
) {
  return request<null>(`/api/v1/requests/${action}`, {
    method: "POST",
    body: JSON.stringify({ id }),
  });
}

export function fetchIncomingRequests() {
  return request<TRequest[]>("/api/v1/requests/incoming", { method: "GET" });
}

export function fetchOutgoingRequests() {
  return request<TRequest[]>("/api/v1/requests/outgoing", { method: "GET" });
}
