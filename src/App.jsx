import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart'
import Signup from './pages/Signup'
import { getToken, clearToken } from './api/auth.js'
import api from './api/client.js'
import { useState, useEffect } from 'react'

function App() {

  const [user, setUser] = useState(null)

  useEffect( () => {

    (async () => {
      try {
      const token = getToken()

      if (!token) {
        setUser(null)
        return;
      }
      } catch (e) {
        setUser(null)
      }


    })
    
  }, [])


  const handleLogout = () => {
    clearToken()
    setUser(null)
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </BrowserRouter>
    
  )
}

export default App
