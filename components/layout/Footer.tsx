'use client'

import Link from 'next/link'
import { DoubleButton } from '@/components/common/DoubleButton'
import { useReveal } from '@/hooks/useReveal'

export default function Footer() {
  const revealRef = useReveal()

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer ref={revealRef as any} className="anim-wrap bg-gallery text-mine-shaft">
      {/* Top bar */}
      <div className="h-[56px] border-b border-alto px-page-padding flex items-center">
        <div className="grid grid-cols-4 w-full">
          <div className="col-span-2 hidden md:block" />
          <div className="col-span-2 flex justify-between text-[14px] uppercase tracking-tight">
            <span className="opacity-0">—</span>
          </div>
        </div>
      </div>

      {/* Footer Inner */}
      <div className="min-h-[600px] px-page-padding py-[120px] flex flex-col justify-between">
        <div className="grid grid-cols-8 gap-column">
          {/* Next Page */}
          <div className="col-span-8 md:col-span-4 mb-[160px]">
            <p className="text-[17.1px] uppercase tracking-[-0.38px] mb-4">
              <span className="anim-clip">
                <span className="anim-move-up">Next Page</span>
              </span>
            </p>
            <Link href="/work" className="flex items-start gap-2 group">
              <span className="text-[83.5px] md:text-[120px] tracking-[-2.8px] uppercase leading-[0.9] font-normal">
                <span className="anim-clip">
                  <span className="anim-move-up" data-delay="100">Work</span>
                </span>
              </span>
            </Link>
          </div>

          <div className="hidden md:block col-span-4" />

          {/* Contact */}
          <div className="col-span-8 md:col-span-2 flex flex-col gap-8 mb-16 md:mb-0">
            <p className="text-[25.1px] tracking-[-0.86px] uppercase leading-[1.2]">
              <span className="anim-clip">
                <span className="anim-move-up" data-delay="300">
                  함께 일하고 싶으신가요?
                </span>
              </span>
            </p>
            <div className="anim-clip">
              <div className="anim-move-up" data-delay="400">
                <DoubleButton labelFront="Contact us" href="/request" />
              </div>
            </div>
          </div>

          <div className="hidden md:block col-span-2" />

          {/* Info */}
          <div className="col-span-4 md:col-span-2 flex flex-col gap-12">
            <div>
              <p className="text-[14.9px] text-[#757575] uppercase mb-2">Business</p>
              <p className="text-[16.9px] uppercase">hello@vinuspread.com</p>
            </div>
            <div>
              <p className="text-[15px] text-[#757575] uppercase mb-2">SNS</p>
              <a href="https://www.instagram.com/vinuspread" target="_blank" rel="noopener noreferrer" className="text-[16.9px] uppercase hover:underline underline-offset-4 block">
                Instagram
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="col-span-4 md:col-span-2 flex flex-col gap-12">
            <div>
              <p className="text-[15px] text-[#757575] uppercase mb-2">Business Hours</p>
              <p className="text-[16.8px] uppercase">월요일 — 금요일</p>
              <p className="text-[16.7px] uppercase">09:00 AM — 18:00 PM</p>
              <p className="text-[16.5px] uppercase">KST (GMT+9)</p>
            </div>
            <div>
              <p className="text-[15.1px] text-[#757575] uppercase mb-2">Seoul</p>
              <address className="text-[16.5px] uppercase not-italic">
                서울특별시<br />대한민국
              </address>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="h-[77px] border-t border-alto px-page-padding flex items-center">
        <div className="grid grid-cols-8 w-full items-center">
          <div className="col-span-4 md:col-span-2 text-[14.7px] uppercase">
            바이너스프레드 ©{new Date().getFullYear()}
          </div>
          <div className="hidden md:flex col-span-4 justify-center gap-[38.4px] text-[15.5px] uppercase">
            <a href="https://www.instagram.com/vinuspread" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">Instagram</a>
          </div>
          <div className="col-span-4 md:col-span-2 text-right">
            <button onClick={scrollToTop} className="text-[15.1px] uppercase hover:underline underline-offset-4">
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
