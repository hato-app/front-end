import { useState } from 'react'
import './App.css'
import LoggedInOptions from './LoggedInOptions'

function App() {
  //types
  //useStates

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  //useEffects

  //handlers
  return (
    <> 
  
      <LoggedInOptions
        isLoggedIn = {isLoggedIn}
      />
    </>
  )
}

export default App
