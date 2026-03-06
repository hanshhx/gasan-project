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

// ⭐️ 브라우저 캐시 문제를 해결하기 위해 파일 경로 뒤에 ?v=1을 추가했습니다 ⭐️
export const metadata: Metadata = {
  title: "가산 3차 SK V1 center | 공식 분양 홍보관",
  description: "가산디지털단지 역세권, 성공 비즈니스의 시작. 가산 3차 SK V1 센터 지식산업센터 공식 분양 정보 및 상담 안내.",
  icons: {
    icon: [
      { url: "/favicon.svg?v=1", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.svg?v=1"],
    apple: [
      { url: "/favicon.svg?v=1", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "가산 3차 SK V1 center | 압도적 가치, 대폭할인 분양",
    description: "즉시입주 가능! 역세권 프리미엄 지식산업센터. 성공을 위한 최고의 선택.",
    siteName: "가산 3차 SK V1",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}