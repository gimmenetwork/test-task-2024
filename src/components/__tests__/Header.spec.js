import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from '@/components/Header.vue';
import { RouterLink, createRouter, createWebHistory } from 'vue-router';
import { nextTick } from 'vue'
import { useUserStore } from '@/stores/user';

// Mock the user store to control the login status and user information
vi.mock('@/stores/user', () => ({
  useUserStore: vi.fn(() => ({
    isUserLoggedIn: false, // Mock user as logged out by default
    user: { name: 'John Doe' } // Mock user information
  }))
}));

const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', name: 'home' }, { path: '/login', name: 'login' }, { path: '/register', name: 'register' }]
  });

describe('Header', () => {
    it('displays login and register links when user is logged out', async () => {
        // Mount the Header component with the mock router and RouterLink stub
        const wrapper = mount(Header, {
            global: {
              plugins: [router],
              stubs: {}
            }
          });
    
        // Wait for the component to update
        await nextTick();

        // Assertions
        expect(wrapper.find('a', { attributes: { to: '/login' } }).exists()).toBeTruthy(); // Check if login link exists
        expect(wrapper.find('a', { attributes: { to: '/register' } }).exists()).toBeTruthy(); // Check if register link exists
        expect(wrapper.find('a', { attributes: { to: '/profile' } }).exists()).toBeTruthy(); // Check if profile link exists
       
      });

  it('displays user name and profile link when user is logged in', async () => {
    // Mock the user as logged in
    vi.mock('@/stores/user', () => ({
      useUserStore: vi.fn(() => ({
        isUserLoggedIn: true, // Mock user as logged in
        user: { id: 'test-id-1', name: 'John Doe' } // Mock user information
      }))
    }));

    // Mount the Header component
    const wrapper = mount(Header, {
        global: {
          plugins: [router],
          stubs: {}
        }
      });

    // Wait for the component to update
    await nextTick();

    // Assertions
    expect(wrapper.find('a', { attributes: { to: '/profile' } }).exists()).toBeTruthy(); // Check if profile link exists
    expect(wrapper.text()).toContain('John Doe'); // Check if user's name is displayed
   });
});
