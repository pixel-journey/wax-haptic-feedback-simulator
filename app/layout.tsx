import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Pulse timings, not a vibration',
  description: 'Confirm, warn, and fail patterns. The browser is not asked to vibrate. The sample transfer is unsigned.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
