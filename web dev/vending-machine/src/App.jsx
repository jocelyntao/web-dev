import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/VendingMachine'
import VendingMachine from './components/VendingMachine'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <VendingMachine />
    </>
  )
}

export default App
