import axios from 'axios'
import type { Book } from '@/types/Books/Book'

//should come from env
const booksUrl = 'http://localhost:3000/books'

export const GetAllBooks = async () => {
  const books = await axios.get(`${booksUrl}`)
  const data: Book[] = books.data
  // //find user with login details
  return data
}

// export const GetBookById = async (id:string) => {
//     const users = await axios.get(`${booksUrl}/${id}`)

// }

export const AddBook = async (book: Book) => {
  //backend should fill other parts
  const data = await axios.post(`${booksUrl}`, book)
  return data
}
export const UpdateBook = async (id: string, book: Book) => {
  //backend should fill other parts
  const data = await axios.put(`${booksUrl}/${id}`, book)
  return data
}

export const DeleteBook = async (id: string) => {
  const users = await axios.delete('http://localhost:3000/users')
}
