import React, { useState } from 'react'

import { useOutletContext } from 'react-router-dom'
import axios from 'axios'

const UserProgress = ({ book }) => {
  const context = useOutletContext()
  const user = context.user

  const [progressUpdate, setProgressUpdate] = useState({
    id: book.id,
    progress: '',
    review: '',
  })

  const handleUpdate = (book) => {
    axios.get(`${process.env.REACT_APP_JSON_SERVER_URL}/user`).then((res) => {
      res.data.map((dbUser) => {
        if (dbUser.username === user.username) {
          const updatedProgress = {
            ...dbUser,
            books: [...dbUser.books, { ...progressUpdate }],
          }

          axios
            .patch(
              `${process.env.REACT_APP_JSON_SERVER_URL}/user/${dbUser.id}`,
              updatedProgress
            )
            .then((res) => {
              console.log(`Update success: ${res}`)
            })
            .catch((err) => {
              alert(`Server Error: ${err.message}`)
            })
        }
      })
    })
  }

  return (
    <div className='flex flex-col justify-start items-start gap-1'>
      <h4 className='text-lg font-semibold mb-4'>My Progress</h4>

      <div className='w-full flex flex-row justify-between'>
        <div className='flex flex-row items-center gap-1 text-sm'>
          <i className='ri-book-open-line'></i>
          Pages Read:{' '}
          <input
            type='text'
            className='rounded-full w-20 h-6 pt-2 pb-1.5 px-1.5 text-primary text-center text-sm font-semibold outline-none placeholder:italic placeholder:text-sm placeholder:text-primary'
            placeholder='56'
            onChange={(e) =>
              setProgressUpdate({ ...progressUpdate, progress: e.target.value })
            }
          />{' '}
          out of {book.pages} pages
        </div>
        <button
          onClick={() => handleUpdate(book)}
          className='flex items-center justify-center rounded-full h-6 px-4 text-xs tracking-[1.02px] transition-all bg-accent border-2 border-accent text-white hover:bg-accent-secondary hover:border-transparent hover:text-white'
        >
          Update
        </button>
      </div>
    </div>
  )
}

export default UserProgress
