import { useContext } from 'react'
import { DrumMachineContext } from '../store/context'

export function useDrumMachine() {
  const ctx = useContext(DrumMachineContext)
  if (!ctx) throw new Error('useDrumMachine must be used inside DrumMachineProvider')
  return ctx
}
