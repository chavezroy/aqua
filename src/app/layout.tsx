import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finterest - Aquarium Compatibility Checker",
  description: "Stock your aquarium responsibly with real-time compatibility checking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
