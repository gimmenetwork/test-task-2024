<template>
    <div>
        <div class="flex items-center justify-center">
            <div
                class="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
                role="status"
            >
                <span class="visually-hidden">Loading...</span>
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
.visually-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
}
</style>
