import React, { useState, useEffect } from 'react'

import { useOutletContext } from 'react-router-dom'
import axios from 'axios'

import Navbar from './Navbar'
import BookLibrary from '../Books/BookLibrary/BookLibrary'
import UserBooks from '../Books/UserBooks/UserBooks'
import SingleBook from '../Books/UserBooks/SingleBook'

const Home = () => {
  const context = useOutletContext()
  const user = context.user

  const [books, setBooks] = useState([])
  const [userBooks, setUserBooks] = useState([])
  const [userBooksPosition, setUserBooksPosition] = useState('-left-[0]')
  const [selectedBook, setSelectedBook] = useState({})

  const [isLoading, setIsLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_JSON_SERVER_URL}/books`).then((res) => {
      setBooks(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_JSON_SERVER_URL}/user`).then((res) => {
      res.data.map((dbUser) => {
        if (dbUser.username === user.username) {
          setUserBooks(dbUser.books)
          setIsLoading(false)
        }
      })
    })
  }, [refreshKey])

  const handleAddBook = (book, user) => {
    axios.get(`${process.env.REACT_APP_JSON_SERVER_URL}/user`).then((res) => {
      res.data.map((dbUser) => {
        if (dbUser.username === user.username) {
          const updatedUser = {
            ...dbUser,
            books: [...dbUser.books, { id: book.id, progress: 0, review: '' }],
          }

          axios
            .patch(
              `${process.env.REACT_APP_JSON_SERVER_URL}/user/${dbUser.id}`,
              updatedUser
            )
            .then((res) => {
              console.log(`Update success: ${res}`)
              setRefreshKey((oldKey) => oldKey + 1)
            })
            .catch((err) => {
              alert(`Server Error: ${err.message}`)
            })
        }
      })
    })
  }

  const handleShowSingleBook = (book) => {
    if (book) {
      setSelectedBook(book)
      setUserBooksPosition('-left-[100%]')
    } else {
      setUserBooksPosition('-left-[0]')
    }
  }

  return (
    <>
      <Navbar />
      <main className='container mx-auto my-6'>
        <div className='flex flex-col lg:flex-row justify-center items-start gap-2'>
          <div className='w-full lg:h-[calc(100vh-110px)] relative overflow-y-scroll no-scrollbar flex-1 rounded-xl bg-[#333333] text-white'>
            <BookLibrary
              user={user}
              books={books}
              userBooks={userBooks}
              handleAddBook={handleAddBook}
            />
          </div>
          {context.user.isAuthenticated && (
            <div className='lg:h-[calc(100vh-110px)] flex-1 relative overflow-y-scroll overflow-x-hidden no-scrollbar rounded-xl'>
              <div
                className={`w-[200%] flex flex-row bg-[#333333] text-white transition-all duration-500 absolute ${userBooksPosition}`}
              >
                <UserBooks
                  user={user}
                  books={books}
                  userBooks={userBooks}
                  isLoading={isLoading}
                  handleShowSingleBook={handleShowSingleBook}
                />
                <SingleBook
                  book={selectedBook}
                  handleShowSingleBook={handleShowSingleBook}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
export default Home
