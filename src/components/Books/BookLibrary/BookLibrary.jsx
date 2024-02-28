import React, { useState } from 'react'

import { useOutletContext } from 'react-router-dom'

import BookOnList from './BookOnList'

const BookLibrary = ({ books }) => {
  const context = useOutletContext()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <div className='flex flex-row items-center justify-between'>
        <h2 className='text-2xl font-semibold'>Our Book Library</h2>
        <button
          className='flex lg:lg:hidden'
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <i className='ri-arrow-up-s-line text-2xl text-accent hover:text-accent-secondary'></i>
          ) : (
            <i className='ri-arrow-down-s-line text-2xl text-accent'></i>
          )}
        </button>
      </div>

      {isOpen && (
        <ul className='library mt-4'>
          {books?.map((book) => (
            <li
              key={book.id}
              className='flex flex-row justify-between items-start mb-6 border-t border-[#666666] pt-6'
            >
              <BookOnList book={book} />

              {context.user.isAuthenticated && (
                <i className='ri-add-circle-fill text-2xl text-accent hover:text-accent-secondary'></i>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default BookLibrary
