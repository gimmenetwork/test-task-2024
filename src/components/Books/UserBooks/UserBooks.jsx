import React, { useState, useEffect } from 'react'

import UserBookOverview from './UserBookOverview'
import BookOnUserList from './BookOnUserList'
import BookListProgress from './BookListProgress'

const UserBooks = ({ user, books, userBooks, isLoading }) => {
  const [isOpen, setIsOpen] = useState(true)

  if (isLoading) {
    return <p className='text-base font-medium'>Data Loading...</p>
  }

  return (
    <>
      <div className='flex flex-row items-center justify-between'>
        <h2 className='text-2xl font-semibold'>{user.username}'s Books</h2>
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
          {books
            .filter(({ id }) => new Set(userBooks.map(({ id }) => id)).has(id))
            .map((book) => (
              <li
                key={book.id}
                className='relative flex flex-row justify-between items-start mb-6 border-t border-[#666666] pt-6'
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
    </>
  )
}

export default UserBooks
