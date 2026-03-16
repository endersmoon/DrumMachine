import { useDrumMachine } from '../../hooks/useDrumMachine'
import { TrackRow } from './TrackRow'

export function SequencerGrid() {
  const { state } = useDrumMachine()
  const anySoloed = state.tracks.some(t => t.soloed)

  return (
    <div className="flex flex-col gap-0.5 overflow-x-auto pb-1">
      {state.tracks.map(track => (
        <TrackRow
          key={track.id}
          track={track}
          steps={state.steps[track.id]}
          currentStep={state.currentStep}
          anySoloed={anySoloed}
        />
      ))}
    </div>
  )
}
