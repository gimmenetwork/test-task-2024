<template>
    <notifications position="top left" classes="notification" />
    <Layout>
        <Transition>
            <RouterView />
        </Transition>
    </Layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Layout from '@/layout/Layout.vue';
</script>

<style lang="css">
.v-enter-active,
.v-leave-active {
    transition: opacity 0.6s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
