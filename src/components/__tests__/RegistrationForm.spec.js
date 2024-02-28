import { vi, describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RegistrationForm from '@/components/RegistrationForm.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Mock Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes: [], // No need for actual routes in most unit tests
});

router.push = vi.fn(); // Mock the push method if your component performs navigation

// Provide the mock router to your component
describe('RegistrationForm', () => {
  it('binds input fields correctly', async () => {
    const wrapper = mount(RegistrationForm, {
      global: {
        plugins: [router],
      },
    });

    // Proceed with your test
     // Simulate user input
     await wrapper.find('#name').setValue('John Doe');
     await wrapper.find('#email').setValue('john@example.com');
     await wrapper.find('#password').setValue('password123');
 
     // Assert the component's data properties match the expected values
     expect(wrapper.vm.formData.name).toBe('John Doe');
     expect(wrapper.vm.formData.email).toBe('john@example.com');
     expect(wrapper.vm.formData.password).toBe('password123');
  });
});