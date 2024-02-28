import React from 'react'

const BookListProgress = ({ pages, userbook }) => {
  let percentage = Math.trunc(
    ((Number(userbook[0].progress) - pages) / pages) * 100 + 100
  )

  return (
    <div
      className='h-[5px] rounded-full absolute -top-[3px] bg-accent transition-all duration-500'
      style={{ width: `${percentage}%` }}
    ></div>
  )
}

export default BookListProgress
