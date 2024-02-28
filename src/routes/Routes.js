import { createBrowserRouter } from 'react-router-dom'

import AuthWrapper from '../auth/AuthWrapper'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Layout/Home'
import NotFound404 from '../components/Layout/NotFound404'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <AuthWrapper />,
    children: [
      { path: '/', element: <Home />, index: true },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '*', element: <NotFound404 /> },
    ],
  },
])

export default Router
