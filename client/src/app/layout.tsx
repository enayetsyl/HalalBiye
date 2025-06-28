import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/shared/Navbar";

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HalalBiye",
  description:
    "HalalBiye is an elegant, secure matrimonial platform for Muslim singles. Create detailed profiles, browse and filter matches by faith and values, and send connection requests for your halal marriage journey.",
};

export default function RootLayout({
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
        <Navbar/>
        <div>
          {children}
        </div>
       </main>
        <Toaster
        position="bottom-right"
richColors

        />
      </body>
    </html>
  );
}
