import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { JSX } from "react";

/**
 * Renders authentication action buttons based on the user's login state.
 *
 * When the user is not authenticated, shows “Login” and “Register” links.
 * When the user is authenticated, shows a “Logout” button.
 *
 * @component
 * @returns {JSX.Element} Authentication buttons for the navbar or header.
 */
export function AuthButtons(): JSX.Element {
  // Retrieve authentication status and logout handler from context hook
  const { isAuthenticated, logout } = useAuth();

  // If not logged in, show Login and Register buttons
  if (!isAuthenticated) {
    return (
      <>
        <Link href="/login">
          <Button variant="outline" className="ml-2">
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button className="ml-2 bg-primary text-white">
            Register
          </Button>
        </Link>
      </>
    );
  }

  // If logged in, show Logout button
  return (
    <Button
      variant="ghost"
      className="ml-2"
      onClick={logout}
    >
      Logout
    </Button>
  );
}
