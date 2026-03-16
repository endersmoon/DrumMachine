import { useDrumMachine } from '../../hooks/useDrumMachine'
import { Slider } from '../ui/slider'

interface VolumeControlProps {
  onVolumeChange?: (volume: number) => void
}

export function VolumeControl({ onVolumeChange }: VolumeControlProps) {
  const { state, dispatch } = useDrumMachine()

  function handleChange(v: number) {
    dispatch({ type: 'SET_MASTER_VOLUME', volume: v })
    onVolumeChange?.(v)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-[#666] tracking-widest w-8">VOL</span>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={[state.masterVolume]}
        onValueChange={([v]) => handleChange(v)}
        className="w-20"
      />
    </div>
  )
}
