// lib/utils.ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return ''
  return `${date.getUTCFullYear()}.${String(date.getUTCMonth() + 1).padStart(2, '0')}`
}

export function getMetaTitle(title: string, metaTitle: string | null): string {
  return metaTitle ?? `${title} | 바이너스프레드`
}

export function getMetaDescription(description: string | null): string {
  return description ?? '웹 개발 및 디자인 전문 스튜디오, 맞춤형 웹사이트 제작과 창의적인 디자인 솔루션 제공'
}
