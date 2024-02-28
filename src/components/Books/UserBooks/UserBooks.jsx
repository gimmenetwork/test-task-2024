import React, { useState, useEffect, useRef } from 'react'

import UserBookOverview from './UserBookOverview'
import BookOnUserList from './BookOnUserList'
import BookListProgress from './BookListProgress'

const UserBooks = ({
  user,
  books,
  userBooks,
  isLoading,
  handleShowSingleBook,
}) => {
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

  if (isLoading) {
    return <p className='text-base font-medium'>Data Loading...</p>
  }

  return (
    <div className='user-books w-full relative'>
      <div className='sticky top-0 w-full flex flex-row items-center justify-between bg-[#333333] px-6 pt-4 pb-0 lg:py-4 z-10'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl font-semibold'>{user.username}'s Books</h2>
          <UserBookOverview userBooks={userBooks} />
        </div>
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

      {isOpen && (
        <ul className='library mt-4 px-6'>
          {books
            .filter(({ id }) => new Set(userBooks.map(({ id }) => id)).has(id))
            .map((book) => (
              <li
                key={book.id}
                className='relative flex flex-row justify-between items-start mb-6 border-t border-[#666666] pt-6 cursor-pointer'
                onClick={() => handleShowSingleBook(book)}
              >
                <BookOnUserList
                  book={book}
                  userbook={userBooks.filter((item) => item.id === book.id)}
                />
                <BookListProgress
                  pages={book.pages}
                  userbook={userBooks.filter((item) => item.id === book.id)}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default UserBooks
