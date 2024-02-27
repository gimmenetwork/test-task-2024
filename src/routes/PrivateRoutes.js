import NotFound404 from '../components/NotFound404'
import Register from '../components/Register'

export default function privateRoutes() {
  return [
    { path: '/', element: <Register /> },
    { path: '*', element: <NotFound404 /> },
  ]
}
