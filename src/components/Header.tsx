import { Plant } from '@phosphor-icons/react'
import SoundToggle from '@/components/SoundToggle'
import { cn } from '@/lib/cn'

interface HeaderProps {
  connected: boolean
  updatedAt: string | null
  soundEnabled: boolean
  onToggleSound: () => void
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('fr-FR')
}

function Header({ connected, updatedAt, soundEnabled, onToggleSound }: HeaderProps) {
  return (
    <header className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-6">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-accent-500/15 text-accent-400">
          <Plant size={26} weight="regular" aria-hidden />
        </span>
        <div>
          <h1 className="text-2xl font-semibold leading-none tracking-tight">SpaceFarm</h1>
          <p className="mt-1 text-sm text-ink-500">Serre hydroponique autonome</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-ink-300">
        <span className="flex items-center gap-2">
          <span className="relative flex size-2.5" aria-hidden>
            {connected && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-60" />
            )}
            <span
              className={cn('relative inline-flex size-2.5 rounded-full', connected ? 'bg-accent-400' : 'bg-danger-400')}
            />
          </span>
          {connected ? 'Serveur connecté' : 'Serveur injoignable'}
        </span>
        {updatedAt && <span className="font-mono text-ink-500">Maj {formatTime(updatedAt)}</span>}
        <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} />
      </div>
    </header>
  )
}

export default Header
