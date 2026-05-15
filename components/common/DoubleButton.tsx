import Link from 'next/link'
import { cn } from '@/lib/utils'

interface DoubleButtonProps {
  labelFront: string
  href?: string
  className?: string
}

export function DoubleButton({ labelFront, href = '#', className }: DoubleButtonProps) {
  return (
    <Link href={href} className={cn('btn-front', className)}>
      {labelFront}
    </Link>
  )
}
