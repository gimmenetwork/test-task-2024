import React, { useState } from 'react'

const UserBookOverview = ({ userBooks }) => {
  return (
    <div className='book-overview'>
      <h2>Your Books</h2>
      <div className=''>
        <p>
          <span></span>
          <span>{userBooks.length} Books</span>
        </p>
      </div>
    </div>
  )
}

export default UserBookOverview
