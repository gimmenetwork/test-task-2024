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
            <AddBook />
          </div>
          <div class="flex flex-1">
            <MyLibrary />
          </div>
        </div>
      </template>
    </div>
</main>
</template>
<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user';
import AddBook from '../components/AddBook.vue'
import MyLibrary from '../components/MyLibrary.vue';

const userStore = useUserStore();

// Define reactive variables to track user's login status and user information
const isUserLoggedIn = computed(() => userStore.isUserLoggedIn);
</script>
