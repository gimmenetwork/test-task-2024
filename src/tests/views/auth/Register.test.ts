import { createPinia, setActivePinia } from 'pinia';
import RegisterView from '@/views/auth/Register.vue';

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { setupTestRouter } from '@/tests/utils/setupRouter';

describe('Testing Register view', () => {
    const router = setupTestRouter();

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('should display the main page and section titles correctly', () => {
        const wrapper = mount(RegisterView, {
            global: {
                plugins: [router],
            },
        });
        expect(wrapper.find('h1').text()).toContain('PageTracker 📚');
        expect(wrapper.find('h2').text()).toBe('Register');
    });

    it('should display the input fields with accessible placeholders', () => {
        const wrapper = mount(RegisterView, {
            global: {
                plugins: [router],
            },
        });
        const usernameInput = wrapper.find('input[type="text"]');
        const passwordInput = wrapper.find('input[type="password"]');

        expect(usernameInput.attributes('placeholder')).toBe('Pick a username');
        expect(passwordInput.attributes('placeholder')).toBe(
            'Choose a password'
        );
    });

    it('should display a register button', () => {
        const mockAuthStore = {
            register: vi.fn(),
        };

        const wrapper = mount(RegisterView, {
            global: {
                plugins: [router],
                mocks: {
                    useAuthStore: mockAuthStore,
                },
            },
        });
        const registerButton = wrapper.find('button[type="submit"]');
        expect(registerButton.text()).toBe('Register');
    });
});
