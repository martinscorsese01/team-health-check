import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team Health Check',
  description: 'Track your team\'s emotional well-being',
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