import { Metadata } from 'next';
import './globals.css';
import { useLocale } from 'next-intl';

export const metadata: Metadata = {
  title: 'Dylan CLERCKX - Portfolio',
  description: "Dylan CLERCKX's portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col w-full">{children}</body>
    </html>
  );
}
