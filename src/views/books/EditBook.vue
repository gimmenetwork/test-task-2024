<template>
    <div>
        <h1 class="mb-5 text-center font-semibold">PageTracker 📚</h1>
        <Loading v-if="booksStore.isLoadingBooks" />
        <div v-else class="form-wrapper">
            <h2 class="mb-5 text-center text-2xl font-semibold">Edit Book</h2>
            <form @submit.prevent="submitUpdate" class="flex flex-col gap-y-5">
                <div class="form-group">
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
                        >Title
                        <input
                            type="number"
                            class="input"
                            v-model="book.progress"
                            required
                        />
                    </label>
                </div>

                <button type="submit" class="button-primary">
                    Update Book
                </button>
                <button @click="cancelUpdate" class="button-secondary">
                    Cancel
                </button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
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
                    alert('Book not found');
                    router.push('/books');
                }
            } catch (error) {
                console.error('Error fetching book:', error);
                router.push('/books');
            }
        });

        const submitUpdate = async () => {
            await booksStore.editBook(bookId, book.value);
            router.push('/books');
        };

        const cancelUpdate = () => router.push('/books');
        return {
            book,
            submitUpdate,
            cancelUpdate,
            booksStore,
        };
    },
});
</script>
