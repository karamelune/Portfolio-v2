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
      <body className="flex flex-col justify-center items-center w-full">
        {children}
      </body>
    </html>
  );
}
