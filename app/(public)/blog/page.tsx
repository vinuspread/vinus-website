import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Blog } from '@/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: '바이너스프레드의 이야기와 프로젝트 노트',
}

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog')
    .select('id, slug, title, category, thumbnail_url, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  const blogs = (posts ?? []) as Blog[]

  return (
    <main className="bg-gallery">
      {/* Page Header */}
      <section className="pt-[140px] pb-[80px] px-page-padding border-b border-alto">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-column">
          <div className="md:col-span-8 mb-[60px]">
            <h1 className="text-[83.5px] md:text-[120px] leading-[0.89] tracking-[-4px] uppercase">
              BLOG
            </h1>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="px-page-padding py-[80px]">
        {blogs.length === 0 ? (
          <p className="text-[15px] text-mine-shaft/40 uppercase tracking-wider">No posts yet.</p>
        ) : (
          <div className="border-t border-alto">
            {blogs.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="grid grid-cols-8 gap-column items-start py-[40px] border-b border-alto group"
              >
                <div className="col-span-2">
                  {post.thumbnail_url ? (
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={post.thumbnail_url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-alto" />
                  )}
                </div>
                <div className="col-span-5 col-start-4 flex flex-col gap-4 pt-2">
                  {post.category && (
                    <p className="text-[11px] uppercase tracking-widest text-mine-shaft/40">
                      {post.category}
                    </p>
                  )}
                  <h2 className="text-[28px] md:text-[36px] tracking-[-1px] leading-[1.1] uppercase group-hover:opacity-60 transition-opacity">
                    {post.title}
                  </h2>
                  <p className="text-[13px] text-mine-shaft/40 uppercase tracking-wider">
                    {new Date(post.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="col-span-1 flex justify-end pt-2">
                  <span className="text-[20px] group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
