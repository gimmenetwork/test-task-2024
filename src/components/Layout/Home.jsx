import React, { useState, useEffect } from 'react'

import { useOutletContext } from 'react-router-dom'
import axios from 'axios'

import Navbar from './Navbar'
import BookLibrary from '../Books/BookLibrary/BookLibrary'
import UserBooks from '../Books/UserBooks/UserBooks'

const Home = () => {
  const context = useOutletContext()
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_JSON_SERVER_URL}/books`).then((res) => {
      setBooks(res.data)
    })
  }, [])

  return (
    <>
      <Navbar />
      <main className='container mx-auto my-6'>
        <div className='flex flex-col lg:flex-row justify-center items-start gap-2'>
          <div className='w-full flex-1 rounded-xl py-4 px-6 bg-[#333333] text-white'>
            <BookLibrary books={books} />
          </div>
          {context.user.isAuthenticated && (
            <div className='w-full flex-1 rounded-xl py-4 px-6 bg-[#333333] text-white'>
              <UserBooks books={books} />
            </div>
          )}
        </div>
      </main>
    </>
  )
}
export default Home
