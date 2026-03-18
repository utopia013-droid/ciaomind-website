import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CIAOMIND - 连接东方与西方的文化桥梁',
  description: 'CIAOMIND S.B. S.R.L. 官方网站,提供AI技能服务、茶文化体验和科技文化产品,架起中意两国之间的深度文化对话',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
