<template>
    <div>
        <h1 class="mb-5 text-center font-semibold">PageTracker 📚</h1>
        <div class="form-wrapper">
            <h2 class="mb-5 text-center text-2xl font-semibold">Register</h2>
            <form
                @submit.prevent="registerAndLogin"
                class="flex flex-col gap-y-4"
            >
                <div class="relative w-full">
                    <label for="username" class="sr-only">Username</label>
                    <input
                        required
                        type="text"
                        id="username"
                        class="input"
                        v-model="form.username"
                        placeholder="Pick a username"
                    />
                    <p
                        v-if="submitted && !usernameValid"
                        class="absolute -bottom-2 text-red-500"
                    >
                        Username must be 6+ characters long.
                    </p>
                </div>

                <div class="relative w-full">
                    <label for="password" class="sr-only">Password</label>
                    <input
                        required
                        class="input"
                        id="password"
                        type="password"
                        v-model="form.password"
                        placeholder="Choose a password"
                    />
                    <p
                        v-if="submitted && !passwordValid"
                        class="absolute -bottom-2 text-red-500"
                    >
                        Password must be 10+ characters long.
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

        const registerAndLogin = async () => {
            submitted.value = true;
            if (usernameValid.value && passwordValid.value) {
                await authStore.register(form.username, form.password);
            }
        };

        return {
            form,
            submitted,
            usernameValid,
            passwordValid,
            registerAndLogin,
        };
    },
});
</script>
