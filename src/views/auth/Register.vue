<template>
    <form @submit.prevent="registerAndLogin" class="flex flex-col gap-y-2.5">
        <input required type="text" v-model="username" placeholder="Username" />
        <div class="relative">
            <p v-if="usernameError" class="absolute -top-6 text-red-500">
                {{ usernameError }}
            </p>
        </div>

        <input
            required
            type="password"
            v-model="password"
            placeholder="Password"
        />
        <div class="relative">
            <p v-if="passwordError" class="absolute -top-6 text-red-500">
                {{ passwordError }}
            </p>
        </div>

        <button type="submit" class="button-primary mb-2.5">Register</button>

        <router-link to="/login">
            <span class="link">Login</span>
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
@/stores/auth
