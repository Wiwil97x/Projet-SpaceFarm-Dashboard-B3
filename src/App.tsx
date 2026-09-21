import { MotionConfig } from 'framer-motion'
import Header from '@/components/Header'
import { useFarm } from '@/hooks/useFarm'
import StatusSection from '@/sections/StatusSection'

function App() {
  const { state, thresholds, connected, error } = useFarm()

  return (
    <MotionConfig reducedMotion="user">
      <Header connected={connected} updatedAt={state?.updatedAt ?? null} />
      <main className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 pb-16">
        {error && (
          <p role="status" className="rounded-xl border border-warn-400/30 bg-warn-400/10 px-4 py-3 text-sm text-warn-400">
            {error}
          </p>
        )}
        <StatusSection state={state} thresholds={thresholds} />
      </main>
    </MotionConfig>
  )
}

export default App
