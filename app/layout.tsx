import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavigationBar from '@/components/NavigationBar';
import LoginEventHandler from '@/components/LoginEventHandler';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Weardrobe',
  description: '의류 특화 중고거래 플랫폼',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <LoginEventHandler />
      <body className={inter.className}>
        <div className="container">
          <div className="content">{children}</div>
          <NavigationBar pages={['HOME', 'WARDROBE', 'MYPAGE']} />
        </div>
      </body>
    </html>
  );
}
