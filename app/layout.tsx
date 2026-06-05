import type { Metadata } from 'next'
import { Syne, Noto_Serif_KR, Plus_Jakarta_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'
import 'lenis/dist/lenis.css'
import JsonLd from '@/components/seo/JsonLd'

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
})

const notoSerifKr = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-noto-serif-kr',
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
    <html lang="ko" className={`${pretendard.variable} ${plusJakartaSans.variable} ${syne.variable} ${notoSerifKr.variable}`} suppressHydrationWarning>
      <head></head>
      <body suppressHydrationWarning>
        <Script
          id="home-scroll-reset"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){if("scrollRestoration"in history){history.scrollRestoration="manual";}window.addEventListener("popstate",function(){if(location.pathname==="/"){sessionStorage.setItem("restore-pop:/","1");}setTimeout(function(){if(location.pathname==="/"){sessionStorage.setItem("restore-pop:/","1");}},0);setTimeout(function(){sessionStorage.removeItem("restore-pop:/");},2500);});if(location.pathname!=="/"){return;}var reset=function(){if(sessionStorage.getItem("restore-pop:/")==="1"){return;}window.scrollTo(0,0);};reset();window.addEventListener("pageshow",reset,{once:true});document.addEventListener("DOMContentLoaded",reset,{once:true});setTimeout(reset,0);setTimeout(reset,50);setTimeout(reset,150);setTimeout(reset,300);})();`,
          }}
        />
        <JsonLd data={organizationLd} />
        <JsonLd data={websiteLd} />
        {children}
        {process.env.NEXT_PUBLIC_UMAMI_URL && process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
        {/* impeccable-live-start */}
        <Script id="impeccable-live" src="http://localhost:8400/live.js" strategy="afterInteractive" />
        {/* impeccable-live-end */}
      </body>
    </html>
  )
}
