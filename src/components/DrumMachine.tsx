import { useDrumMachine } from '../hooks/useDrumMachine'
import { useAudioEngine } from '../audio/useAudioEngine'
import { TransportBar } from './transport/TransportBar'
import { SequencerGrid } from './sequencer/SequencerGrid'
import { PatternControls } from './patterns/PatternControls'

export function DrumMachine() {
  const { state, dispatch } = useDrumMachine()
  const { handlePlayStop } = useAudioEngine(state, dispatch)

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--machine-bg)' }}
    >
      <div
        className="w-full max-w-5xl rounded-xl border border-[#2a2a2a] shadow-2xl"
        style={{ backgroundColor: 'var(--machine-panel)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#222]">
          <div className="flex items-center gap-3">
            {/* Power LED */}
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: state.isPlaying ? '#22c55e' : '#1a3a1a',
                boxShadow: state.isPlaying ? '0 0 6px #22c55e' : 'none',
              }}
            />
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#555]">
              DRUM MACHINE
            </span>
            <span className="text-[9px] tracking-[0.2em] text-[#333]">808</span>
          </div>
          <div className="text-[9px] text-[#333] tracking-widest">
            {state.stepCount} STEPS
          </div>
        </div>

        {/* Transport + Pattern controls */}
        <div className="flex items-center justify-between flex-wrap gap-3 px-5 py-3 border-b border-[#1e1e1e]">
          <TransportBar
            isPlaying={state.isPlaying}
            onPlayStop={handlePlayStop}
          />
          <PatternControls />
        </div>

        {/* Step number indicators */}
        <div className="flex items-center px-5 pt-2 pb-0.5">
          <div className="w-[140px] shrink-0" />
          <div className="flex flex-1 gap-0.5">
            {Array.from({ length: state.stepCount }, (_, i) => (
              <div
                key={i}
                className={`flex-1 text-center text-[8px] ${
                  i % 4 === 0 ? 'text-[#555]' : 'text-[#333]'
                } ${i > 0 && i % 4 === 0 ? 'ml-1' : ''}`}
              >
                {i % 4 === 0 ? i + 1 : '·'}
              </div>
            ))}
          </div>
        </div>

        {/* Sequencer grid */}
        <div className="px-5 py-3">
          <SequencerGrid />
        </div>

        {/* Footer */}
        <div className="px-5 py-2 border-t border-[#1e1e1e] flex items-center gap-2">
          <div className="text-[8px] text-[#333] tracking-widest">
            {state.bpm} BPM · {state.stepCount} STEPS
          </div>
        </div>
      </div>
    </div>
  )
}
