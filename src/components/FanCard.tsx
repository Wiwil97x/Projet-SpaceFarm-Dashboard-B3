import { Fan } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { riseIn } from '@/lib/motionVariants'
import type { FanState } from '@/types/spacefarm'

interface FanCardProps {
  fan: FanState
  /** Safe mode: the device is silent and ventilation is forced to its minimum. */
  safeMode: boolean
  className?: string
}

function FanCard({ fan, safeMode, className }: FanCardProps) {
  const modeLabel = fan.mode === 'auto' ? 'Automatique' : 'Manuel'

  return (
    <motion.article
      variants={riseIn}
      aria-label="Ventilateurs"
      className={cn(
        'flex h-full flex-col justify-between gap-6 rounded-2xl border border-space-700/70 bg-space-900 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-ink-300">
          <Fan
            size={22}
            weight="regular"
            aria-hidden
            className={cn(fan.running && 'animate-spin text-accent-400 [animation-duration:1.4s]')}
          />
          <h2 className="text-base font-medium">Ventilateurs</h2>
        </div>
        <span className="rounded-full border border-space-600 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-ink-300">
          {modeLabel}
        </span>
      </header>

      <p
        className={cn(
          'text-4xl font-semibold leading-none tracking-tight',
          fan.running ? 'text-accent-400' : 'text-ink-100',
        )}
      >
        {fan.running ? 'En marche' : "À l'arrêt"}
      </p>

      <p className="text-sm text-ink-500">
        {safeMode
          ? 'Mode sûr : ventilation minimale forcée'
          : fan.mode === 'auto'
            ? 'Piloté par le seuil de température'
            : 'Commande manuelle active'}
      </p>
    </motion.article>
  )
}

export default FanCard
