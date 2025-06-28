/**
 * RootLayout.tsx
 *
 * The root layout component for the HalalBiye application.  
 * Applies global fonts, metadata, and site-wide UI elements (Navbar, Toaster).
 */

import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/shared/Navbar";


/**
 * Google Font: Nunito
 * Used for all sans-serif text throughout the app.
 */
const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

/**
 * Google Font: Playfair Display
 * Used for all serif text (headings, titles) throughout the app.
 */
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

/**
 * Page metadata for SEO and social sharing.
 */
export const metadata: Metadata = {
  title: "HalalBiye",
  description:
    "HalalBiye is an elegant, secure matrimonial platform for Muslim singles. " +
    "Create detailed profiles, browse and filter matches by faith and values, " +
    "and send connection requests for your halal marriage journey.",
};

/**
 * Instruct Next.js to always render this layout dynamically
 * (no static HTML generation).
 */
export const dynamic = "force-dynamic";

/**
 * RootLayout
 *
 * Wraps the entire app in the HTML and BODY tags, applies global font CSS variables,
 * renders the Navbar at the top, and injects child page content. Also sets up
 * the Sonner Toaster for global notifications.
 *
 * @param props.children - The page or component tree to render inside the layout.
 */



export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${playfair.variable} antialiased`}
      >
        <main>
          {/* Site-wide navigation bar */}
          <Navbar />

          {/* Page-specific content */}
          <div>{children}</div>
        </main>

        {/* Global toaster for success/error notifications */}
        <Toaster
          position="bottom-right"
          richColors
        />
      </body>
    </html>
  );
}
