<template>
<main class="container max-w-5xl pt-6">
    <div class="flex flex-wrap justify-center flex-col">
      <h3 class="text-4xl text-center font-bold my-6">Welcome to the Book Club!</h3>
      <p class="text-lg text-center">Here you can share info about your favourite books, leave updates on your reading progress and leave a review! </p>
      
      <template v-if="!isUserLoggedIn">
        <p class="text-lg mt-6 text-center">Please Login <RouterLink class='text-blue-500' to="/login">here</RouterLink> or if you haven't already, you can register <RouterLink class='text-blue-500' to="/login">here</RouterLink></p>
      </template>
      <template v-else>
        <div class="flex my-12 flex-col items-center">
          <div class="flex my-4 flex-1">
            <AddBook @bookAdded="fetchBooks" />
          </div>
          <div  v-if="books.length > 0" class="flex w-full flex-1">
            <MyLibrary />
          </div>
        </div>
      </template>
    </div>
</main>
</template>
<script setup>
import axios from 'axios';
import { computed, ref, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user';
import { useBooksStore } from '@/stores/books';
import MyLibrary from '../components/MyLibrary.vue';
import AddBook from '../components/AddBook.vue'

const booksStore = useBooksStore();
const books = ref([]);

// Fetch books when the component is mounted
const fetchBooks = async () => {
    try {
        const response = await axios.get('http://localhost:3000/books');
        books.value = response.data; // Update the reactive books variable
        booksStore.setBooks(response.data); // Update the books store
    } catch (error) {
        console.error('Failed to fetch books:', error);
        // Handle the error appropriately
    }
};

// Define a reactive variable to store the books

// Call the fetchBooks function when the component is mounted
onMounted(fetchBooks);
watch(() => booksStore.books, async () => {
    await fetchBooks();
}, { deep: true });

const userStore = useUserStore();

// Define reactive variables to track user's login status and user information
const isUserLoggedIn = computed(() => userStore.isUserLoggedIn);
</script>
