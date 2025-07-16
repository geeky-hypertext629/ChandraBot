import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chandra Bot - Subham Chandra's Manager",
  description: "Ai-powered personal assistant for Subham Chandra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
