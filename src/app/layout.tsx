import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "PharmCareer Pro - CV Analyzer & Job Matcher for B.Pharm Graduates",
  description:
    "AI-powered CV analysis, job matching, and mock interview preparation for Indian pharmacy students and B.Pharm graduates. Match with Naukri, Indeed & LinkedIn jobs.",
  keywords:
    "B.Pharm jobs, pharmacy career, CV analyzer, mock interview, pharmacy jobs India, Naukri pharmacy",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1e40af",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
