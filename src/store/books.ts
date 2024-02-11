import { defineStore } from 'pinia';
import { Book, BooksState, Review } from '@/types';
import { BookService } from '@/services/booksService';

export const useBooksStore = defineStore('books', {
    state: (): BooksState => ({
        books: [],
        isLoadingBooks: false,
    }),
    actions: {
        async fetchUserBooks() {
            this.isLoadingBooks = true;
            try {
                const updatedBooks = await BookService.fetchAndPatchUserBooks(
                    (books) => books
                );
                this.books = updatedBooks;
            } catch (error) {
                console.error('Failed to fetch books', error);
            } finally {
                this.isLoadingBooks = false;
            }
        },

        async addBook(newBook: Book) {
            this.isLoadingBooks = true;
            try {
                const updatedBooks = await BookService.fetchAndPatchUserBooks(
                    (books) => [...books, newBook]
                );
                this.books = updatedBooks;
            } catch (error) {
                console.error('Failed to add book', error);
            } finally {
                this.isLoadingBooks = false;
            }
        },

        // TODO: Delete if not used: still idea phase
        async updateProgress(bookId: string, pagesRead: number) {
            this.isLoadingBooks = true;
            try {
                const updatedBooks = await BookService.fetchAndPatchUserBooks(
                    (books) =>
                        books.map((book) =>
                            book.id === bookId
                                ? { ...book, progress: pagesRead }
                                : book
                        )
                );
                this.books = updatedBooks;
            } catch (error) {
                console.error('Failed to update progress', error);
            } finally {
                this.isLoadingBooks = false;
            }
        },

        async fetchBookById(bookId: string): Promise<Book | undefined> {
            const allBooksResponse = await BookService.fetchAndPatchUserBooks(
                (books: Book[]) => books
            );
            const book = allBooksResponse.find(
                (book: Book) => book.id === bookId
            );
            return book;
        },

        async editBook(bookId: string, updatedBook: Book) {
            this.isLoadingBooks = true;
            try {
                const updatedBooks = await BookService.fetchAndPatchUserBooks(
                    (books) =>
                        books.map((book) =>
                            book.id === bookId
                                ? { ...book, ...updatedBook }
                                : book
                        )
                );
                this.books = updatedBooks;
            } catch (error) {
                console.error('Failed to edit book', error);
            } finally {
                this.isLoadingBooks = false;
            }
        },

        async deleteBook(bookId: string) {
            this.isLoadingBooks = true;
            try {
                const updatedBooks = await BookService.fetchAndPatchUserBooks(
                    (books) => books.filter((book) => book.id !== bookId)
                );
                this.books = updatedBooks;
            } catch (error) {
                console.error('Failed to delete book', error);
            } finally {
                this.isLoadingBooks = false;
            }
        },

        async addReview(bookId: string, review: Review) {
            this.isLoadingBooks = true;
            try {
                const updatedBooks = await BookService.fetchAndPatchUserBooks(
                    (books) =>
                        books.map((book) =>
                            book.id === bookId
                                ? { ...book, review: { ...review } }
                                : book
                        )
                );
                this.books = updatedBooks;
            } catch (error) {
                console.error('Failed to edit book', error);
            } finally {
                this.isLoadingBooks = false;
            }
        },

        getReview(bookId: string) {
            const book = this.books.find((book) => book.id === bookId);
            return book?.review || { score: 0, text: '' };
        },
    },
});
