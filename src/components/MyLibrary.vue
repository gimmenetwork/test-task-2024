<template>
    <div class="w-full">
        <h3 class="text-3xl font-Roboto mt-10 mb-6 font-bold" id="libraryHeading">My Library:</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" aria-labelledby="libraryHeading" role="list">
            <BookCard
                v-for="book in booksStoreComputed"
                :key="book.id"
                :book="book"
                role="listitem"
            />
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import BookCard from './BookCard.vue';
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useBooksStore } from '@/stores/books';
import { useUserStore } from '@/stores/user';

const booksStore = useBooksStore();
const userStore = useUserStore();

const booksStoreComputed = computed(() => booksStore.books);

</script>
