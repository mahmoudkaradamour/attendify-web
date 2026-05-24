import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans_Arabic } from "next/font/google";
import AppShell from "@/components/app-shell";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

const heading = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });
const body = IBM_Plex_Sans_Arabic({ subsets: ["latin", "arabic"], variable: "--font-body", weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Attendify | Attendance Trust Platform",
  description: "Premium blue-gradient public front door for company signup, owner access, subscriptions, and attendance operations"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable}`}>
        <AppShell>
          <div className="app-frame">
            {children}
            <SiteFooter />
          </div>
        </AppShell>
      </body>
    </html>
  );
}
