import React, { useState } from 'react'

import { Outlet } from 'react-router-dom'

const AuthWrapper = () => {
  const [user, setUser] = useState({ username: '', isAuthenticated: false })

  const login = (username) => {
    setUser({ username: username, isAuthenticated: true })
  }

  const logout = () => {
    setUser({ username: '', isAuthenticated: false })
  }

  return <Outlet context={{ user, login, logout }} />
}

export default AuthWrapper
