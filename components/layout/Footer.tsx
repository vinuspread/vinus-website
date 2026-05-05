'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-20 px-6 md:px-12 overflow-hidden relative z-[2]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Call to Action Section */}
        <motion.div 
          className="mb-32 md:mb-48"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-none mb-6">
            LET&apos;S <br className="hidden md:block" /> WORK <br className="hidden md:block" /> <span className="font-medium text-gray-400">TOGETHER.</span>
          </h2>
          <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <Link 
              href="/request" 
              className="group relative inline-flex items-center justify-center px-8 py-4 text-sm tracking-widest uppercase overflow-hidden rounded-full bg-white text-black font-medium transition-all hover:scale-105"
            >
              <span className="relative z-10">Start a Project</span>
            </Link>
            <a href="mailto:info@vinus.co.kr" className="text-lg md:text-xl border-b border-gray-600 hover:border-white pb-1 transition-colors">
              info@vinus.co.kr
            </a>
          </div>
        </motion.div>

        {/* Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-12 border-t border-white/20">
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="font-bold text-2xl tracking-widest mb-2">VINUSPREAD</p>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              디자인스튜디오 바이너스프레드.<br/>
              우리는 디지털 경험을 새롭게 정의합니다.
            </p>
          </motion.div>

          <motion.div 
            className="text-sm text-gray-400 space-y-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-white font-medium mb-4 tracking-widest">VISIT US</p>
            <p className="hover:text-white transition-colors cursor-default">서울 강서구 공항대로 227</p>
            <p className="hover:text-white transition-colors cursor-default">마곡센트럴타워 1차 701호</p>
            <p className="hover:text-white transition-colors cursor-default mt-4">T. 02-3661-1907</p>
          </motion.div>

          <motion.div 
            className="text-sm text-gray-400 space-y-3 flex flex-col"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="text-white font-medium mb-4 tracking-widest">SOCIAL</p>
            <a href="https://www.instagram.com/vinuspread/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors w-fit">
              Instagram
            </a>
            <a href="https://www.pinterest.co.kr/vinuspread/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors w-fit">
              Pinterest
            </a>
            <a href="https://www.behance.net/vinuspread" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors w-fit">
              Behance
            </a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="mt-20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 pb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p>© {new Date().getFullYear()} VINUSPREAD. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </motion.div>

        {/* Massive Brand Typography */}
        <div className="w-full relative z-10 mt-8 pointer-events-none select-none">
          <svg width="100%" viewBox="0 0 1000 210" className="overflow-visible block">
            <text 
              x="0" 
              y="160" 
              textLength="100%" 
              lengthAdjust="spacing" 
              className="font-inter font-black fill-white lowercase" 
              style={{ fontSize: '195px' }}
            >
              vinuspread
            </text>
          </svg>
        </div>
      </div>
      
      {/* Background Graphic Element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,59,92,0.05)_0%,transparent_70%)] rounded-full pointer-events-none" />
    </footer>
  )
}
