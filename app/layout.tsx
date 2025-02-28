import './globals.css';
import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });

export const metadata: Metadata = {
  title: 'CHAINHUB',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${orbitron.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}