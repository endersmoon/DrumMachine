import { useDrumMachine } from '../../hooks/useDrumMachine'
import type { Track } from '../../types'
import { TrackControls } from './TrackControls'
import { StepButton } from './StepButton'

interface TrackRowProps {
  track: Track
  steps: boolean[]
  currentStep: number
  anySoloed: boolean
}

export function TrackRow({ track, steps, currentStep, anySoloed }: TrackRowProps) {
  const { dispatch } = useDrumMachine()

  return (
    <div className="flex items-center gap-2 py-0.5">
      <TrackControls
        track={track}
        anySoloed={anySoloed}
        onMuteToggle={() => dispatch({ type: 'TOGGLE_MUTE', trackId: track.id })}
        onSoloToggle={() => dispatch({ type: 'TOGGLE_SOLO', trackId: track.id })}
        onVolumeChange={v => dispatch({ type: 'SET_TRACK_VOLUME', trackId: track.id, volume: v })}
      />

      {/* Step buttons — grouped in sets of 4 */}
      <div className="flex flex-1 gap-0.5">
        {steps.map((active, i) => (
          <StepButton
            key={i}
            active={active}
            playing={currentStep === i}
            groupStart={i > 0 && i % 4 === 0}
            color={track.color}
            onClick={() => dispatch({ type: 'TOGGLE_STEP', trackId: track.id, stepIndex: i })}
          />
        ))}
      </div>
    </div>
  )
}
