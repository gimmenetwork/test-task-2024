<template>
    <div>
        <nav>
            <!-- TODO: add nav items -->
            Nav
            <span v-if="authStore.token"> {{ username }} logged in</span>
            <button v-if="authStore.token" @click="logout">Logout</button>
        </nav>

        <main>
            <slot></slot>
        </main>

        <footer>
            <!-- TODO: add footer -->
            Footer
        </footer>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAuthStore } from '@/store/auth';

export default defineComponent({
    setup() {
        const authStore = useAuthStore();
        const username = computed(() => authStore.user);

        function logout() {
            authStore.logout();
        }

        return {
            authStore,
            username,
            logout,
        };
    },
});
</script>
