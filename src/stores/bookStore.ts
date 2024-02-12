import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { GetAllBooks, AddBook, AddBookReview } from '@/services/books/api'
import type { Book } from '@/types/Books/Book'
import { useLocalStorage } from '@/composables/useLocalStorage'



export const useBookStore = defineStore('books', () => {
  const { getStorageItem } = useLocalStorage()


  const Books = ref<Book[]>([])
  const showAddNewBookView = ref(false)
 
  //create this
  const totalPagesRead = computed(()=>{
    return true
  })



  const completedBooks = computed(()=>{
    return Books.value.length > 0 && Books.value.filter((book)=>book.pagesRead === book.pageCount)
  })

  const user = computed(() => getStorageItem('user'))

  const userBooks = computed(()=>{
      return  Books.value.length && Books.value.filter((book)=> user.value.userId === book.userId)
  })

  async function getAllBooks(){
    const data:Book[]  = await GetAllBooks()
    Books.value = data.filter((book)=> user.value.id === book.userId)
  }

  async function addBook(book: Book){
    const bookToSave = {
      id:'',
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
  async function addBookReview(reviewText:string, bookId:string){
 
    const bookToAdd = Books.value.find((book)=>{
      return book.id === bookId
    })
    const newBook = {
      ...bookToAdd,
      reviews: reviewText
    }

    const data = await AddBookReview(newBook.id as string, newBook as Book)
    return data
  }

//   async function authRegister(data: User){
//     const userData = await Register(data)
//     return userData
//   }

//   async function authLogout(){
//     const loggedOut = await Logout()
//     return loggedOut
//   }

  return { Books, getAllBooks, userBooks, addBook, showAddNewBookView, addBookReview }
})
