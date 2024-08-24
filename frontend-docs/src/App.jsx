import React from 'react'
import Background from './components/Background'
import Foreground from './components/Foreground'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className=' relative w-full h-screen bg-zinc-800' >
      <Background />
      <Foreground />
      <ToastContainer />
    </div>
  )
}

export default App