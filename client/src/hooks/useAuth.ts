import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

/**
 * Custom React hook to manage authentication state.
 *
 * Reads the `"isAuthenticated"` flag from localStorage to initialize
 * authentication state, listens for `"authChanged"` events to update state,
 * and provides a `logout` function to sign the user out.
 *
 * @returns {object} An object containing:
 *   - `isAuthenticated`  Boolean indicating if the user is logged in.
 *   - `logout`           Async function to log the user out.
 */
export function useAuth() {
  // Tracks whether the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  /**
   * Logs the user out:
   * 1. Calls the backend logout endpoint.
   * 2. Clears the `isAuthenticated` flag from localStorage.
   * 3. Updates local state and redirects to the `/login` page.
   *
   * Errors are caught and logged to the console.
   *
   * @async
   * @returns {Promise<void>}
   */
  const logout = useCallback(async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/logout`,
        { method: "POST", credentials: "include" }
      );
      localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  }, [router]);

  useEffect(() => {
    // Initialize authentication state from localStorage
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");

    // Update state whenever an "authChanged" event is dispatched
    const onAuthChanged = () =>
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");

    window.addEventListener("authChanged", onAuthChanged);
    return () => {
      window.removeEventListener("authChanged", onAuthChanged);
    };
  }, []);

  return { isAuthenticated, logout };
}
