import { DrumMachineProvider } from './store/context'
import { DrumMachine } from './components/DrumMachine'

function App() {
  return (
    <DrumMachineProvider>
      <DrumMachine />
    </DrumMachineProvider>
  )
}

export default App
