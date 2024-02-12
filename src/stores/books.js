import { defineStore } from 'pinia';
import axios from 'axios';

export const useBooksStore = defineStore({
  id: 'books',
  state: () => ({
    // Initialize books as an empty array
    books: [] 
  }),
  getters: {
    // Getter to retrieve a book by its ID
    getBookById: (state) => (id) => {
      return state.books.find(book => book.id === id);
    },
    getBookByUserId: (state) => (userId) => {
      return state.books.filter(book => book.userId === userId);
    }
  },
  actions: {
    setBooks(books) {
      this.books = books;
    },
    // Action to update book progress with amount of pages read and a date. Also sets book finished state if the total number of pages has been read
    async updateBookProgress(bookId, pagesRead) {
        try {
          // Find the index of the book in the books array
          const bookIndex = this.books.findIndex(book => book.id === bookId);
          if (bookIndex !== -1) {
            // Update the progress of the book
            const formattedOriginalPagesRead = Number(this.books[bookIndex].pagesRead);
            const formattedNewPagesRead = Number(pagesRead);
            const formattedTotalPages = Number(this.books[bookIndex].pageCount);
            const updatedPagesRead = formattedOriginalPagesRead + formattedNewPagesRead
            const progressUpdate = {
              // Current date in ISO format
              date: new Date().toISOString(), 
              pagesRead: pagesRead
            };
            const isFinished = updatedPagesRead >= formattedTotalPages;

            if (isFinished) {
              this.books[bookIndex].finished = true;
              this.books[bookIndex].pagesRead = formattedTotalPages;
            } else {
              this.books[bookIndex].pagesRead = updatedPagesRead;
            }

            this.books[bookIndex].progressUpdates.push(progressUpdate);
          
            
            // Replace the books array in the database
            await axios.patch(`http://localhost:3000/books/${bookId}`, this.books[bookIndex])

          }
        } catch (error) {
          console.error('Error updating book progress:', error);
          throw error;
        }
    },
    async addReview(bookId, review, rating) {
      try {
        // Find the index of the book in the books array
        const bookIndex = this.books.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
         

          // Update the book with the new review
          await axios.patch(`http://localhost:3000/books/${bookId}`, {
            review: review,
            rating: rating
          });

        } else {
          console.error('Book not found');
        }
      } catch (error) {
        console.error('Error leaving a review:', error);
        throw error;
      }
    }
  }
});