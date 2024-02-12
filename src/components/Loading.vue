<template>
    <div>
        <div class="flex items-center justify-center">
            <div
                class="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
                role="status"
            >
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts"></script>

<style scoped>
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
.spinner-border {
    border-color: transparent;
    border-top-color: #60993e;
    border-right-color: #60993e;
}
</style>
