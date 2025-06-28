// lib/api.ts

/**
 * API client wrapper for interacting with the backend.
 * Exposes functions for user authentication, profile management, and connection requests.
 */

import { ApiError } from "@/types/api";
import { API_BASE } from "./config";
import { TRequest, TUser } from "@/types";

/**
 * Generic HTTP request helper.
 *
 * @template T - The expected response data type.
 * @param path - The endpoint path (appended to API_BASE).
 * @param opts - Fetch options (method, headers, body, etc.).
 * @returns A promise that resolves with the parsed JSON data of type T.
 * @throws {ApiError} When the network response is not OK or JSON parsing fails.
 */
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

  let data: unknown;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    // If parsing fails, throw the raw text as an error
    throw { message: text, status: res.status } as ApiError;
  }

  if (!res.ok) {
    // Extract error payload
    const errPayload = data as {
      message?: string;
      errorSources?: ApiError["errorSources"];
    };
    throw {
      message: errPayload.message || res.statusText,
      status: res.status,
      errorSources: errPayload.errorSources,
    } as ApiError;
  }

  // If the response body is wrapped in { data: ... }, unwrap it
  const payload = data as { data?: T };
  return (payload.data ?? (data as T));
}

export default request;

/**
 * Attempt to log in a user.
 *
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A promise resolving to the authenticated user object.
 * @throws {ApiError} On authentication failure.
 */
export function loginUser(email: string, password: string) {
  return request<TUser>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

/**
 * Register a new user.
 *
 * @param payload - The registration details.
 * @returns A promise resolving to the newly created user object.
 * @throws {ApiError} On validation or server error.
 */
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

/**
 * Fetch the authenticated user's profile.
 *
 * @returns A promise resolving to the current user's profile.
 * @throws {ApiError} On network or authorization error.
 */
export function fetchMyProfile() {
  return request<TUser>("/api/v1/users/me", { method: "GET" });
}

/**
 * Update the authenticated user's profile.
 *
 * @param payload - Partial user fields to update.
 * @returns A promise resolving to the updated user profile.
 * @throws {ApiError} On validation or server error.
 */
export function updateMyProfile(payload: Partial<TUser>) {
  return request<TUser>("/api/v1/users/me", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/**
 * Fetch all users matching the given filters.
 *
 * @param filters - Key/value pairs to filter by (e.g., { gender: "Male" }).
 * @returns A promise resolving to an array of users.
 * @throws {ApiError} On network or server error.
 */
export function fetchUsers(filters: Record<string, string>) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  const qs = params.toString();
  const path = qs ? `/api/v1/users?${qs}` : "/api/v1/users";

  return request<TUser[]>(path, { method: "GET" });
}

/**
 * Send a connection request to another user.
 *
 * @param toUser - The ID of the user to connect with.
 * @returns A promise resolving to the created request object.
 * @throws {ApiError} On network or validation error.
 */
export function sendConnectionRequest(toUser: string) {
  return request<TRequest>("/api/v1/requests", {
    method: "POST",
    body: JSON.stringify({ toUser }),
  });
}

/**
 * Respond to an incoming connection request.
 *
 * @param id - The ID of the request to respond to.
 * @param action - Either "accept" or "decline".
 * @returns A promise resolving to null on success.
 * @throws {ApiError} On invalid request or server error.
 */
export function respondToRequest(
  id: string,
  action: "accept" | "decline"
) {
  return request<null>(`/api/v1/requests/${action}`, {
    method: "POST",
    body: JSON.stringify({ id }),
  });
}

/**
 * Fetch all incoming connection requests for the current user.
 *
 * @returns A promise resolving to an array of incoming requests.
 * @throws {ApiError} On network or authorization error.
 */
export function fetchIncomingRequests() {
  return request<TRequest[]>("/api/v1/requests/incoming", {
    method: "GET",
  });
}

/**
 * Fetch all outgoing connection requests sent by the current user.
 *
 * @returns A promise resolving to an array of outgoing requests.
 * @throws {ApiError} On network or server error.
 */
export function fetchOutgoingRequests() {
  return request<TRequest[]>("/api/v1/requests/outgoing", {
    method: "GET",
  });
}
