import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import AllPastes from './components/AllPastes'
import ViewPaste from './components/ViewPaste'

function App() {
  
  const router = createBrowserRouter([
    {
      path : "/",
      element : 
      <div>
         <Navbar/>
         <Home/>
      </div>
    },
    {
      path : "/pastes",
      element : 
      <div>
        <Navbar/>
        <AllPastes/>
      </div>
    },
    {
      path : "/pastes/:id",
      element : 
      <div>
        <Navbar/>
        <ViewPaste/>
      </div>
    },
  ])

  return (
    <>
      <div className='bg-blue-950 h-screen  text-white'>
        
        <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App
