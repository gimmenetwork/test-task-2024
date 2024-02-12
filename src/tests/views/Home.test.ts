import { createPinia, setActivePinia } from 'pinia';
import HomeView from '@/views/Home.vue';

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setupTestRouter } from '@/tests/utils/setupRouter';
import { useAuthStore } from '@/store/auth';

describe('Testing Home view', () => {
    const router = setupTestRouter();

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should display the welcome message and prompts for account creation correctly for unauthenticated users', async () => {
        const authStore = useAuthStore();
        authStore.$state = { token: null, user: null };

        const wrapper = mount(HomeView, {
            global: {
                plugins: [router],
            },
        });

        expect(wrapper.find('h1').text()).toContain(
            'Welcome to PageTracker 📚'
        );
        expect(wrapper.find('p').text()).toContain(
            'Keep records of your reading progress'
        );

        const registerLink = wrapper.findComponent({
            name: 'RouterLink',
            props: { to: '/register' },
        });
        expect(registerLink.exists()).toBe(true);
        expect(registerLink.text()).toContain('Create an account');
    });

    it('should display the personalized greeting and library access link for authenticated users', async () => {
        const authStore = useAuthStore();
        authStore.$state = { token: 'mock-token', user: 'Lucian' };

        localStorage.setItem('username', 'Lucian');

        const wrapper = mount(HomeView, {
            global: {
                plugins: [router],
            },
        });

        expect(wrapper.find('h2').text()).toContain('Hello Lucian');

        const booksLink = wrapper.findComponent({
            name: 'RouterLink',
            props: { to: '/books' },
        });
        expect(booksLink.exists()).toBe(true);
        expect(booksLink.text()).toContain('Access your library');
    });
});
