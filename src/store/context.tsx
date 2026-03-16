import { createContext, useReducer, type ReactNode } from 'react'
import { drumMachineReducer, initialState } from './reducer'
import type { DrumMachineState, DrumMachineAction } from '../types'

interface DrumMachineContextValue {
  state: DrumMachineState
  dispatch: React.Dispatch<DrumMachineAction>
}

export const DrumMachineContext = createContext<DrumMachineContextValue | null>(null)

export function DrumMachineProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(drumMachineReducer, initialState)
  return (
    <DrumMachineContext.Provider value={{ state, dispatch }}>
      {children}
    </DrumMachineContext.Provider>
  )
}
