<template>
  <main class="container max-w-5xl pt-6" role="main">
      <div class="flex flex-wrap justify-center flex-col">
        <h3 class="text-4xl text-center font-bold my-6">Welcome to the Book Club!</h3>
        <p class="text-lg text-center">Here you can share info about your favourite books, leave updates on your reading progress and leave a review! </p>
        
        <template v-if="!isUserLoggedIn">
          <p class="text-lg mt-6 text-center">Please Login <RouterLink class='text-blue-500' aria-label="Log in" to="/login">here</RouterLink> or if you haven't already, you can register <RouterLink class='text-blue-500' aria-label="Register as a user" to="/register">here</RouterLink></p>
        </template>
        <template v-else>
          <div class="flex my-12 flex-col items-center">
            <div class="flex my-4 flex-1">
              <AddBook @bookAdded="fetchBooks" />
            </div>
            <div  v-if="booksStore.books.length > 0" class="flex w-full flex-1">
              <MyLibrary />
            </div>
          </div>
        </template>
      </div>
  </main>
</template>
<script setup>
import axios from 'axios';
import { computed, ref, onMounted, watchEffect } from 'vue';
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user';
import { useBooksStore } from '@/stores/books';
import MyLibrary from '../components/MyLibrary.vue';
import AddBook from '../components/AddBook.vue';

const userStore = useUserStore();

const booksStore = useBooksStore();
const books = ref([]);

// Define reactive variables to track user's login status and user information
const isUserLoggedIn = computed(() => userStore.isUserLoggedIn);

// Watch for changes in the user's login status or specifically the user.id
watchEffect(async () => {
  const userId = userStore.user.id;
  if (userId) {
    try {
      // Make sure to include the correct endpoint and adjust parameters as needed
      const response = await axios.get(`http://localhost:3000/books?userId=${userId}`);
      // Assuming your store has a method to set books data
      booksStore.setBooks(response.data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  }
});

</script>
