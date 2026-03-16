import type { Track } from '../../types'
import { Button } from '../ui/button'
import { Slider } from '../ui/slider'
import { cn } from '../../lib/utils'

interface TrackControlsProps {
  track: Track
  onMuteToggle: () => void
  onSoloToggle: () => void
  onVolumeChange: (value: number) => void
  anySoloed: boolean
}

export function TrackControls({
  track,
  onMuteToggle,
  onSoloToggle,
  onVolumeChange,
  anySoloed,
}: TrackControlsProps) {
  const isEffectiveMuted = track.muted || (anySoloed && !track.soloed)

  return (
    <div className="flex items-center gap-1.5 w-[140px] shrink-0">
      {/* Color dot + track name */}
      <div
        className="h-2.5 w-2.5 rounded-full shrink-0"
        style={{ backgroundColor: track.color, boxShadow: `0 0 4px ${track.color}` }}
      />
      <span
        className={cn(
          'w-[44px] text-[10px] font-bold tracking-widest shrink-0',
          isEffectiveMuted ? 'text-[#444]' : 'text-[#999]',
        )}
      >
        {track.name}
      </span>

      {/* Volume slider */}
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={[track.volume]}
        onValueChange={([v]) => onVolumeChange(v)}
        className="w-16"
      />

      {/* Mute */}
      <Button
        size="sm"
        variant="ghost"
        onClick={onMuteToggle}
        className={cn(
          'h-5 w-5 p-0 text-[9px] font-bold rounded',
          track.muted
            ? 'bg-red-600/80 text-white hover:bg-red-600'
            : 'text-[#555] hover:text-[#999]',
        )}
        title="Mute"
      >
        M
      </Button>

      {/* Solo */}
      <Button
        size="sm"
        variant="ghost"
        onClick={onSoloToggle}
        className={cn(
          'h-5 w-5 p-0 text-[9px] font-bold rounded',
          track.soloed
            ? 'bg-yellow-500/80 text-black hover:bg-yellow-500'
            : 'text-[#555] hover:text-[#999]',
        )}
        title="Solo"
      >
        S
      </Button>
    </div>
  )
}
