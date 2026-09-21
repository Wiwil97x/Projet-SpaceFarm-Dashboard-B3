import { MotionConfig } from 'framer-motion'
import AlertBanner from '@/components/AlertBanner'
import Header from '@/components/Header'
import { useAlertSound } from '@/hooks/useAlertSound'
import { useFarm } from '@/hooks/useFarm'
import StatusSection from '@/sections/StatusSection'

function App() {
  const { state, thresholds, connected, error } = useFarm()
  const alerts = state?.alerts ?? []
  const sound = useAlertSound(alerts)

  return (
    <MotionConfig reducedMotion="user">
      <Header
        connected={connected}
        updatedAt={state?.updatedAt ?? null}
        soundEnabled={sound.enabled}
        onToggleSound={sound.toggle}
      />
      <main className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 pb-16">
        {error && (
          <p role="status" className="rounded-xl border border-warn-400/30 bg-warn-400/10 px-4 py-3 text-sm text-warn-400">
            {error}
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
        <StatusSection state={state} thresholds={thresholds} />
      </main>
    </MotionConfig>
  )
}

export default App
