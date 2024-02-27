import React, { useState } from 'react'

import { useOutletContext } from 'react-router-dom'

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
              <div className='flex flex-row justify-start items-start gap-4'>
                <img src={book.image} alt={book.title} className='w-[50px]' />
                <div className='flex flex-col justify-start items-start gap-1'>
                  <h3 className='text-md'>{book.title}</h3>
                  <div className='meta flex flex-col gap-1'>
                    <p className='flex flex-row gap-1 text-xs'>
                      <i className='ri-quill-pen-fill'></i>
                      {book.author},{' '}
                      {new Date(book.publicationDate).getFullYear()}
                    </p>
                    <p className='flex flex-row gap-1 text-xs'>
                      <i className='ri-book-open-line'></i>
                      {book.pages}
                    </p>
                  </div>
                </div>
              </div>

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
