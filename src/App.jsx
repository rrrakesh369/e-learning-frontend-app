import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import SummeryBar from './components/SummaryBar'
import { Provider } from "react-redux"
import CreateNotification from './components/CreateNotification'

function App() {
 
  return (
    <>
    
      <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}> 
      <Route path="/stats" element={<SummeryBar/>}/>        
      <Route path="/add" element={<CreateNotification/>}/>        
      </Route>   
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
