import React from 'react'

const BookOnUserList = ({ book, userbook }) => {
  return (
    <div className='flex flex-row justify-start items-start gap-4'>
      <img src={book.image} alt={book.title} className='w-[50px]' />
      <div className='flex flex-col justify-start items-start gap-1'>
        <h3 className='text-md'>{book.title}</h3>
        <div className='meta flex flex-row gap-4'>
          <p className='flex flex-row gap-1 text-sm'>
            <i className='ri-book-open-line'></i>
            {userbook[0].progress}/{book.pages}
          </p>
          {userbook[0].review && (
            <p className='flex flex-row gap-1 text-sm'>
              <i className='ri-message-2-line'></i>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookOnUserList
