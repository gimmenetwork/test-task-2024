import { createPinia, setActivePinia } from 'pinia';

import { setupTestRouter } from '@/tests/utils/setupRouter';
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { RouterLinkStub } from '@vue/test-utils';

import LoginView from '@/views/auth/Login.vue';

describe('Testing Login view', () => {
    const router = setupTestRouter();

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('should display the main page and section titles correctly', () => {
        const wrapper = mount(LoginView, {
            stubs: {
                RouterLink: RouterLinkStub,
            },
            global: {
                plugins: [router],
            },
        });
        expect(wrapper.find('h1').text()).toContain('PageTracker 📚');
        expect(wrapper.find('h2').text()).toBe('Login');
    });

    it('should have input fields with accessible placeholders', () => {
        const wrapper = mount(LoginView, {
            global: {
                plugins: [router],
            },
        });
        const usernameInput = wrapper.find('input[type="text"]');
        const passwordInput = wrapper.find('input[type="password"]');

        expect(usernameInput.attributes('placeholder')).toBe('Username');
        expect(passwordInput.attributes('placeholder')).toBe('Password');
    });

    it('should have a descriptive login button', () => {
        const wrapper = mount(LoginView, {
            global: {
                plugins: [router],
            },
        });
        const loginButton = wrapper.find('button[type="submit"]');
        expect(loginButton.text()).toBe('Login');
    });
});
