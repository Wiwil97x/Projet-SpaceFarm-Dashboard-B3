import { ArrowCounterClockwise, Drop, Fire, Flask, Plugs, WifiSlash } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { useState } from 'react'
import { cn } from '@/lib/cn'
import { CRISIS_META, CRISIS_TYPES } from '@/lib/crises'
import type { CrisisRequest, CrisisType } from '@/types/spacefarm'

const CRISIS_ICON: Record<CrisisType, Icon> = {
  overheat: Fire,
  earth_cut: WifiSlash,
  sensor_mute: Plugs,
  low_water: Drop,
}

interface CrisisConsoleProps {
  activeCrises: CrisisType[]
  onToggle: (request: CrisisRequest) => Promise<void>
}

/** Demo tool: simulates incidents so the jury can watch the farm react. */
function CrisisConsole({ activeCrises, onToggle }: CrisisConsoleProps) {
  const [busy, setBusy] = useState(false)

  const run = async (requests: CrisisRequest[]) => {
    if (busy) return
    setBusy(true)
    for (const request of requests) await onToggle(request)
    setBusy(false)
  }

  return (
    <section
      aria-label="Console de crise"
      className="flex flex-col gap-5 rounded-xl border border-dashed border-line-strong p-6"
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Flask size={22} weight="regular" aria-hidden className="text-ink-600" />
          <div>
            <h2 className="text-base font-medium text-ink-900">Console de crise</h2>
            <p className="text-sm text-ink-400">Démonstration : simule un incident sur la serre</p>
          </div>
        </div>
        <button
          type="button"
          disabled={busy || activeCrises.length === 0}
          onClick={() => void run(activeCrises.map((type) => ({ type, active: false })))}
          className="flex h-10 cursor-pointer items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium text-ink-600 transition-colors duration-200 hover:border-ink-600 hover:bg-surface-sunken hover:text-ink-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowCounterClockwise size={18} weight="regular" aria-hidden />
          Tout réinitialiser
        </button>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CRISIS_TYPES.map((type) => {
          const { label, description } = CRISIS_META[type]
          const CrisisIcon = CRISIS_ICON[type]
          const active = activeCrises.includes(type)
          return (
            <button
              key={type}
              type="button"
              aria-pressed={active}
              disabled={busy}
              onClick={() => void run([{ type, active: !active }])}
              className={cn(
                'relative flex cursor-pointer flex-col items-start gap-3 overflow-hidden rounded-lg border p-4 text-left transition-colors duration-200 active:scale-[0.98] disabled:cursor-wait',
                active
                  ? 'border-danger/40 bg-danger-soft'
                  : 'border-line bg-surface hover:border-line-strong hover:bg-surface-sunken',
              )}
            >
              {active && <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-danger" />}
              <span className="flex w-full items-center justify-between gap-2">
                <CrisisIcon
                  size={24}
                  weight={active ? 'fill' : 'regular'}
                  aria-hidden
                  className={active ? 'text-danger' : 'text-ink-600'}
                />
                <span
                  className={cn(
                    'text-xs font-medium uppercase tracking-wider',
                    active ? 'text-danger-strong' : 'text-ink-400',
                  )}
                >
                  {active ? 'En cours' : 'Déclencher'}
                </span>
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-base font-medium text-ink-900">{label}</span>
                <span className="text-sm text-ink-400">{description}</span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default CrisisConsole
