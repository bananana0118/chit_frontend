import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../styles/toast.css';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import PageLayout from '@/components/layout/PageLayout';
import AuthInitializer from '@/provider/AuthInitializer';
import Providers from '@/provider/Providers';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'CHIT 칫',
  description: '지금, 시참에 참여해주세요 CHI- CHI- CHIT-',
  keywords: ['CHIT', '치지직', 'CHZZK', '시참', '시청자 참여', '시청자 참여형'],
  openGraph: {
    title: '',
    description: '좋아하는 치지직 스트리머 방송에 지금 참여해 보세요!',
    url: 'https://myportfolio.site',
    siteName: 'CHIT 칫',
    images: [
      {
        url: 'https://chit-seven.vercel.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CHIT 칫 | 치지직 시청자 참여 플랫폼',
    description: '좋아하는 치지직 스트리머 방송에 지금 참여해 보세요!',
    images: ['https://chit-seven.vercel.app/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <body
        className={`${pretendard.variable} h-screen w-screen cursor-default bg-background text-white antialiased`}
      >
        <Providers>
          <AuthInitializer />
          <PageLayout>{children}</PageLayout>
          <ToastContainer
            className="custom-toast"
            position="top-right"
            autoClose={3000}
          ></ToastContainer>
        </Providers>
      </body>
    </html>
  );
}
