<template>
    <nav
        class="bg-darkBrown/80 fixed left-0 right-0 top-0 z-10 flex justify-end px-5 py-2 backdrop-blur md:px-10"
    >
        <div class="mr-auto text-4xl">
            <router-link to="/">
                <span
                    role="img"
                    alt="Navigate to Homepage"
                    title="Navigate to Homepage"
                >
                    📚
                </span>
            </router-link>
        </div>
        <div v-if="authStore.token" class="flex flex-row items-center gap-x-5">
            <span v-if="username" class="text-lg capitalize">
                {{ username }}</span
            >
            <button @click="logout" class="button-secondary">Logout</button>
        </div>
        <div v-else class="flex flex-row items-center gap-x-5 py-3">
            <router-link to="/login">
                <span class="button-secondary">Login</span>
            </router-link>
            <router-link to="/register">
                <span class="button-secondary">Register</span>
            </router-link>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();
const username = computed(() => authStore.user);

function logout() {
    authStore.logout();
}
</script>
