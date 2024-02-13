<template>
    <div>
        <h1 class="mb-5 text-center font-semibold">PageTracker 📚</h1>
        <div class="form-wrapper">
            <h2 class="mb-5 text-center text-2xl font-semibold">Login</h2>
            <form @submit.prevent="login" class="flex flex-col gap-y-4">
                <div class="relative w-full">
                    <label for="username" class="sr-only">Username</label>
                    <input
                        required
                        type="text"
                        class="input"
                        id="username"
                        v-model="form.username"
                        placeholder="Username"
                    />

                    <p
                        v-if="submitted && !usernameValid"
                        class="absolute -bottom-2 text-red-500"
                    >
                        Invalid username
                    </p>
                </div>

                <div class="relative w-full">
                    <label for="password" class="sr-only">Username</label>
                    <input
                        required
                        class="input"
                        id="password"
                        type="password"
                        v-model="form.password"
                        placeholder="Password"
                    />

                    <p
                        v-if="submitted && !passwordValid"
                        class="absolute -bottom-2 text-red-500"
                    >
                        Invalid password
                    </p>
                </div>

                <button type="submit" class="button-primary mb-2.5">
                    Login
                </button>
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
import { defineComponent, ref, reactive, computed } from 'vue';
import { useAuthStore } from '@/store/auth';
import { isValidUsername, isValidPassword } from '@/utils/validations';
import { User } from '@/types';

export default defineComponent({
    setup() {
        const form = reactive<User>({
            username: '',
            password: '',
        });

        const submitted = ref<boolean>(false);

        const usernameValid = computed(() => isValidUsername(form.username));
        const passwordValid = computed(() => isValidPassword(form.password));

        const authStore = useAuthStore();

        const login = async () => {
            submitted.value = true;
            if (usernameValid.value && passwordValid.value)
                authStore.login(form.username, form.password);
        };

        return {
            form,
            submitted,
            login,
            usernameValid,
            passwordValid,
        };
    },
});
</script>
