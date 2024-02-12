import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import RegistrationForm from '@/components/RegistrationForm.vue';
import { nextTick } from 'vue'
import axios from 'axios';

// Mock the axios post method
vi.mock('axios', () => ({
  post: vi.fn(async () => {
    // Simulate successful registration
    return Promise.resolve();
  })
}));

describe('RegistrationForm', () => {
  it('Enters data in the form correctly', async () => {
    // Mount the RegistrationForm component
    const wrapper = mount(RegistrationForm);

    // Fill out the form fields
    await wrapper.find('#name').setValue('John Doe');
    await wrapper.find('#email').setValue('john@example.com');
    await wrapper.find('#password').setValue('password123');

   

    // Assert that the form data is cleared after submission
    const formData = wrapper.vm.formData;
    expect(formData.name).toBe('John Doe');
    expect(formData.email).toBe('john@example.com');
    expect(formData.password).toBe('password123');
  });
});
