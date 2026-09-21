import { Fan } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/cn'
import { riseIn } from '@/lib/motionVariants'
import type { FanMode, FanState } from '@/types/spacefarm'

interface FanCardProps {
  fan: FanState
  /** Safe mode: the device is silent and ventilation is forced to its minimum. */
  safeMode: boolean
  onSetMode: (mode: FanMode) => Promise<void>
  className?: string
}

const MODE_OPTIONS: { mode: FanMode; label: string }[] = [
  { mode: 'auto', label: 'Auto' },
  { mode: 'on', label: 'Marche' },
  { mode: 'off', label: 'Arrêt' },
]

function FanCard({ fan, safeMode, onSetMode, className }: FanCardProps) {
  const [busy, setBusy] = useState(false)
  const modeLabel = fan.mode === 'auto' ? 'Automatique' : 'Manuel'

  const handleSelect = async (mode: FanMode) => {
    if (busy || mode === fan.mode) return
    setBusy(true)
    await onSetMode(mode)
    setBusy(false)
  }

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

      <div
        role="radiogroup"
        aria-label="Mode des ventilateurs"
        className="relative grid grid-cols-3 gap-1 rounded-xl bg-space-800 p-1"
      >
        {MODE_OPTIONS.map(({ mode, label }) => {
          const selected = fan.mode === mode
          return (
            <button
              key={mode}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={busy}
              onClick={() => void handleSelect(mode)}
              className={cn(
                'relative h-10 cursor-pointer rounded-lg text-sm font-medium transition-colors duration-200 active:scale-[0.98] disabled:cursor-wait',
                selected ? 'text-ink-100' : 'text-ink-500 hover:text-ink-300',
              )}
            >
              {selected && (
                <motion.span
                  layoutId="fan-mode-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-lg bg-space-600"
                />
              )}
              <span className="relative">{label}</span>
            </button>
          )
        })}
      </div>
    </motion.article>
  )
}

export default FanCard
