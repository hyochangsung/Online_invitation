import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Huddling",
  description: "Huddling 프로젝트",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard 글꼴 (필요한 글자만 나눠 받는 dynamic subset 버전) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          precedence="default"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
