// lib/utils.test.ts
import { describe, it, expect } from 'vitest'
import { slugify, formatDate, getMetaTitle, getMetaDescription } from './utils'

describe('slugify', () => {
  it('converts spaces to hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })
  it('removes special characters', () => {
    expect(slugify('Hello! World@2024')).toBe('hello-world2024')
  })
  it('collapses multiple hyphens', () => {
    expect(slugify('Hello  World')).toBe('hello-world')
  })
  it('removes leading and trailing hyphens', () => {
    expect(slugify('  hello  ')).toBe('hello')
  })
})

describe('formatDate', () => {
  it('formats to YYYY.MM', () => {
    expect(formatDate('2024-03-15T00:00:00Z')).toBe('2024.03')
  })
  it('returns empty string for invalid date', () => {
    expect(formatDate('invalid')).toBe('')
  })
})

describe('getMetaTitle', () => {
  it('uses metaTitle when provided', () => {
    expect(getMetaTitle('Project', 'Custom Title')).toBe('Custom Title')
  })
  it('falls back to title with suffix', () => {
    expect(getMetaTitle('Project', null)).toBe('Project | 바이너스프레드')
  })
})

describe('getMetaDescription', () => {
  it('returns default when null', () => {
    const result = getMetaDescription(null)
    expect(result).toContain('디자인 솔루션')
  })
  it('returns custom description when provided', () => {
    expect(getMetaDescription('Custom desc')).toBe('Custom desc')
  })
})
