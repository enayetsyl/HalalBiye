import { JSX } from "react";

/**
 * LoadingScreen
 *
 * A full-page loading indicator component.
 * Renders a centered, pulsing “Loading...” message over
 * a soft, diagonal gradient background.
 *
 * This component is useful for indicating to the user
 * that a data-fetch or navigation transition is in progress.
 *
 * @component
 * @example
 * return <LoadingScreen />;
 * @returns {JSX.Element} The loading screen element.
 */
export function LoadingScreen(): JSX.Element {
  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-tr from-secondary/30 via-neutral/60 to-accent/60
      "
    >
      <span className="text-primary font-bold text-xl animate-pulse">
        Loading...
      </span>
    </div>
  );
}
