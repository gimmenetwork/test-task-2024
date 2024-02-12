import { createPinia, setActivePinia } from 'pinia';
import NavBar from '@/components/Navbar.vue';

import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setupTestRouter } from '@/tests/utils/setupRouter';
import { useAuthStore } from '@/store/auth';

describe('Testing Navbar', () => {
    const router = setupTestRouter();

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('displays login and register links when not authenticated', async () => {
        const authStore = useAuthStore();
        authStore.$state = { user: null, token: null };

        const wrapper = mount(NavBar, {
            global: {
                plugins: [router],
            },
        });

        expect(
            wrapper
                .findComponent({ name: 'RouterLink', props: { to: '/login' } })
                .exists()
        ).toBe(true);
        expect(
            wrapper
                .findComponent({
                    name: 'RouterLink',
                    props: { to: '/register' },
                })
                .exists()
        ).toBe(true);
        expect(wrapper.text()).not.toContain('Logout');
    });

    it('displays username and logout button when authenticated', async () => {
        const authStore = useAuthStore();
        authStore.$state = { token: 'mock-token', user: 'Lucian' };

        const wrapper = mount(NavBar, {
            global: {
                plugins: [router],
            },
        });

        expect(wrapper.text()).toContain('Lucian');
        expect(wrapper.find('button').text()).toBe('Logout');
    });
});
