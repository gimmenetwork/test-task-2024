<template>
  <div class="max-w-sm bg-yellow-100 rounded overflow-hidden shadow-lg">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2" aria-label="Book Title">{{ props.book.title }}</div>
      <p class="text-gray-700 text-base" aria-label="Genre">
        Genre: {{ props.book.genre }}
      </p>
      <p class="text-gray-700 text-base" aria-label="Page Count">
        Pages: {{ props.book.pageCount }}
      </p>
      <p class="text-gray-700 text-base" aria-label="Pages Read">
        Pages Read: {{ props.book.pagesRead }}
      </p>
    </div>
    <div class="px-4 pt-1 pb-6">
      
      <router-link 
        :to="{ name: 'bookDetail', params: { id: book.id } }" 
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        aria-label="Read more about this book"
      >
            Read more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
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
