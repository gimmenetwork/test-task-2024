<template>
    <div class="relative min-h-screen py-20">
        <Navbar></Navbar>
        <main>
            <slot></slot>
        </main>
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import { Footer, Navbar } from '@/components';
</script>
