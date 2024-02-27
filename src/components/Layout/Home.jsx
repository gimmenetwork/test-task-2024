import React from 'react'

import { useOutletContext } from 'react-router-dom'

import Navbar from './Navbar'
import BookLibrary from '../Books/BookLibrary/BookLibrary'
import UserBooks from '../Books/UserBooks/UserBooks'

const Home = () => {
  const context = useOutletContext()

  return (
    <>
      <Navbar />
      <main className='container mx-auto mt-6'>
        <div className='flex flex-col lg:flex-row justify-center items-start gap-2'>
          <div className='flex-1 lg:min-h-[800px] rounded-xl py-4 px-6 bg-[#333333] text-white'>
            <BookLibrary />
          </div>
          {context.user.isAuthenticated && (
            <div className='flex-1 lg:min-h-[800px] rounded-xl py-4 px-6 bg-[#333333] text-white'>
              <UserBooks />
            </div>
          )}
        </div>
      </main>
    </>
  )
}
export default Home
