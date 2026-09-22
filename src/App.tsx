import { MotionConfig } from 'framer-motion'
import AlertBanner from '@/components/AlertBanner'
import Header from '@/components/Header'
import { useAlertSound } from '@/hooks/useAlertSound'
import { useFarm } from '@/hooks/useFarm'
import CrisisConsole from '@/sections/CrisisConsole'
import StatusSection from '@/sections/StatusSection'

function App() {
  const { state, thresholds, connected, error, actionError, setFanMode, toggleCrisis } = useFarm()
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
        {state && <CrisisConsole activeCrises={state.activeCrises} onToggle={toggleCrisis} />}
      </main>
    </MotionConfig>
  )
}

export default App
