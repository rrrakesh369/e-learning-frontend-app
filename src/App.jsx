import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import SummeryBar from './components/SummaryBar'

function App() {
 
  return (
    <>
      <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}> 
      <Route path="/stats" element={<SummeryBar/>}/>        
      </Route>   
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
