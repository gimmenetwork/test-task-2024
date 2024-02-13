<template>
    <notifications position="top left" classes="notification" />
    <Layout>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </Layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Layout from '@/layout/Layout.vue';
</script>

<style lang="css">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
