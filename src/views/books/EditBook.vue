<template>
    <div>
        <h1 class="mb-5 text-center font-semibold">PageTracker 📚</h1>
        <Loading v-if="booksStore.isLoadingBooks" />
        <div v-else class="form-wrapper">
            <h2 class="mb-5 text-center text-2xl font-semibold">Edit Book</h2>
            <form @submit.prevent="submitUpdate" class="flex flex-col gap-y-5">
                <label class="flex flex-col"
                    >Title
                    <input class="input" v-model="book.title" required />
                </label>
                <label class="flex flex-col"
                    >Genre
                    <input class="input" v-model="book.genre" required />
                </label>
                <label class="flex flex-col"
                    >PageCount
                    <input
                        type="number"
                        class="input"
                        v-model="book.pageCount"
                        required
                    />
                </label>
                <label class="flex flex-col"
                    >Progress (%)
                    <input
                        type="number"
                        class="input"
                        v-model="book.progress"
                        required
                    />
                </label>

                <button
                    type="submit"
                    class="button-primary mt-2.5"
                    title="Update Book"
                >
                    Update Book
                </button>
            </form>

            <button
                @click="cancelUpdate"
                class="button-secondary mt-5 w-full"
                title="Cancel and return to books"
            >
                Cancel
            </button>

            <div class="group mt-14">
                <button
                    @click="deleteBook(book.id)"
                    class="button-secondary-danger w-full"
                    title="Delete book - Please note that this is irreversible"
                >
                    Delete book
                </button>
                <small
                    class="visible pl-5 text-red-600 md:invisible md:group-hover:visible"
                    >Please note that this action is irreversible</small
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { useBooksStore } from '@/store/books';
import { Book } from '@/types';
import { Loading } from '@/components';

export default defineComponent({
    components: {
        Loading,
    },

    setup() {
        const route = useRoute();
        const booksStore = useBooksStore();
        const bookId = route.params.id as string;

        const book = ref<Book>({
            id: '',
            title: '',
            genre: '',
            pageCount: 0,
            progress: 0,
            review: { score: 0, text: '' },
        });

        onMounted(async () => {
            try {
                const fetchedBook = await booksStore.fetchBookById(bookId);
                if (fetchedBook) {
                    book.value = fetchedBook;
                } else {
                    router.push('/books');
                }
            } catch (error) {
                console.error('Error fetching book:', error);
                router.push('/books');
            }
        });

        watch(
            () => book.value.pageCount,
            (newValue) => {
                if (newValue > 1000) {
                    book.value.pageCount = 1000;
                }
            }
        );

        watch(
            () => book.value.progress,
            (newValue = 0) => {
                if (newValue > 100) {
                    book.value.progress = 100;
                }
            }
        );

        const submitUpdate = async () => {
            await booksStore.editBook(bookId, book.value);
            router.push('/books');
        };

        const cancelUpdate = () => router.push('/books');

        const deleteBook = async (bookId: string | undefined) => {
            if (!bookId) {
                console.error('Book ID is undefined');
                return;
            }
            await booksStore.deleteBook(bookId);
            router.push('/books');
        };

        return {
            book,
            submitUpdate,
            cancelUpdate,
            deleteBook,
            booksStore,
        };
    },
});
</script>
