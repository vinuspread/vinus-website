import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '디자인스튜디오 바이너스프레드',
    template: '%s | 바이너스프레드',
  },
  description: '웹 개발 및 디자인 전문 스튜디오, 맞춤형 웹사이트 제작과 창의적인 디자인 솔루션 제공',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vinus.co.kr'),
  icons: {
    icon: '/images/@profile.png',
    shortcut: '/images/@profile.png',
  },
  openGraph: {
    siteName: '바이너스프레드',
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: '/images/og2.png', width: 1200, height: 630, alt: '바이너스프레드' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og2.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  )
}

