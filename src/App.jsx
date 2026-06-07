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
import Sell from './pages/Sell.jsx'

function App() {

  const [user, setUser] = useState(null)
  const [initial, setInitial] = useState("👤")
  const navigate = useNavigate()
  useEffect(() => {console.log(user)}, [user])
  useEffect( () => {
    (async () => {
      try {
      const token = getToken()
      if (!token) {
        setUser(null)
        return;
      }
      const me = await api.get("/user/me/")
      setUser(me.data)
      console.log(me.data)
      setInitial( me.data.username ? me.data.username.substring(0, 1).toUpperCase() : "👤")
      } catch (e) {
        console.log(e)
        clearToken()
        setUser(null)
      }


    })()
    
  }, [])


  const handleLogout = () => {
    clearToken()
    setUser(null)
    navigate("/")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} initial={initial} onLogout={handleLogout}></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop user={user}/>} />
        <Route path="/about" element={<About />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login onLoggedIn={setUser} setInitial={setInitial}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
    </div>
  )
}

export default App
