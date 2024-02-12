<template>
    <div class="grid place-items-center gap-y-10">
        <h1 class="text-center">Welcome to PageTracker 📚</h1>
        <div>
            <p class="text-center">Keep records of your reading progress</p>
            <div v-if="authStore.token" class="mt-10 text-center">
                <h2 class="py-5 capitalize">Hello {{ username }}</h2>
                <router-link to="/books">
                    <span class="button-primary">Access your library</span>
                </router-link>
            </div>
            <div v-else class="my-10 flex flex-col gap-y-5 text-center">
                <router-link to="/register">
                    <span class="button-primary">Create an account</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
const username = localStorage.getItem('username');
</script>
