import { Play, Square } from 'lucide-react'
import { cn } from '../../lib/utils'

interface PlayStopButtonProps {
  isPlaying: boolean
  onClick: () => void
}

export function PlayStopButton({ isPlaying, onClick }: PlayStopButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-4 py-2 rounded font-bold text-xs tracking-widest transition-all',
        isPlaying
          ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/40'
          : 'bg-[#2a6e2a] hover:bg-[#2f7d2f] text-[#7fff7f] shadow-lg shadow-green-900/30',
      )}
    >
      {isPlaying ? (
        <>
          <Square size={12} strokeWidth={2.5} />
          STOP
        </>
      ) : (
        <>
          <Play size={12} strokeWidth={2.5} />
          PLAY
        </>
      )}
    </button>
  )
}
