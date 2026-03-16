import { cn } from '../../lib/utils'

interface StepButtonProps {
  active: boolean
  playing: boolean
  groupStart: boolean
  color: string
  onClick: () => void
}

export function StepButton({ active, playing, groupStart, color, onClick }: StepButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative h-8 w-full rounded-sm border transition-all duration-75 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40',
        groupStart && 'ml-1',
        active
          ? 'border-transparent shadow-lg'
          : 'border-[#2a2a2a] bg-[#1a1a1a] hover:bg-[#222]',
        playing && 'ring-2 ring-white/60',
      )}
      style={active ? { backgroundColor: color, boxShadow: `0 0 8px ${color}66` } : undefined}
    >
      {/* playing indicator overlay */}
      {playing && (
        <span
          className="pointer-events-none absolute inset-0 rounded-sm bg-white/20"
        />
      )}
    </button>
  )
}
