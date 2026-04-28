import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockWorks = [{ slug: 'project-a', created_at: '2024-01-01T00:00:00Z' }]
const mockBlogs = [{ slug: 'post-b', created_at: '2024-02-01T00:00:00Z' }]

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: (table: string) => ({
      select: () => ({
        eq: () =>
          Promise.resolve({
            data: table === 'work' ? mockWorks : mockBlogs,
          }),
      }),
    }),
  }),
}))

describe('sitemap', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://vinus.co.kr'
  })

  it('includes all static routes', async () => {
    const { default: sitemap } = await import('./sitemap')
    const entries = await sitemap()
    const urls = entries.map((e) => e.url)
    expect(urls).toContain('https://vinus.co.kr')
    expect(urls).toContain('https://vinus.co.kr/work')
    expect(urls).toContain('https://vinus.co.kr/blog')
    expect(urls).toContain('https://vinus.co.kr/we')
    expect(urls).toContain('https://vinus.co.kr/request')
  })

  it('includes published work and blog slugs', async () => {
    const { default: sitemap } = await import('./sitemap')
    const entries = await sitemap()
    const urls = entries.map((e) => e.url)
    expect(urls).toContain('https://vinus.co.kr/work/project-a')
    expect(urls).toContain('https://vinus.co.kr/blog/post-b')
  })
})
