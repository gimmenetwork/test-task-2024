<template>
    <header class="sticky top-0 bg-bookclub-primary shadow-lg">
        <div class="container max-w-5xl flex flex-col sm:flex-row items-center gap-4 text-white py-6">
            <RouterLink to="/" aria-label="Book Club Home">
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-book text-6xl" aria-hidden="true"></i>
                    <h1 class="text-6xl">Book Club</h1>
                </div>
            </RouterLink>
            <nav class="flex gap-3 flex-1 justify-end" aria-label="Primary navigation">

                <template v-if="!isUserLoggedIn">
                    <RouterLink class="text-2xl inline-block bg-bookclub-secondary hover:bg-bookclub-green text-white font-bold py-2 px-4 rounded" to="/login" aria-label="Login">Login</RouterLink>
                    <RouterLink class="text-2xl inline-block bg-bookclub-secondary hover:bg-bookclub-green text-white font-bold py-2 px-4 rounded" to="/register" aria-label="Register">Register</RouterLink>
                </template>
                <template v-else>
                    <div class="flex items-center gap-3">
                        <RouterLink class="flex flex-col items-center" to="/profile" aria-label="User profile">
                            <i class="fa-solid fa-user text-4xl" aria-hidden="true"></i>
                            <span class="text-xl">{{ user.name }}</span>
                        </RouterLink>
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

const isUserLoggedIn = computed(() => userStore.isUserLoggedIn);
const user = computed(() => userStore.user);
</script>
