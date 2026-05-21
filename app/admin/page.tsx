import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getUmamiStats } from '@/lib/umami'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: workCount },
    { count: blogCount },
    { count: faqCount },
    umami,
  ] = await Promise.all([
    supabase.from('work').select('*', { count: 'exact', head: true }),
    supabase.from('blog').select('*', { count: 'exact', head: true }),
    supabase.from('faq').select('*', { count: 'exact', head: true }),
    getUmamiStats(7),
  ])

  const contentStats = [
    { label: 'Work', count: workCount ?? 0, href: '/admin/work' },
    { label: 'Blog', count: blogCount ?? 0, href: '/admin/blog' },
    { label: 'FAQ', count: faqCount ?? 0, href: '/admin/faq' },
  ]

  const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      {/* 콘텐츠 현황 */}
      <section>
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">콘텐츠</p>
        <div className="grid grid-cols-3 gap-6">
          {contentStats.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="border border-gray-200 p-8 hover:border-black transition-colors"
            >
              <p className="text-3xl font-bold">{s.count}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 방문 통계 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">방문 통계 (최근 7일)</p>
          {UMAMI_URL && (
            <a
              href={UMAMI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-black transition-colors"
            >
              전체 보기 →
            </a>
          )}
        </div>

        {!umami ? (
          <p className="text-sm text-gray-400">
            {UMAMI_URL
              ? 'UMAMI_USERNAME / UMAMI_PASSWORD 환경변수를 설정해주세요.'
              : 'Umami가 연결되지 않았습니다.'}
          </p>
        ) : (
          <div className="space-y-6">
            {/* 핵심 수치 */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: '페이지뷰', value: umami.stats.pageviews.toLocaleString() },
                { label: '방문자', value: umami.stats.visitors.toLocaleString() },
                { label: '세션', value: umami.stats.visits.toLocaleString() },
                { label: '이탈률', value: `${Math.round((umami.stats.bounces / (umami.stats.visits || 1)) * 100)}%` },
              ].map((s) => (
                <div key={s.label} className="border border-gray-200 p-6">
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* 인기 페이지 + 유입 경로 */}
            <div className="grid grid-cols-2 gap-6">
              {/* 인기 페이지 */}
              <div className="border border-gray-200 p-6">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">인기 페이지</p>
                {umami.topPages.length === 0 ? (
                  <p className="text-sm text-gray-400">데이터 없음</p>
                ) : (
                  <ul className="space-y-2">
                    {umami.topPages.map((p) => (
                      <li key={p.x} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 truncate max-w-[200px]">{p.x}</span>
                        <span className="text-gray-400 ml-4 shrink-0">{p.y.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 유입 경로 */}
              <div className="border border-gray-200 p-6">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">유입 경로</p>
                {umami.topReferrers.length === 0 ? (
                  <p className="text-sm text-gray-400">데이터 없음</p>
                ) : (
                  <ul className="space-y-2">
                    {umami.topReferrers.map((r) => (
                      <li key={r.x} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 truncate max-w-[200px]">{r.x || '직접 유입'}</span>
                        <span className="text-gray-400 ml-4 shrink-0">{r.y.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
