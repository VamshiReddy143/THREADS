import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import {Routes,Route} from "react-router-dom"

import Home from './pages/Home'
import ProfilePage from './pages/ProfilePage'
import { useSelector } from 'react-redux'
import UpdateProfilePage from './pages/UpdateProfilePage'
import SearchPage from './pages/SearchPage'
import Notifications from './pages/Notifications'

const App = () => {
  const {user} =useSelector(store=>store.auth)
  return (
    <div>
      <Routes>
        <Route  path='/' element={<Register/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/home' element={<Home/>}/>
        <Route  path='/profile/:id' element={ <ProfilePage/> }/>
        <Route  path='/profile/edit/:id' element={ <UpdateProfilePage/> }/>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/notifications" element={<Notifications />} />
        
      </Routes>
      
      
    </div>
  )
}

export default App


