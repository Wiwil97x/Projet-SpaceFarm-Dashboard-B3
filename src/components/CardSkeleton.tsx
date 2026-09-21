import { cn } from '@/lib/cn'

interface CardSkeletonProps {
  className?: string
}

/** Loading placeholder with the same footprint as a status card. */
function CardSkeleton({ className }: CardSkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'flex h-full min-h-44 animate-pulse flex-col justify-between gap-6 rounded-2xl border border-space-700/70 bg-space-900 p-6',
        className,
      )}
    >
      <div className="h-4 w-1/3 rounded bg-space-800" />
      <div className="h-10 w-1/2 rounded bg-space-800" />
      <div className="h-3 w-full rounded-full bg-space-800" />
    </div>
  )
}

export default CardSkeleton
