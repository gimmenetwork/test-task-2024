import React, { useState } from 'react'

import { useOutletContext } from 'react-router-dom'

const UserBooks = () => {
  const context = useOutletContext()
  const [userBooks, setUserBooks] = useState([])
  const [isOpen, setIsOpen] = useState(true)

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
            <i className='ri-indeterminate-circle-fill text-2xl text-accent hover:text-accent-secondary'></i>
          ) : (
            <i className='ri-add-circle-fill text-2xl text-accent'></i>
          )}
        </button>
      </div>

      {isOpen && <i className='ri-add-circle-fill text-2xl text-accent'></i>}
    </>
  )
}

export default UserBooks
