import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import {Routes,Route} from "react-router-dom"

const App = () => {
  return (
    <div>
      <Routes>
        <Route  path='/' element={<Register/>}/>
        <Route  path='/login' element={<Login/>}/>
        
      </Routes>
      
      
    </div>
  )
}

export default App