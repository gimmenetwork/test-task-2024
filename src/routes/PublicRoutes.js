import { Navigate } from 'react-router-dom'

import Login from '../components/Login'
import Register from '../components/Register'

export default function routes() {
  return [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '*', element: <Navigate to='/login' replace /> },
  ]
}
