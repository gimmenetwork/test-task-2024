<template>
    <div>
        <h1 class="mb-5 text-center font-semibold">PageTracker 📚</h1>
        <div class="form-wrapper">
            <h2 class="mb-5 text-center text-2xl font-semibold">Login</h2>
            <form @submit.prevent="login" class="flex flex-col gap-y-5">
                <input
                    required
                    type="text"
                    class="input"
                    v-model="username"
                    placeholder="Username"
                />
                <input
                    required
                    class="input"
                    type="password"
                    v-model="password"
                    placeholder="Password"
                />
                <button type="submit" class="button-primary">Login</button>
                <div class="flex flex-col text-center">
                    <p>Don't have an account yet?</p>
                    <router-link to="/register">
                        <span class="link">Register</span>
                    </router-link>
                </div>
            </form>
        </div>
    </div>
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
