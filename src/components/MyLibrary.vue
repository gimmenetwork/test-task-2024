<template>
    <div class="w-full">
        <h3 class="text-3xl font-Roboto mt-10 mb-6 font-bold" id="libraryHeading">My Library:</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" aria-labelledby="libraryHeading" role="list">
            <BookCard
                v-for="book in props.booksData"
                :key="book.id"
                :book="book"
                role="listitem"
            />
        </div>
    </div>
</template>

<script setup>

import BookCard from './BookCard.vue';
import { defineProps } from 'vue';

const props = defineProps({
  booksData: Array
});

</script>
