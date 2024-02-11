<template>
    <div>
        <h1 class="mb-10 text-center">Your books 📚</h1>
        <Loading v-if="booksStore.isLoadingBooks" />
        <ul
            v-else
            class="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2"
        >
            <li v-if="!booksStore.books.length">
                <div class="grid h-64 max-w-full place-items-center">
                    <h2 class="text-center">
                        You currently do not have any books, go ahead and add
                        one now
                    </h2>
                </div>
            </li>
            <li v-for="book in booksStore.books" :key="book.id">
                <div
                    class="relative h-64 max-w-full rounded-3xl border border-gray-700 bg-lint/80 p-6 shadow transition-shadow duration-200 hover:shadow-xl"
                >
                    <h2
                        class="mb-2 truncate font-semibold capitalize tracking-tight text-gray-50"
                    >
                        {{ book.title }}
                    </h2>
                    <p class="mb-3 capitalize">Genre: {{ book.genre }}</p>
                    <p class="mb-3 capitalize">
                        Page count: {{ book.pageCount }}
                    </p>
                    <p class="mb-3 capitalize">
                        Progress: {{ book.progress || '0' }}%
                    </p>
                    <div class="absolute right-5 top-5 flex flex-row gap-x-4">
                        <button @click="editBook(book.id)">
                            <img
                                src="@/assets/edit.svg"
                                alt="Edit book"
                                title="Edit book"
                                class="h-7 w-7"
                            />
                        </button>
                        <button @click="deleteBook(book.id)">
                            <div>
                                <img
                                    src="@/assets/delete.svg"
                                    alt="Delete book"
                                    title="Delete book - Please note that this is irreversible"
                                    class="h-7 w-7"
                                />
                            </div>
                        </button>
                    </div>

                    <button
                        v-if="book.progress === 100"
                        @click="goToReviewPage(book.id)"
                        class="button-primary"
                    >
                        <span v-if="book.review?.text">Edit Review</span>
                        <span v-else> Write a Review </span>
                    </button>
                </div>
            </li>
            <div class="relative grid h-64 max-w-full place-items-center">
                <router-link to="/add-book" class="h-fit w-fit">
                    <img
                        src="@/assets/add.svg"
                        alt="Add a new book"
                        title="Add a new book"
                        class="h-20 w-20"
                    />
                </router-link>
            </div>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useBooksStore } from '@/store/books';
import { Loading } from '@/components';
import router from '@/router';

export default defineComponent({
    components: {
        Loading,
    },
    setup() {
        const booksStore = useBooksStore();

        const editBook = (bookId: string | undefined) => {
            if (!bookId) {
                console.error('Book ID is undefined');
                alert('Could not fetch the book');
                // TODO: Better way to show the user that the book could not be fetched
                return;
            }
            router.push(`/edit-book/${bookId}`);
        };

        const deleteBook = (bookId: string | undefined) => {
            if (!bookId) {
                console.error('Book ID is undefined');
                alert('Could not delete the book');
                // TODO: Better way to show the user that the book could not be deleted
                return;
            }
            booksStore.deleteBook(bookId);
            alert('Book deleted');
        };

        const goToReviewPage = (bookId: string | undefined) => {
            if (!bookId) {
                console.error('Book ID is undefined');
                alert('Could not fetch the book');
                // TODO: Better way to show the user that the book could not be fetched
                return;
            }
            router.push(`/review-book/${bookId}`);
        };

        onMounted(async () => {
            await booksStore.fetchUserBooks();
        });

        return {
            booksStore,
            deleteBook,
            editBook,
            goToReviewPage,
        };
    },
});
</script>
