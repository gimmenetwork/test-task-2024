import React, { useState, useEffect, useRef } from 'react'

import BookOnList from './BookOnList'

const BookLibrary = ({ user, books, userBooks, handleAddBook }) => {
  const [isOpen, setIsOpen] = useState(true)
  const prevWidth = useRef(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      const currWidth = window.innerWidth

      if (currWidth > 960 && prevWidth.current <= 960) {
        setIsOpen(true)
      }
      prevWidth.current = currWidth
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <div className='sticky top-0 w-full flex flex-row items-center justify-between bg-[#333333] pt-4 pb-0 lg:py-4 z-10'>
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

              {user.isAuthenticated && (
                <button
                  title='Add Book'
                  aria-description='Add Book'
                  onClick={() => handleAddBook(book, user)}
                  disabled={userBooks.some((item) => item.id === book.id)}
                  className='text-2xl text-accent disabled:text-grey hover:text-accent-secondary cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed'
                >
                  <i className='ri-add-circle-fill'></i>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default BookLibrary
