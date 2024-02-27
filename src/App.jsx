import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import PrivateRoute from './routes/PrivateRoutes'
import PublicRoute from './routes/PublicRoutes'

const checkAuth = true

function App() {
  const router = createBrowserRouter([
    checkAuth ? PrivateRoute() : {},
    ...PublicRoute(),
  ])

  return <RouterProvider router={router} />
}

export default App
