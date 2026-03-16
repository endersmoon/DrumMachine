import type { Track } from '../types'

export const DEFAULT_TRACKS: Track[] = [
  { id: 'kick',        name: 'KICK',   synthType: 'kick',        color: '#ef4444', volume: 0.9, muted: false, soloed: false },
  { id: 'snare',       name: 'SNARE',  synthType: 'snare',       color: '#f97316', volume: 0.8, muted: false, soloed: false },
  { id: 'hihat-c',     name: 'HH-C',   synthType: 'hihat-closed',color: '#eab308', volume: 0.6, muted: false, soloed: false },
  { id: 'hihat-o',     name: 'HH-O',   synthType: 'hihat-open',  color: '#84cc16', volume: 0.5, muted: false, soloed: false },
  { id: 'clap',        name: 'CLAP',   synthType: 'clap',        color: '#06b6d4', volume: 0.7, muted: false, soloed: false },
  { id: 'tom-lo',      name: 'TOM-L',  synthType: 'tom-lo',      color: '#8b5cf6', volume: 0.8, muted: false, soloed: false },
  { id: 'tom-hi',      name: 'TOM-H',  synthType: 'tom-hi',      color: '#ec4899', volume: 0.8, muted: false, soloed: false },
  { id: 'cowbell',     name: 'COWBEL', synthType: 'cowbell',     color: '#14b8a6', volume: 0.6, muted: false, soloed: false },
]
