<template>
    <notifications position="top left" classes="notification" />
    <Layout>
        <RouterView />
    </Layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Layout from '@/layout/Layout.vue';
</script>
