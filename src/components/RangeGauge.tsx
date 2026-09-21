import { cn } from '@/lib/cn'
import type { ThresholdRange } from '@/types/spacefarm'

interface RangeGaugeProps {
  label: string
  value: number | null
  range: ThresholdRange
  scale: { min: number; max: number }
  fillClassName: string
}

function toPercent(value: number, scale: { min: number; max: number }): number {
  const ratio = (value - scale.min) / (scale.max - scale.min)
  return Math.min(1, Math.max(0, ratio)) * 100
}

/** Bar filled up to the value, with the allowed band drawn as a bracket behind it. */
function RangeGauge({ label, value, range, scale, fillClassName }: RangeGaugeProps) {
  const bandStart = range.min === null ? 0 : toPercent(range.min, scale)
  const bandEnd = range.max === null ? 100 : toPercent(range.max, scale)
  const hasBand = range.min !== null || range.max !== null
  const fill = value === null ? 0 : toPercent(value, scale) / 100

  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={scale.min}
      aria-valuemax={scale.max}
      aria-valuenow={value ?? undefined}
      className="relative h-3 w-full rounded-full bg-space-800"
    >
      {hasBand && (
        <div
          className="absolute inset-y-0 rounded-full border border-ink-300/30 bg-ink-100/5"
          style={{ left: `${bandStart}%`, width: `${bandEnd - bandStart}%` }}
        />
      )}
      <div className="absolute inset-x-0 inset-y-1 overflow-hidden rounded-full">
        <div
          className={cn(
            'h-full w-full origin-left rounded-full transition-transform duration-700 ease-out',
            fillClassName,
          )}
          style={{ transform: `scaleX(${fill})` }}
        />
      </div>
    </div>
  )
}

export default RangeGauge
