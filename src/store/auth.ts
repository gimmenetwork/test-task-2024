import { defineStore } from 'pinia';
import router from '@/router';
import { AuthService } from '@/services/authService';
import { AuthState } from '@/types';

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: localStorage.getItem('username') || null,
        token: localStorage.getItem('authToken') || null,
    }),
    actions: {
        // Ideally here we would ensure passwords are hashed before storing them in the "database" using libraries like bcrypt.
        // We would also generate tokens based on sessions or an external service that generates the token instead.
        async register(username: string, password: string) {
            try {
                const { token, user } = await AuthService.register({
                    username,
                    password,
                });
                this.token = token;
                this.user = user.username;
                localStorage.setItem('authToken', this.token);
                localStorage.setItem('username', this.user);
                router.push({ name: 'Home' });
            } catch (error) {
                console.error('Registration failed', error);
                throw error;
            }
        },
        async login(username: string, password: string) {
            try {
                const { token, user } = await AuthService.login({
                    username,
                    password,
                });
                this.token = token;
                this.user = user.username;
                localStorage.setItem('authToken', this.token);
                localStorage.setItem('username', this.user);
                router.push({ name: 'Home' });
            } catch (error) {
                console.error('Login error', error);
                throw error;
            }
        },
        logout() {
            this.user = null;
            this.token = null;
            localStorage.clear();
            router.push({ name: 'Home' });
        },
    },
});
