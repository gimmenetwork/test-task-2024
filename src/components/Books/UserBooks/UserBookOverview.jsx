import React, { useState } from 'react'

const UserBookOverview = ({ userBooks }) => {
  return (
    <div className='book-overview'>
      <div className='flex flex-row gap-2 text-sm'>
        <i className='ri-book-marked-fill'></i>
        <span>{userBooks.length} Books</span>
      </div>
    </div>
  )
}

export default UserBookOverview
