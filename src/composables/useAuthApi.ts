import axios from 'axios'
import type { Book } from '@/types/Books/Book'

//should come from env
export function useAuthApi() {
  const booksUrl = 'http://localhost:3000/books'

  const GetAllBooks = async () => {
    const books = await axios.get(`${booksUrl}`)
    const data: Book[] = books.data
    // //find user with login details
    return data
  }

  const AddBook = async (book: Book) => {
    //backend should fill other parts
    const data = await axios.post(`${booksUrl}`, book)
    return data
  }
  const UpdateBook = async (id: string, book: Book) => {
    //backend should fill other parts
    const data = await axios.put(`${booksUrl}/${id}`, book)
    return data
  }

  const DeleteBook = async (id: string) => {
    const users = await axios.delete('http://localhost:3000/users')
  }

  return { AddBook, GetAllBooks }
}
