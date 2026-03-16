import { Shuffle, Trash2 } from 'lucide-react'
import { useDrumMachine } from '../../hooks/useDrumMachine'
import { Button } from '../ui/button'

interface PatternControlsProps {
  onStepCountChange?: (count: 16 | 32) => void
}

export function PatternControls({ onStepCountChange }: PatternControlsProps) {
  const { state, dispatch } = useDrumMachine()

  function handleStepCount(count: 16 | 32) {
    dispatch({ type: 'SET_STEP_COUNT', count })
    onStepCountChange?.(count)
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Step count toggle */}
      <div className="flex items-center rounded border border-[#2a2a2a] overflow-hidden">
        {([16, 32] as const).map(n => (
          <button
            key={n}
            onClick={() => handleStepCount(n)}
            className={`px-3 py-1 text-[10px] font-bold tracking-widest transition-colors ${
              state.stepCount === n
                ? 'bg-[#333] text-[#ccc]'
                : 'bg-transparent text-[#555] hover:text-[#888]'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => dispatch({ type: 'RANDOMIZE', density: 0.25 })}
        className="gap-1.5 text-[10px] text-[#666] hover:text-[#aaa] tracking-widest"
      >
        <Shuffle size={11} />
        RANDOMIZE
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => dispatch({ type: 'CLEAR_ALL' })}
        className="gap-1.5 text-[10px] text-[#666] hover:text-red-400 tracking-widest"
      >
        <Trash2 size={11} />
        CLEAR
      </Button>
    </div>
  )
}
