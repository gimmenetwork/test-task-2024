import React, { useContext } from 'react'
import { AuthContext } from '../contects/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'

const Logout = () => {
    const {logout} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    const form = location.state?.form?.pathname || '/'
    const handleLogout = () => {
        logout().then(() => {
            alert('User Logged Out')
            navigate(form, { replace: true })
        }).catch((error) => {
            // console.log(error)
        })
    }
  return (
    <div className='h-screen bg-teal-100 flex items-center justify-center'>
        <button className='bg-red-700 px-8 py-2 text-white rounded' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout