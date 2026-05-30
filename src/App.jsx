import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Cart from './pages/Cart'
import Signup from './pages/Signup'
import { getToken, clearToken } from './api/auth.js'
import api from './api/client.js'
import { useState, useEffect } from 'react'

function App() {

  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  // useEffect(() => {console.log(user)}, [user])
  // useEffect( () => {
  //   (async () => {
  //     console.log("a")
  //     try {
  //     const token = getToken()
  //     console.log("lol")
  //     console.log(token)
  //     if (!token) {
  //       setUser(null)
  //       return;
  //     }
  //     console.log("user exists")
  //     const me = await api.get("/user/me/")
  //     setUser(me)
  //     } catch (e) {
  //       clearToken()
  //       setUser(null)
  //     }


  //   })
    
  // }, [user])


  const handleLogout = () => {
    clearToken()
    setUser(null)
    navigate("/")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onLogout={handleLogout}></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login onLoggedIn={setUser}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
