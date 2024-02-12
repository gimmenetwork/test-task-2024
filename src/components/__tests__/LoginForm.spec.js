import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';
import { useRouter } from 'vue-router';

// Mocking the useRouter function to avoid an error in the component
vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({
      push: vi.fn() // Mock the push method of the router
    }))
  }));
  
  // Mocking the useUserStore hook
  const mockUserStore = {
    login: vi.fn(), // Mock the login method of the user store
    isLoggedIn: false // Mock the isLoggedIn getter or state property
  };
  vi.mock('@/stores/user', () => ({
    useUserStore: () => mockUserStore
  }));

describe('LoginForm', () => {
    it('submits the login form', async () => {
        // Mount the LoginForm component
        const wrapper = mount(LoginForm);
        
        // Simulate filling out the form
        await wrapper.find('input[type="email"]').setValue('test@example.com');
        await wrapper.find('input[type="password"]').setValue('password');
    
        // Simulate form submission
        await wrapper.find('form').trigger('submit.prevent');
    
        // Log the form data to debug
        console.log('form data after submission:', wrapper.vm.formData);
    
        // Assertions
        expect(wrapper.vm.errorMessage).toBe(''); // Check if the error message is cleared after successful login
        expect(wrapper.vm.formData.email).toBe(''); // Check if the email input is cleared after successful login
        expect(wrapper.vm.formData.password).toBe(''); // Check if the password input is cleared after successful login
        expect(mockUserStore.login).toHaveBeenCalled(); // Check if the login method of userStore has been called
      });
});
