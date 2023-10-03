import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginForm from './Components/LoginForm'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <LoginForm/>
    </div>
  );
}

export default App;