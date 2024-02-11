<template>
  <div class="max-w-sm bg-yellow-100 rounded overflow-hidden shadow-lg">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ props.book.title }}</div>
      <p class="text-gray-700 text-base">
        Genre: {{ props.book.genre }}
      </p>
      <p class="text-gray-700 text-base">
        Pages: {{ props.book.pageCount }}
      </p>
      <p class="text-gray-700 text-base">
        Pages Read: {{ props.book.pagesRead }}
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <router-link :to="{ name: 'bookDetail', params: { id: book.id } }">
          <button class="read-more-button">Read More...</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Define props using `defineProps`
const props = defineProps({
  book: {
    type: Object,
    required: true
  }
});
</script>

<style>
/* Add styles here if needed */
</style>
