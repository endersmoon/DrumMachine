import * as Tone from 'tone'
import type { Track } from '../types'
import { createSynth, triggerSynth, type DrumSynth } from './synths'

export class AudioEngine {
  private tracks: Track[]
  private synths: Map<string, DrumSynth> = new Map()
  private volumes: Map<string, Tone.Volume> = new Map()
  private masterVolume: Tone.Volume
  private sequences: Map<string, Tone.Sequence<number>> = new Map()
  private stepsRef: React.MutableRefObject<Record<string, boolean[]>>
  private onStep: (step: number) => void

  constructor(
    stepsRef: React.MutableRefObject<Record<string, boolean[]>>,
    tracks: Track[],
    stepCount: number,
    onStep: (step: number) => void,
  ) {
    this.stepsRef = stepsRef
    this.tracks = tracks
    this.onStep = onStep

    this.masterVolume = new Tone.Volume(-6).toDestination()

    for (const track of tracks) {
      const synth = createSynth(track.synthType)
      const vol = new Tone.Volume(this.linearToDb(track.volume)).connect(this.masterVolume)
      synth.connect(vol)
      this.synths.set(track.id, synth)
      this.volumes.set(track.id, vol)
    }

    this.buildSequences(stepCount)
  }

  private linearToDb(linear: number): number {
    if (linear <= 0) return -Infinity
    return 20 * Math.log10(linear)
  }

  private buildSequences(stepCount: number) {
    // Dispose existing
    for (const seq of this.sequences.values()) seq.dispose()
    this.sequences.clear()

    const indices = Array.from({ length: stepCount }, (_, i) => i)

    for (const track of this.tracks) {
      const seq = new Tone.Sequence(
        (time, stepIndex) => {
          const steps = this.stepsRef.current[track.id]
          if (!steps) return

          // hi-hat choke: when closed HH fires, release open HH
          if (track.synthType === 'hihat-closed' && steps[stepIndex]) {
            const openHH = this.synths.get('hihat-o')
            if (openHH instanceof Tone.MetalSynth) {
              openHH.triggerRelease(time)
            }
          }

          if (steps[stepIndex]) {
            const synth = this.synths.get(track.id)
            if (synth) triggerSynth(synth, track.synthType, time)
          }

          // Only fire the step callback once (from kick track)
          if (track.id === this.tracks[0].id) {
            Tone.getDraw().schedule(() => this.onStep(stepIndex), time)
          }
        },
        indices,
        '16n',
      )
      seq.loop = true
      this.sequences.set(track.id, seq)
    }
  }

  async start() {
    await Tone.start()
    for (const seq of this.sequences.values()) seq.start(0)
    Tone.getTransport().start()
  }

  stop() {
    Tone.getTransport().stop()
    Tone.getTransport().position = 0
    for (const seq of this.sequences.values()) seq.stop()
  }

  setBpm(bpm: number) {
    Tone.getTransport().bpm.value = bpm
  }

  setMasterVolume(linear: number) {
    this.masterVolume.volume.value = this.linearToDb(linear)
  }

  setTrackVolume(trackId: string, linear: number) {
    const vol = this.volumes.get(trackId)
    if (vol) vol.volume.value = this.linearToDb(linear)
  }

  setTrackMuted(trackId: string, muted: boolean) {
    const vol = this.volumes.get(trackId)
    if (vol) vol.mute = muted
  }

  setTrackSoloed(tracks: Track[]) {
    const anySoloed = tracks.some(t => t.soloed)
    for (const t of tracks) {
      const vol = this.volumes.get(t.id)
      if (vol) vol.mute = t.muted || (anySoloed && !t.soloed)
    }
  }

  rebuildSequences(stepCount: number) {
    const wasPlaying = Tone.getTransport().state === 'started'
    if (wasPlaying) {
      for (const seq of this.sequences.values()) seq.stop()
    }
    this.buildSequences(stepCount)
    if (wasPlaying) {
      for (const seq of this.sequences.values()) seq.start(0)
    }
  }

  dispose() {
    Tone.getTransport().stop()
    for (const seq of this.sequences.values()) seq.dispose()
    for (const synth of this.synths.values()) synth.dispose()
    for (const vol of this.volumes.values()) vol.dispose()
    this.masterVolume.dispose()
  }
}
