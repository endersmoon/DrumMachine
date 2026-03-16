export type SynthType =
  | 'kick'
  | 'snare'
  | 'hihat-closed'
  | 'hihat-open'
  | 'clap'
  | 'tom-lo'
  | 'tom-hi'
  | 'cowbell'

export interface Track {
  id: string
  name: string
  synthType: SynthType
  color: string
  volume: number   // 0–1
  muted: boolean
  soloed: boolean
}

export interface DrumMachineState {
  tracks: Track[]
  steps: Record<string, boolean[]>
  stepCount: 16 | 32
  bpm: number
  masterVolume: number
  isPlaying: boolean
  currentStep: number  // -1 when stopped
}

export type DrumMachineAction =
  | { type: 'TOGGLE_STEP'; trackId: string; stepIndex: number }
  | { type: 'SET_BPM'; bpm: number }
  | { type: 'SET_MASTER_VOLUME'; volume: number }
  | { type: 'SET_TRACK_VOLUME'; trackId: string; volume: number }
  | { type: 'TOGGLE_MUTE'; trackId: string }
  | { type: 'TOGGLE_SOLO'; trackId: string }
  | { type: 'SET_PLAYING'; isPlaying: boolean }
  | { type: 'SET_CURRENT_STEP'; step: number }
  | { type: 'SET_STEP_COUNT'; count: 16 | 32 }
  | { type: 'CLEAR_ALL' }
  | { type: 'RANDOMIZE'; density?: number }
