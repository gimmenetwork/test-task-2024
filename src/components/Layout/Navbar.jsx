import React from 'react'

import { Link, useOutletContext } from 'react-router-dom'

import Logo from '../../assets/logo/logo192.png'

const Navbar = () => {
  const context = useOutletContext()

  return (
    <nav className='relative h-14 flex justify-between items-center rounded-xl m-2 px-4 bg-grey'>
      <div className='flex justify-center items-center gap-2'>
        <img src={Logo} alt='TheBooklub' className='h-10' />
        <Link to='/' className='text-2xl uppercase text-accent'>
          <span className='text-accent-tertiary'>The</span>Book
          <span className='text-accent-tertiary'>lub</span>
        </Link>
      </div>
      {context.user.isAuthenticated ? (
        <div className='flex flex-row justify-center items-center text-center gap-5'>
          <span className='text-sm text-primary'>
            Hello {context.user.username}
          </span>
          <button
            className='flex items-center justify-center rounded-full h-8 px-4 text-sm tracking-[1.02px] transition-all bg-transparent border-2 border-accent text-accent hover:bg-accent hover:border-transparent hover:text-white'
            onClick={context.logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          className='flex items-center justify-center rounded-full h-8 px-4 text-sm tracking-[1.02px] transition-all bg-transparent border-2 border-accent text-accent hover:bg-accent hover:border-transparent hover:text-white'
          to='/login'
        >
          Log In
        </Link>
      )}
    </nav>
  )
}

export default Navbar
