import { MotionConfig } from 'framer-motion'
import { lazy, Suspense } from 'react'
import AlertBanner from '@/components/AlertBanner'
import Header from '@/components/Header'
import { useAlertSound } from '@/hooks/useAlertSound'
import { useFarm } from '@/hooks/useFarm'
import CrisisConsole from '@/sections/CrisisConsole'
import StatusSection from '@/sections/StatusSection'

// Recharts is heavy: split it out of the main bundle, it is only needed once the dashboard is up.
const HistorySection = lazy(() => import('@/sections/HistorySection'))

function App() {
  const { state, thresholds, connected, error, actionError, setFanMode, toggleCrisis } = useFarm()
  const alerts = state?.alerts ?? []
  const sound = useAlertSound(alerts)

  return (
    <MotionConfig reducedMotion="user">
      <Header
        connected={connected}
        updatedAt={state?.updatedAt ?? null}
        earthLink={state?.earthLink ?? null}
        soundEnabled={sound.enabled}
        onToggleSound={sound.toggle}
      />
      <main className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 pb-16">
        {(error ?? actionError) && (
          <p role="status" className="rounded-xl border border-warn/30 bg-warn-soft px-4 py-3 text-sm text-warn-strong">
            {error ?? actionError}
          </p>
        )}
        {state && (
          <AlertBanner
            alerts={alerts}
            measures={state.measures}
            soundEnabled={sound.enabled}
            onToggleSound={sound.toggle}
          />
        )}
        <StatusSection state={state} thresholds={thresholds} onSetFanMode={setFanMode} />
        <Suspense fallback={<div aria-hidden className="h-[420px] animate-pulse rounded-xl bg-surface-sunken" />}>
          <HistorySection thresholds={thresholds} />
        </Suspense>
        {state && <CrisisConsole activeCrises={state.activeCrises} onToggle={toggleCrisis} />}
      </main>
    </MotionConfig>
  )
}

export default App
