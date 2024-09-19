
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { Children } from 'react'
import { useAppStore } from './store'

const PrivateRoute = ({children}) =>{
  const {userInfo} = useAppStore()
  const isAuthenticated = !!userInfo
  return isAuthenticated ? children : <Navigate to="/auth"/>
}


const AuthRoute = ({children}) =>{
  const {userInfo} = useAppStore()
  const isAuthenticated = !!userInfo
  return isAuthenticated ? <Navigate to="/chat"/> : children
}

function App() {
 return(
   <BrowserRouter>
     <Routes>
     <Route path='/auth' element={
      <AuthRoute><Auth/></AuthRoute>
     } />
     <Route path='/chat' element={
      <AuthRoute><Chat/></AuthRoute>
     } />
     <Route path='/profile' element={
      <AuthRoute><Profile/></AuthRoute>
     } />
     <Route path='*' element={<Navigate to = "/auth" />} />
     </Routes>
   </BrowserRouter>
 )
}

export default App
