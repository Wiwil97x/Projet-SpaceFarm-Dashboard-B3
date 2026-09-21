import { Drop, Sun, Thermometer, Waves } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import RangeGauge from '@/components/RangeGauge'
import { cn } from '@/lib/cn'
import { formatRange, formatValue } from '@/lib/formatValue'
import { getSensorStatus, type SensorStatus } from '@/lib/getSensorStatus'
import { riseIn } from '@/lib/motionVariants'
import { SENSOR_META } from '@/lib/sensors'
import type { SensorKey, ThresholdRange } from '@/types/spacefarm'

type CardStatus = SensorStatus | 'nosignal'

interface StatusStyle {
  label: string
  text: string
  card: string
  fill: string
}

const STATUS_STYLE: Record<CardStatus, StatusStyle> = {
  ok: { label: 'Dans la plage', text: 'text-accent-400', card: 'border-space-700/70', fill: 'bg-accent-400' },
  near: { label: 'Proche du seuil', text: 'text-warn-400', card: 'border-warn-400/30', fill: 'bg-warn-400' },
  high: { label: 'Trop élevé', text: 'text-danger-400', card: 'border-danger-400/50 bg-danger-600/10', fill: 'bg-danger-400' },
  low: { label: 'Trop bas', text: 'text-danger-400', card: 'border-danger-400/50 bg-danger-600/10', fill: 'bg-danger-400' },
  none: { label: 'Sans seuil', text: 'text-ink-300', card: 'border-space-700/70', fill: 'bg-ink-300' },
  nosignal: { label: 'Sans signal', text: 'text-ink-500', card: 'border-space-700/70 opacity-60', fill: 'bg-ink-500' },
}

const SENSOR_ICON: Record<SensorKey, Icon> = {
  temperature: Thermometer,
  humidity: Drop,
  luminosity: Sun,
  waterLevel: Waves,
}

interface SensorCardProps {
  sensor: SensorKey
  value: number | null
  range: ThresholdRange
  /** True when the device is silent: the last value is stale. */
  noSignal: boolean
  size?: 'md' | 'lg'
  className?: string
}

function SensorCard({ sensor, value, range, noSignal, size = 'md', className }: SensorCardProps) {
  const meta = SENSOR_META[sensor]
  const SensorIcon = SENSOR_ICON[sensor]
  const scaleSpan = meta.scale.max - meta.scale.min
  const statusKey: CardStatus =
    noSignal || value === null ? 'nosignal' : getSensorStatus(value, range, scaleSpan)
  const status = STATUS_STYLE[statusKey]
  const isLarge = size === 'lg'

  return (
    <motion.article
      variants={riseIn}
      aria-label={meta.label}
      className={cn(
        'flex h-full flex-col justify-between gap-6 rounded-2xl border bg-space-900 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors duration-500',
        isLarge && 'sm:p-8',
        status.card,
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-ink-300">
          <SensorIcon size={isLarge ? 26 : 22} weight="regular" aria-hidden />
          <h2 className={cn('font-medium', isLarge ? 'text-lg' : 'text-base')}>{meta.label}</h2>
        </div>
        <span className={cn('flex items-center gap-2 text-sm font-medium', status.text)}>
          <span className={cn('size-2 rounded-full', status.fill)} aria-hidden />
          {status.label}
        </span>
      </header>

      <p
        className={cn(
          'flex items-baseline gap-2 font-semibold leading-none tracking-tighter tabular-nums',
          isLarge ? 'text-7xl sm:text-8xl' : 'text-5xl',
          statusKey === 'nosignal' ? 'text-ink-500' : 'text-ink-100',
        )}
      >
        {value === null ? '--' : formatValue(sensor, value)}
        <span className={cn('font-medium text-ink-300', isLarge ? 'text-3xl' : 'text-xl')}>{meta.unit}</span>
      </p>

      <div className="flex flex-col gap-3">
        <RangeGauge
          label={meta.label}
          value={noSignal ? null : value}
          range={range}
          scale={meta.scale}
          fillClassName={status.fill}
        />
        <p className="text-sm text-ink-500">
          Plage attendue : <span className="font-mono text-ink-300">{formatRange(sensor, range)}</span>
        </p>
      </div>
    </motion.article>
  )
}

export default SensorCard
