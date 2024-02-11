<template>
    <div>
        <h1 class="mb-5 text-center font-semibold">PageTracker 📚</h1>
        <div class="form-wrapper">
            <h2 class="mb-5 text-center text-2xl font-semibold">Register</h2>
            <form
                @submit.prevent="registerAndLogin"
                class="flex flex-col gap-y-2.5"
            >
                <input
                    required
                    type="text"
                    class="input"
                    v-model="username"
                    placeholder="Pick a username"
                />
                <div class="relative">
                    <p
                        v-if="usernameError"
                        class="absolute -top-6 text-red-500"
                    >
                        {{ usernameError }}
                    </p>
                </div>

                <input
                    required
                    class="input"
                    type="password"
                    v-model="password"
                    placeholder="Choose a password"
                />
                <div class="relative">
                    <p
                        v-if="passwordError"
                        class="absolute -top-6 text-red-500"
                    >
                        {{ passwordError }}
                    </p>
                </div>

                <button type="submit" class="button-primary mb-2.5">
                    Register
                </button>
                <div class="flex flex-col text-center">
                    <p>Already have an account?</p>
                    <router-link to="/login">
                        <span class="link">Login</span>
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
        const usernameError = ref('');
        const passwordError = ref('');
        const authStore = useAuthStore();

        const validateInput = () => {
            usernameError.value =
                username.value.length < 6
                    ? 'Username must be at least 6 characters long.'
                    : '';
            passwordError.value =
                password.value.length < 10
                    ? 'Password must be at least 10 characters long.'
                    : '';
            return !usernameError.value && !passwordError.value;
        };

        const registerAndLogin = async () => {
            if (validateInput()) {
                await authStore.register(username.value, password.value);
            }
        };

        return {
            username,
            password,
            usernameError,
            passwordError,
            registerAndLogin,
        };
    },
});
</script>
