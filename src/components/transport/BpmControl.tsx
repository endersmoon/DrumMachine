import { useDrumMachine } from '../../hooks/useDrumMachine'
import { Slider } from '../ui/slider'
import { MIN_BPM, MAX_BPM } from '../../constants/defaults'

interface BpmControlProps {
  onBpmChange?: (bpm: number) => void
}

export function BpmControl({ onBpmChange }: BpmControlProps) {
  const { state, dispatch } = useDrumMachine()

  function handleChange(bpm: number) {
    dispatch({ type: 'SET_BPM', bpm })
    onBpmChange?.(bpm)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-[#666] tracking-widest w-8">BPM</span>
      <Slider
        min={MIN_BPM}
        max={MAX_BPM}
        step={1}
        value={[state.bpm]}
        onValueChange={([v]) => handleChange(v)}
        className="w-28"
      />
      <input
        type="number"
        min={MIN_BPM}
        max={MAX_BPM}
        value={state.bpm}
        onChange={e => handleChange(Number(e.target.value))}
        className="w-12 bg-[#1a1a1a] border border-[#333] rounded px-1.5 py-0.5 text-[11px] text-[#ccc] text-center focus:outline-none focus:border-[#555]"
      />
    </div>
  )
}
