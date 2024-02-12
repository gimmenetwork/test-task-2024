import { defineStore } from 'pinia';
import axios from 'axios';

export const useBooksStore = defineStore({
  id: 'books',
  state: () => ({
    books: [] // Initialize books as an empty array
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
    // Method to set books in the store
    setBooks(books) {
      this.books = books;
    },
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
              date: new Date().toISOString(), // Current date in ISO format
              pagesRead: pagesRead // Number of pages read on this update
            };
            const isFinished = updatedPagesRead >= formattedTotalPages;

            if (isFinished) {
              this.books[bookIndex].finished = true;
              this.books[bookIndex].pagesRead = formattedTotalPages;
            } else {
              this.books[bookIndex].pagesRead = updatedPagesRead;
            }

            this.books[bookIndex].progressUpdates.push(progressUpdate);
          
            
            // Replace the entire books array at the books endpoint
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
         

          // Update the book with the new review on the backend
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