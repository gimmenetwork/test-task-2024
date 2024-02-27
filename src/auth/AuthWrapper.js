import { createContext, useContext, useState } from 'react'

// import routes

const AuthContext = createContext()
export const AuthData = () => useContext(AuthContext)

export const AuthWrapper = () => {
  const [user, setUser] = useState({ name: '', isAuthenticated: false })

  const login = (username, pwd) => {
    return new Promise((resolve, reject) => {
      if (pwd === 'password') {
        setUser({ name: username, isAuthenticated: true })
        resolve('success')
      } else {
        reject('Incorrect Password')
      }
    })
  }

  const logout = () => {
    setUser({ ...user, isAuthenticated: false })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>{/* // routes */}</>
    </AuthContext.Provider>
  )
}
