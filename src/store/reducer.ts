import type { DrumMachineState, DrumMachineAction } from '../types'
import { DEFAULT_TRACKS } from '../constants/tracks'
import { DEFAULT_BPM, DEFAULT_STEP_COUNT, DEFAULT_MASTER_VOLUME } from '../constants/defaults'

function makeEmptySteps(count: number): boolean[] {
  return Array(count).fill(false)
}

function buildInitialSteps(count: number): Record<string, boolean[]> {
  return Object.fromEntries(DEFAULT_TRACKS.map(t => [t.id, makeEmptySteps(count)]))
}

export const initialState: DrumMachineState = {
  tracks: DEFAULT_TRACKS,
  steps: buildInitialSteps(DEFAULT_STEP_COUNT),
  stepCount: DEFAULT_STEP_COUNT,
  bpm: DEFAULT_BPM,
  masterVolume: DEFAULT_MASTER_VOLUME,
  isPlaying: false,
  currentStep: -1,
}

export function drumMachineReducer(
  state: DrumMachineState,
  action: DrumMachineAction,
): DrumMachineState {
  switch (action.type) {
    case 'TOGGLE_STEP': {
      const trackSteps = state.steps[action.trackId].slice()
      trackSteps[action.stepIndex] = !trackSteps[action.stepIndex]
      return { ...state, steps: { ...state.steps, [action.trackId]: trackSteps } }
    }

    case 'SET_BPM':
      return { ...state, bpm: Math.max(60, Math.min(200, action.bpm)) }

    case 'SET_MASTER_VOLUME':
      return { ...state, masterVolume: action.volume }

    case 'SET_TRACK_VOLUME':
      return {
        ...state,
        tracks: state.tracks.map(t =>
          t.id === action.trackId ? { ...t, volume: action.volume } : t,
        ),
      }

    case 'TOGGLE_MUTE':
      return {
        ...state,
        tracks: state.tracks.map(t =>
          t.id === action.trackId ? { ...t, muted: !t.muted } : t,
        ),
      }

    case 'TOGGLE_SOLO': {
      const isSoloed = state.tracks.find(t => t.id === action.trackId)?.soloed
      return {
        ...state,
        tracks: state.tracks.map(t =>
          t.id === action.trackId ? { ...t, soloed: !isSoloed } : t,
        ),
      }
    }

    case 'SET_PLAYING':
      return { ...state, isPlaying: action.isPlaying, currentStep: action.isPlaying ? state.currentStep : -1 }

    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.step }

    case 'SET_STEP_COUNT': {
      const newSteps: Record<string, boolean[]> = {}
      for (const [id, steps] of Object.entries(state.steps)) {
        if (action.count > state.stepCount) {
          // expand — pad with false
          newSteps[id] = [...steps, ...makeEmptySteps(action.count - state.stepCount)]
        } else {
          // shrink — truncate
          newSteps[id] = steps.slice(0, action.count)
        }
      }
      return { ...state, stepCount: action.count, steps: newSteps }
    }

    case 'CLEAR_ALL':
      return { ...state, steps: buildInitialSteps(state.stepCount) }

    case 'RANDOMIZE': {
      const density = action.density ?? 0.25
      const newSteps: Record<string, boolean[]> = {}
      for (const id of Object.keys(state.steps)) {
        newSteps[id] = Array.from({ length: state.stepCount }, () => Math.random() < density)
      }
      return { ...state, steps: newSteps }
    }

    default:
      return state
  }
}
