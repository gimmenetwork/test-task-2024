import { defineStore } from 'pinia';
import { Book, BooksState, Review } from '@/types';
import { BookService } from '@/services/booksService';
import { notify } from '@kyvg/vue3-notification';

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
                notify({
                    type: 'error',
                    title: 'Could not find book!',
                    text: 'There was an issue finding your book. Please try again.',
                });
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
                notify({
                    type: 'success',
                    title: 'Book added!',
                    text: `${newBook.title} is now available in your list`,
                });
            } catch (error) {
                notify({
                    type: 'error',
                    title: 'Could not add book!',
                    text: 'There was an issue adding your book. Please try again.',
                });
                console.error('Failed to add book', error);
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
                notify({
                    type: 'success',
                    title: 'Book updated!',
                    text: `${updatedBook.title} has been updated.`,
                });
            } catch (error) {
                console.error('Failed to edit book', error);
                notify({
                    type: 'Error',
                    title: 'Could not edit book!',
                    text: 'There was an issue editing your book. Please try again.',
                });
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
                notify({
                    type: 'success',
                    title: 'Book deleted!',
                    text: `The book has been deleted.`,
                });
            } catch (error) {
                console.error('Failed to delete book', error);
                notify({
                    type: 'Error',
                    title: 'Could not delete book!',
                    text: 'There was an issue deleting your book. Please try again.',
                });
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
                notify({
                    type: 'success',
                    title: 'Review added!',
                    text: `The book has been reviewed.`,
                });
            } catch (error) {
                console.error('Failed to edit book', error);
                notify({
                    type: 'error',
                    title: 'Review not added!',
                    text: `There was an issue adding your review. Please try again.`,
                });
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
