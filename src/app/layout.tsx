import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import '@/styles/globals.css';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import Main from '@/components/layout/main';
import Providers from '@/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rick and Morty App',
  description: 'An application to explore Rick and Morty characters, episodes, and locations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={`${geistSans.variable} antialiased`} cz-shortcut-listen='true'>
        <Providers>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
