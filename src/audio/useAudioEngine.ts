import { useEffect, useRef, useCallback } from 'react'
import type { DrumMachineState, DrumMachineAction } from '../types'
import { AudioEngine } from './engine'

export function useAudioEngine(
  state: DrumMachineState,
  dispatch: React.Dispatch<DrumMachineAction>,
) {
  const engineRef = useRef<AudioEngine | null>(null)
  const stepsRef = useRef<Record<string, boolean[]>>(state.steps)

  // Keep stepsRef always in sync with state
  stepsRef.current = state.steps

  // Create engine once on mount
  useEffect(() => {
    const onStep = (step: number) => {
      dispatch({ type: 'SET_CURRENT_STEP', step })
    }

    engineRef.current = new AudioEngine(
      stepsRef,
      state.tracks,
      state.stepCount,
      onStep,
    )

    engineRef.current.setBpm(state.bpm)
    engineRef.current.setMasterVolume(state.masterVolume)

    return () => {
      engineRef.current?.dispose()
      engineRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync BPM
  useEffect(() => {
    engineRef.current?.setBpm(state.bpm)
  }, [state.bpm])

  // Sync master volume
  useEffect(() => {
    engineRef.current?.setMasterVolume(state.masterVolume)
  }, [state.masterVolume])

  // Sync per-track volumes
  useEffect(() => {
    for (const track of state.tracks) {
      engineRef.current?.setTrackVolume(track.id, track.volume)
    }
  }, [state.tracks])

  // Sync mute/solo
  useEffect(() => {
    engineRef.current?.setTrackSoloed(state.tracks)
    // Also apply individual mutes
    for (const track of state.tracks) {
      const anySoloed = state.tracks.some(t => t.soloed)
      const effectiveMute = track.muted || (anySoloed && !track.soloed)
      engineRef.current?.setTrackMuted(track.id, effectiveMute)
    }
  }, [state.tracks])

  // Sync step count — rebuild sequences when it changes
  const prevStepCount = useRef(state.stepCount)
  useEffect(() => {
    if (prevStepCount.current !== state.stepCount) {
      engineRef.current?.rebuildSequences(state.stepCount)
      prevStepCount.current = state.stepCount
    }
  }, [state.stepCount])

  const handlePlayStop = useCallback(async () => {
    const engine = engineRef.current
    if (!engine) return

    if (state.isPlaying) {
      engine.stop()
      dispatch({ type: 'SET_PLAYING', isPlaying: false })
    } else {
      dispatch({ type: 'SET_PLAYING', isPlaying: true })
      await engine.start()
    }
  }, [state.isPlaying, dispatch])

  return { handlePlayStop }
}
