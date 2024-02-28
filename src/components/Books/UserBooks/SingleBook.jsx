import React from 'react'

import UserProgress from './UserProgress'

const SingleBook = ({ book, handleShowSingleBook }) => {
  return (
    <div className='single-book w-full relative z-20'>
      <div className='sticky top-0 w-full flex flex-row-reverse items-center justify-between gap-5 bg-[#333333] px-6 pt-4 pb-0 lg:py-4 z-10'>
        <button className='flex' onClick={() => handleShowSingleBook()}>
          <i
            className='ri-arrow-left-s-line text-2xl text-accent hover:text-accent-secondary'
            title='Go Back'
            aria-description='Go Back'
          ></i>
        </button>
      </div>

      <div className='px-6'>
        <h3 className='text-2xl font-semibold mb-4'>{book.title}</h3>
        <div className='flex flex-row gap-4 mb-4'>
          <img src={book.image} className='w-[200px]' />
          <div className='badge flex flex-col gap-3'>
            <p className='text-xs'>Genres:</p>
            {book.genres?.map((genre) => (
              <span
                key={genre}
                className='bg-accent text-white text-xs font-light me-2 px-2.5 py-0.5 rounded-full'
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        <div className='flex flex-col justify-start items-start gap-1 pb-4 mb-4 border-b border-white'>
          <div className='meta flex flex-col gap-2'>
            <p className='flex flex-row gap-1 text-xs'>
              <i className='ri-quill-pen-fill'></i>
              Author: {book.author}
            </p>
            <p className='flex flex-row gap-1 text-xs'>
              <i className='ri-calendar-todo-fill'></i>
              Publication Date:{' '}
              {new Date(book.publicationDate).toLocaleDateString('de-DE')}
            </p>
            <p className='flex flex-row gap-1 text-xs'>
              <i className='ri-book-open-line'></i>
              Pages: {book.pages}
            </p>
          </div>
        </div>

        <UserProgress book={book} />
      </div>
    </div>
  )
}

export default SingleBook
