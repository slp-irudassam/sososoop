import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButton from '@/components/FloatingButton';

export const metadata: Metadata = {
  title: {
    default: '소소숲:지혜의 기록소',
    template: '%s | 소소숲',
  },
  description:
    '언어재활사와 교육 전문가들이 배움과 기록을 통해 함께 성장하는 따뜻한 지식 공동체',
  keywords: ['언어재활사', 'AI 활용', '교육 콘텐츠', '소소숲'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingButton />
      </body>
    </html>
  );
}
