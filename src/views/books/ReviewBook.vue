<template>
    <div>
        <h1 class="mb-5 text-center font-semibold">PageTracker 📚</h1>
        <Loading v-if="booksStore.isLoadingBooks" />
        <div v-else class="form-wrapper">
            <h2 class="mb-5 text-center text-2xl font-semibold">Review Book</h2>
            <form @submit.prevent="saveReview" class="flex flex-col gap-y-5">
                <label class="flex flex-col"
                    >Score (0-10)

                    <input
                        min="0"
                        max="10"
                        required
                        class="input"
                        type="number"
                        v-model.number="review.score"
                    />
                </label>

                <label class="flex flex-col"
                    >Review

                    <textarea
                        rows="5"
                        required
                        class="textarea"
                        v-model="review.text"
                    ></textarea>
                </label>

                <button type="submit" class="button-primary">
                    Save Review
                </button>
                <button @click="cancelReview" class="button-secondary">
                    Cancel
                </button>
            </form>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { useBooksStore } from '@/store/books';
import { Loading } from '@/components';

export default defineComponent({
    components: {
        Loading,
    },
    setup() {
        const route = useRoute();

        const booksStore = useBooksStore();
        const bookId = route.params.id as string;

        const review = ref({
            score: 0,
            text: '',
        });

        watch(
            () => review.value.score,
            (newValue) => {
                if (newValue > 10) {
                    review.value.score = 10;
                }
            }
        );

        onMounted(async () => {
            const existingReview = await booksStore.getReview(bookId);
            if (existingReview) {
                review.value = existingReview;
            }
        });

        const saveReview = () => {
            booksStore.addReview(bookId, review.value);
            alert('Book review added successfully');
            router.push('/books');
        };

        const cancelReview = () => {
            router.push('/books');
        };
        return {
            review,
            saveReview,
            cancelReview,
            booksStore,
        };
    },
});
</script>
