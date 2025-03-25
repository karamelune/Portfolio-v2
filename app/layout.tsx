import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dylan CLERCKX - Portfolio',
  description: "Dylan CLERCKX's portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="min-h-screen flex flex-col w-full">{children}</body>
    </html>
  );
}
