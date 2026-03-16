import { PlayStopButton } from './PlayStopButton'
import { BpmControl } from './BpmControl'
import { VolumeControl } from './VolumeControl'

interface TransportBarProps {
  isPlaying: boolean
  onPlayStop: () => void
  onBpmChange?: (bpm: number) => void
  onVolumeChange?: (volume: number) => void
}

export function TransportBar({ isPlaying, onPlayStop, onBpmChange, onVolumeChange }: TransportBarProps) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <PlayStopButton isPlaying={isPlaying} onClick={onPlayStop} />
      <div className="w-px h-6 bg-[#2a2a2a]" />
      <BpmControl onBpmChange={onBpmChange} />
      <div className="w-px h-6 bg-[#2a2a2a]" />
      <VolumeControl onVolumeChange={onVolumeChange} />
    </div>
  )
}
