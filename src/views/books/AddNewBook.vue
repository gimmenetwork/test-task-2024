<template>
    <div>
        <h1 class="mb-5 text-center font-semibold">PageTracker 📚</h1>
        <Loading v-if="booksStore.isLoadingBooks" />
        <div v-else class="form-wrapper">
            <h2 class="mb-5 text-center text-2xl font-semibold">
                Add new book
            </h2>
            <form @submit.prevent="submitBook" class="flex flex-col gap-y-5">
                <label class="flex flex-col">
                    Book Title
                    <input
                        required
                        class="input"
                        placeholder="Title..."
                        v-model="newBook.title"
                    />
                </label>
                <label class="flex flex-col">
                    Genre
                    <input
                        required
                        class="input"
                        placeholder="Genre..."
                        v-model="newBook.genre"
                    />
                </label>
                <label class="flex flex-col">
                    Page Count
                    <input
                        required
                        type="number"
                        class="input"
                        v-model.number="newBook.pageCount"
                        placeholder="Max 1000 ..."
                    />
                </label>
                <label class="flex flex-col">
                    Progress (%)
                    <input
                        required
                        type="number"
                        class="input"
                        v-model.number="newBook.progress"
                        placeholder="Progress..."
                    />
                </label>
                <button type="submit" class="button-primary mt-2.5">
                    Add Book
                </button>
            </form>
            <button @click="cancelBook" class="button-secondary mt-5 w-full">
                Cancel
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { useBooksStore } from '@/store/books';
import { Loading } from '@/components';
import { ref, watch, defineComponent } from 'vue';
import router from '@/router';
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
    components: {
        Loading,
    },
    setup() {
        const booksStore = useBooksStore();
        const newBook = ref({
            title: '',
            genre: '',
            pageCount: 0,
            progress: 0,
            review: { score: 0, text: '' },
        });

        watch(
            () => newBook.value.pageCount,
            (newValue) => {
                if (newValue > 1000) {
                    newBook.value.pageCount = 1000;
                }
            }
        );

        watch(
            () => newBook.value.progress,
            (newValue) => {
                if (newValue > 100) {
                    newBook.value.progress = 100;
                }
            }
        );

        const submitBook = () => {
            const bookId = uuidv4();
            booksStore.addBook({ ...newBook.value, id: bookId });
            newBook.value = {
                title: '',
                genre: '',
                pageCount: 0,
                progress: 0,
                review: { score: 0, text: '' },
            };
            router.push('/books');
        };

        const cancelBook = () => {
            router.push('/books');
        };
        return {
            booksStore,
            newBook,
            submitBook,
            cancelBook,
        };
    },
});
</script>
