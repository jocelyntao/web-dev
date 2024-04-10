import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Welcome from './Welcome'

function App() {
  const [count, setCount] = useState(0);
  const names = [1, 2, 3];

  // function onClick() {
  //   setCount(count+1);
  //   // alert('hello world!');
  // }

  return (
  <div>
    {names.map((name) => {
      return <Welcome name = {name}/>
    })}
    <p>Current count: {count}</p>
    <button onClick={() => setCount(count+1)}>Do Something</button>
    {/* <Welcome name = '!!'/> */}
    
  </div>);
}

export default App
