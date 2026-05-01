import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Cursor } from "@/components/layout/Cursor";

export const metadata: Metadata = {
  title: "DashDigital®",
  description: "A digital design studio driven by research & strategy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
      </head>
      <body className="antialiased">
        <Cursor />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
