<template>
    <header class="sticky top-0 bg-bookclub-primary shadow-lg">
        <div class="container max-w-5xl flex flex-col sm:flex-row items-center gap-4 text-white py-6">
            <RouterLink to="/">
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-book text-6xl"></i>
                    <h2 class="text-6xl">Book Club</h2>
                </div>
            </RouterLink>
            <nav class="flex gap-3 flex-1 justify-end">
                <!-- Check if user is logged in -->
                <template v-if="!isUserLoggedIn">
                    <RouterLink class="text-2xl inline-block bg-bookclub-secondary hover:bg-bookclub-green text-white font-bold py-2 px-4 rounded" to="/login">Login</RouterLink>
                    <RouterLink class="text-2xl inline-block bg-bookclub-secondary hover:bg-bookclub-green text-white font-bold py-2 px-4 rounded" to="/register">Register</RouterLink>
                </template>
                <template v-else>
                    <!-- Render profile icon and user's name -->
                    <div class="flex items-center gap-3">
                        <i class="fa-solid fa-user text-2xl"></i>
                        <!-- Display the user's name -->
                        <span class="text-xl">{{ user.name }}</span>
                    </div>
                </template>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

// Define reactive variables to track user's login status and user information
const isUserLoggedIn = computed(() => userStore.isUserLoggedIn);
const user = computed(() => userStore.user);
</script>
