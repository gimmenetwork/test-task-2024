import React, { useState, useEffect } from 'react'

import axios from 'axios'

const BookLibrary = () => {
  const [books, setBooks] = useState([])
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_JSON_SERVER_URL}/books`).then((res) => {
      setBooks(res.data)
    })
  }, [])

  return (
    <>
      <div className='flex flex-row items-center justify-between'>
        <h2 className='text-2xl font-semibold'>Our Book Library</h2>
        <button
          className='flex lg:hidden'
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <i className='ri-indeterminate-circle-fill text-2xl text-accent hover:text-accent-secondary'></i>
          ) : (
            <i className='ri-add-circle-fill text-2xl text-accent'></i>
          )}
        </button>
      </div>

      {isOpen && (
        <ul className='library mt-4'>
          {books?.map((book) => (
            <li
              key={book.id}
              className='flex flex-row justify-start items-start gap-4 mb-6 border-t border-[#666666] pt-6'
            >
              <img src={book.image} alt={book.title} className='w-[50px]' />
              <div className=''>
                <h3 className='text-md'>{book.title}</h3>
                <div className='meta'>
                  <p className='text-xs'>
                    {book.author},{' '}
                    {new Date(book.publicationDate).getFullYear()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default BookLibrary
