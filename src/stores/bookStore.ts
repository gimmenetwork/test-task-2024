import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { GetAllBooks, AddBook, UpdateBook } from '@/services/books/api'
import type { Book } from '@/types/Books/Book'
import { useLocalStorage } from '@/composables/useLocalStorage'

export const useBookStore = defineStore('books', () => {
  const { getStorageItem } = useLocalStorage()

  const Books = ref<Book[]>([])
  const showAddNewBookView = ref(false)

  //create this
  const totalPagesRead = computed(() => {
    let initialValue = 0
    Books.value.map((book) => {
      initialValue += parseInt(book.pagesRead)
    })
    return initialValue
  })

  const popularGenres = computed(() => {
    const genres = Books.value.map((book) => {
      return book.genre
    })
    console.log([...new Set(genres)])
    return [...new Set(genres)]
  })

  //completed
  const completedBooks = computed(() => {
    const completed = Books.value.filter((book) => book.pagesRead === book.pageCount)
    console.log('completed', completed)
    return completed
  })

  const user = computed(() => getStorageItem('user'))

  const userBooks = computed(() => {
    return Books.value.length && Books.value.filter((book) => user.value.userId === book.userId)
  })

  async function getAllBooks() {
    const data: Book[] = await GetAllBooks()
    Books.value = data.filter((book) => user.value.id === book.userId)
  }

  async function addBook(book: Book) {
    const bookToSave = {
      id: '',
      title: book.title,
      genre: book.genre,
      pageCount: book.pageCount.toString(),
      userId: user.value.id,
      pagesRead: '0',
      reviews: '',
      rating: ''
    }
    const data = await AddBook(bookToSave)
    return data
  }

  async function updateBookReview(reviewText: string, bookId: string) {
    const bookToAdd = Books.value.find((book) => {
      return book.id === bookId
    })
    const newBook = {
      ...bookToAdd,
      reviews: reviewText
    }

    const data = await UpdateBook(newBook.id as string, newBook as Book)
    return data
  }

  async function updateBookProgress(pagesRead: number, bookId: string) {
    const bookToAdd = Books.value.find((book) => {
      return book.id === bookId
    })
    const newBook = {
      ...bookToAdd,
      pagesRead: pagesRead.toString()
    }

    const data = await UpdateBook(newBook.id as string, newBook as Book)
    return data
  }

  return {
    Books,
    getAllBooks,
    userBooks,
    addBook,
    showAddNewBookView,
    updateBookReview,
    updateBookProgress,
    totalPagesRead,
    popularGenres,
    completedBooks
  }
})
