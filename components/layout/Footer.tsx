export default function Footer() {
  return (
    <footer className="border-t border-gray-200 px-8 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <p className="font-bold text-lg tracking-wider">VINUSPREAD</p>
          <p className="text-sm text-gray-500 mt-1">디자인스튜디오 바이너스프레드</p>
        </div>
        <div className="text-sm text-gray-500 space-y-1">
          <p>서울 강서구 공항대로 227</p>
          <p>02-3661-1907</p>
        </div>
        <div className="flex gap-4">
          <a href="https://www.instagram.com/vinuspread/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-black transition-colors">
            Instagram
          </a>
          <a href="https://www.pinterest.co.kr/vinuspread/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-black transition-colors">
            Pinterest
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-100">
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} VINUSPREAD. All rights reserved.</p>
      </div>
    </footer>
  )
}
