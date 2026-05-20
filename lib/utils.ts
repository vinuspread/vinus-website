import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Block } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function getMetaTitle(title: string, metaTitle: string | null): string {
  return metaTitle || title
}

export function getMetaDescription(metaDescription: string | null, blocks: Block[]): string | null {
  if (metaDescription) return metaDescription
  const textBlock = blocks?.find((b) => b.type === 'text' || b.type === 'blog-text')
  if (textBlock && 'content' in textBlock) return String(textBlock.content).slice(0, 160)
  return null
}
