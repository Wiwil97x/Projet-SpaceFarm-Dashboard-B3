import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react'
import { cn } from '@/lib/cn'

interface SoundToggleProps {
  enabled: boolean
  onToggle: () => void
  className?: string
}

/** Must be clicked once: browsers refuse to play audio before a user gesture. */
function SoundToggle({ enabled, onToggle, className }: SoundToggleProps) {
  const Icon = enabled ? SpeakerHigh : SpeakerSlash

  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={onToggle}
      className={cn(
        'flex h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 active:scale-[0.98]',
        enabled
          ? 'border-accent-500/40 bg-accent-500/10 text-accent-400 hover:bg-accent-500/15'
          : 'border-space-600 text-ink-300 hover:border-ink-500 hover:text-ink-100',
        className,
      )}
    >
      <Icon size={18} weight="regular" aria-hidden />
      {enabled ? 'Son activé' : 'Activer le son'}
    </button>
  )
}

export default SoundToggle
