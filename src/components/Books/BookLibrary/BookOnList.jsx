import React from 'react'

const BookOnList = ({ book }) => {
  return (
    <div className='flex flex-row justify-start items-start gap-4'>
      <img src={book.image} alt={book.title} className='w-[50px]' />
      <div className='flex flex-col justify-start items-start gap-1'>
        <h3 className='text-md'>{book.title}</h3>
        <div className='meta flex flex-col gap-1'>
          <p className='flex flex-row gap-1 text-xs'>
            <i className='ri-quill-pen-fill'></i>
            {book.author}, {new Date(book.publicationDate).getFullYear()}
          </p>
          <p className='flex flex-row gap-1 text-xs'>
            <i className='ri-book-open-line'></i>
            {book.pages}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BookOnList
