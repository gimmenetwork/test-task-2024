<template>
    <header class="sticky top-0 bg-bookclub-primary shadow-lg">
        <div class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
            <RouterLink to="/">
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-book text-6xl"></i>
                    <h2 class="text-6xl">Book Club</h2>
                </div>
            </RouterLink>
            <nav class="flex gap-3 flex-1 justify-end">
                <RouterLink class="text-2xl inline-block bg-bookclub-secondary hover:bg-bookclub-green text-white font-bold py-2 px-4 rounded" to="/login">Login</RouterLink>
                <RouterLink class="text-2xl inline-block bg-bookclub-secondary hover:bg-bookclub-green text-white font-bold py-2 px-4 rounded" to="/register">Register</RouterLink>
            </nav>
        </div>
    </header>
   
</template>
<script setup>
import { RouterLink } from 'vue-router'
</script>