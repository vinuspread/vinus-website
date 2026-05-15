import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import './globals.css'
import JsonLd from '@/components/seo/JsonLd'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vinus.co.kr'

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '바이너스프레드',
  alternateName: 'VINUS SPREAD',
  url: SITE_URL,
  logo: `${SITE_URL}/images/@profile.png`,
  description: '웹 개발 및 디자인 전문 스튜디오. 맞춤형 웹사이트 제작과 창의적인 디자인 솔루션을 제공합니다.',
  address: { '@type': 'PostalAddress', addressCountry: 'KR' },
}

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '바이너스프레드',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/work` },
    'query-input': 'required name=search_term_string',
  },
}

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
    <html lang="ko" className={`${inter.variable} ${syne.variable}`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
      </head>
      <body suppressHydrationWarning>
        <JsonLd data={organizationLd} />
        <JsonLd data={websiteLd} />
        {children}
      </body>
    </html>
  )
}

