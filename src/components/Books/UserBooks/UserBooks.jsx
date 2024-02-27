import React, { useState, useEffect } from 'react'

import { useOutletContext } from 'react-router-dom'
import axios from 'axios'

import UserBookOverview from './UserBookOverview'

const UserBooks = ({ books }) => {
  const context = useOutletContext()
  const [userBooks, setUserBooks] = useState(['1', '2'])
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_JSON_SERVER_URL}/user`).then((res) => {
      res.data.map((user) => {
        if (user.username === context.user.username) {
          setUserBooks(user.books)
          // console.log('User Books', user.books)
        }
      })
    })

    // console.log('Books', books)
  }, [])

  return (
    <>
      <div className='flex flex-row items-center justify-between'>
        <h2 className='text-2xl font-semibold'>
          {context.user.username}'s Books
        </h2>
        <button
          className='flex lg:hidden'
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <i className='ri-arrow-up-s-line text-2xl text-accent hover:text-accent-secondary'></i>
          ) : (
            <i className='ri-arrow-down-s-line text-2xl text-accent'></i>
          )}
        </button>
      </div>

      <UserBookOverview userBooks={userBooks} />

      {isOpen && (
        <ul className='library mt-4'>
          {userBooks?.map((book) => {
            const userBook = books.find((item) => item.id === book.id)

            return (
              <li
                key={userBook.id}
                className='flex flex-row justify-between items-start mb-6 border-t border-[#666666] pt-6'
              >
                <div className='flex flex-row justify-start items-start gap-4'>
                  <img
                    src={userBook.image}
                    alt={userBook.title}
                    className='w-[50px]'
                  />
                  <div className='flex flex-col justify-start items-start gap-1'>
                    <h3 className='text-md'>{userBook.title}</h3>
                    <div className='meta flex flex-col gap-1'>
                      <p className='flex flex-row gap-1 text-xs'>
                        <i className='ri-quill-pen-fill'></i>
                        {userBook.author},{' '}
                        {new Date(userBook.publicationDate).getFullYear()}
                      </p>
                      <p className='flex flex-row gap-1 text-xs'>
                        <i className='ri-book-open-line'></i>
                        {userBook.pages}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

export default UserBooks
