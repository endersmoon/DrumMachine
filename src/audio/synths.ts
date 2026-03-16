import * as Tone from 'tone'
import type { SynthType } from '../types'

export type DrumSynth =
  | Tone.MembraneSynth
  | Tone.NoiseSynth
  | Tone.MetalSynth

export function createSynth(type: SynthType): DrumSynth {
  switch (type) {
    case 'kick':
      return new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 10,
        envelope: { attack: 0.001, decay: 0.4, sustain: 0, release: 0.1 },
      })

    case 'snare':
      return new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.13, sustain: 0, release: 0.05 },
      })

    case 'hihat-closed': {
      const hhc = new Tone.MetalSynth({
        envelope: { attack: 0.001, decay: 0.02, release: 0.01 },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5,
      })
      hhc.frequency.value = 400
      return hhc
    }

    case 'hihat-open': {
      const hho = new Tone.MetalSynth({
        envelope: { attack: 0.001, decay: 0.35, release: 0.1 },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5,
      })
      hho.frequency.value = 400
      return hho
    }

    case 'clap':
      return new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.15, sustain: 0, release: 0.08 },
      })

    case 'tom-lo':
      return new Tone.MembraneSynth({
        pitchDecay: 0.08,
        octaves: 6,
        envelope: { attack: 0.001, decay: 0.35, sustain: 0, release: 0.1 },
      })

    case 'tom-hi':
      return new Tone.MembraneSynth({
        pitchDecay: 0.06,
        octaves: 5,
        envelope: { attack: 0.001, decay: 0.25, sustain: 0, release: 0.08 },
      })

    case 'cowbell': {
      const cb = new Tone.MetalSynth({
        envelope: { attack: 0.001, decay: 0.3, release: 0.1 },
        harmonicity: 5.1,
        modulationIndex: 16,
        resonance: 3200,
        octaves: 0.5,
      })
      cb.frequency.value = 562
      return cb
    }
  }
}

/** Trigger a drum synth. MembraneSynth needs pitch, others don't. */
export function triggerSynth(synth: DrumSynth, type: SynthType, time: number) {
  if (synth instanceof Tone.MembraneSynth) {
    const pitch = type === 'tom-lo' ? 'G1' : type === 'tom-hi' ? 'D2' : 'C1'
    synth.triggerAttackRelease(pitch, '16n', time)
  } else if (synth instanceof Tone.NoiseSynth) {
    synth.triggerAttackRelease('16n', time)
  } else if (synth instanceof Tone.MetalSynth) {
    synth.triggerAttackRelease('16n', time)
  }
}
