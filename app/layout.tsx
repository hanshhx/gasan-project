import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ⭐️ 브라우저 탭 제목, 설명, 파비콘 설정 부분 ⭐️
export const metadata: Metadata = {
  title: "가산 3차 SK V1 center | 공식 분양 홍보관",
  description: "가산디지털단지 역세권, 성공 비즈니스의 시작. 가산 3차 SK V1 센터 지식산업센터 공식 분양 정보 및 상담 안내.",
  icons: {
    icon: '/icon.svg', // 앞서 만든 파비콘(icon.svg)을 불러옵니다.
  },
  openGraph: {
    title: "가산 3차 SK V1 center | 압도적 가치, 대폭할인 분양",
    description: "즉시입주 가능! 역세권 프리미엄 지식산업센터. 성공을 위한 최고의 선택.",
    siteName: "가산 3차 SK V1",
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}