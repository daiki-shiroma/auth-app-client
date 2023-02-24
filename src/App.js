import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import Home from './components/Home'
import Dashboard from './components/Dashboard'

export default function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")
  const [user, setUser] = useState({})

  const handleLogin = (data) => {
    setLoggedInStatus("ログインなう")
    setUser(data.user)
  }

  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true })

      .then(response => {
        if (response.data.logged_in && loggedInStatus === "未ログイン") {
          setLoggedInStatus("ログインなう")
          setUser(response.data.user)
        } else if (!response.data.logged_in && loggedInStatus === "ログインなう") {
          setLoggedInStatus("未ログイン")
          setUser({})
        }
      })

      .catch(error => {
        console.log("ログインエラー", error)
    })
}

const handleLogout = () => {
  setLoggedInStatus("未ログイン")
  setUser({})
}

  useEffect(() => {
    checkLoginStatus()
  })


  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home handleLogin={handleLogin} handleLogout={handleLogout} loggedInStatus={loggedInStatus}/>} />

        <Route  path="/dashboard" element={<Dashboard　loggedInStatus={loggedInStatus}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}