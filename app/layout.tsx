import type { Metadata } from 'next';
import './globals.scss';
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-great-vibes', // Создаём CSS переменную
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Наша Вселенная 💫',
  description: 'Карта наших отношений и воспоминаний',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={greatVibes.variable}>
      <body>{children}</body>
    </html>
  );
}