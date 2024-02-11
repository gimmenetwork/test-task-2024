// stores/books.js
import { defineStore } from 'pinia';

export const useBookStore = defineStore('books', {
  state: () => ({
    books: [],
  }),
  actions: {
    addBook(book) {
      this.books.push(book);
    },
    updateProgress(bookId, pageCount) {
      const book = this.books.find(book => book.id === bookId);
      if (book) {
        book.progress = pageCount;
      }
    },
    finishBook(bookId, review, rating) {
      const book = this.books.find(book => book.id === bookId);
      if (book) {
        book.finished = true;
        book.review = review;
        book.rating = rating;
      }
    },
  },
});
