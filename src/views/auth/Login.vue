<template>
    <form @submit.prevent="login" class="flex flex-col gap-y-5">
        <input required type="text" v-model="username" placeholder="Username" />
        <input
            required
            type="password"
            v-model="password"
            placeholder="Password"
        />
        <button type="submit" class="button-primary">Login</button>

        <router-link to="/register">
            <span class="link">Register</span>
        </router-link>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '@/store/auth';

export default defineComponent({
    setup() {
        const username = ref('');
        const password = ref('');

        const authStore = useAuthStore();

        const login = async () => {
            authStore.login(username.value, password.value);
        };

        return {
            username,
            password,
            login,
        };
    },
});
</script>
@/stores/auth
